
export default class AddProduct {
    constructor() {
        this.ele = {
            header : '#tbodyid h2',
            addBtn : '.btn-success',
            cartTab : '.nav-link',
            productName : 'Samsung galaxy s6',
            deleteBtn : '#tbodyid tr td',
            placeOrder : '[data-target="#orderModal"]',
            name : '#name',
            country : '#country',
            city : '#city',
            card : '#card',
            month : '#month',
            year : '#year',
            closeBtn : '[data-dismiss="modal"]',
            purchaseBtn : '[onclick="purchaseOrder()"]'
        }
    }

    verifyHeader() {
        return cy.get(this.ele.header);
    }

    getAddBtn() {
        return cy.get(this.ele.addBtn);
    }

    goToCart() {
        return cy.get(this.ele.cartTab).eq(3);
    }

    verifyAddedProduct() {
        return cy.contains(this.ele.productName);
    }

    verifyDeleteBtn() {
        return cy.get(this.ele.deleteBtn).eq(3).find('a');
    }

    verifyPlaceOrder() {
        return cy.get(this.ele.placeOrder);
    }

    updateUserDetailsInPurchaseOrder() {
        cy.get(this.ele.name).type('Max Mike');
        cy.get(this.ele.country).type('Uganda');
        cy.get(this.ele.city).type('Uganda');
        cy.get(this.ele.card).type('123456789');
        cy.get(this.ele.month).type('09');
        return cy.get(this.ele.year).type('2024');
    }

    verifyCloseBtn(){
        return cy.get(this.ele.closeBtn).eq(5);
    }

    verifyPurchase(){
        return cy.get(this.ele.purchaseBtn);
    }

}