# Histórias de Usuário

As histórias foram escritas antes dos testes, como especificação do comportamento esperado da loja. Os casos de teste derivam dos cenários abaixo.

## US1: Navegar pelo catálogo

**Como** cliente, **quero** ver os produtos por categoria e pesquisar pelo nome, **para** encontrar rápido o que procuro.

```gherkin
# language: pt
Funcionalidade: Catálogo de produtos

  Cenário: Visualizar produtos por categoria
    Dado que estou na página inicial
    Quando eu seleciono a categoria "Laptops"
    Então devo ver apenas laptops
    E cada produto deve mostrar nome, imagem, preço e descrição

  Cenário: Pesquisar produtos
    Dado que estou na página inicial
    Quando eu pesquiso por "Phone"
    Então devo ver os produtos relacionados ao termo

  Cenário: Pesquisar produto inexistente
    Quando eu pesquiso por "Samsung Z Flip"
    Então devo ver a mensagem "No products found matching your search."
```

**Critérios de aceitação:** filtro por categoria no menu lateral; busca por nome; mensagem clara quando não houver resultado.

## US2: Gerenciar o carrinho

**Como** cliente, **quero** adicionar e remover produtos do carrinho, **para** montar meu pedido.

```gherkin
# language: pt
Funcionalidade: Carrinho

  Cenário: Adicionar produto ao carrinho com sucesso
    Dado que estou na página do produto "MacBook air"
    Quando eu clico em "Add to cart"
    Então devo ver o aviso "Product added"
    E o produto deve aparecer no carrinho com o total atualizado

  Cenário: Adicionar produto sem estar logado
    Dado que não fiz login
    Quando eu adiciono um produto ao carrinho
    Então o produto deve ser adicionado
    E devo ser avisado de que o login será necessário para finalizar a compra

  Cenário: Adicionar produto já presente no carrinho
    Dado que "Samsung galaxy s6" já está no carrinho
    Quando eu adiciono o mesmo produto de novo
    Então a quantidade dele deve passar para 2, na mesma linha
```

**Regras de negócio:** não é possível adicionar produto sem estoque; o total é a soma dos itens.

## US3: Finalizar a compra

**Como** cliente, **quero** informar meus dados e concluir o pedido, **para** receber os produtos.

```gherkin
# language: pt
Funcionalidade: Finalização de compra

  Cenário: Finalizar compra com sucesso
    Dado que tenho produtos no carrinho
    Quando eu preencho todos os dados de pagamento e entrega
    E clico em "Purchase"
    Então devo ver "Thank you for your purchase!" com o valor, o nome e o cartão

  Cenário: Validação dos dados de pagamento
    Quando eu informo um cartão com letras ou símbolos
    Então a compra deve ser recusada com a mensagem "O campo do cartão deve conter apenas números"

  Cenário: Campos obrigatórios
    Quando eu preencho apenas nome e cartão
    Então a compra deve ser recusada com a mensagem "Preencha todos os campos obrigatórios"
```

**Regras de negócio:** carrinho vazio não pode ser finalizado; a compra exige login; todos os campos de entrega e pagamento são obrigatórios.

## US4 a US6: avaliações, estoque e acompanhamento de pedidos

Também foram especificadas histórias para **avaliar produtos comprados** (US4), **controlar o estoque** com alertas de nível crítico (US5) e **acompanhar o status do pedido** (US6). O DemoBlaze não implementa essas funcionalidades. Os casos correspondentes ficaram documentados em [casos-de-teste.md](casos-de-teste.md), e a falta de controle de estoque virou o [BUG-004](bugs/BUG-004.md).
