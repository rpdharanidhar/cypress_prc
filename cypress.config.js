// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   defaultCommandTimeout: 200000,
//   e2e: {
//     viewportWidth: 1920,
//     viewportHeight: 1080,
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//     downloadsFolder: "cypress/downloads", // Custom downloads folder
//   },
// });

const { defineConfig } = require("cypress");

const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    downloadsFolder: "cypress/downloads", // Custom downloads folder
    defaultCommandTimeout: 1000000,
    requestTimeout: 1000000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: false,
  },
});
