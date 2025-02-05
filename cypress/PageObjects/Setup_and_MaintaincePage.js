import { customFunctions } from "../utils/utils";
export class SetupAndMaintaince {

    navigation() {
        cy.xpath(`//img[contains(@title, 'Settings and Actions')]`).click()
        cy.xpath(`//a[contains(text(), 'Setup and Maintenance')]`).click()
    }
    select_function(func) {
        cy.xpath(
            '(//tr[.//div[contains(@title,"Setup:")]]//a)[@aria-label="Offering"]'
        ).click();
        cy.xpath(`//ul/li[contains(text(),'${func}')]`).click();
    }
    scroll_to_function(mainFunction) {
        const scrollToBottom = () => {
            cy.get('div > div[title="Functional Areas"]').scrollTo("bottom");
        };
        const isElementVisible = (mainFunction) => {
            return cy
                .get(`div[title="${mainFunction}"]`)
                .should("be.visible")
                .click();
        };
        const scrollUntilElementVisible = () => {
            scrollToBottom();
            isElementVisible(mainFunction).then((isVisible) => {
                if (!isVisible) {
                    scrollUntilElementVisible(); // Recursively call the function until element is visible
                }
            });
        };
        scrollUntilElementVisible(); // Start the scrolling process
    }
    select_sub_functon(linkText) {
        // cy.get(`a[text="${linkText}"]`);
        cy.xpath(`//a[text()='${linkText}']`).click();
    }

    scoll_sub_function(subFunction) {
        const scrollToBottom = () => {
            cy.xpath('(//div[@tabindex="-1"])[3]').scrollTo("bottom");
        };
        const isElementVisible = (subFunction) => {
            return cy.get(`a:contains('${subFunction}')`).click();
        };
        const scrollUntilElementVisible = () => {
            scrollToBottom();
            isElementVisible(subFunction).then((isVisible) => {
                if (!isVisible) {
                    scrollUntilElementVisible(); // Recursively call the function until element is visible
                }
            });
        };
        scrollUntilElementVisible(subFunction); // Start the scrolling process
    }
    search_task(task) {
        cy.fillInput("Search Tasks", task);

        cy.bodyEnter();
        cy.get('table[summary="Tasks"] tr a ').contains(task).click();
        cy.contains(task);
    }
    add_data_set(DataSet) {
        cy.get('div[title="Create"] a img[title="Create"]').first().click();
        cy.waitForPageUpdate();
        cy.typeSibling("User Name", DataSet.Username);
        cy.autoSuggestion();
        cy.typeSibling("Role", DataSet.Role);
        cy.autoSuggestion();
        cy.selectSibling("Security Context", DataSet.SecurityContex);
        cy.waitForPageUpdate();
        cy.selectSibling("Security Context", DataSet.SecurityContex);
        cy.wait(2000);
        cy.typeSibling("Security Context Value", DataSet.SecurityContexValue);
        cy.autoSuggestion();
        cy.get('button[accesskey="S"]').click();
    }
    create_auto_post_criteria_set(CriteriaSet) {
        cy.get('a img[title="Create"]').click();
        cy.waitForPageUpdate();
        cy.fillInput(
            "Name",
            customFunctions.get_names_with_timestamp(CriteriaSet.Name)
        );
        cy.bodyEnter();
        cy.CheckboxClick("Use Batch Creator as Approval Submitter");
        cy.get('a img[title="Add Row"]').click();
        cy.waitForPageUpdate();
        cy.typeSibling("Priority", CriteriaSet.Priority);
        cy.typeSibling("Ledger or Ledger Set", CriteriaSet.LedgerOrLedgerSet);
        cy.autoSuggestion();
        cy.typeSibling("Source", CriteriaSet.Source);
        cy.autoSuggestion();
        cy.typeSibling("Category", CriteriaSet.Category);
        cy.autoSuggestion();
        cy.typeSibling("Accounting Period", CriteriaSet.AccountingPeriod);
        cy.autoSuggestion();
        cy.selectSibling("Balance Type", CriteriaSet.BalanceType);
    }
    managet_asset_callender() {
        cy.get("a img[title='Edit']").click();
        cy.waitForPageUpdate();
        cy.get('a[accesskey="S"]').click();
        cy.waitForPageUpdate();
        cy.get("a").contains("Monthly").click();
        cy.get('a[accesskey="S"]').click();
        cy.waitForPageUpdate();
    }
}
