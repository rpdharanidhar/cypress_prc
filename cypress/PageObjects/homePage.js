class HomePage {
    // elements = {
    //     Function : () => cy.get('h1').contains('Invoices', {timeout: 10000 }),
    //     SubFunction : () => cy.get('div[title="Tasks"]',{timeout: 10000}),
    //   //  CreateInvoice: () => cy.get('a').contains('Create Invoice',{timeout: 5000})
    // }
    Goto_Pages_and_Sub_Page_Hamburger_Button(mainFunction, subFunction) {
        cy.get('a[title="Navigator"]').should("be.visible");
        cy.get('a[title="Navigator"]').click();
        cy.xpath('//*[contains(@id,"popup-container")]', { timeout: 30000 }).should("be.visible")
        cy.get(`div[title="${mainFunction}"]`).click({ scrollBehavior: "center" });
        cy.xpath(
            `//div[div[@title="${mainFunction}"]]/following-sibling::div//a[@title="${subFunction}"]`
        ).should("be.visible", { timeout: 30000 }).click({ scrollBehavior: "center" })
        cy.log(subFunction, "Clicked")
    }
    approve_an_invoice(InvoiceNumber) {
        cy.xpath("//a[contains(@title,'Notifications')]")
            .should("be.visible", { timeout: 5000 })
            .click();
        cy.xpath("//tr//label[text()='Search']/preceding-sibling::input")
            .should("be.visible", { timeout: 10000 })
            .type(InvoiceNumber)
            .type("{enter}");
        cy.xpath("//a[contains(text(),'Non-PO Invoice826')]")
            .should("be.visible", { timeout: 5000 })
            .first()
            .click();
        cy.window().then((popupWindow) => {
            // Use cy.xpath() to locate and click the button inside the pop-up
            cy.wrap(popupWindow.document).xpath("//button[text()='Approve']").click();
        });
        // cy.xpath('//div[@data-afrrk="0"]//a[contains(text(),"Approve")]').click()
        //cy.xpath("//div[@data-afrrk='0']//a[contains(@title,'Approval of Invoice')]").should('be.visible',{ timeout: 5000 }).click();
    }

    click_home_button() {
        cy.xpath('//*[@aria-label="Home"]/ancestor::a').click()
        cy.xpath('//a[contains(@id, "my_information") and text() = "Me"]').should("be.visible", { timeout: 10000 })
    }
}

export { HomePage };
