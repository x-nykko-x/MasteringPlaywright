// Test script using the Page Object Model
import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { encrypt } from "../utils/CryptojsUtil";
import { decrypt } from "../utils/CryptojsUtil";
import { decryptEnvFile, encryptEnvFile } from "../utils/EncryptEnvFile";
import logger from "../utils/LoggerUtil";

test("test", async({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    // await loginPage.fillUsername("nicolasplaywright.0da4f01864cd@agentforce.com")
    await loginPage.fillUsername(decrypt(process.env.userid!))
    await loginPage.clickLoginButton();
    // await loginPage.fillPassword("Singapur0735*")
    await loginPage.fillPassword(decrypt(process.env.password!))
    logger.info("Test for login is completed")

    // const homePage = await loginPage.clickLoginButton();
    // await homePage.expectServiceTitleToBeVisible();
})

test('Sample env test', async({page}) => {

    // const plaintext = 'Hello, Nico';
    // const encryptedText = encrypt(plaintext);
    // console.log('SALT:', process.env.SALT);
    // console.log('Encrypted:', encryptedText);
    // const decryptedText = decrypt(encryptedText);
    // console.log('Decrypted:', decryptedText);
    encryptEnvFile();
    // decryptEnvFile();
})