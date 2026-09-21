import { test, expect } from "@playwright/test";

test("Submit customised international tour form for Home Stay in England", async ({ page }) => {
    await page.goto("https://nichethyself.com/tourism/customised.html");

    const form = page.locator('form[name="internationalf"]');

    // Step 2: Enter Fullname and email address
    await form.getByPlaceholder("Full name").fill("John Doe");
    await form.getByPlaceholder("Email address").fill("john.doe@example.com");

    // Step 3: Flights with snacks provided - select No
    await form.getByLabel("No", { exact: true }).check();

    // Step 4: Drop down select "Home Stay"
    await form.locator("select#days").selectOption("Home Stay");

    // Step 5: Checkbox - select England
    await form.getByLabel("England").check();

    // Step 6: Verify that Switzerland checkbox is disabled
    await expect(form.getByLabel("Switzerland")).toBeDisabled();

    // Step 7: Click on Submit button
    await form.getByRole("button", { name: "Submit" }).click();
});
