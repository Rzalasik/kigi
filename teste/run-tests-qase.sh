#!/bin/bash

# Script universal para rodar testes Cypress e completar o run no Qase
#
# Uso sem parâmetros (automático):
#   ./run-tests-qase.sh
#   Roda: APIs.cy.js com título "Automated test - API - run DD-MM-YYYY HH:MM:SS"
#
# Uso com parâmetros (manual):
#   ./run-tests-qase.sh <spec-file> <title-prefix>
#   Exemplo: ./run-tests-qase.sh SMOKE.cy.js "Manual test - SMOKE"
#   Roda: spec especificado com título customizado

# Configuração
export QASE_MODE=testops
export QASE_TESTOPS_PROJECT=${QASE_TESTOPS_PROJECT:-KG}
export QASE_TESTOPS_API_TOKEN=${QASE_TESTOPS_API_TOKEN:-7b09d01cab56fc0aa920915f89b837ee0cafd0ca6f9bda7dc7d17fe6178df59d}
export QASE_TESTOPS_DEFECT=${QASE_TESTOPS_DEFECT:-true}
export QASE_TESTOPS_SHOW_PUBLIC_REPORT_LINK=${QASE_TESTOPS_SHOW_PUBLIC_REPORT_LINK:-true}
export QASE_ENVIRONMENT=${QASE_ENVIRONMENT:-Staging}

# Parâmetros com defaults para modo automático
SPEC_FILE="${1:-}"
TITLE_PREFIX=${2:-"Automated test - E2E"}


# Se o usuário passou SPEC_FILE manualmente (param 1), respeita.
# Se não passou, decide com base no PROJECT_DEV.


PROJECT_DEV_TAG="${PROJECT_DEV:-}"

PROJECT_DEV=${PROJECT_DEV:+[$PROJECT_DEV] }
BRANCH_NAME=${BRANCH_NAME:+[$BRANCH_NAME] }

if [ -n "$PROJECT_DEV_TAG" ]; then
  export QASE_TESTOPS_RUN_TAGS="$PROJECT_DEV_TAG"
fi

export QASE_TESTOPS_RUN_TITLE="$BRANCH_NAME${TITLE_PREFIX} - run $(date '+%d-%m-%Y %H:%M:%S')"
export DEBUG=qase:*,qase:*

# Rodar testes capturando output em arquivo E mostrando em tempo real
TEST_OUTPUT_FILE=$(mktemp)
if [ -n "$SPEC_FILE" ]; then
  echo "🚀 Running Cypress tests: ${SPEC_FILE}"
  echo "📝 Title: ${QASE_TESTOPS_RUN_TITLE}"
  set -o pipefail
  npx cypress run --browser chrome --spec "$SPEC_FILE" 2>&1 | tee "$TEST_OUTPUT_FILE"
  TEST_EXIT_CODE=${PIPESTATUS[0]}
  set +o pipefail
else
  echo "🚀 Running ALL Cypress tests"
  echo "📝 Title: ${QASE_TESTOPS_RUN_TITLE}"
  set -o pipefail
  npx cypress run --browser chrome 2>&1 | tee "$TEST_OUTPUT_FILE"
  TEST_EXIT_CODE=${PIPESTATUS[0]}
  set +o pipefail
fi
TEST_OUTPUT=$(cat "$TEST_OUTPUT_FILE")
rm -f "$TEST_OUTPUT_FILE"

# Extrair Run ID do output
RUN_ID=$(echo "$TEST_OUTPUT" | sed -nE 's/.*Run ([0-9]+) completed.*/\1/p' | tail -1)

if [ -z "$RUN_ID" ]; then
  echo "❌ Could not find Run ID in test output"
  exit $TEST_EXIT_CODE
fi

echo ""
echo "📊 Detected Run ID: $RUN_ID"

echo "🧩 Updating custom field on Qase run..."

# ====== CONFIG DO SEU CAMPO CUSTOMIZADO ======
# ID do campo customizado no Qase (ex: 15)
QASE_CUSTOM_FIELD_ID=${QASE_CUSTOM_FIELD_ID:-15}

# Valor que você quer setar (ex: "3")
# Você pode trocar por qualquer lógica: branch, env, etc.
QASE_CUSTOM_FIELD_VALUE=${QASE_CUSTOM_FIELD_VALUE:-"3"}

PATCH_PAYLOAD=$(cat <<EOF
{
  "custom_field": {
    "$QASE_CUSTOM_FIELD_ID": "$QASE_CUSTOM_FIELD_VALUE"
  }
}
EOF
)

PATCH_RESPONSE=$(curl -sS --request PATCH \
  --url "https://api.qase.io/v1/run/$QASE_TESTOPS_PROJECT/$RUN_ID" \
  --header "Token: 8b63e5407bc3a5f125cbd863f4452881b488c597de2ef2a70a2ac49b4c37b478" \
  --header "accept: application/json" \
  --header "content-type: application/json" \
  --data "$PATCH_PAYLOAD" \
  || true
)

echo "✅ PATCH response: $PATCH_RESPONSE"


echo "🔄 Completing run in Qase..."

# Completar o run
node complete-qase-run.js "$RUN_ID"
COMPLETE_EXIT_CODE=$?

# Link do run
echo ""
echo "🔗 View run at: https://app.qase.io/run/$QASE_TESTOPS_PROJECT/dashboard/$RUN_ID"

# Retornar o exit code dos testes
exit $TEST_EXIT_CODE
