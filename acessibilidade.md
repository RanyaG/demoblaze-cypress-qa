# Testes de Acessibilidade

Auditoria de acessibilidade do DemoBlaze com base na **WCAG 2.2** (Web Content Accessibility Guidelines), níveis **A** e **AA**, que é o nível exigido pela maioria das normas e leis de acessibilidade, como a Lei Brasileira de Inclusão (Lei nº 13.146/2015) e o eMAG.

O objetivo é verificar se pessoas com deficiência conseguem usar a loja: quem navega só pelo teclado, quem usa leitor de tela e quem tem baixa visão ou daltonismo.

## Estratégia

A auditoria combina duas frentes, porque ferramentas automáticas encontram só uma parte dos problemas de acessibilidade:

| Frente | Como | O que encontra |
|---|---|---|
| **Automática** | [axe-core](https://github.com/dequelabs/axe-core) rodando dentro dos testes Cypress | Imagens sem texto alternativo, campos sem rótulo, contraste insuficiente, botões e links sem nome, estrutura de cabeçalhos, idioma da página, tamanho de alvos de toque |
| **Manual** | Checklist abaixo, com teclado, leitor de tela (NVDA) e zoom | Ordem de foco, foco visível, armadilhas de teclado, se os anúncios do leitor de tela fazem sentido, uso com zoom |

## Escopo da auditoria automática

| ID | Tela | Contexto auditado |
|---|---|---|
| AC-01 | Página inicial | Página inteira (menu, carrossel, categorias, cards de produto) |
| AC-02 | Página de produto | Página inteira |
| AC-03 | Carrinho | Página inteira |
| AC-04 | Modal de login | Só o modal aberto |
| AC-05 | Modal de cadastro | Só o modal aberto |
| AC-06 | Modal de contato | Só o modal aberto |
| AC-07 | Modal de finalização do pedido | Só o modal aberto |

Os modais são auditados depois do fim da animação de abertura, para o contraste não ser medido no meio do efeito de transição.

## Como funciona

- O comando `cy.auditarAcessibilidade()` ([commands.js](../cypress/support/commands.js)) injeta o axe-core na página e roda as regras marcadas como WCAG 2.0, 2.1 e 2.2, níveis A e AA.
- Cada violação é registrada com a regra, o impacto (crítico, sério, moderado ou menor), o critério WCAG correspondente e os elementos afetados.
- Os testes **não falham** quando encontram violações: a suíte funciona como auditoria. Os problemas confirmados viram bug reports, como os defeitos funcionais.
- A cada execução na CI, o resumo é publicado na aba **Summary** do GitHub Actions. O detalhe completo, com o HTML de cada elemento afetado, fica no artefato `relatorio-e2e` (`acessibilidade/resultado.json`).

Para rodar só a auditoria:

```bash
npm run test:a11y
```

O resumo é gerado em `cypress/acessibilidade/resumo.md`.

## Checklist manual

| # | Verificação | Critério WCAG | Como testar |
|---|---|---|---|
| M-01 | Todas as funções podem ser usadas só com o teclado | 2.1.1 | Navegar com `Tab`, `Shift+Tab`, `Enter` e `Esc`, sem mouse |
| M-02 | O foco não fica preso em nenhum componente | 2.1.2 | Abrir e fechar cada modal só pelo teclado |
| M-03 | A ordem do foco segue a ordem lógica da tela | 2.4.3 | Percorrer a página com `Tab` |
| M-04 | O elemento com foco é sempre visível | 2.4.7 | Observar o indicador de foco em links, botões e campos |
| M-05 | Ao abrir um modal, o foco vai para dentro dele | 2.4.3 | Abrir login, cadastro, contato e pedido pelo teclado |
| M-06 | O leitor de tela anuncia o nome e a função de cada controle | 4.1.2 | Navegar com o NVDA (Windows) |
| M-07 | As mensagens de sucesso e erro são anunciadas | 4.1.3 | Fazer login inválido e uma compra com o NVDA ligado |
| M-08 | A página continua utilizável com zoom de 200% | 1.4.4 | Zoom do navegador em 200% |
| M-09 | O conteúdo se adapta a 320 px de largura sem rolagem horizontal | 1.4.10 | Janela estreita ou ferramenta de dispositivo do Chrome |
| M-10 | Nenhuma informação depende só de cor | 1.4.1 | Ver a tela em escala de cinza |

## Ferramentas

- **axe-core** (automação nos testes Cypress)
- **Lighthouse** e **axe DevTools** (verificação pontual no navegador)
- **NVDA** (leitor de tela)
- **Teclado** e **zoom do navegador**

## Resultados

Auditoria automática executada no GitHub Actions em novembro de 2026:

| Tela | Violações | Elementos | Problemas |
|---|---|---|---|
| Página inicial | 3 | 29 | A11Y-001, A11Y-002, A11Y-004 |
| Página de produto | 3 | 5 | A11Y-001, A11Y-002, A11Y-004 |
| Carrinho | 2 | 3 | A11Y-001, A11Y-004 |
| Modal de login | 2 | 5 | A11Y-003, A11Y-004 |
| Modal de cadastro | 1 | 3 | A11Y-004 |
| Modal de contato | 2 | 5 | A11Y-003, A11Y-004 |
| Modal de finalização do pedido | 0 | 0 | - |
| **Total** | **13** | **50** | 5 críticas e 8 sérias |

Os problemas foram agrupados por causa em 4 bug reports, em [docs/bugs](bugs/README.md#acessibilidade-wcag-22), com o critério WCAG violado, o impacto para o usuário e a sugestão de correção. O resultado de cada nova execução aparece na aba **Summary** do [GitHub Actions](https://github.com/RanyaG/demoblaze-cypress-qa/actions).

O checklist manual ainda não foi executado e será registrado aqui.
