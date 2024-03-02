const { defineConfig } = require('cypress')


module.exports = defineConfig({
  e2e: {
    downloadsFolder:'D:/Cypress/demoQaExampleTest/cypress/downloads',
    baseUrl: 'https://demoqa.com/',
    supportFile: 'cypress/support/e2e.js',
    pageLoadTimeout : 7000,
    trashAssetsBeforeRuns: true
  },
	env: {
    apiBaseUrl: 'https://demoqa.com/',
    username: 'test',
		password: 'test',
    apiBaseUrl:'test',
   
  },
});