import { test, expect } from "@playwright/test";

test("Select option 2 and verify it is selected", async ({ page }) => {
    // Step 1: Goto - https://the-internet.herokuapp.com/dropdown
    await page.goto("https://the-internet.herokuapp.com/dropdown");

    // Step 2: Select option 2 and verify that option 2 is selected
    const dropdown = page.locator("#dropdown");
    await dropdown.selectOption({ label: "Option 2" });

    await expect(dropdown).toHaveValue("2");
    await expect(dropdown.locator("option:checked")).toHaveText("Option 2");
});
