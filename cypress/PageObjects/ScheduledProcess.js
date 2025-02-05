import { customFunctions } from "../utils/utils";

export class scheduleProcess {
  navigateToScheduledProcesses() {
    cy.navigation("Tools", "Scheduled Processes");
  }
  refreshScheduledProcesses() {
    cy.get('a img[title="Refresh"]').click();
    cy.waitForPageUpdate();
  }
  fill_details_in_new_schedule_job(jobname) {
    //cy.xpath('//label[text()="Job"]/preceding-sibling::input').should("be.visible", { timeout: 10000 }).click();
    cy.xpath('//tr[td/label[text()="Name"]]//input').type(jobname);
    cy.xpath('//tr[td/label[text()="Name"]]//input').type("{enter}");
    cy.waitForPageUpdate();
    cy.contains("button", "OK").click();
  }
  click_republishButton(url) {
    cy.wait(1000);

    cy.frameLoaded(`[id*="processDetails"][src*="${url}"]`);
    cy.iframe(`[id*="processDetails"][src*="${url}"]`)
      .find('img[title*="Republish"]')
      .then(($img) => {
        const onClickValue = $img.attr("onclick");
        const urlMatch = onClickValue.match(/xmlpserver[^']*'/);
        const end_point = urlMatch && urlMatch[0];

        cy.log(end_point, "========================================");
        if (url) {
          const new_url = url + "/" + end_point.replace(/'/g, ""); // Remove single quotes
          cy.visit(new_url);
        } else {
          cy.log("URL not found or does not match the expected pattern.");
        }
      });
  }
  check_job_status_and_perform_refresh() {
    const maxRetries = 100;
    let currentRetry = 0;
    function refresh(currentRetry) {
      if (currentRetry >= maxRetries) {
        throw new Error(
          `Status succeeded not found after ${maxRetries} retries.`
        );
      }

      cy.get(
        'table[summary="List of Processes Meeting Search Criteria"] table tr '
      )
        .first()
        .then(($elements) => {
          const spanTexts = $elements
            .toArray()
            .map((el) => el.textContent.trim());
          const found = $elements
            .toArray()
            // .some((el) => el.textContent.includes("Succeeded"));
            .some((el) => el.textContent.includes("Succeeded") || el.textContent.includes("Completed"));
          if (found) {
            cy.log(`Status is Succeeded`);
          } else {
            cy.log(
              `==== Status is not succeeded. Retrying... ===== (${currentRetry}/${maxRetries})`
            );
            cy.get('a img[title ="Refresh"]').click();
            cy.wait(1000);
            refresh(currentRetry + 1);
          }
        });
    }
    refresh(currentRetry);
  }
  click_republishButton(url) {
    cy.wait(1000);

    cy.frameLoaded(`[id*="processDetails"][src*="${url}"]`);
    cy.iframe(`[id*="processDetails"][src*="${url}"]`)
      .find('img[title*="Republish"]')
      .then(($img) => {
        const onClickValue = $img.attr("onclick");
        const urlMatch = onClickValue.match(/xmlpserver[^']*'/);
        const end_point = urlMatch && urlMatch[0];

        cy.log(end_point, "========================================");
        if (url) {
          const new_url = url + "/" + end_point.replace(/'/g, ""); // Remove single quotes
          cy.visit(new_url);
        } else {
          cy.log("URL not found or does not match the expected pattern.");
        }
      });
  }
  click_DefaultDocument(url) {
    cy.waitForPageUpdate();
    cy.frameLoaded(`[id*="processDetails"][src*="${url}"]`);
    cy.iframe(`[id*="processDetails"][src*="${url}"]`)
      .find("table tbody[id = 'templateTableBody'] tr span[class ='dataLink']")
      .click();
  }
  extract_process_id() {
    cy.xpath('//*[contains(text(),"was submitted.")]')
      .invoke("text")
      .as("textFunction")
      .then((textValue) => {
        const matchResult = textValue.match(/\d+/);
        if (matchResult) {
          const number = parseInt(matchResult[0], 10);
          const proccessID = Cypress.env("Proccess_ID", number);
          cy.xpath(
            "//div[text()='Confirmation']/ancestor::table//button[text()='OK']"
          )
            .should("be.visible", { timeout: 20000 })
            .click();
          cy.wait(2000);
          cy.wrap(null).then(() => {
            this.expand_search();
            this.filter_by_proccess_id(proccessID);
          });
        } else {
          throw new Error(
            "Unable to extract process ID from the submitted text."
          );
        }
      });
  }
  select_scheduled_job() {
    cy.wait(2000);
    cy.xpath(
      '(//table[@summary="List of Processes Meeting Search Criteria"]//table[@_afrit="1"])[1]'
    )
      .should("be.visible", { timeout: 30000 })
      .click();
  }
  expand_search() {
    cy.get("body").then(($body) => {
      if ($body.find('a[title="Expand Search"]').length > 0) {
        cy.get('a[title="Expand Search"]').then(($element) => {
          if ($element.is(":visible")) {
            cy.wrap($element).click();
          } else {
            cy.log("Expanded");
          }
        });
      } else {
        throw new Error(
          "Unable to extract process ID from the submitted text."
        );
      }
    });
  }
  filter_by_proccess_id(proccess_id) {
    cy.xpath("//tr[td[label[text()='Process ID']]]//input")
      .should("be.visible", {
        timeout: 30000,
      })
      .clear()
      .type(proccess_id);
    cy.buttonClick("Search");
  }
}
