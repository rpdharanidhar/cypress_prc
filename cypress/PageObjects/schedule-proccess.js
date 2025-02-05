/// <reference types="Cypress" />
import "cypress-iframe";
import { customFunctions } from "../utils/utils";

export class scheduleProccess {
    // fill_details_in_new_schedule_job(jobname) {
    //     //cy.xpath('//label[text()="Job"]/preceding-sibling::input').should("be.visible", { timeout: 10000 }).click();
    //     cy.xpath('//tr[td/label[text()="Name"]]//input').type(jobname);
    //     cy.xpath('//tr[td/label[text()="Name"]]//input').type("{enter}");
    //     cy.waitForPageUpdate();
    //     cy.contains("button", "OK").click();
    // }

    select_first_row() {
        cy.get(
            'table[summary="List of Processes Meeting Search Criteria"] table[_afrit]'
        )
            .first()
            .click();
        cy.waitForPageUpdate();
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
            }
        });
    }
    filter_by_job_name(job_name) {
        this.expand_search();
        cy.xpath("//input[following-sibling::label[text()=' Name']]").type(
            job_name
        );
        cy.buttonClick("Search");
        cy.waitForPageUpdate();
    }

    filter_by_proccess_id(proccess_id) {
        cy.xpath("//tr[td[label[text()='Process ID']]]//input")
            .should("be.visible", {
                timeout: 30000,
            })
            .type(proccess_id);
        cy.buttonClick("Search");
        cy.waitForPageUpdate();
    }

    select_scheduled_job() {
        cy.get(
            'table[summary="List of Processes Meeting Search Criteria"] tr[_afrrk]'
        )
            .first()
            .click();
    }
    select_new_schedule_process_job(...args) {
        // Method to schedule a new process job by searching and selecting a job name.
        // if process job search result is more then 1 , pass 2 or more arguments Eg-> select_new_schedule_process_job(jobname,"over ride" )
        // This override handles scenarios where the search results may contain multiple entries.

        if (args.length === 1) {
            cy.get("a span").contains("Schedule New Process").click();
            cy.waitForPageUpdate();
            cy.xpath('//tr[td/label[text()="Name"]]//input').type(args[0]);
            cy.xpath('//tr[td/label[text()="Name"]]//input').type("{enter}");
            cy.waitForPageUpdate();
            cy.contains("button", "OK").click();
        } else {
            cy.get("a span").contains("Schedule New Process").click();
            cy.waitForPageUpdate();
            cy.xpath('//tr[td/label[text()="Name"]]//input').type(args[0]);
            cy.xpath('//tr[td/label[text()="Name"]]//input').type("{enter}");
            cy.waitForPageUpdate();
            cy.get("div[id*='selectOneChoice'] table  tr[_afrrk] td")
                .contains("span", args[0])
                .click();
            cy.get('button[id*="selectOneChoice"]').contains("OK").click();
            cy.get('button[id*="btnid"]').contains("OK").click();
        }
    }

    click_submit() {
        cy.xpath("//a[@accesskey='m']").click();
        cy.waitForPageUpdate();
    }
    check_job_status_and_perform_refresh() {
        const maxRetries = 50;
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
                        .some((el) => el.textContent.includes("Succeeded"));
                    if (found) {
                        cy.log(`Status is Succeeded`);
                    } else {
                        cy.log(
                            `==== Status is not not succeeded. Retrying... ===== (${currentRetry}/${maxRetries})`
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
                    cy.log(
                        "URL not found or does not match the expected pattern."
                    );
                }
            });
    }
    downalod_output(format) {
        cy.get("a[id='reportViewMenu']").click();
        cy.xpath("//a[div[text()='Export']]").click();
        cy.get("a").contains("div", format).click();
    }

    print_receivables_transactions(PrintReceivablesTransactions) {
        cy.fillInput(
            "Business Unit",
            PrintReceivablesTransactions.BusinessUnit
        );
        // cy.get('a[title="Search: Business Unit"]').click();
        // cy.get('tr[class*="p_AFSelected"]')
        //     .contains("td span", PrintReceivablesTransactions.BusinessUnit)
        //     .click();
        cy.selectOption(
            "Transactions to Print",
            PrintReceivablesTransactions.TransactionstoPrint
        );
        cy.selectOption(
            "Open Invoices Only",
            PrintReceivablesTransactions.OpenInvoicesOnly
        );
        cy.selectOption(
            "Itemized Tax by Line",
            PrintReceivablesTransactions.emizedTaxByLine
        );
    }
}
