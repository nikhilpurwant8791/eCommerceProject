import { hp } from "../../support/pageObjectModel/ecommerce/homepage";
import testaccount from '../../fixtures/ecommerceLogindata.json';
import menu from '../../fixtures/cat_NavBar.json';

/*
    1. Use retries, if test fails we can ask cypress to retry one more time or depends. 
    2. import thr fixture file
    3. if we have array in fixture file use index to grab the required test account
*/

describe('Verify the homepage components',
    {
        retries: {
            runMode: 2,
            openMode: 1,
        },
    },
    () => {
        beforeEach(() => {
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
                for (let i = 0; i < 3; i++) {
                    expect(ele.eq(i).text()).to.equal(menu.category[i]);
                }
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

        // Test case to verify each nave bar menu separatuely
        for (let i = 0; i < 7; i++) {
            it(`Verify ${menu.navbar[i]} Nav-menu`, () => {
                hp.getNavbar().then((ele) => {
                    if (i != 4) {
                        expect(ele.eq(i)).to.have.css('cursor', 'pointer');
                        expect(ele.eq(i).text()).to.include(menu.navbar[i]);
                    } else {
                        i++;
                        expect(ele.eq(i)).to.have.css('cursor', 'pointer');
                        expect(ele.eq(i).text()).to.include(menu.navbar[i]);
                    }

                })
            })
        }

        //Single Test case to test all nav-bar
        it.skip('Verify Nav menu', () => {
            hp.getNavbar().then((ele) => {
                for (let i = 0; i < 7; i++) {
                    if (i == 4) {
                        i++;
                        expect(ele.eq(i)).to.have.css('cursor', 'pointer');
                        expect(ele.eq(i).text()).to.include(menu.navbar[i]);
                    } else {
                        expect(ele.eq(i)).to.have.css('cursor', 'pointer');
                        expect(ele.eq(i).text()).to.include(menu.navbar[i]);
                    }
                }
            })
        })

        hp.getListOfElement().forEach((element) => {
            it(`verify the item with category as ${element.cat} and tilte ${element.title}`, () => {
                hp.getTitleofElement().eq(element.id - 1).should('have.text', element.title);
                hp.getElementDescription().eq(element.id - 1).should('include.text', element.desc);
            })
        })
    })