import { SetupAndMaintaince } from "../PageObjects/Setup_and_MaintaincePage";

describe("Procurement Automation", () => {
  let fixtureData;
  it("Procurement Automation", () => {
    const fixtureName =
      Cypress.env("FIXTURE_NAME") || "procurement_automation.json";
    cy.fixture(fixtureName).then((data) => {
      fixtureData = data;
      const inputData = fixtureData.SetupAndMaintenance;
      const credentials = fixtureData.Roles.SuperUser;
      cy.login(fixtureData.URL, credentials);

      const setup_manintenance = new SetupAndMaintaince();
      setup_manintenance.navigation();
      setup_manintenance.select_function(inputData.Module_name);
      //   setup_manintenance.search_task(inputData.Task_name);
      function search_task(task) {
        cy.fillInput("Search Tasks", task);
        cy.bodyEnter();
      }
      search_task(inputData.Task_name);

      cy.get("body").then((body) => {
        cy.log(body.find('table[summary="Search Task Results"]'));
        if (body.find('table[summary="Search Task Results"]').length > 0) {
          cy.xpath(
            `//table[@summary="Search Task Results"]//a[text()='${inputData.Task_name}']`
          )
            .first()
            .click();
        }
      });

      cy.xpath(`//table[@summary='Tasks']//img[@title='${inputData.Task_name} : Actions']`)
        .first()
        .click();
      cy.waitForPageUpdate();
      cy.xpath(
        `//div[contains(@class, 'PopupMenuContent')]//td[text()='Export to CSV File']`
      ).click();
      cy.waitForPageUpdate();
      cy.xpath(
        `//div[contains(@id, 'popup-container')]//td[text()='Create New']`
      )
        .eq(2)
        .should("be.visible")
        .click();
      cy.xpath(`//a[@accesskey="m"]`).click();
      cy.waitForPageUpdate();
      cy.xpath(
        `//div[text()='Confirmation']/ancestor::table//button[@accesskey='K']`
      ).click();
      cy.waitForPageUpdate();

      cy.xpath(`//table[@summary='Tasks']//img[@title='${inputData.Task_name} : Actions']`)
        .first()
        .click();
      cy.waitForPageUpdate();
      cy.xpath(
        `//div[contains(@class, 'PopupMenuContent')]//td[text()='Export to CSV File']`
      ).click();
      cy.waitForPageUpdate();
      cy.xpath(`//div[contains(@id, 'popup-container')]//td[text()='View All']`)
        .eq(2)
        .should("be.visible")
        .click();
      function check_completion_status_and_perform_refresh(inputData) {
        const maxRetries = 100;
        let currentRetry = 0;
        function refresh(currentRetry) {
          if (currentRetry >= maxRetries) {
            throw new Error(
              `Status Completed not found after ${maxRetries} retries.`
            );
          }

          //   cy.get(
          //     'table[summary="List of Processes Meeting Search Criteria"] table tr '
          //   )
          cy.xpath(
            `//table[@summary="Export and Import Processes"]//tr[1]//td//td[4]//a[text()][./ancestor::table//tr[1]//td[2]//td[.//span[contains(text(), '${inputData.Task_name}')]]]`
          ).then(($elements) => {
            const spanTexts = $elements
              .toArray()
              .map((el) => el.textContent.trim());
            const found = $elements
              .toArray()
              // .some((el) => el.textContent.includes("Succeeded"));
              // .some((el) => el.textContent.includes("Completed"));
              .some((el) => el.textContent.includes("Completed successfully"));
            if (found) {
              cy.log(`Status is Succeeded`);
              cy.xpath(
                `//table[@summary="Export and Import Processes"]//tr[1]//td//td[4]//a[text()='Completed successfully'][./ancestor::table//tr[1]//td[2]//td[.//span[contains(text(), '${inputData.Task_name}')]]]`
              ).click();
              cy.xpath(`//a[.//span[text()='Download File']]`).click();
            } else {
              cy.log(
                `==== Status is not Completed. Retrying... ===== (${currentRetry}/${maxRetries})`
              );
              cy.get('a img[title ="Refresh"]').click();
              cy.wait(1000);
              refresh(currentRetry + 1);
            }
          });
        }
        refresh(currentRetry);
      }
      check_completion_status_and_perform_refresh(inputData);
      // cy.xpath(
      //   `//table[@summary="Export and Import Processes"]//tr[1]//td//td[4]//a[text()='Completed successfully'][./ancestor::table//tr[1]//td[2]//td[.//span[contains(text(), '${inputData.Task_name}')]]]`
      // ).click();
      // cy.xpath(`//a[.//span[text()='Download File']]`).click();
      cy.xpath(`//a[.//span[text()='Done']]`).click();
      cy.xpath(`//a[.//span[text()='Done']]`).click();
    });
    cy.homePage();
    cy.logout();
  });
});

