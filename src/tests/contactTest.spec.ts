import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import ContactPage from "../pages/ContactPage";
import cdata from "../testdata/contacts.json"

const authFile = "src/config/auth.json"

test("Create new contact", async ({browser}) => {
    const context = await browser.newContext({storageState: authFile});
    const page = await context.newPage();
    const contactPage = new ContactPage(page);    
    await page.goto(
        "https://orgfarm-18068347c3-dev-ed.develop.lightning.force.com/lightning/o/Contact/pipelineInspection?filterName=00Bak00001fWJAfEAO"
    );
    await contactPage.createNewContact("Nicolas", "Perez")
    await contactPage.expectContactLabelContainsFirstNameAndLastName("Nicolas", "Perez")
    logger.info("The name on the banner matches the with the one created")
});

test.describe("Data Driven Test", () =>{
    for (const contact of cdata){
        test(`Advanced DD test ${contact.ID}`, async ({browser}) => {
            logger.info("Test for contact creation has started...")
            const context = await browser.newContext({storageState: authFile});
            const page = await context.newPage();
            const contactPage = new ContactPage(page);

            await page.goto(
            "https://orgfarm-18068347c3-dev-ed.develop.lightning.force.com/lightning/o/Contact/pipelineInspection?filterName=00Bak00001fWJAfEAO"
            );
            await contactPage.createNewContact(contact.firstName, contact.lastName);
            await contactPage.expectContactLabelContainsFirstNameAndLastName(
                contact.firstName,
                contact.lastName
            );
            logger.info("Test for contact creation is completed")
        });
    }
});
