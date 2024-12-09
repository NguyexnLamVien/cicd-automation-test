import { $ } from '@wdio/globals'
class OrderProduct {
    get searchInput() {
        return $('input[placeholder*="Tìm kiếm"]');
    }

    get firstBuyNowButton() {
        return $('span=Mua ngay');
    }
    get btnDoneQuantity() {
        return $('.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid.cart-order--submit__button');
    }
    get confirmButton() {
        return $('div.ant-flex.css-var-R6.ant-flex-justify-end button.ant-btn.css-var-R6.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid.ant-btn-block');
    }
    async searchProduct(productCode) {
        const input = await this.searchInput;
        await input.waitForDisplayed();
        await input.setValue(productCode);
        await browser.keys(['Enter']);
        await browser.pause(1000);
    }

    async buyProduct() {
        const buyButton = await this.firstBuyNowButton;
        await buyButton.waitForExist();
        await buyButton.click();
    }

    // step 1
    async setProductQuantity() {
        const inputQuantity = await $$('input[autocomplete="off"][role="spinbutton"].ant-input-number-input');
        for (const element of inputQuantity) {
            await element.waitForExist();
            await element.doubleClick();
            await browser.keys(['Delete']);
            const randomQuantity = Math.floor(Math.random() * 6) + 1; // [1,6]
            await element.setValue(randomQuantity);
        }
        await browser.pause(1500);
        await this.btnDoneQuantity.waitForExist();
        await this.btnDoneQuantity.click();
        await browser.pause(500);
    }

    // step2
    async applyAllCoupon() {
        const couponContainer = await $('div.wp-container.p-4.rounded-10.h-full.cursor-pointer');
        await couponContainer.scrollIntoView();
        await browser.pause(1000);
        await couponContainer.click();
        await browser.pause(800);
        const checkboxes = await $$('div.coupon--right label.ant-checkbox-wrapper.css-var-R6.ant-checkbox-css-var input.ant-checkbox-input');

        if (checkboxes.length > 0) {
            await browser.pause(600);
            const randomIndex = Math.floor(Math.random() * checkboxes.length);
            await checkboxes[randomIndex].click();
        }
        await this.confirmButton.waitForClickable();
        await this.confirmButton.click();
    }
    // step3
    async applyCoupon() {
        const applyCouponButtons = await $$('div.ant-space-item div.ant-row.css-var-R6 div.ant-col.ant-col-xs-18.ant-col-lg-20.css-var-R6 div.ant-row.css-var-R6 button.ant-btn.css-var-R6.ant-btn-default.ant-btn-color-default.ant-btn-variant-outlined.ant-btn-sm span');
        for (let i = 0; i < applyCouponButtons.length; i++) {
            await applyCouponButtons[i].waitForExist(); //;
            await applyCouponButtons[i].scrollIntoView(); //;
            await applyCouponButtons[i].click();
            await browser.pause(800);
            const checkboxesV2 = await $$('div.coupon--right label.ant-checkbox-wrapper.css-var-R6.ant-checkbox-css-var input.ant-checkbox-input');
            if (checkboxesV2.length !== 0) {
                await browser.pause(500);
                const randomIndex1 = Math.floor(Math.random() * checkboxesV2.length);
                await checkboxesV2[randomIndex1].click();
            }
            await this.confirmButton.waitForClickable();
            await this.confirmButton.click();
        }
        await browser.pause(1000);
        const btnLastDone = await $('div.ant-row.ant-row-end.mt-8.css-var-R6 button.ant-btn.css-var-R6.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid.border-0');
        await btnLastDone.waitForEnabled();
        await btnLastDone.scrollIntoView();
        await browser.pause(2000);
        await btnLastDone.click();
        await browser.pause(1500);

    }
}

export default new OrderProduct();
