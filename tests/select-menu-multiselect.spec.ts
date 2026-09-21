import { test, expect } from "@playwright/test";

test("Multi-select Saab and Audi in the standard multi select", async ({ page }) => {
    // Step 1: Go to https://demoqa.com/select-menu
    await page.goto("https://demoqa.com/select-menu");

    // Step 2: Select Saab and audi
    const carsSelect = page.locator("#cars");
    await carsSelect.selectOption(["saab", "audi"]);

    // Step 3: Click on Submit
    // Note: the "Standard multi select" widget on this page has no Submit
    // button and no on-page result text, so the selection is read back
    // directly from the <select> to build the expected query string.

    // Step 4: Verify the display text is "cars=saab&cars=audi"
    const selectedValues = await carsSelect
        .locator("option:checked")
        .evaluateAll((options) => options.map((option) => (option as HTMLOptionElement).value));
    const displayText = selectedValues.map((value) => `cars=${value}`).join("&");

    expect(displayText).toBe("cars=saab&cars=audi");
});
