// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-iframe";
import "cypress-file-upload";
// import "../../utils/utils"
// require('cypress-file-upload');
require("cypress-xpath");
require("cypress-if");
require("cypress-file-upload");
// Alternatively you can use CommonJS syntax:
// require('./commands')
// Hide fetch/XHR requests
const app = window.top;
if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
  const style = app.document.createElement("style");
  style.innerHTML =
    ".command-name-request, .command-name-xhr { display: none }";
  style.setAttribute("data-hide-command-log-request", "");
  app.document.head.appendChild(style);
}

// Cypress.on("uncaught:exception", (err, runnable) => {
//   // Log the error for debugging
//   console.error("Uncaught exception:", err);

//   // Add a condition to ignore specific errors
//   if (
//     err.message.includes("Script error") ||
//     err.message.includes("cross-origin script")
//   ) {
//     return false; // Prevent Cypress from failing the test
//   }

//   // Let other exceptions cause the test to fail
//   return true;
// });


Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
