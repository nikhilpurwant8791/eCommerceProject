import { hp } from "../../support/pageObjectModel/ecommerce/homepage"

describe('Verify the homepage components',
    {
        retries: {
            runMode: 2,
            openMode: 1,
        },
    },
    () => {
        let ap;
        beforeEach(() => {

            // Another approach to use the fixture
            cy.fixture('ecommerceLogindata').then((data) => {
                let username = data.testAccounts[0].username
                let password = data.testAccounts[0].password
                cy.login(username, password);
                cy.viewport(1440, 1106);
                cy.intercept(`${Cypress.env('service')}/view`).as('viewPage');
                cy.intercept(`${Cypress.env('service')}/addtocart`).as('addToCart');
                cy.intercept(`${Cypress.env('service')}/viewcart`).as('cart');
            })
        })


        it('Verify the single product page', () => {
            ap = hp.goToAddProduct();
            cy.wait('@viewPage');
            ap.verifyHeader().should('have.text', 'Samsung galaxy s6');
            ap.getAddBtn().should('have.text','Add to cart').and('have.css', 'cursor', 'pointer');
            ap.getAddBtn().click();
            cy.wait('@addToCart');
            cy.get('@addToCart').its('response.statusCode').should('eq', 200);
        })

        it('Verify product added to cart', () => {
            ap.goToCart().click();
            cy.wait('@cart');
            ap.verifyAddedProduct().should('be.visible');
            ap.verifyDeleteBtn().should('have.text', 'Delete').and('have.css', 'cursor', 'pointer');
            ap.verifyPlaceOrder().should('have.text', 'Place Order').and('have.css', 'cursor', 'default').click();
        })

        it('Purchase the order', () => {
            ap.goToCart().click();
            cy.wait('@cart');
            ap.verifyAddedProduct().should('be.visible');
            ap.verifyPlaceOrder().should('have.text', 'Place Order').and('have.css', 'cursor', 'default').click();
            cy.wait(500);
            ap.updateUserDetailsInPurchaseOrder();
            ap.verifyCloseBtn().should('have.text', 'Close').and('have.css', 'cursor', 'default');
            ap.verifyPurchase().should('have.text', 'Purchase').and('have.css', 'cursor', 'default');
            ap.verifyPurchase().click();
            cy.contains('Thank you for your purchase!').should('be.visible');
        })

    })