const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  env:{
    service: 'https://api.demoblaze.com',
  },
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});