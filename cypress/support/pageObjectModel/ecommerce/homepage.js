import loginData from '../../../fixtures/ecommerceLogindata.json';

export default class HomePage{
    constructor (){
        this.ele = {

        }
    }

    getLoginData(){
        return loginData['testAccounts'];
    }
}

export const hp = new HomePage();