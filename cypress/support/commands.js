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

/**
 * Preenche um campo e confere o valor.
 * Os modais do DemoBlaze roubam o foco durante a animação e perdem letras digitadas
 * (ex.: "Dr. João Silva" virava "Dr. João Sil"). Por isso o valor é definido direto no campo.
 */
Cypress.Commands.add('preencher', (seletor, valor) => {
  cy.get(seletor).should('be.visible').invoke('val', valor).trigger('input');
  cy.get(seletor).should('have.value', valor);
});

/** Converte "$360 *includes tax" em 360. */
const paraNumero = (texto) => Number(texto.replace(/[^0-9]/g, ''));

Cypress.Commands.add('abrirLoja', () => {
  cy.visit('/');
  cy.wait('@produtos');
  home.cards().should('have.length.greaterThan', 0);
});

// A página inicial mostra só os 9 primeiros produtos; os demais ficam na página 2.
// Entrar pela categoria garante que o produto esteja na tela.
const CATEGORIA_DO_PRODUTO = {
  'Samsung galaxy s6': 'Phones',
  'Nokia lumia 1520': 'Phones',
  'Nexus 6': 'Phones',
  'Sony vaio i5': 'Laptops',
  'MacBook air': 'Laptops',
  'MacBook Pro': 'Laptops',
  'Apple monitor 24': 'Monitors',
  'ASUS Full HD': 'Monitors',
};

Cypress.Commands.add('abrirProduto', (nome) => {
  cy.abrirLoja();
  const categoria = CATEGORIA_DO_PRODUTO[nome];
  if (categoria) {
    home.categoria(categoria).click();
    cy.wait('@categoria');
  }
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
