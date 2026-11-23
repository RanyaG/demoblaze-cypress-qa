import { contato } from '../support/pages';

describe('Contato', () => {
  beforeEach(() => {
    cy.abrirLoja();
    cy.capturarAlertas();
    contato.abrir().click();
  });

  it('CT-4.7 | Envia uma mensagem de contato', () => {
    cy.preencher(contato.email, 'ranya.qa@exemplo.com');
    cy.preencher(contato.nome, 'Ranya Greco');
    cy.preencher(contato.mensagem, 'Gostaria de saber o prazo de entrega para Fortaleza.');
    contato.botaoEnviar().click();
    cy.alertaDeveConter('Thanks for the message');
  });

  // Análise de valor limite: o limite especificado é 500 caracteres (501 deve ser recusado).
  // Defeito conhecido: docs/bugs/BUG-007.md
  it.skip('CT-4.3 | [BUG-007] Recusa mensagem com mais de 500 caracteres', () => {
    cy.get(contato.mensagem).invoke('val', 'a'.repeat(501));
    contato.botaoEnviar().click();
    cy.get('@alerta').should('not.have.been.calledWithMatch', 'Thanks for the message');
  });
});
