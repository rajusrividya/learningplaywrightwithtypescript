import { test, expect } from "@playwright/test";

test("Uncheck checkbox 2 and check checkbox 1", async ({ page }) => {
    // Step 1: Goto - https://the-internet.herokuapp.com/checkboxes
    await page.goto("https://the-internet.herokuapp.com/checkboxes");

    const checkbox1 = page.locator("#checkboxes input").nth(0);
    const checkbox2 = page.locator("#checkboxes input").nth(1);

    // Step 2: Verify that checkbox 2 is checked
    await expect(checkbox2).toBeChecked();

    // Step 3: Uncheck the checkbox 2
    await checkbox2.uncheck();
    await expect(checkbox2).not.toBeChecked();

    // Step 4: Check checkbox 1 and verify that it is checked
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
});
