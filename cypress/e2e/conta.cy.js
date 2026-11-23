import { conta } from '../support/pages';

const novoUsuario = () => `qa_ranya_${Date.now()}`;
const SENHA = 'Senha@123';

// Cadastro e login. Cada teste cria o próprio usuário, então nenhum depende de outro.
describe('Cadastro e login', () => {
  beforeEach(() => {
    cy.abrirLoja();
    cy.capturarAlertas();
  });

  it('CT-5.1 | Cadastra um usuário novo', () => {
    cy.cadastrarPelaTela(novoUsuario(), SENHA);
    cy.alertaDeveConter('Sign up successful');
  });

  it('CT-5.2 | Não cadastra um usuário que já existe', () => {
    const usuario = novoUsuario();
    cy.cadastrarPelaTela(usuario, SENHA);
    cy.alertaDeveConter('Sign up successful');

    cy.reload();
    cy.cadastrarPelaTela(usuario, SENHA);
    cy.alertaDeveConter('This user already exist');
  });

  it('CT-5.3 | Faz login, vê o nome na barra e faz logout', () => {
    const usuario = novoUsuario();
    cy.cadastrarPelaTela(usuario, SENHA);
    cy.alertaDeveConter('Sign up successful');

    cy.reload();
    cy.entrarPelaTela(usuario, SENHA);
    conta.boasVindas().should('have.text', `Welcome ${usuario}`);

    conta.sair().click();
    conta.abrirLogin().should('be.visible');
    conta.boasVindas().should('not.be.visible');
  });

  // Tabela de decisão do login: usuário existe? x senha correta?
  it('CT-5.4 | Recusa login com senha errada', () => {
    const usuario = novoUsuario();
    cy.cadastrarPelaTela(usuario, SENHA);
    cy.alertaDeveConter('Sign up successful');

    cy.reload();
    cy.entrarPelaTela(usuario, 'senhaErrada');
    cy.alertaDeveConter('Wrong password');
  });

  it('CT-5.5 | Recusa login de usuário que não existe', () => {
    cy.entrarPelaTela(`naoexiste_${Date.now()}`, SENHA);
    cy.alertaDeveConter('User does not exist');
  });

  it('CT-5.6 | Avisa quando usuário e senha estão em branco', () => {
    cy.entrarPelaTela();
    cy.alertaDeveConter('Please fill out Username and Password');
  });
});