// import { SetupAndMaintaince } from "../Setup_and_MaintaincePage";

// describe("Procurement Automation", () => {
//   let fixtureData;

//   it("Procurement Automation", () => {
//     const fixtureName =
//       Cypress.env("FIXTURE_NAME") || "procurement_automation.json";

//     cy.fixture(fixtureName).then((data) => {
//       fixtureData = data;
//       const inputData = fixtureData.SetupAndMaintenance;
//       const credentials = fixtureData.Roles.SuperUser;

//       cy.login(fixtureData.URL, credentials);

//       const setup_maintenance = new SetupAndMaintaince();
//       setup_maintenance.navigation();
//       setup_maintenance.select_function(inputData.Module_name);

//       inputData.Task_name.forEach((taskName) => {
//         cy.log(`Executing Task: ${taskName}`);

//         function search_task(task) {
//           cy.fillInput("Search Tasks", task);
//           cy.bodyEnter();
//         }
//         search_task(taskName);

//         cy.get("body").then(($body) => {
//           if ($body[0].querySelector('table[summary="Search Task Results"]')) {
//             cy.xpath(`//table[@summary="Search Task Results"]//a[text()='${taskName}']`)
//               .first()
//               .click();
//           }
//         });

//         cy.xpath(
//           `//table[@summary='Tasks']//img[@title='${taskName} : Actions']`
//         )
//           .first()
//           .click();
//         cy.waitForPageUpdate();

//         cy.xpath(
//           `//div[contains(@class, 'PopupMenuContent')]//td[text()='Export to CSV File']`
//         ).click();
//         cy.waitForPageUpdate();

//         cy.xpath(
//           `//div[contains(@id, 'popup-container')]//td[text()='Create New']`
//         )
//           .eq(2)
//           .should("be.visible")
//           .click();
//         cy.xpath(`//a[@accesskey="m"]`).click();
//         cy.waitForPageUpdate();

//         cy.xpath(
//           `//div[text()='Confirmation']/ancestor::table//button[@accesskey='K']`
//         ).click();
//         cy.waitForPageUpdate();

//         cy.xpath(
//           `//table[@summary='Tasks']//img[@title='${taskName} : Actions']`
//         )
//           .first()
//           .click();
//         cy.waitForPageUpdate();

//         cy.xpath(
//           `//div[contains(@class, 'PopupMenuContent')]//td[text()='Export to CSV File']`
//         ).click();
//         cy.waitForPageUpdate();

//         cy.xpath(
//           `//div[contains(@id, 'popup-container')]//td[text()='View All']`
//         )
//           .eq(2)
//           .should("be.visible")
//           .click();

//         function check_completion_status_and_perform_refresh(taskName) {
//           const maxRetries = 100;
//           let currentRetry = 0;

//           function refresh(currentRetry) {
//             if (currentRetry >= maxRetries) {
//               throw new Error(
//                 `Status Completed not found after ${maxRetries} retries.`
//               );
//             }

//             cy.xpath(
//               `//table[@summary="Export and Import Processes"]//tr[1]//td//td[4]//a[text()][./ancestor::table//tr[1]//td[2]//td[.//span[contains(text(), '${taskName}')]]]`
//             ).then(($elements) => {
//               const spanTexts = $elements
//                 .toArray()
//                 .map((el) => el.textContent.trim());
//               const found = $elements
//                 .toArray()
//                 .some((el) =>
//                   el.textContent.includes("Completed successfully")
//                 );

//               if (found) {
//                 cy.log(`Status is Succeeded`);
//                 cy.xpath(
//                   `//table[@summary="Export and Import Processes"]//tr[1]//td//td[4]//a[text()='Completed successfully'][./ancestor::table//tr[1]//td[2]//td[.//span[contains(text(), '${taskName}')]]]`
//                 ).click();
//                 cy.xpath(`//a[.//span[text()='Download File']]`).click();
//                 cy.xpath(`//a[.//span[text()='Done']]`).click();
//                 cy.waitForPageUpdate();
//                 cy.xpath(`//a[.//span[text()='Done']]`).click();
//               } else {
//                 cy.log(
//                   `==== Status is not Completed. Retrying... (${currentRetry}/${maxRetries}) ====`
//                 );

//                 cy.get('a img[title ="Refresh"]').click();
//                 cy.wait(1000);
//                 refresh(currentRetry + 1);
//               }
//             });
//           }
//           refresh(currentRetry);
//         }
//         check_completion_status_and_perform_refresh(taskName);

//         // cy.xpath(`//a[.//span[text()='Done']]`).click();
//         // cy.xpath(`//a[.//span[text()='Done']]`).click();
//       });

//       // After running all tasks, go back to the homepage and logout
//       cy.homePage();
//       cy.logout();
//     });
//   });
// });
