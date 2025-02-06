// // import "cypress-if";
// import { SetupAndMaintaince } from "../PageObjects/Setup_and_MaintaincePage";
// import "cypress-if"; // Ensure this is imported in your support file or test script
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

//       const setup_manintenance = new SetupAndMaintaince();
//       setup_manintenance.navigation();
//       setup_manintenance.select_function(inputData.Module_name);
//       //   setup_manintenance.search_task(inputData.Task_name);
//       function search_task(task) {
//         cy.fillInput("Search Tasks", task);
//         cy.bodyEnter();
//         cy.waitForPageUpdate();
//       }
//       search_task(inputData.Task_name);

//       // cy.xpath(`//table[@summary="Search Task Results"]`, { timeout: 5000 })
//       //   .if("visible")
//       //   .then(() => {
//       //     cy.xpath(
//       //       `//table[@summary="Search Task Results"]//a[text()='${inputData.Task_name}']`
//       //     )
//       //       .first()
//       //       .click();
//       //   })
//       //   .else(() => {
//       //     cy.log(`Task "${taskName}" not found. Executing alternative logic.`);
//       //   });

//       cy.get("body").then((body) => {
//         cy.log(body.find('table[summary="Search Task Results"]'));
//         if (body.find('table[summary="Search Task Results"]').length > 0) {
//           cy.xpath(
//             `//table[@summary="Search Task Results"]//a[text()='${inputData.Task_name}']`
//           )
//             .first()
//             .click();
//         }
//       });

//       cy.waitForPageUpdate();
//       cy.xpath(
//         `//table[@summary='Tasks']//img[@title='${inputData.Task_name} : Actions']`
//       )
//         .first()
//         .click();
//       cy.waitForPageUpdate();

//       cy.xpath(
//         `//div[contains(@class, 'PopupMenuContent')]//td[text()='Import from CSV File']`
//       ).click();
//       cy.waitForPageUpdate();
//       cy.xpath(
//         `//div[contains(@id, 'popup-container')]//td[text()='Create New']`
//       )
//         .eq(2)
//         .should("be.visible")
//         .click();
//       cy.waitForPageUpdate();
//       cy.wait(5000);

//       const filePath = "cypress/fixtures/result.zip";
//       cy.log(`File path: ${filePath}`);
//       const pythonScriptPath = "cypress/fixtures/fileUpload.py";
//       cy.bodyEnter();
//       cy.xpath(`//input[@type='file']`).selectFile(filePath);
//       cy.exec(`python ${pythonScriptPath} ${filePath}`).then((result) => {
//         if (result.code === 0) {
//           cy.log("Python script executed successfully");
//         } else {
//           cy.log("Python script execution failed");
//         }
//       });

//       cy.wait(5000);

//       // cy.request({
//       //   method: "POST",
//       //   url: "https://login-erzp-dev12-saasfademo1.ds-fa.oraclepdemos.com/",
//       //   body: { username: "dpushparaj@cloudvice.com", password: "Welcome@12" },
//       // }).then(() => {
//       //   cy.get('input[type="file"]')
//       //   // .selectFile(filePath);
//       //   .attachFile(filePath);
//       // });

//       // function fileUploadBuffer() {
//       //   cy.get("body").then((body) => {
//       //     const cursorStyle = body.css("cursor");

//       //     if (cursorStyle === "wait") {
//       //       cy.log("Cursor is in wait state, retrying...");
//       //       cy.get("body");
//       //       // .type("{enter}");
//       //       cy.wait(5000);
//       //       // cy.bodyEnter();
//       //       fileUploadBuffer();
//       //     } else {
//       //       cy.log(
//       //         "Cursor is no longer in wait state, proceeding with bodyEnter..."
//       //       );
//       //       cy.get("body").type("{enter}");
//       //       cy.waitForPageUpdate();
//       //     }
//       //   });
//       // }
//       // fileUploadBuffer();

//       function fileUploadBuffer(retryCount = 0) {
//         cy.get("body").then((body) => {
//           const cursorStyle = body.css("cursor");

//           if (cursorStyle === "wait") {
//             cy.log("Cursor is in wait state, retrying...");

//             if (retryCount % 5 === 0 && retryCount !== 0) {
//               cy.log(":) !!! , performing bodyEnter...");
//               cy.get("body").type("{enter}");
//               cy.wait(1000);
//               cy.get("body").type("{enter}");
//               fileUploadBuffer(retryCount + 1);
//             } else {
//               cy.wait(1000);
//               fileUploadBuffer(retryCount + 1);
//             }
//           } else {
//             cy.log(
//               "Cursor is no longer in wait state, proceeding with bodyEnter..."
//             );
//             cy.get("body").type("{enter}");
//             cy.waitForPageUpdate();
//           }
//         });
//       }
//       fileUploadBuffer();

