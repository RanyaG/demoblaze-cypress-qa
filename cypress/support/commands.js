import { home, produto, carrinho, pedido, conta } from './pages';

/**
 * O DemoBlaze responde quase tudo com window.alert().
 * Este comando troca o alerta por um stub, para o teste ler a mensagem sem travar.
 * Uso: cy.capturarAlertas() antes da ação; depois cy.alertaDeveConter('texto').
 */
Cypress.Commands.add('capturarAlertas', () => {
  const stub = cy.stub().as('alerta');
  cy.on('window:alert', stub);
});

Cypress.Commands.add('alertaDeveConter', (texto) => {
  cy.get('@alerta').should('have.been.calledWithMatch', texto);
});

/** Digita e confere o valor: os modais do DemoBlaze às vezes perdem caracteres durante a animação. */
Cypress.Commands.add('preencher', (seletor, valor) => {
  cy.get(seletor).should('be.visible').clear();
  cy.get(seletor).type(valor, { delay: 10 });
  cy.get(seletor).should('have.value', valor);
});

/** Converte "$360 *includes tax" em 360. */
const paraNumero = (texto) => Number(texto.replace(/[^0-9]/g, ''));

Cypress.Commands.add('abrirLoja', () => {
  cy.visit('/');
  cy.wait('@produtos');
  home.cards().should('have.length.greaterThan', 0);
});

Cypress.Commands.add('abrirProduto', (nome) => {
  cy.abrirLoja();
  home.tituloDoCard(nome).click();
  produto.nome().should('have.text', nome);
});

/** Abre o produto, adiciona ao carrinho e devolve o preço lido na página. */
Cypress.Commands.add('adicionarAoCarrinho', (nome) => {
  cy.abrirProduto(nome);
  produto.botaoAdicionar().click();
  cy.wait('@adicionar');
  return produto.preco().invoke('text').then(paraNumero);
});

Cypress.Commands.add('abrirCarrinho', () => {
  cy.visit('/cart.html');
  cy.wait('@carrinho');
});

Cypress.Commands.add('totalDoCarrinho', () => carrinho.total().invoke('text').then(paraNumero));

Cypress.Commands.add('preencherPedido', (dados) => {
  carrinho.botaoFazerPedido().click();
  pedido.modal().should('be.visible');
  Object.entries(dados).forEach(([campo, valor]) => {
    if (valor) cy.preencher(pedido.campos[campo], valor);
  });
});

Cypress.Commands.add('cadastrarPelaTela', (usuario, senha) => {
  conta.abrirCadastro().click();
  cy.preencher(conta.usuarioCadastro, usuario);
  cy.preencher(conta.senhaCadastro, senha);
  conta.botaoCadastrar().click();
});

Cypress.Commands.add('entrarPelaTela', (usuario, senha) => {
  conta.abrirLogin().click();
  if (usuario) cy.preencher(conta.usuarioLogin, usuario);
  if (senha) cy.preencher(conta.senhaLogin, senha);
  conta.botaoEntrar().click();
});
