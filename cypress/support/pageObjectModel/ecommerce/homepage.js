import loginData from '../../../fixtures/ecommerceLogindata.json';
import list from '../../../fixtures/list.json'

export default class HomePage {
    constructor() {
        this.ele = {
            list: '.list-group #itemc',
            title: '.col-lg-9 #tbodyid .col-lg-4 .card-title',
            description: '.col-lg-9 #tbodyid .col-lg-4 #article',
        }
    }

    getTitleofElement() {
        return cy.get(this.ele.title);
    }

    getElementDescription() {
        return cy.get(this.ele.description);
    }

    getlistofCategories() {
        return cy.get(this.ele.list);
    }

    getLoginData() {
        return loginData['testAccounts'];
    }

    getListOfElement() {
        return list['Items'];
    }
}

export const hp = new HomePage();