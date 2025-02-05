class Logout {
    log_out() {
        cy.log("Performing Logout");
        cy.xpath('//img[@title="Settings and Actions"]').click();
        cy.xpath('//a[contains(text(),"Sign Out")]').should("be.visible", { timeout: 20000 });
        cy.xpath('//a[contains(text(),"Sign Out")]').click();
        cy.xpath('//button[@id="Confirm"]').should("be.visible", { timeout: 20000 })
        cy.xpath('//button[@id="Confirm"]').click();
        cy.xpath('//input[@id="userid"]').should("be.visible", { timeout: 20000 })
    }
}
export { Logout };
