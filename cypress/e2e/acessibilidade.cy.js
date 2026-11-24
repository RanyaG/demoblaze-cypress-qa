import { carrinho, conta, contato } from '../support/pages';

// Auditoria de acessibilidade com axe-core, seguindo a WCAG 2.2 (níveis A e AA).
// Cada teste abre uma tela ou um modal e registra as violações encontradas.
// O resultado aparece na aba "Summary" da execução no GitHub Actions e em
// cypress/acessibilidade/resumo.md. Metodologia e checklist manual: docs/acessibilidade.md
describe('Acessibilidade (WCAG 2.2 A/AA)', () => {
  context('Páginas', () => {
    it('AC-01 | Página inicial', () => {
      cy.abrirLoja();
      cy.auditarAcessibilidade('Página inicial');
    });

    it('AC-02 | Página de produto', () => {
      cy.abrirProduto('Samsung galaxy s6');
      cy.auditarAcessibilidade('Página de produto');
    });

    it('AC-03 | Carrinho', () => {
      cy.abrirCarrinho();
      cy.auditarAcessibilidade('Carrinho');
    });
  });

  context('Modais', () => {
    it('AC-04 | Modal de login', () => {
      cy.abrirLoja();
      conta.abrirLogin().click();
      cy.auditarAcessibilidade('Modal de login', '.modal.show');
    });

    it('AC-05 | Modal de cadastro', () => {
      cy.abrirLoja();
      conta.abrirCadastro().click();
      cy.auditarAcessibilidade('Modal de cadastro', '.modal.show');
    });

    it('AC-06 | Modal de contato', () => {
      cy.abrirLoja();
      contato.abrir().click();
      cy.auditarAcessibilidade('Modal de contato', '.modal.show');
    });

    it('AC-07 | Modal de finalização do pedido', () => {
      cy.abrirCarrinho();
      carrinho.botaoFazerPedido().click();
      cy.auditarAcessibilidade('Modal de finalização do pedido', '#orderModal');
    });
  });
});
