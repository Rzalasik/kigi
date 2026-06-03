# language: pt
# IV-18842 — Correção de perda do estado (UF) no fluxo de carga por CNPJ
# PR de referência: #2977 (newjersey-clifton)
#
# Problema raiz: ao consultar CNPJ via Receita, o campo UF/Estado do endereço
# ficava vazio após o preenchimento automático do address, fazendo a validação
# de IE falhar mesmo com IE correta. A correção está em mbg-address.ts e
# nas telas person-documents.ts e modal-quick-register-v2.ts.
#
# FOCO dos testes: garantir que a UF sempre venha preenchida após consulta de
# CNPJ, pois sem UF a validação de IE inevitavelmente retorna erro falso.

Funcionalidade: Validação de Inscrição Estadual (IE) com UF carregada via consulta de CNPJ
  Como um operador do sistema Kigi
  Quero que ao consultar um CNPJ o campo UF/Estado seja sempre preenchido automaticamente
  Para que a validação da Inscrição Estadual funcione corretamente sem falso-positivo

  Contexto:
    Dado que o operador está autenticado no sistema
    E está na base de dados principal

  # ─────────────────────────────────────────────────────────────────────────────
  # GRUPO 1 — Cadastro Principal (Empresa, Cliente e Fornecedor)
  # ─────────────────────────────────────────────────────────────────────────────

  @validacao-ie @cadastro @cnpj-afetado @smoke
  Cenário: CT-001 — UF preenchida automaticamente após consulta de CNPJ no cadastro de Cliente
    Dado que o operador abre a tela de cadastro de "Cliente"
    Quando insere o CNPJ "13.271.511/0003-51" no campo de documento
    E o sistema realiza a consulta do CNPJ na Receita Federal
    Então o campo "Estado (UF)" do endereço deve ser preenchido automaticamente com o valor retornado pela Receita
    E o campo "Estado (UF)" não deve estar vazio ou em branco

  @validacao-ie @cadastro @cnpj-afetado @smoke
  Cenário: CT-002 — UF preenchida automaticamente após consulta de CNPJ no cadastro de Fornecedor
    Dado que o operador abre a tela de cadastro de "Fornecedor"
    Quando insere o CNPJ "13.271.511/0002-70" no campo de documento
    E o sistema realiza a consulta do CNPJ na Receita Federal
    Então o campo "Estado (UF)" do endereço deve ser preenchido automaticamente com o valor retornado pela Receita
    E o campo "Estado (UF)" não deve estar vazio ou em branco

  @validacao-ie @cadastro @cnpj-afetado @smoke
  Cenário: CT-003 — UF preenchida automaticamente após consulta de CNPJ no cadastro de Empresa
    Dado que o operador abre a tela de cadastro de "Empresa"
    Quando insere o CNPJ "64.016.186/0001-50" no campo de documento
    E o sistema realiza a consulta do CNPJ na Receita Federal
    Então o campo "Estado (UF)" do endereço deve ser preenchido automaticamente com o valor retornado pela Receita
    E o campo "Estado (UF)" não deve estar vazio ou em branco

  @validacao-ie @cadastro @cnpj-afetado
  Esquema do Cenário: CT-004 — Cadastro com IE salvo com sucesso usando CNPJs afetados em "<tela>"
    Dado que o operador abre a tela de cadastro de "<tela>"
    Quando insere o CNPJ "<cnpj>" no campo de documento
    E o sistema realiza a consulta do CNPJ na Receita Federal
    E o campo "Estado (UF)" é preenchido automaticamente com "<uf_esperada>"
    E o operador preenche a Inscrição Estadual "<ie_valida>" correspondente ao estado "<uf_esperada>"
    E clica em "Salvar"
    Então o sistema deve permitir o cadastro sem retornar erro de "IE incorreta"
    E o registro deve ser salvo com sucesso

    Exemplos:
      | tela       | cnpj                  | uf_esperada | ie_valida        |
      | Cliente    | 13.271.511/0003-51    | SP          | 111.111.111.111  |
      | Fornecedor | 13.271.511/0002-70    | SP          | 111.111.111.111  |
      | Cliente    | 64.016.186/0001-50    | SP          | 111.111.111.111  |

  # ─────────────────────────────────────────────────────────────────────────────
  # GRUPO 2 — Bloqueio quando UF está ausente
  # ─────────────────────────────────────────────────────────────────────────────

  @validacao-ie @bloqueio @uf-ausente
  Cenário: CT-005 — Sistema não deve permitir salvar cadastro com IE preenchida e UF ausente
    Dado que o operador abre a tela de cadastro de "Cliente"
    E insere um CNPJ válido no campo de documento
    Quando a consulta do CNPJ não retorna o campo Estado (UF) do endereço
    E o campo "Estado (UF)" permanece vazio após a consulta
    E o operador tenta preencher a Inscrição Estadual com um valor qualquer
    E clica em "Salvar"
    Então o sistema deve bloquear o salvamento do registro
    E deve exibir um alerta indicando que o endereço ou Estado (UF) precisa ser informado
    E o campo de IE deve ser marcado como inválido (vermelho)

  @validacao-ie @bloqueio @uf-ausente
  Cenário: CT-006 — Sistema permite salvar cadastro sem IE quando UF está ausente
    Dado que o operador abre a tela de cadastro de "Cliente"
    E insere um CNPJ válido no campo de documento
    Quando a consulta do CNPJ não retorna o campo Estado (UF) do endereço
    E o campo "Estado (UF)" permanece vazio após a consulta
    E o operador deixa o campo de Inscrição Estadual em branco
    E clica em "Salvar"
    Então o sistema deve permitir o salvamento sem IE
    E o registro deve ser criado com sucesso

  # ─────────────────────────────────────────────────────────────────────────────
  # GRUPO 3 — Edição de Cadastros Existentes
  # ─────────────────────────────────────────────────────────────────────────────

  @validacao-ie @edicao @regressao
  Cenário: CT-007 — Edição de campo não-fiscal não dispara falso-positivo de IE incorreta em Cliente
    Dado que existe um cadastro de "Cliente" com CNPJ "13.271.511/0003-51" já salvo com IE válida
    Quando o operador abre a tela de edição desse cadastro
    E altera apenas o campo "Telefone" com um novo número
    E clica em "Salvar"
    Então o sistema deve salvar a alteração com sucesso
    E o campo de Inscrição Estadual não deve ser marcado como inválido (vermelho)
    E não deve ser exibido erro de "IE incorreta"

  @validacao-ie @edicao @regressao
  Cenário: CT-008 — Edição de campo não-fiscal não dispara falso-positivo de IE incorreta em Fornecedor
    Dado que existe um cadastro de "Fornecedor" com CNPJ "13.271.511/0002-70" já salvo com IE válida
    Quando o operador abre a tela de edição desse cadastro
    E altera apenas o campo "Nome Fantasia" com um novo nome
    E clica em "Salvar"
    Então o sistema deve salvar a alteração com sucesso
    E o campo de Inscrição Estadual não deve ser marcado como inválido (vermelho)
    E não deve ser exibido erro de "IE incorreta"

  @validacao-ie @edicao @regressao
  Cenário: CT-009 — UF é mantida corretamente ao reabrir cadastro existente para edição
    Dado que existe um cadastro de "Cliente" com CNPJ "64.016.186/0001-50" já salvo com IE válida
    Quando o operador abre a tela de edição desse cadastro
    Então o campo "Estado (UF)" deve exibir o estado correto já salvo
    E a Inscrição Estadual deve ser exibida como válida (sem marcação de erro)

  # ─────────────────────────────────────────────────────────────────────────────
  # GRUPO 4 — Cadastro Rápido (Modal/Pop-up)
  # ─────────────────────────────────────────────────────────────────────────────

  @validacao-ie @cadastro-rapido @modal
  Cenário: CT-010 — UF carregada corretamente no fluxo de Cadastro Rápido de Cliente via modal
    Dado que o operador está na tela de "Vendas"
    E abre o modal de "Cadastro Rápido de Cliente"
    Quando insere o CNPJ "13.271.511/0003-51" no campo de documento do modal
    E o sistema realiza a consulta do CNPJ na Receita Federal
    Então o campo "Estado (UF)" dentro do modal deve ser preenchido automaticamente
    E o campo "Estado (UF)" não deve estar vazio ou em branco

  @validacao-ie @cadastro-rapido @modal
  Cenário: CT-011 — IE válida aceita no Cadastro Rápido com UF corretamente carregada
    Dado que o operador está na tela de "Vendas"
    E abre o modal de "Cadastro Rápido de Cliente"
    Quando insere o CNPJ "13.271.511/0003-51" no campo de documento do modal
    E o sistema realiza a consulta do CNPJ na Receita Federal
    E o campo "Estado (UF)" é preenchido automaticamente com o estado correto
    E o operador preenche a Inscrição Estadual válida correspondente ao estado carregado
    E clica em "Salvar" dentro do modal
    Então o sistema deve permitir o cadastro rápido sem retornar erro de "IE incorreta"
    E o modal deve fechar com sucesso após o salvamento

  @validacao-ie @cadastro-rapido @modal
  Cenário: CT-012 — Comportamento de UF no modal é idêntico ao da tela principal de cadastro
    Dado que o operador realizou um cadastro de Cliente com CNPJ "13.271.511/0003-51" pela tela principal
    E o sistema carregou a UF corretamente na tela principal
    Quando o operador abre o modal de "Cadastro Rápido de Cliente"
    E insere o mesmo CNPJ "13.271.511/0003-51"
    E o sistema realiza a consulta do CNPJ na Receita Federal
    Então o campo "Estado (UF)" no modal deve ser preenchido com o mesmo estado retornado na tela principal
    E o comportamento de validação da IE deve ser consistente entre modal e tela principal

  # ─────────────────────────────────────────────────────────────────────────────
  # GRUPO 5 — Multi-base (Filiais / Consistência entre bases)
  # ─────────────────────────────────────────────────────────────────────────────

  @validacao-ie @multi-base @filial
  Cenário: CT-013 — Regras de carregamento de UF funcionam corretamente na base secundária (filial)
    Dado que o operador está autenticado na base de dados secundária (filial)
    E abre a tela de cadastro de "Cliente"
    Quando insere o CNPJ "64.016.186/0001-50" no campo de documento
    E o sistema realiza a consulta do CNPJ na Receita Federal
    Então o campo "Estado (UF)" deve ser preenchido automaticamente com o valor correto
    E o campo "Estado (UF)" não deve estar vazio ou em branco
    E a validação de IE deve funcionar corretamente, sem retornar falso-positivo de IE incorreta

  @validacao-ie @multi-base @filial
  Cenário: CT-014 — CNPJ compartilhado com filial carrega registro existente sem criar duplicata
    Dado que o CNPJ "13.271.511/0003-51" já existe cadastrado como cliente na base principal
    Quando o operador na base secundária (filial) tenta cadastrar o mesmo CNPJ "13.271.511/0003-51"
    Então o sistema deve carregar o registro existente previamente cadastrado
    E não deve criar um novo registro duplicado para o mesmo CNPJ
    E os dados de endereço e UF devem ser exibidos corretamente a partir do registro existente

  @validacao-ie @multi-base @filial
  Cenário: CT-015 — Erro de IE não ocorre em nenhuma base ao usar CNPJs afetados
    Dado que o operador está autenticado na base de dados secundária (filial)
    E abre a tela de cadastro de "Fornecedor"
    Quando insere o CNPJ "13.271.511/0002-70" no campo de documento
    E o sistema realiza a consulta do CNPJ na Receita Federal
    E o campo "Estado (UF)" é preenchido automaticamente
    E o operador preenche a Inscrição Estadual válida correspondente
    E clica em "Salvar"
    Então o sistema deve permitir o cadastro sem retornar erro de "IE incorreta"
    E o comportamento deve ser idêntico ao da base principal

  # ─────────────────────────────────────────────────────────────────────────────
  # GRUPO 6 — Validações de IE por Estado (Regressão da Correção IV-18919)
  # ─────────────────────────────────────────────────────────────────────────────

  @validacao-ie @estados @regressao-ie
  Esquema do Cenário: CT-016 — Validação de IE aceita valor correto para o estado "<estado>"
    Dado que o operador está no cadastro de "Cliente" com o Estado (UF) definido como "<estado>"
    Quando preenche a Inscrição Estadual com o valor válido "<ie_valida>"
    Então o campo de IE não deve apresentar erro de validação
    E o campo não deve ficar marcado como inválido (vermelho)

    Exemplos:
      | estado | ie_valida        |
      | SP     | 111.111.111.111  |
      | RS     | 123/4567890      |
      | MS     | 280000001        |
      | TO     | 29010600         |
      | MT     | 0013000001-9     |
      | AL     | 240000070        |
      | GO     | 10.987.654-7     |

  @validacao-ie @estados @regressao-ie
  Esquema do Cenário: CT-017 — Validação de IE rejeita valor incorreto para o estado "<estado>"
    Dado que o operador está no cadastro de "Cliente" com o Estado (UF) definido como "<estado>"
    Quando preenche a Inscrição Estadual com o valor inválido "<ie_invalida>"
    Então o campo de IE deve apresentar erro de validação
    E o campo deve ficar marcado como inválido (vermelho)
    E o sistema não deve permitir salvar o registro

    Exemplos:
      | estado | ie_invalida |
      | SP     | 000.000.000.000 |
      | RS     | 999/9999999     |
      | MS     | 123456789       |
