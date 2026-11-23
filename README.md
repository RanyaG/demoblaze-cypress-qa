# DemoBlaze | Testes de Caixa-Preta com Cypress

[![Testes](https://github.com/RanyaG/demoblaze-cypress-qa/actions/workflows/ci.yml/badge.svg)](https://github.com/RanyaG/demoblaze-cypress-qa/actions/workflows/ci.yml)
![Cypress](https://img.shields.io/badge/Cypress-16-69D3A7?logo=cypress&logoColor=white)

Projeto de QA para a loja virtual **[DemoBlaze](https://www.demoblaze.com)**: histórias de usuário, casos de teste com técnicas de caixa-preta, testes E2E automatizados com Cypress e bug reports com evidências.

> **English:** Black-box testing of the DemoBlaze e-commerce: user stories in Gherkin, 20 test cases designed with equivalence partitioning and boundary value analysis, Cypress E2E automation and 9 documented defects (5 high priority) with evidence.

## Em números

| | |
|---|---|
| **20** casos de teste escritos antes da execução | **18** testes E2E automatizados ativos |
| **9** incidentes registrados, **5** de prioridade alta | **7** testes que já descrevem o comportamento correto dos defeitos |

## Principais defeitos encontrados

| ID | Defeito | Prioridade |
|---|---|---|
| [BUG-001](docs/bugs/BUG-001.md) | Compra finalizada com o carrinho vazio ("Amount: 0 USD") | Alta |
| [BUG-002](docs/bugs/BUG-002.md) | Compra finalizada só com nome e cartão | Alta |
| [BUG-003](docs/bugs/BUG-003.md) | Cartão de crédito aceita letras e símbolos | Alta |
| [BUG-004](docs/bugs/BUG-004.md) | Não há controle de estoque | Alta |
| [BUG-005](docs/bugs/BUG-005.md) | Produto repetido vira uma nova linha no carrinho | Média |
| [BUG-006](docs/bugs/BUG-006.md) | Compra permitida sem login | Média |

[Ver todos os 9 incidentes](docs/bugs/README.md), cada um com passos para reproduzir, resultado esperado e obtido e sugestão de correção.

## Como os testes foram pensados

1. **Histórias de usuário** com cenários em Gherkin, critérios de aceitação e regras de negócio ([historias-de-usuario.md](docs/historias-de-usuario.md)).
2. **Casos de teste** derivados das histórias com **classes de equivalência** e **análise de valor limite** ([casos-de-teste.md](docs/casos-de-teste.md)).
3. **Automação** dos fluxos principais no Cypress.
4. **Registro de incidentes** com prioridade e evidência, e um **relatório resumo** com os indicadores da execução ([plano-de-teste.md](docs/plano-de-teste.md)).

## Detalhes técnicos

- **Espera pela API, não por tempo fixo:** cada fluxo espera a chamada certa (`cy.intercept`), o que deixa os testes rápidos e estáveis num site que carrega tudo de forma assíncrona.
- **Alertas do navegador testáveis:** a loja responde com `window.alert`, que o teste captura com um stub para verificar a mensagem.
- **Seletores num lugar só:** os seletores ficam em [`cypress/support/pages.js`](cypress/support/pages.js), no padrão Page Object.
- **Testes independentes:** cada teste cria os próprios dados (usuários únicos, nomes com Faker) e não depende de outro.
- **Defeitos como testes:** o comportamento esperado de cada bug já está automatizado com `it.skip`. Quando o defeito for corrigido, é só reativar.

## Estrutura

```
├── .github/workflows/ci.yml     # lint e testes E2E a cada push, com relatório
├── cypress/
│   ├── e2e/                     # catálogo, carrinho, compra, conta e contato
│   └── support/
│       ├── commands.js          # comandos de alto nível (adicionar ao carrinho, finalizar pedido...)
│       └── pages.js             # seletores (Page Objects)
└── docs/                        # histórias, casos de teste, plano, relatório e bugs
```

## Como rodar

```bash
npm ci
npm test          # roda tudo no Chrome
npm run cy:open   # modo interativo
npm run lint
```

## Autora

**Ranya Greco**, QA Engineer · Engenheira de Software (UFC) e mestranda em Ciência da Computação (UFCG).

[GitHub](https://github.com/RanyaG) · ranyagreco@gmail.com
