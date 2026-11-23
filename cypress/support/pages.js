// Seletores centralizados (Page Objects simples): se a tela mudar, o ajuste é feito num lugar só.

export const home = {
  categoria: (nome) => cy.contains('.list-group-item', nome),
  cards: () => cy.get('#tbodyid .card'),
  tituloDoCard: (nome) => cy.contains('#tbodyid .card-title a', nome),
};

export const produto = {
  nome: () => cy.get('.name'),
  preco: () => cy.get('.price-container'),
  descricao: () => cy.get('#more-information p'),
  botaoAdicionar: () => cy.contains('a', 'Add to cart'),
};

export const carrinho = {
  linhas: () => cy.get('#tbodyid tr'),
  total: () => cy.get('#totalp'),
  botaoFazerPedido: () => cy.contains('button', 'Place Order'),
};

export const pedido = {
  modal: () => cy.get('#orderModal'),
  campos: { nome: '#name', pais: '#country', cidade: '#city', cartao: '#card', mes: '#month', ano: '#year' },
  botaoComprar: () => cy.contains('#orderModal button', 'Purchase'),
  confirmacao: () => cy.get('.sweet-alert'),
  tituloConfirmacao: () => cy.get('.sweet-alert h2'),
  detalhesConfirmacao: () => cy.get('.sweet-alert p.lead'),
};

export const conta = {
  abrirCadastro: () => cy.get('#signin2'),
  usuarioCadastro: '#sign-username',
  senhaCadastro: '#sign-password',
  botaoCadastrar: () => cy.contains('.modal.show button', 'Sign up'),
  abrirLogin: () => cy.get('#login2'),
  usuarioLogin: '#loginusername',
  senhaLogin: '#loginpassword',
  botaoEntrar: () => cy.contains('.modal.show button', 'Log in'),
  boasVindas: () => cy.get('#nameofuser'),
  sair: () => cy.get('#logout2'),
};

export const contato = {
  abrir: () => cy.contains('a.nav-link', 'Contact'),
  email: '#recipient-email',
  nome: '#recipient-name',
  mensagem: '#message-text',
  botaoEnviar: () => cy.contains('.modal.show button', 'Send message'),
};
