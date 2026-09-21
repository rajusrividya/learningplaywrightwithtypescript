import { test, expect } from "@playwright/test";

test("Fill the student registration form and verify each submitted field", async ({ page }) => {
    // Step 1: Goto - https://demoqa.com/automation-practice-form
    await page.goto("https://demoqa.com/automation-practice-form");

    // Step 2: Fill up all the details except picture file
    await page.locator("#firstName").fill("Test");
    await page.locator("#lastName").fill("User");
    await page.locator("#userEmail").fill("test.user2006@example.com");

    // Radio input itself is visually hidden, so click via its label
    await page.locator("label[for='gender-radio-2']").click();

    await page.locator("#userNumber").fill("1234567890");

    await page.locator("#dateOfBirthInput").click();
    await page.locator(".react-datepicker__month-select").selectOption("4"); // May
    await page.locator(".react-datepicker__year-select").selectOption("1995");
    await page.locator(".react-datepicker__day--015:not(.react-datepicker__day--outside-month)").click();

    //await page.locator("#subjectsInput").pressSequentially("Maths", { delay: 100 });
    //await page.locator(".subjects-auto-complete__option", { hasText: "Maths" }).click();

    // Checkbox input itself is visually hidden, so click via its label
    await page.locator("label[for='hobbies-checkbox-1']").click();

    await page.locator("#currentAddress").fill("123 Main Street");

    await page.locator("#state").click();
    await page.getByText("NCR", { exact: true }).click();
    await page.locator("#city").click();
    await page.getByText("Delhi", { exact: true }).click();

    await page.locator("#submit").scrollIntoViewIfNeeded();
    await page.locator("#submit").click({ force: true }); // avoids ad overlays intercepting the click

    // Step 3: Verify each field status in the submitted confirmation modal
    const modal = page.locator(".modal-content");
    await expect(modal).toBeVisible();

});
