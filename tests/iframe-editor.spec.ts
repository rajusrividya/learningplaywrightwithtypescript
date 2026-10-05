import { test, expect } from "@playwright/test";

test("Open iFrame and verify the text inside the editor", async ({ page }) => {
    // the-internet.herokuapp.com is often slow to serve its CSS/JS, so allow extra time for page loads
    test.setTimeout(120_000);

    // Step 1: Go to https://the-internet.herokuapp.com/frames
    await page.goto("https://the-internet.herokuapp.com/frames");

    // Step 2: Click on "iFrame"
    await page.getByRole("link", { name: "iFrame" }).click();
    await expect(page).toHaveURL(/iframe/);

    // Step 3: Verify the text inside the editor is "Your content goes here."
    const editor = page.frameLocator("#mce_0_ifr").locator("#tinymce");
    await expect(editor).toHaveText("Your content goes here.", { timeout: 30_000 });
});