//       cy.xpath(`//a[not(contains(@aria-disabled, 'true'))][@accesskey="m"]`, {
//         timeout: 120000,
//       }).click();
//       cy.waitForPageUpdate();

//       cy.ConfirmPopUp();

//       cy.xpath(
//         `//div[contains(@class, 'PopupMenuContent')]//td[text()='Import from CSV File']`
//       ).click();
//       cy.waitForPageUpdate();
//       cy.xpath(`//div[contains(@id, 'popup-container')]//td[text()='View All']`)
//         .eq(2)
//         .should("be.visible")
//         .click();
//       cy.waitForPageUpdate();
//       cy.wait(5000);

//       function check_completion_status_and_perform_refresh(inputData) {
//         const maxRetries = 100;
//         let currentRetry = 0;
//         function refresh(currentRetry) {
//           if (currentRetry >= maxRetries) {
//             throw new Error(
//               `Status Completed not found after ${maxRetries} retries.`
//             );
//           }

//           cy.xpath(
//             `//table[@summary="Export and Import Processes"]//tr[1]//td//td[4]//a[text()][./ancestor::table//tr[1]//td[2]//td[.//span[contains(text(), '${inputData.Task_name}')]]]`
//           ).then(($elements) => {
//             const spanTexts = $elements
//               .toArray()
//               .map((el) => el.textContent.trim());
//             const found = $elements
//               .toArray()
//               // .some((el) => el.textContent.includes("Succeeded"));
//               .some((el) => el.textContent.includes("Completed"));
//             if (found === "Completed successfully") {
//               cy.log(`Status is Succeeded`);
//             } else () => {
//               if (found === "Completed with errors") {
//                 //
//                 cy.log(`Status is Failed, Log File is being downloaded :) !!!`);

//                 cy.xpath(
//                   `//table[@summary="Export and Import Processes"]//tr[1]//td//td[4]//a[contains(text()='Completed')][./ancestor::table//tr[1]//td[2]//td[.//span[contains(text(), '${inputData.Task_name}')]]]`
//                 ).click();
//                 cy.xpath(`//a[.//span[text()='Download Log File']]`).click()
//                 cy.waitForPageUpdate();
//               }
//               else{
//                 cy.log(
//                   `==== Status is not Completed. Retrying... ===== (${currentRetry}/${maxRetries})`
//                 );
//                 cy.get('a img[title ="Refresh"]').click();
//                 cy.wait(1000);
//                 refresh(currentRetry + 1);
//               }
//             })
//           }
//           }
//         }
//         refresh(currentRetry);

//       }
//       check_completion_status_and_perform_refresh(inputData);

//       cy.xpath(`//a[.//span[text()='Done']]`).click();
//       cy.xpath(`//a[.//span[text()='Done']]`).click();

//     });
//     cy.homePage();
//     cy.logout();
//   });
// });

