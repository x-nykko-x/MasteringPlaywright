// Test script using the Page Object Model
import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test("test", async({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername("nicolasplaywright.0da4f01864cd@agentforce.com")
    await loginPage.clickLoginButton();
    await loginPage.fillPassword("Singapur0735*")

    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();
})