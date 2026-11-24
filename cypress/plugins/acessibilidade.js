// Tarefas do Node para a auditoria de acessibilidade (axe-core).
// Guardam o resultado de cada página e geram um resumo em Markdown,
// que a CI publica na aba "Summary" do GitHub Actions.
const fs = require('fs');
const path = require('path');

const PASTA = path.join('cypress', 'acessibilidade');

const IMPACTO = {
  critical: 'Crítico',
  serious: 'Sério',
  moderate: 'Moderado',
  minor: 'Menor',
};
const ORDEM = ['critical', 'serious', 'moderate', 'minor'];

const resultados = {};

/** "wcag143" -> "1.4.3" */
const criteriosWcag = (tags) =>
  tags
    .map((tag) => tag.match(/^wcag(\d)(\d)(\d+)$/))
    .filter(Boolean)
    .map(([, a, b, c]) => `${a}.${b}.${c}`);

/** "wcag2a" / "wcag21aa" / "wcag22aa" -> "A" / "AA" */
const nivelWcag = (tags) => {
  const nivel = tags.map((tag) => tag.match(/^wcag2\d?(a{1,3})$/)).find(Boolean);
  return nivel ? nivel[1].toUpperCase() : '-';
};

const montarResumo = () => {
  const paginas = Object.keys(resultados);
  const todas = paginas.flatMap((pagina) => resultados[pagina]);
  const linhas = [
    '## Auditoria de acessibilidade (axe-core · WCAG 2.2 A/AA)',
    '',
    `Páginas auditadas: **${paginas.length}** · Violações (regras): **${todas.length}** · ` +
      `Elementos afetados: **${todas.reduce((soma, v) => soma + v.nodes.length, 0)}**`,
    '',
    '| Impacto | Regras violadas |',
    '|---|---|',
    ...ORDEM.map((impacto) => `| ${IMPACTO[impacto]} | ${todas.filter((v) => v.impact === impacto).length} |`),
    '',
  ];

  paginas.forEach((pagina) => {
    const violacoes = [...resultados[pagina]].sort(
      (x, y) => ORDEM.indexOf(x.impact) - ORDEM.indexOf(y.impact),
    );
    linhas.push(`### ${pagina}`, '');
    if (violacoes.length === 0) {
      linhas.push('Nenhuma violação automática encontrada.', '');
      return;
    }
    linhas.push(
      '| Regra | Impacto | Critério WCAG | Nível | Elementos | Exemplo |',
      '|---|---|---|---|---|---|',
    );
    violacoes.forEach((v) => {
      const exemplo = String(v.nodes[0]?.target?.join(' ') ?? '').replace(/\|/g, '\\|');
      linhas.push(
        `| [${v.id}](${v.helpUrl}): ${v.help} | ${IMPACTO[v.impact] ?? v.impact} | ` +
          `${criteriosWcag(v.tags).join(', ') || '-'} | ${nivelWcag(v.tags)} | ${v.nodes.length} | \`${exemplo}\` |`,
      );
    });
    linhas.push('');
  });

  return linhas.join('\n');
};

/** Registra as tarefas no setupNodeEvents do Cypress. */
module.exports = (on) => {
  on('task', {
    lerAxe() {
      return fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
    },

    registrarAcessibilidade({ pagina, violacoes }) {
      resultados[pagina] = violacoes;
      fs.mkdirSync(PASTA, { recursive: true });
      fs.writeFileSync(path.join(PASTA, 'resultado.json'), JSON.stringify(resultados, null, 2));
      fs.writeFileSync(path.join(PASTA, 'resumo.md'), montarResumo());
      return null;
    },
  });
};

module.exports.montarResumo = montarResumo;
module.exports.resultados = resultados;
