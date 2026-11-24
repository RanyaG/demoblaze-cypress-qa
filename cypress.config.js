const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'DemoBlaze | Relatório de Testes',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  video: false,
  screenshotOnRunFailure: true,
  // O DemoBlaze carrega tudo por chamadas assíncronas à API, então os timeouts são mais folgados.
  defaultCommandTimeout: 15000,
  requestTimeout: 20000,
  viewportWidth: 1366,
  viewportHeight: 768,
  // Ambiente público e compartilhado: uma nova tentativa na CI evita falso negativo por instabilidade.
  // As falhas da primeira tentativa continuam aparecendo no relatório.
  retries: { runMode: 1, openMode: 0 },
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('./cypress/plugins/acessibilidade')(on);
      return config;
    },
  },
});
