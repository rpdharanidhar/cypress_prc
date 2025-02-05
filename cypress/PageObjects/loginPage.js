class LoginPage {

    loginToOracleCloud(URL, credentials) {
        cy.visit(URL);
        // cy.visit("www.google.com/")
        // cy.xpath(`//input[@data-cy="aut-url-input"]`).clear().type(URL)
        // Type the username and password and click the login button.
        cy.get("input#userid").type(credentials.username);
        cy.get("input#password").type(credentials.password);
        cy.get("button#btnActive").click();
        // Add assertions to verify that the login was successful.
        cy.get('img[title="Settings and Actions"]').should("be.visible");
        cy.get('a[title="Navigator"]').should("be.visible");
        // cy.get('a[title="Home"]').click()
    }
}
export { LoginPage };
