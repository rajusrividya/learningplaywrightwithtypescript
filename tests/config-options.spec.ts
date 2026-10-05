import { test, expect } from "@playwright/test";

// Run with: npx playwright test --config=playwright.timeouts.config.ts
// Verifies that the "use" options from playwright.timeouts.config.ts are applied

test.beforeEach(async ({}, testInfo) => {
    test.skip(!testInfo.project.use.baseURL, "Run with --config=playwright.timeouts.config.ts");
});

test("baseURL - relative paths resolve against the config baseURL", async ({ page }) => {
    await page.goto("/checkboxes");
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/checkboxes");
    await expect(page.locator("h3")).toHaveText("Checkboxes");
});

test("viewport - browser window uses the config size", async ({ page }) => {
    expect(page.viewportSize()).toEqual({ width: 1366, height: 768 });
});

test("locale and timezoneId - browser reports the config values", async ({ page }) => {
    await page.goto("/");
    const { locale, timeZone } = await page.evaluate(() => Intl.DateTimeFormat().resolvedOptions());
    expect(locale).toBe("en-GB");
    expect(timeZone).toBe("Europe/Amsterdam");
});

test("project - each project runs its own browser", async ({ browserName }, testInfo) => {
    console.log(`Project "${testInfo.project.name}" is running on ${browserName}`);
    const expected = testInfo.project.name === "chromium" ? "chromium" : "firefox";
    expect(browserName).toBe(expected);
});

test("retries and screenshot - failing first attempt passes on retry", async ({ page }, testInfo) => {
    // retries: 1 in the config gives a second attempt; trace is recorded on that retry
    // and a screenshot + video are kept for the failed first attempt
    await page.goto("/checkboxes");
    console.log(`Attempt ${testInfo.retry + 1}`);
    expect(testInfo.retry, "Fail on purpose on the first attempt").toBeGreaterThan(0);
});
