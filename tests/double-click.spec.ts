import { test, expect } from "@playwright/test";

test("Double click the button and verify the confirmation message", async ({ page }) => {
    // Step 1: Go to https://demoqa.com/buttons
    await page.goto("https://demoqa.com/buttons");

    // Step 2: Double Click on "Double click Me."
    await page.locator("#doubleClickBtn").dblclick();

    // Step 3: Verify that "You have done a double click" is displayed
    await expect(page.locator("#doubleClickMessage")).toHaveText("You have done a double click");
});
