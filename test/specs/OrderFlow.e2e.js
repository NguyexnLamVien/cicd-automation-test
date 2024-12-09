

import urls from '../../urls.js'
import LoginPage from '../pageobjects/loginPage.js';
import data from '../../assets/data/data.json' assert { type: "json" };
import OrderProduct from '../pageobjects/orderProduct.js';

describe('Order Flow', () => {
    before(async () => {
        await browser.url(`${urls.dev}/login`);
        const title = await browser.getTitle();
        expect(title).toBe('');
        // await browser.maximizeWindow();
        browser.setWindowSize(1920, 1080);
        await browser.pause(1000);
    });
    it(`Should login`, async () => {
        await browser.pause(1000);
        const user = data.users[0];
        await LoginPage.login(user.username, user.password);
        await browser.pause(5000);
    });

    // for (let id = 0; id < 3; id++) {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < 2; i++) {
        it(`Should search and order product lần ${i}`, async () => {
            const products = data.products;
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            await browser.pause(2000);
            await OrderProduct.searchProduct(randomProduct);
            await browser.pause(2500);

            await OrderProduct.buyProduct();
            await browser.pause(1500);
        });
    }

    it(`Should apply quantity`, async () => {
        await browser.url('https://abc.epms.vn/cart');
        await browser.pause(3800);
        await OrderProduct.setProductQuantity();
        await browser.pause(800);
    })
    it(`Should apply coupon`, async () => {
        await OrderProduct.applyAllCoupon();
        await browser.pause(500);

    });
    it(`Should app child counpon`, async () => {
        await browser.pause(300);
        await OrderProduct.applyCoupon();
        await browser.pause(1800);

    })
    // }
})

