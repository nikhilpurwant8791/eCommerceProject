describe('Verify the homepage components',
    {
        retries: {
            runMode: 2,
            openMode: 1,
        },
    },
    () => {
        beforeEach(() => {

            // Another approach to use the fixture
            cy.fixture('ecommerceLogindata').then((data) => {
                let username = data.testAccounts[0].username
                let password = data.testAccounts[0].password
                cy.login(username, password);
                cy.viewport(1440, 1106);
            })
        })


        it('Verify the single product page', () => {
            cy.intercept(`${Cypress.env('service')}/view`).as('viewPage');
            cy.intercept(`${Cypress.env('service')}/addtocart`).as('addToCart');
            cy.get('.card-block .card-title a').eq(0).should('have.text', 'Samsung galaxy s6').click();
            cy.wait('@viewPage');
            cy.get('#tbodyid h2').should('have.text', 'Samsung galaxy s6');
            cy.get('.btn-success').as('add');
            cy.get('@add').should('have.text','Add to cart').and('have.css', 'cursor', 'pointer');
            cy.get('@add').click();
            cy.wait('@addToCart');
            cy.get('@addToCart').its('response.statusCode').should('eq', 200);
        })

        it('Verify product added to cart', ()=>{
            cy.intercept(`${Cypress.env('service')}/viewcart`).as('cart');
            cy.get('.nav-link').eq(3).click();
            cy.wait('@cart');
            cy.contains('Samsung galaxy s6').should('be.visible');
            cy.get('#tbodyid tr td').eq(3).find('a').as('delete');
            cy.get('@delete').should('have.text', 'Delete').and('have.css', 'cursor', 'pointer');
            cy.get('[data-target="#orderModal"]').should('have.text', 'Place Order').and('have.css','cursor', 'default').click();
        })

        it('Purchase the order', ()=>{
            cy.intercept(`${Cypress.env('service')}/viewcart`).as('cart');
            cy.get('.nav-link').eq(3).click();
            cy.wait('@cart');
            cy.contains('Samsung galaxy s6').should('be.visible');
            cy.get('[data-target="#orderModal"]').should('have.text', 'Place Order').and('have.css','cursor', 'default').click();
            cy.wait(500);
            cy.get('#name').type('Max Mike');
            cy.get('#country').type('Uganda');
            cy.get('#city').type('Uganda');
            cy.get('#card').type('123456789');
            cy.get('#month').type('09');
            cy.get('#year').type('2024');
            cy.get('[data-dismiss="modal"]').eq(5).should('have.text','Close').and('have.css', 'cursor', 'default');
            cy.get('[onclick="purchaseOrder()"]').should('have.text','Purchase').and('have.css', 'cursor', 'default').click();
            cy.contains('Thank you for your purchase!').should('be.visible');
        })

    })