import { test, expect } from "@playwright/test";

// Run with: npx playwright test --config=playwright.timeouts.config.ts
// These tests rely on the timeouts defined in playwright.timeouts.config.ts

test.beforeEach(async ({}, testInfo) => {
    test.skip(!testInfo.project.use.baseURL, "Run with --config=playwright.timeouts.config.ts");
});

test("test timeout comes from the config", async ({}, testInfo) => {
    // 40s at top level, overridden to 60s in the firefox-slow project
    const expected = testInfo.project.name === "firefox-slow" ? 60_000 : 40_000;
    console.log(`[${testInfo.project.name}] test timeout: ${testInfo.timeout}ms`);
    expect(testInfo.timeout).toBe(expected);
});

test("expect timeout from config is long enough for slow elements", async ({ page }, testInfo) => {
    console.log(`[${testInfo.project.name}] expect timeout: ${testInfo.project.expect.timeout}ms`);

    await page.goto("/dynamic_loading/2");
    await page.locator("#start button").click();

    // No timeout passed here - config expect.timeout (8s / 12s) covers the ~5s loading
    await expect(page.locator("#finish")).toHaveText("Hello World!");
});

test("actionTimeout from config makes a stuck click fail", async ({ page }, testInfo) => {
    const actionTimeout = testInfo.project.use.actionTimeout;
    console.log(`[${testInfo.project.name}] action timeout: ${actionTimeout}ms`);

    await page.goto("/dynamic_loading/1");
    await expect(page.locator("#doesNotExist").click())
        .rejects.toThrow(new RegExp(`Timeout ${actionTimeout}ms exceeded`));
});

test("navigationTimeout from config is used by page.goto", async ({ page }, testInfo) => {
    console.log(`[${testInfo.project.name}] navigation timeout: ${testInfo.project.use.navigationTimeout}ms`);

    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Welcome to the-internet");
});

test("a value set inside the test overrides the config", async ({ page }) => {
    test.setTimeout(90_000);
    expect(test.info().timeout).toBe(90_000);

    await page.goto("/dynamic_loading/1");
    await page.locator("#start button").click();
    await expect(page.locator("#finish")).toBeVisible({ timeout: 15_000 });
});
