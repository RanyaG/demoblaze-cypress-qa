# Defeitos encontrados

Encontrados nos testes de caixa-preta da loja. Os testes automatizados de cada defeito descrevem o comportamento **esperado** e ficam com `it.skip`, para a CI continuar verde. Quando o defeito for corrigido, basta remover o `.skip`.

| ID | Defeito | Prioridade | Caso de teste |
|---|---|---|---|
| [BUG-001](BUG-001.md) | Compra finalizada com o carrinho vazio | Alta | CT-1.5 / T03 |
| [BUG-002](BUG-002.md) | Compra finalizada só com nome e cartão | Alta | CT-4.2 / T07 |
| [BUG-003](BUG-003.md) | Cartão de crédito aceita letras e símbolos | Alta | CT-4.4 / T08 |
| [BUG-004](BUG-004.md) | Não há controle de estoque | Alta | CT-4.5 / T09 |
| [BUG-005](BUG-005.md) | Produto repetido vira uma nova linha no carrinho | Média | CT-2.4 / T04 |
| [BUG-006](BUG-006.md) | Compra permitida sem login | Média | CT-4.1 / T06 |
| [BUG-007](BUG-007.md) | Mensagem de contato sem limite de caracteres | Baixa | CT-4.3 / T10 |
| [BUG-008](BUG-008.md) | Preço do produto sem marcação semântica na listagem | Baixa | CT-1.1 / T01 |
| [RNI-001](RNI-001.md) | Não existe busca de produtos (requisito não implementado) | Alta | CT-1.2 / T02 |

**Resumo:** 9 incidentes registrados, 5 de prioridade alta (BUG-001, BUG-002, BUG-003, BUG-004 e RNI-001).
