import { carrinho } from '../support/pages';

// US2 · Carrinho: o cliente adiciona e remove produtos e acompanha o total.
describe('Carrinho de compras', () => {
  it('CT-2.1 | Adiciona um produto e mostra o aviso "Product added"', () => {
    cy.capturarAlertas();
    cy.adicionarAoCarrinho('Samsung galaxy s6').then((preco) => {
      cy.alertaDeveConter('Product added');
      cy.abrirCarrinho();
      carrinho.linhas().should('have.length', 1).and('contain', 'Samsung galaxy s6');
      cy.totalDoCarrinho().should('eq', preco);
    });
  });

  it('CT-2.3 | Visitante sem login também consegue adicionar ao carrinho', () => {
    cy.adicionarAoCarrinho('ASUS Full HD');
    cy.abrirCarrinho();
    carrinho.linhas().should('contain', 'ASUS Full HD');
  });

  it('CT-2.6 | O total é a soma dos preços dos produtos', () => {
    cy.adicionarAoCarrinho('Samsung galaxy s6').then((precoCelular) => {
      cy.adicionarAoCarrinho('Sony vaio i5').then((precoNotebook) => {
        cy.abrirCarrinho();
        carrinho.linhas().should('have.length', 2);
        cy.totalDoCarrinho().should('eq', precoCelular + precoNotebook);
      });
    });
  });

  it('CT-2.5 | Remove um produto e atualiza o total', () => {
    cy.adicionarAoCarrinho('MacBook Pro');
    cy.adicionarAoCarrinho('Nexus 6').then((precoNexus) => {
      cy.abrirCarrinho();
      carrinho.linhas().should('have.length', 2);

      carrinho.linhas().contains('tr', 'MacBook Pro').contains('a', 'Delete').click();
      cy.wait('@remover');

      carrinho.linhas().should('have.length', 1).and('not.contain', 'MacBook Pro');
      cy.totalDoCarrinho().should('eq', precoNexus);
    });
  });

  // Defeito conhecido: docs/bugs/BUG-005.md
  it.skip('CT-2.4 | [BUG-005] Adicionar o mesmo produto duas vezes soma a quantidade numa linha só', () => {
    cy.adicionarAoCarrinho('Samsung galaxy s6');
    cy.adicionarAoCarrinho('Samsung galaxy s6');
    cy.abrirCarrinho();
    carrinho.linhas().should('have.length', 1);
  });
});
