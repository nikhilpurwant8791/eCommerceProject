import { hp } from "../../support/pageObjectModel/ecommerce/homepage";


describe('Verify login', () => {
    beforeEach(() => {
        cy.viewport(1440, 1106);
    })

    hp.getLoginData().forEach((account) => {
        it(`Verify Login for user - ${account.id}`, () => {
            cy.login(account.username, account.password);
        })
    })


})