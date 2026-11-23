import { home, produto } from '../support/pages';

// US1 · Catálogo: o cliente navega pelas categorias e vê os detalhes de cada produto.
describe('Catálogo de produtos', () => {
  beforeEach(() => {
    cy.abrirLoja();
  });

  it('CT-1.0 | A página inicial lista produtos com nome, preço e imagem', () => {
    home.cards().each(($card) => {
      cy.wrap($card).find('.card-title a').invoke('text').should('not.be.empty');
      cy.wrap($card).find('h5').invoke('text').should('match', /^\$\d+/);
      cy.wrap($card).find('img').should('have.attr', 'src').and('not.be.empty');
    });
  });

  // Particionamento em classes de equivalência: cada categoria válida é uma classe
  const categorias = [
    { id: 'CT-1.1a', nome: 'Phones', esperados: ['Samsung galaxy s6', 'Nokia lumia 1520', 'Nexus 6'], ausente: 'MacBook air' },
    { id: 'CT-1.1b', nome: 'Laptops', esperados: ['Sony vaio i5', 'MacBook air', 'MacBook Pro'], ausente: 'Samsung galaxy s6' },
    { id: 'CT-1.1c', nome: 'Monitors', esperados: ['Apple monitor 24', 'ASUS Full HD'], ausente: 'Nexus 6' },
  ];

  categorias.forEach(({ id, nome, esperados, ausente }) => {
    it(`${id} | A categoria "${nome}" mostra só os produtos dela`, () => {
      home.categoria(nome).click();
      cy.wait('@categoria');
      esperados.forEach((produtoEsperado) => home.tituloDoCard(produtoEsperado).should('be.visible'));
      cy.contains('#tbodyid', ausente).should('not.exist');
    });
  });

  it('CT-1.6 | A página do produto mostra nome, preço, descrição e o botão de compra', () => {
    home.tituloDoCard('Samsung galaxy s6').click();
    produto.nome().should('have.text', 'Samsung galaxy s6');
    produto.preco().invoke('text').should('match', /^\$\d+/);
    produto.descricao().invoke('text').should('not.be.empty');
    produto.botaoAdicionar().should('be.visible');
  });

  // Requisito não implementado: docs/bugs/RNI-001.md
  it.skip('CT-1.2 | [RNI-001] Pesquisa um produto pelo nome', () => {
    cy.get('#search_box').type('Phone{enter}');
    home.tituloDoCard('Samsung galaxy s6').should('be.visible');
  });
});
