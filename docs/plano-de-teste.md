# Plano de Teste

## Plano

| | |
|---|---|
| Sistema | [DemoBlaze](https://www.demoblaze.com), loja virtual de demonstração |
| Tipo de teste | Caixa-preta, funcional, guiado por especificação (histórias de usuário) |
| Técnicas | Particionamento em classes de equivalência e análise de valor limite |
| Ferramentas | Cypress (automação), JavaScript, planilhas para análise |
| Escopo | Catálogo, carrinho, finalização de compra, cadastro e login, contato |
| Fora do escopo | Desempenho, segurança e compatibilidade entre navegadores |

**Abordagem.** Primeiro, as histórias de usuário foram escritas com critérios de aceitação e regras de negócio. Depois, os casos de teste foram derivados delas, antes da execução. Os casos mais críticos foram automatizados no Cypress, e cada falha foi registrada como incidente, com prioridade e evidência.

**Critério de saída.** Todos os casos executados, e todas as falhas registradas com passos para reproduzir e evidência.

## Resultado

| Indicador | Valor |
|---|---|
| Casos de teste especificados | 20 |
| Incidentes registrados | 9, sendo 5 de prioridade alta |

**Conclusão.** As falhas concentram-se na **finalização de compra**: o sistema aceita pedido com carrinho vazio, sem login, com campos em branco e com cartão inválido, e não controla estoque. Esses são os pontos de maior risco para o negócio, porque geram pedidos que não podem ser pagos ou entregues.
