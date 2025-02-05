// ***********************************************
import { HomePage } from "../PageObjects/homePage.js";
import { LoginPage } from "../PageObjects/loginPage.js";
import { Logout } from "../PageObjects/logoutPage.js";
require("cypress-xpath");
require("cypress-iframe");
require("cypress-if");
require("cypress-file-upload");
// require('cypress-file-upload');
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.add("fillInput", (labelText, inputData) => {
//     cy.xpath(`//tr[td[1]/label[text()='${labelText}']]/td[2]//input[not(@type='hidden')]`)
//         .clear()
//         .type(inputData);
// });
Cypress.Commands.add("fillInput", (labelText, inputData, index = "") => {
  const inputXPath = `(//tr[td[1]/label[text()='${labelText}']]/td[2]//input[not(@type='hidden')])`;

  cy.xpath(inputXPath)
    .invoke("val")
    .then((value) => {
      if (value) {
        // If the input field contains data, clear it first
        cy.log(`Clearing ..... ${value}`);
        cy.xpath(inputXPath).clear();
      }
      // Type the new input data
      cy.xpath(inputXPath).type(inputData, { delay: 200 });
    });
});
Cypress.Commands.add("selectOption", (selectText, inputData) => {
  cy.xpath(`//tr[td[1]/label[text()='${selectText}']]/td[2]//select`).select(
    inputData
  );

  cy.log(`//tr[td[1]/label[text()='${selectText}']]/td[2]//select`);
});

Cypress.Commands.add("typeSibling", (LabelText, inputData) => {
  const inputXPath = `//label[text()='${LabelText}']/preceding-sibling::input`;
  cy.xpath(inputXPath)
    .invoke("val")
    .then((value) => {
      if (value) {
        // If the input field contains data, clear it first
        cy.log(`Clearing ..... ${value}`);
        cy.xpath(inputXPath);
      }
      // Type the new input data
      cy.xpath(inputXPath).clear().type(inputData);
    });
});

Cypress.Commands.add("selectSibling", (LabelText, Value) => {
  cy.xpath(`//label[text()='${LabelText}']/preceding-sibling::select`)
    .should("not.be.disabled")
    .select(Value);
});

Cypress.Commands.add("navigation", (functionName, subFunctionName) => {
  const AccessPage = new HomePage();
  AccessPage.Goto_Pages_and_Sub_Page_Hamburger_Button(
    functionName,
    subFunctionName
  );
});

Cypress.Commands.add("navigator", (functionName) => {
  cy.get('a[title="Navigator"]').should("be.visible");
  cy.get('a[title="Navigator"]').click();
  cy.xpath('//*[contains(@id,"popup-container")]', { timeout: 30000 }).should(
    "be.visible"
  );
  cy.get(`div[title="${functionName}"]`).click({ scrollBehavior: "center" });
});

// Cypress.Commands.add("navigateQuickAction", (functionName, subFunctionName) => {
//   cy.get('a[title="Navigator"]').should("be.visible");
//   cy.get('a[title="Navigator"]').click();
//   cy.xpath('//*[contains(@id,"popup-container")]', { timeout: 30000 }).should(
//     "be.visible"
//   );
//   cy.get(`div[title="${functionName}"]`).click({ scrollBehavior: "center" });
//   cy.xpath(
//     `//h2[text()='Quick Actions']/ancestor::div//div//a[text()='${subFunctionName}'][contains(@quickactioncategory, 'quick_actions')]`
//   ).click();
// });

Cypress.Commands.add("navigateQuickAction", (functionName, subFunctionName) => {
  cy.homePage();
  cy.xpath(`//a[text()='${functionName}']`)
    .click()
    .invoke("attr", "id")
    .then((mainFunctionId) => {
      cy.log(`The ID of the "${functionName}" element is: ${mainFunctionId}`);
      cy.xpath(
        `//a[@aria-label='Show more quick actions'][@group='${mainFunctionId}']`
      ).click();
      cy.waitForPageUpdate();
      cy.xpath(
        `//div[@group="${mainFunctionId}"]//a[text()='${subFunctionName}'][not(@group)]`
      ).click({ force:true });      
    });
});

Cypress.Commands.add("homePage", (functionName, subFunctionName) => {
  cy.get('a[title="Home"]').click();
  cy.waitForPageUpdate();
  cy.log("Welcome Home :) ");
});

Cypress.Commands.add("homePageRedwood", (functionName, subFunctionName) => {
  cy.xpath('//a[@title="Home"]').first().click();
  cy.waitForPageUpdate();
  cy.log("Welcome Home :) ");
});

Cypress.Commands.add("login", (url, credentials) => {
  const auth = new LoginPage();
  auth.loginToOracleCloud(url, credentials);
});
Cypress.Commands.add("logout", () => {
  cy.wait(3000);
  cy.log("Script Completed , Performing Logout");
  const logOut = new Logout();
  logOut.log_out();
});

Cypress.Commands.add("clickTask", (func) => {
  cy.get('div[title="Tasks"]').click();
  cy.contains("a", `${func}`).click();
  cy.waitForPageUpdate();
});
Cypress.Commands.add("clickTaskOnly", (func) => {
  cy.get('div[title="Tasks"]').click();
  // cy.contains("a", `${func}`).click();
  cy.waitForPageUpdate();
});
Cypress.Commands.add("autoSuggestion", () => {
  cy.xpath("//*[@class='AFAutoSuggestItem'][1]").click();
});
Cypress.Commands.add("buttonClick", (str) => {
  cy.get("button").contains(str).click({ force: true });
});
Cypress.Commands.add("CheckboxClick", (LabelText) => {
  cy.xpath(
    `//label[text()="${LabelText}"]/preceding-sibling::input[@type="checkbox"]`
  )
    .check({ force: true })
    .should("be.checked");
});

Cypress.Commands.add("CheckboxUnClick", (LabelText) => {
  cy.xpath(
    `//label[text()="${LabelText}"]/preceding-sibling::input[@type="checkbox"]`
  )
    .uncheck({ force: true })
    .should("not.be.checked");
});

Cypress.Commands.add("fillDate", (labelText, index = "") => {
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  let formattedDate = month + "/" + day + "/" + (year % 100);
  console.log(formattedDate);
  cy.xpath(
    `(//tr[td[1]/label[text()='${labelText}']]/td[2]//input[not(@type='hidden')])[${index}]`
  )
    .clear()
    .type(formattedDate);
});

Cypress.Commands.add("ConfirmPopUp", () => {
  cy.xpath("//div[text()='Confirmation']/ancestor::table//button[text()='OK']")
    .should("be.visible", { timeout: 20000 })
    .click({ force: true });
});

Cypress.Commands.add("waitForPageUpdate", () => {
  // Wait for the page to update
  cy.get('body[style="cursor: wait;"]', { timeout: 200000 }).should(
    "not.exist"
  );
  cy.get("body", { timeout: 300000 }).should(
    "have.attr",
    "style",
    "cursor: auto;"
  );
  cy.wait(2000);
});

Cypress.Commands.add("ArAutoSuggestion", (data) => {
  cy.get('tr[class*="p_AFSelected"]').contains("td", data).click();
});

Cypress.Commands.add("bodyEnter", () => {
  cy.get("body").type("{enter}");
  cy.waitForPageUpdate();
});

Cypress.Commands.add("waitForPageUpdateRedWood", () => {
  // Wait for the page to update
  cy.get('body[style="cursor: wait;"]', { timeout: 200000 }).should(
    "not.exist"
  );
  cy.get('body[style*="oj-sp-theme-global-texture"]', { timeout: 300000 });
  cy.wait(5000);
});

Cypress.Commands.add("ClearAndTypeRedWood", (srtID, data) => {
  cy.get(`oj-select-single[id="${srtID}"] input[id="${srtID}|input"]`).clear();
  // cy.xpath(`//oj-input-text[contains(@id, '${srtID}')]//input[contains(@id, 'DestinationType')]`)
  cy.get(`oj-input-text[id*='${srtID}' ] input`).type(data);
});

Cypress.Commands.add("enter_org_popup", (data) => {
  cy.get("input[id*='orgCodeId']").type(data);
  cy.get("button").contains("OK").click();
  cy.waitForPageUpdate();
});

Cypress.Commands.add("dropDownSelectRedwood", (labelText, value) => {
  cy.xpath(
    `//oj-label[.//span[text()='${labelText}']]/ancestor::oj-select-single//oj-input-text//a`
  ).click({ force: true });
  cy.wait(500);
  cy.xpath(`//oj-highlight-text[.//span[text()='${value}']]`).click();
  // cy.wait(500);
  cy.waitForPageUpdateRedWood();
});

Cypress.Commands.add("selectOptionRedwood", (labelText, value) => {
  cy.xpath(
    `//oj-label[.//span[text()='${labelText}']]/ancestor::oj-select-single//oj-input-text//input`
    // `//oj-label[.//span[text()='${labelText}']]/ancestor::oj-input-text//input`
  )
    .clear({ force: true })
    .type(value, { force: true });
  cy.wait(500);
  cy.xpath(`//oj-highlight-text[.//span[text()='${value}']]`)
    .first()
    .click({ force: true });
  // cy.wait(500);
  // cy.waitForPageUpdateRedWood();
});

Cypress.Commands.add("selectOptionLiRedwood", (labelText, value) => {
  cy.xpath(
    `//oj-label[.//span[text()='${labelText}']]/ancestor::oj-select-single//oj-input-text//input`
    // `//oj-label[.//span[text()='${labelText}']]/ancestor::oj-input-text//input`
  )
    .clear({ force: true })
    .type(value, { force: true });
  cy.wait(500);
  cy.xpath(`//ul//li[.//span[text()='${value}']]`)
    .first()
    .click({ force: true });
  // cy.wait(500);
  // cy.waitForPageUpdateRedWood();
});

Cypress.Commands.add("fillInputRedwood", (labelText, value) => {
  cy.xpath(`//oj-label[.//span[text()='${labelText}']]/parent::div//input`)
    .clear({ force: true })
    .wait(500)
    .type(value, { force: true }, { delay:300 })
    .type("{enter}", { force: true });
  // cy.xpath(`//oj-highlight-text[.//span[text()='${value}']]`).first().click({ force: true });
});

Cypress.Commands.add("buttonClickRedwood", (labelText) => {
  cy.xpath(
    `//button[not(contains(@aria-labelledby, 'primaryActionMobile')) and .//span[text()='${labelText}']][./parent::oj-button[@chroming="outlined"]]`
    // ).click();
  ).click({ force: true });
  cy.waitForPageUpdateRedWood();
});

Cypress.Commands.add("PopupbuttonClickRedwood", (labelText) => {
  cy.xpath(
    `//button[not(contains(@aria-labelledby, 'primaryActionMobile')) and .//span[text()='${labelText}']][./parent::oj-button[@chroming="callToAction"]]`
    // ).click();
  ).click({ force: true });
  cy.waitForPageUpdateRedWood();
});

Cypress.Commands.add("bodyEnterRedwood", () => {
  cy.get("body").type("{enter}");
  cy.waitForPageUpdateRedWood();
});

Cypress.Commands.add("siblingInputRedwood", (labelText, value) => {
  cy.xpath(
    `//div[text()='${labelText}']/ancestor::table//td//input[@aria-label='${labelText}']`
  )
    .clear({ force: true })
    .type(value, { force: true });
});
