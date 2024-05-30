import { hp } from "../../support/pageObjectModel/ecommerce/homepage"
import testaccount from '../../fixtures/ecommerceLogindata.json'


describe('Verify the homepage components', () => {
        beforeEach(() => {
            /*
                1. import thr fixture file
                2. if we have array in fixture file use index to grab the required test account
            */

            let username = testaccount.testAccounts[0].username;
            let password = testaccount.testAccounts[0].password;
            cy.login(username, password);
            cy.viewport(1440, 1106);

            // Another approach to use the fixture
            // cy.fixture('ecommerceLogindata').then((data) => {
            //     let username = data.testAccounts[0].username
            //     let password = data.testAccounts[0].password
            //     cy.log(username);
            //     cy.log(password);
            //     cy.login(username, password);
            // })
        })

        it('Verify the list of categories', () => {
            hp.getlistofCategories().then((ele) => {
                expect(ele.eq(0).text()).to.equal('Phones');
                expect(ele.eq(1).text()).to.equal('Laptops');
                expect(ele.eq(2).text()).to.equal('Monitors');
            })
        })

        it.skip('verify the list of items using API call', () => {
            cy.request({
                method: 'GET',
                url: `https://api.demoblaze.com/entries`
            }).then((response) => {
                cy.writeFile('cypress/fixtures/list.json', response.body);
                expect(response.status).to.eq(200);
            })
        })

        hp.getListOfElement().forEach((element) => {
            it(`verify the item with category as ${element.cat} and tilte ${element.title}`, () => {
                hp.getTitleofElement().eq(element.id - 1).should('have.text', element.title);
                hp.getElementDescription().eq(element.id - 1).should('include.text', element.desc);
            })
        })
    })