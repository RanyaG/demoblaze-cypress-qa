import { fakerPT_BR as faker } from '@faker-js/faker';
import { carrinho, pedido } from '../support/pages';

const pedidoCompleto = () => ({
  nome: faker.person.fullName(),
  pais: 'Brasil',
  cidade: faker.location.city(),
  cartao: '4111111111111111',
  mes: '12',
  ano: '2030',
});

// US3 · Finalização de compra.
describe('Finalização de compra', () => {
  it('CT-1.4 | Compra com todos os dados válidos mostra a confirmação com o valor certo', () => {
    const dados = pedidoCompleto();

    cy.adicionarAoCarrinho('Samsung galaxy s6').then((preco) => {
      cy.abrirCarrinho();
      carrinho.linhas().should('have.length', 1);
      cy.totalDoCarrinho().should('eq', preco);

      cy.preencherPedido(dados);
      pedido.botaoComprar().click();

      pedido.tituloConfirmacao().should('have.text', 'Thank you for your purchase!');
      pedido.detalhesConfirmacao()
        .should('contain', `Amount: ${preco} USD`)
        .and('contain', `Name: ${dados.nome}`)
        .and('contain', `Card Number: ${dados.cartao}`);
    });
  });

  it('CT-4.6 | Sem nome e sem cartão, a compra é bloqueada com aviso', () => {
    cy.capturarAlertas();
    cy.adicionarAoCarrinho('Nokia lumia 1520');
    cy.abrirCarrinho();
    carrinho.linhas().should('have.length', 1);

    cy.preencherPedido({ pais: 'Brasil', cidade: 'Fortaleza' });
    pedido.botaoComprar().click();

    cy.alertaDeveConter('Please fill out Name and Creditcard');
    pedido.confirmacao().should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // Defeitos conhecidos. Os testes descrevem o comportamento ESPERADO e ficam
  // desativados até a correção, para não quebrar a CI. Para reativar, tire o ".skip".
  // ---------------------------------------------------------------------------

  it.skip('CT-1.5 | [BUG-001] Não permite finalizar compra com o carrinho vazio', () => {
    cy.abrirCarrinho();
    carrinho.linhas().should('have.length', 0);
    cy.preencherPedido(pedidoCompleto());
    pedido.botaoComprar().click();
    pedido.confirmacao().should('not.exist');
  });

  it.skip('CT-4.2 | [BUG-002] Exige país, cidade, mês e ano para finalizar a compra', () => {
    cy.adicionarAoCarrinho('Samsung galaxy s6');
    cy.abrirCarrinho();
    cy.preencherPedido({ nome: 'João Silva', cartao: '4111111111111111' });
    pedido.botaoComprar().click();
    pedido.confirmacao().should('not.exist');
  });

  // Classes de equivalência do número do cartão: só dígitos (válida) x letras e símbolos (inválida)
  it.skip('CT-4.4 | [BUG-003] Recusa cartão com letras e símbolos', () => {
    cy.adicionarAoCarrinho('Nokia lumia 1520');
    cy.abrirCarrinho();
    cy.preencherPedido({ ...pedidoCompleto(), cartao: '1234 ABCD !@#$' });
    pedido.botaoComprar().click();
    pedido.confirmacao().should('not.exist');
  });

  it.skip('CT-4.1 | [BUG-006] Exige login antes de finalizar a compra', () => {
    cy.adicionarAoCarrinho('MacBook Pro');
    cy.abrirCarrinho();
    cy.preencherPedido(pedidoCompleto());
    pedido.botaoComprar().click();
    pedido.confirmacao().should('not.exist');
  });
});
