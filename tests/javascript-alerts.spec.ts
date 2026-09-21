import { test, expect } from "@playwright/test";

test("Handle all 3 JS alerts and verify each message and page result", async ({ page }) => {
    // Step 1: Visit https://the-internet.herokuapp.com/javascript_alerts
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    const result = page.locator("#result");

    // Alert 1: JS Alert
    page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toBe("I am a JS Alert");
        await dialog.accept();
    });
    await page.getByRole("button", { name: "Click for JS Alert" }).click();
    await expect(result).toHaveText("You successfully clicked an alert");

    // Alert 2: JS Confirm
    page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toBe("I am a JS Confirm");
        await dialog.accept();
    });
    await page.getByRole("button", { name: "Click for JS Confirm" }).click();
    await expect(result).toHaveText("You clicked: Ok");

    // Alert 3: JS Prompt
    page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("prompt");
        expect(dialog.message()).toBe("I am a JS prompt");
        await dialog.accept("Hello Playwright");
    });
    await page.getByRole("button", { name: "Click for JS Prompt" }).click();
    await expect(result).toHaveText("You entered: Hello Playwright");
});
