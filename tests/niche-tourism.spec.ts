import {test, expect} from "@playwright/test"

test ("Login to Tourism Website is successful", async ({page}) =>{
    await page.goto("https://nichethyself.com/tourism/");
    await page.getByPlaceholder("Username").fill("stc123");
    await page.locator("input[name='password']").fill("12345");
    await page.locator('form[name="loginform"] button').click();
    await expect(page).toHaveTitle(/My account/);
    await page.waitForTimeout(5000);
}
)