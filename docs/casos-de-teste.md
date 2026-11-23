# Casos de Teste

Os 20 casos foram escritos a partir das histórias de usuário (veja [historias-de-usuario.md](historias-de-usuario.md)) antes da execução, com técnicas de **caixa-preta**: particionamento em classes de equivalência e análise de valor limite. A coluna "Automação" aponta o teste em `cypress/e2e`.

**Resultado:** ✅ passou · ❌ falhou, com defeito registrado · ⚠️ requisito não existe no sistema · — não executado

## Catálogo e compra (CT-1.x)

| ID | Caso de teste | Entrada | Resultado esperado | Resultado | Automação |
|---|---|---|---|---|---|
| CT-1.1 | Visualizar produtos por categoria | Categoria "Laptops" | Lista só de laptops, com nome, imagem, preço e descrição | ✅ ([BUG-008](bugs/BUG-008.md), observação de HTML) | `catalogo.cy.js` |
| CT-1.2 | Pesquisar produtos | Termo "Phone" | Lista Samsung Galaxy S6, Nokia Lumia 1520, Nexus 6 | ⚠️ [RNI-001](bugs/RNI-001.md) | `catalogo.cy.js` (skip) |
| CT-1.3 | Pesquisar produto inexistente | Termo "Samsung Z Flip" | Mensagem "No products found matching your search" | ⚠️ [RNI-001](bugs/RNI-001.md) | — |
| CT-1.4 | Finalizar compra com sucesso | Carrinho com produto e todos os dados válidos | "Thank you for your purchase!" com valor, nome e cartão | ✅ | `compra.cy.js` |
| CT-1.5 | Finalizar compra com carrinho vazio | Carrinho vazio, nome e cartão | Erro "Adicione itens ao carrinho antes de finalizar a compra" | ❌ [BUG-001](bugs/BUG-001.md) | `compra.cy.js` (skip) |

## Carrinho (CT-2.x)

| ID | Caso de teste | Entrada | Resultado esperado | Resultado | Automação |
|---|---|---|---|---|---|
| CT-2.1 | Adicionar produto ao carrinho | MacBook air / Samsung galaxy s6 | Aviso "Product added" e produto no carrinho com o total certo | ✅ | `carrinho.cy.js` |
| CT-2.2 | Adicionar produto fora de estoque | Sony Xperia Z5 com 0 unidades | Erro de estoque e sugestão de alternativas | ⚠️ o sistema não tem estoque ([BUG-004](bugs/BUG-004.md)) | — |
| CT-2.3 | Adicionar ao carrinho sem login | ASUS Full HD | Produto adicionado; aviso de login para finalizar | ✅ adiciona (sem o aviso de login, ver [BUG-006](bugs/BUG-006.md)) | `carrinho.cy.js` |
| CT-2.4 | Adicionar produto já presente no carrinho | Samsung galaxy s6, 2 vezes | Uma linha com quantidade 2 | ❌ [BUG-005](bugs/BUG-005.md) | `carrinho.cy.js` (skip) |
| CT-2.5 | Remover produto do carrinho | MacBook Pro | Produto removido e total atualizado | ✅ | `carrinho.cy.js` |

## Avaliações (CT-3.x)

Os casos 3.1 a 3.5 (avaliar produto comprado, impedir avaliação sem compra, bloquear conteúdo impróprio, listar avaliações e impedir comentário em branco) cobrem a história **US4**. O DemoBlaze **não tem** a funcionalidade de avaliações, então os casos ficaram documentados como requisito não implementado e não foram automatizados.

## Regras de compra e contato (CT-4.x)

| ID | Caso de teste | Entrada | Resultado esperado | Resultado | Automação |
|---|---|---|---|---|---|
| CT-4.1 | Exigir login para comprar | Visitante sem login | Pedido de login antes de concluir | ❌ [BUG-006](bugs/BUG-006.md) | `compra.cy.js` (skip) |
| CT-4.2 | Comprar só com nome e cartão | Nome "João Silva", cartão | "Preencha todos os campos obrigatórios" | ❌ [BUG-002](bugs/BUG-002.md) | `compra.cy.js` (skip) |
| CT-4.3 | Limite de caracteres no contato | Mensagem com 501 caracteres | "A mensagem não pode exceder 500 caracteres" | ❌ [BUG-007](bugs/BUG-007.md) | `contato.cy.js` (skip) |
| CT-4.4 | Cartão com letras e símbolos | "1234 ABCD !@#$" | "O campo do cartão deve conter apenas números" | ❌ [BUG-003](bugs/BUG-003.md) | `compra.cy.js` (skip) |
| CT-4.5 | Estoque em compras simultâneas | 2 usuários, 1 unidade em estoque | Só a primeira compra aprovada | ❌ [BUG-004](bugs/BUG-004.md) | — |

## Casos adicionais

| ID | Caso de teste | Automação |
|---|---|---|
| CT-1.0 | A página inicial lista produtos com nome, preço e imagem | `catalogo.cy.js` |
| CT-1.6 | A página do produto mostra nome, preço, descrição e botão de compra | `catalogo.cy.js` |
| CT-2.6 | O total do carrinho é a soma dos preços | `carrinho.cy.js` |
| CT-4.6 | Sem nome e sem cartão, a compra é bloqueada | `compra.cy.js` |
| CT-4.7 | Enviar mensagem de contato | `contato.cy.js` |
| CT-5.1 a 5.6 | Cadastro, usuário duplicado, login e logout, senha errada, usuário inexistente e campos em branco | `conta.cy.js` |

---

## Análise de valor limite

| Caso | Condição | Entrada válida | Entrada inválida |
|---|---|---|---|
| T03 | Itens no carrinho para comprar | N ≥ 1 | 0 |
| T04 | Quantidade ao adicionar produto repetido | Quantidade final = inicial + 1 | Quantidade final igual à inicial |
| T08 | Formato do número do cartão | Só dígitos, ex.: "1234567890123456" | Letras e símbolos, ex.: "1234 ABCD !@#$" |
| T09 | Estoque | 1 unidade, 1 compra aprovada | 2 compras aprovadas com estoque insuficiente |
| T10 | Tamanho da mensagem de contato | Até 500 caracteres | 501 ou mais |

## Particionamento em classes de equivalência

| Caso | Condição | Classes válidas | Classes inválidas |
|---|---|---|---|
| T01 | Categoria | Phones, Laptops, Monitors | Categoria inexistente |
| T02 | Termo de busca | "Phone", "Laptop", "Monitor" | "XYZ123", "carregador" |
| T05 | Dados de pagamento | Todos preenchidos e cartão válido | Campos ausentes, incorretos ou cartão inválido |
| T06 | Usuário | Autenticado | Não autenticado |
| T07 | Campos obrigatórios | Todos preenchidos | Só nome e cartão |
