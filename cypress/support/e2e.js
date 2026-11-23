import 'cypress-mochawesome-reporter/register';
import './commands';

const API = 'https://api.demoblaze.com';

// Toda a loja depende destas chamadas. Esperar por elas, em vez de usar cy.wait(ms),
// deixa os testes mais rápidos e menos instáveis.
beforeEach(() => {
  cy.intercept('GET', `${API}/entries`).as('produtos');
  cy.intercept('POST', `${API}/bycat`).as('categoria');
  cy.intercept('POST', `${API}/addtocart`).as('adicionar');
  cy.intercept('POST', `${API}/viewcart`).as('carrinho');
  cy.intercept('POST', `${API}/deleteitem`).as('remover');
});
