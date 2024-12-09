import { $ } from '@wdio/globals'
/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage {
    /**
     * define selectors using getter methods
     */
    get inputNumBer() {
        return $('input[autocomplete="phone-number"]#phoneNumber');
    }
    get inputPassword() {
        return $('input[autocomplete="password"]#password');
    }



    // get errorMessage() {
    //     return $('//div[contains(@id,"root")]//*[text()="Email ou mot de passe incorrect !"]');
    // }
    // get errorMessageIncorrectFormat() {
    //     return $("//div[contains(@id,'root')]//*[text()=\"L'entrée n'est pas valide\"]");
    // }
    /*** a method to encapsule automation code to interact with the page*/
    async login(username, password) {
        await this.inputNumBer.setValue(username);
        await this.inputPassword.setValue(password);

        // const buyButton = await this.btnLogin;
        // await buyButton.click();
        await browser.keys(['Enter']);
        await browser.pause(500);

    }
    // async assertErrorMessage() {
    //     await expect(this.errorMessage).toHaveTextContaining(
    //         'Email ou mot de passe incorrect !'
    //     )
    // }
    // async assertErrorMessageIncorrectFormat() {
    //     await expect(this.errorMessageIncorrectFormat).toHaveTextContaining(
    //         `L'entrée n'est pas valide`
    //     )
    // }
}
export default new LoginPage();
