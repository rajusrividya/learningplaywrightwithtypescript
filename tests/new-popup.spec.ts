import { test, expect } from "@playwright/test";

test("Open the Write to us popup and add name, mobile and email", async ({ page, context }) => {
    // Step 1: Go to https://nichethyself.com/tourism/
    await page.goto("https://nichethyself.com/tourism/");

    // Step 2: Click on "Write to us!" menu
    const [popup] = await Promise.all([
        context.waitForEvent("page"),
        page.getByRole("button", { name: "Write to us!" }).click(),
    ]);
    await popup.waitForLoadState();

    // Step 3: In the window popup add the details like name, mobile, email address
    await popup.locator("input[name='name']").fill("Test User");
    await popup.locator("input[name='mobile']").fill("1234567890");
    await popup.locator("input[name='email']").fill("t.user@example.com");

    await expect(popup.locator("input[name='name']")).toHaveValue("Test User");
    await expect(popup.locator("input[name='mobile']")).toHaveValue("1234567890");
    await expect(popup.locator("input[name='email']")).toHaveValue("t.user@example.com");
});