// import "cypress-if";
// import { SetupAndMaintaince } from "../Setup_and_MaintaincePage";
import { SetupAndMaintaince } from "../PageObjects/Setup_and_MaintaincePage";
import "cypress-if"; // Ensure this is imported in your support file or test script
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

      function search_task(task) {
        cy.fillInput("Search Tasks", task);
        cy.bodyEnter();
        cy.waitForPageUpdate();
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

      cy.waitForPageUpdate();
      cy.xpath(
        `//table[@summary='Tasks']//img[@title='${inputData.Task_name} : Actions']`
      )
        .first()
        .click();
      cy.waitForPageUpdate();

      cy.xpath(
        `//div[contains(@class, 'PopupMenuContent')]//td[text()='Import from CSV File']`
      ).click();
      cy.waitForPageUpdate();
      cy.xpath(
        `//div[contains(@id, 'popup-container')]//td[text()='Create New']`
      )
        .eq(2)
        .should("be.visible")
        .click();
      cy.waitForPageUpdate();
      cy.wait(5000);

      const filePath = "cypress/fixtures/result.zip";
      cy.log(`File path: ${filePath}`);
      cy.bodyEnter();
      cy.xpath(`//input[@type='file']`).selectFile(filePath);

      cy.wait(5000);

      function fileUploadBuffer(retryCount = 0) {
        cy.get("body").then((body) => {
          const cursorStyle = body.css("cursor");

          if (cursorStyle === "wait") {
            cy.log("Cursor is in wait state, retrying...");

            if (retryCount % 5 === 0 && retryCount !== 0) {
              cy.log(":) !!! , performing bodyEnter...");
              cy.get("body").type("{enter}");
              cy.wait(1000);
              cy.get("body").type("{enter}");
              fileUploadBuffer(retryCount + 1);
            } else {
              cy.wait(1000);
              fileUploadBuffer(retryCount + 1);
            }
          } else {
            cy.log(
              "Cursor is no longer in wait state, proceeding with bodyEnter..."
            );
            cy.get("body").type("{enter}");
            cy.waitForPageUpdate();
          }
        });
      }
      fileUploadBuffer();

      cy.xpath(`//a[not(contains(@aria-disabled, 'true'))][@accesskey="m"]`, {
        timeout: 120000,
      }).click();
      cy.waitForPageUpdate();

      cy.ConfirmPopUp();

      cy.waitForPageUpdate();
      cy.xpath(
        `//table[@summary='Tasks']//img[@title='${inputData.Task_name} : Actions']`
      )
        .first()
        .click();
      cy.waitForPageUpdate();

      cy.xpath(
        `//div[contains(@class, 'PopupMenuContent')]//td[text()='Import from CSV File']`
      ).click();
      cy.waitForPageUpdate();
      cy.xpath(`//div[contains(@id, 'popup-container')]//td[text()='View All']`)
        .eq(2)
        .should("be.visible")
        .click();
      // cy.waitForPageUpdate();
      cy.wait(5000);

      // function check_completion_status_and_perform_refresh(inputData) {
      //   const maxRetries = 100;
      //   let currentRetry = 0;
      //   function refresh(currentRetry) {
      //     if (currentRetry >= maxRetries) {
      //       throw new Error(
      //         `Status Completed not found after ${maxRetries} retries.`
      //       );
      //     }

      //     cy.xpath(
      //       `//table[@summary="Export and Import Processes"]//tr[1]//td//td[4]//a[text()][./ancestor::table//tr[1]//td[2]//td[.//span[contains(text(), '${inputData.Task_name}')]]]`
      //     ).then(($elements) => {
      //       const spanTexts = $elements
      //         .toArray()
      //         .map((el) => el.textContent.trim());
      //       const found = $elements
      //         .toArray()
      //         .some((el) => el.textContent.includes("Completed"));
      //       if (found === "Completed successfully") {
      //         cy.log("Status is Completed successfully");
      //       } else {
      //         if (found === "Completed with errors") {
      //           cy.log(`Status is Failed, Log File is being downloaded :) !!!`);
      //           cy.xpath(
      //             `//table[@summary="Export and Import Processes"]//tr[1]//td//td[4]//a[contains(text()='Completed')][./ancestor::table//tr[1]//td[2]//td[.//span[contains(text(), '${inputData.Task_name}')]]]`
      //           ).click();
      //           cy.xpath(`//a[.//span[text()='Download Log File']]`).click();
      //           cy.waitForPageUpdate();
      //         } else {
      //           cy.log(
      //             `==== Status is not Completed. Retrying... ===== (${currentRetry}/${maxRetries})`
      //           );
      //           cy.get('a img[title ="Refresh"]').click();
      //           cy.wait(1000);
      //           refresh(currentRetry + 1);
      //         }
      //       }
      //     });
      //   }
      //   refresh(currentRetry);
      // }
      // check_completion_status_and_perform_refresh(inputData);

      function check_completion_status_and_perform_refresh(inputData) {
        const maxRetries = 100;
        let currentRetry = 0;
      
        function refresh(currentRetry) {
          if (currentRetry >= maxRetries) {
            throw new Error(
              `Status "Completed" not found after ${maxRetries} retries.`
            );
          }
      
          cy.xpath(
            `//table[@summary="Export and Import Processes"]//tr[1]//td//td[4]//a[text()][./ancestor::table//tr[1]//td[2]//td[.//span[contains(text(), '${inputData.Task_name}')]]]`
          ).then(($elements) => {
            const spanTexts = $elements
              .toArray()
              .map((el) => el.textContent.trim());
            const found = $elements
              .toArray()
              .some((el) => el.textContent.includes("Completed"));
      
            if (found) {
              const status = spanTexts.find((text) =>
                text.includes("Completed successfully")
              );
      
              if (status === "Completed successfully") {
                cy.log("Status is Completed successfully");
              } else if (spanTexts.some((text) => text.includes("Completed with errors"))) {
                cy.log("Status is Failed, Log File is being downloaded :) !!!");
      
                cy.xpath(
                  `//table[@summary="Export and Import Processes"]//tr[1]//td//td[4]//a[contains(text()='Completed')][./ancestor::table//tr[1]//td[2]//td[.//span[contains(text(), '${inputData.Task_name}')]]]`
                ).click();
      
                cy.xpath(`//a[.//span[text()='Download Log File']]`).click();
                cy.waitForPageUpdate();
              }
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

      cy.xpath(`//a[.//span[text()='Done']]`).click();
      cy.xpath(`//a[.//span[text()='Done']]`).click();
    });
    cy.homePage();
    cy.logout();
  });
});
