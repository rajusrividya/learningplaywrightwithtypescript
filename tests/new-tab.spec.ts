import { test, expect } from "@playwright/test";

test("Open new tab and verify its text", async ({ page, context }) => {
    // Step 1: Goto - https://the-internet.herokuapp.com/windows
    await page.goto("https://the-internet.herokuapp.com/windows");

    // Step 2: Click on "Click Here"
    const [newTab] = await Promise.all([
        context.waitForEvent("page"),
        page.getByRole("link", { name: "Click Here" }).click(),
    ]);
    await newTab.waitForLoadState();

    // Step 3: Verify the text on new tab is - "New Window"
    await expect(newTab.locator("h3")).toHaveText("New Window");
});
