#!/usr/bin/env node

/**
 * Script para completar run do Qase após os testes
 * Extrai o run ID dos logs do Cypress e completa via API
 */

const https = require("https");
const fs = require("fs");

// Ler o último run ID do log do Cypress
function getLastRunId(logOutput) {
  const match = logOutput.match(/Run (\d+) completed/);
  return match ? match[1] : null;
}

// Completar run via API do Qase
function completeRun(projectCode, runId, apiToken) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.qase.io",
      port: 443,
      path: `/v1/run/${projectCode}/${runId}/complete`,
      method: "POST",
      headers: {
        Token: apiToken,
        "Content-Type": "application/json"
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode === 200) {
          console.log(`✅ Run ${runId} completed successfully in Qase`);
          resolve(JSON.parse(data));
        } else {
          reject(
            new Error(`Failed to complete run: ${res.statusCode} - ${data}`)
          );
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}

// Obter o run ID dos argumentos ou variáveis de ambiente
const runId = process.argv[2];
const projectCode =
  process.env.QASE_TESTOPS_PROJECT || process.env.QASE_PROJECT_CODE || "KG";
const apiToken =
  process.env.QASE_TESTOPS_API_TOKEN || process.env.QASE_API_TOKEN;

if (!apiToken) {
  console.error(
    "❌ API token not found. Set QASE_TESTOPS_API_TOKEN or QASE_API_TOKEN"
  );
  process.exit(1);
}

if (!runId) {
  console.error("❌ Usage: node complete-qase-run.js <run_id>");
  process.exit(1);
}

completeRun(projectCode, runId, apiToken)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error completing run:", error.message);
    process.exit(1);
  });
