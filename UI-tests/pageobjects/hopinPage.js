import { Selector as $, Selector, t } from 'testcafe';

class hopinPage {

    constructor() {
        this.url = 'http://localhost:3000/';

        this.name = $('input[id="name"]');
        this.submit = $('input[value="Submit"]');
        this.companyLink = $('a[href="#"]');
        this.backButton = $('input[type="button"]')
        //this.companyContactInfoError = $('a[href="#"]')
        this.companyNameNoContactInfo = $('a[href="#"]')
    }

    async enterName(name) {
        await t
            .typeText(this.name, name)
    }

    async submitName() {
        await t
            .click(this.submit)
    }

    async clickCompany() {
        await t
            .click(this.companyLink)
    }

    async backList() {
        await t
            .click(this.backButton)
    }

    async companyError () {
        await t
        .click(this.companyNameNoContactInfo.nth(3))
    }
}

export default new hopinPage();