// Test script using the Page Object Model
import {expect, test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { encrypt } from "../utils/CryptojsUtil";
import { decrypt } from "../utils/CryptojsUtil";
import { decryptEnvFile, encryptEnvFile } from "../utils/EncryptEnvFile";
import logger from "../utils/LoggerUtil";

const authFile = "src/config/auth.json"

test("Login and create the storage state json file", async({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!))
    await loginPage.clickLoginButton();
    await loginPage.fillPassword(decrypt(process.env.password!))
    await loginPage.clickLoginButton();
    // const homePage = await loginPage.clickLoginButton();
    // await homePage.expectServiceTitleToBeVisible();
    logger.info("Test for login is completed");
    await page.context().storageState({ path: authFile});
});

test("Login with auth file", async({browser}) => {

    const context = await browser.newContext({storageState: authFile});
    const page = await context.newPage();
    await page.goto(
        "https://orgfarm-18068347c3-dev-ed.develop.lightning.force.com/lightning/page/home"
    );
    await expect(page.getByRole("link", {name: "Accounts"})).toBeVisible();
});

test('Sample env test', async({page}) => {

    // const plaintext = 'Hello, Nico';
    // const encryptedText = encrypt(plaintext);
    // console.log('SALT:', process.env.SALT);
    // console.log('Encrypted:', encryptedText);
    // const decryptedText = decrypt(encryptedText);
    // console.log('Decrypted:', decryptedText);
    encryptEnvFile();
    // decryptEnvFile();
});