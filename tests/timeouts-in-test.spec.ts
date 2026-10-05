import { test, expect } from "@playwright/test";

// The "Start" button on this page shows "Hello World!" after ~5 seconds,
// which is perfect for experimenting with timeouts.
const DYNAMIC_LOADING_URL = "https://the-internet.herokuapp.com/dynamic_loading/1";

test.describe("Timeouts set from within a test", () => {

    test("test.setTimeout - change the timeout of a single test", async ({ page }) => {
        // Default test timeout is 30s - override it for this test only
        test.setTimeout(60_000);
        console.log(`Test timeout: ${test.info().timeout}ms`);

        await page.goto(DYNAMIC_LOADING_URL);
        await page.locator("#start button").click();
        await expect(page.locator("#finish")).toHaveText("Hello World!", { timeout: 10_000 });
    });

    test("test.slow - triple the test timeout", async ({ page }) => {
        // Marks the test as slow, which triples the configured test timeout
        test.slow();
        console.log(`Test timeout after test.slow(): ${test.info().timeout}ms`);

        await page.goto(DYNAMIC_LOADING_URL);
        await page.locator("#start button").click();
        await expect(page.locator("#finish")).toBeVisible({ timeout: 10_000 });
    });

    test("expect timeout - per assertion", async ({ page }) => {
        await page.goto(DYNAMIC_LOADING_URL);
        await page.locator("#start button").click();

        // Default expect timeout is 5s; the text takes ~5s so give it more room
        await expect(page.locator("#finish")).toHaveText("Hello World!", { timeout: 10_000 });
    });

    test("expect timeout - too short, expected to fail", async ({ page }) => {
        // test.fail() tells Playwright this test SHOULD fail; it passes if it fails
        test.fail();

        await page.goto(DYNAMIC_LOADING_URL);
        await page.locator("#start button").click();

        // 1s is not enough for the ~5s loading -> assertion times out
        await expect(page.locator("#finish")).toHaveText("Hello World!", { timeout: 1_000 });
    });

    test("expect.configure - reusable expect with a custom timeout", async ({ page }) => {
        const slowExpect = expect.configure({ timeout: 10_000 });

        await page.goto(DYNAMIC_LOADING_URL);
        await page.locator("#start button").click();
        await slowExpect(page.locator("#finish")).toHaveText("Hello World!");
    });

    test("action timeout - click with a custom timeout", async ({ page }) => {
        await page.goto(DYNAMIC_LOADING_URL);

        // Clicking an element that never appears fails after the given action timeout
        await expect(page.locator("#doesNotExist").click({ timeout: 2_000 }))
            .rejects.toThrow(/Timeout 2000ms exceeded/);
    });

    test("navigation timeout - page.goto with a custom timeout", async ({ page }) => {
        await page.goto(DYNAMIC_LOADING_URL, { timeout: 20_000, waitUntil: "domcontentloaded" });
        await expect(page.locator("h4").first()).toHaveText("Dynamically Loaded Page Elements");
    });

    test("page.setDefaultTimeout / setDefaultNavigationTimeout", async ({ page }) => {
        // Applies to every action / navigation on this page from now on
        page.setDefaultNavigationTimeout(20_000);
        page.setDefaultTimeout(3_000);

        await page.goto(DYNAMIC_LOADING_URL);
        await page.locator("#start button").click();

        // waitFor uses the default timeout (3s) unless overridden -> override it
        await page.locator("#finish").waitFor({ state: "visible", timeout: 10_000 });

        // This one relies on the 3s default and fails because the element never appears
        await expect(page.locator("#doesNotExist").click()).rejects.toThrow(/Timeout 3000ms exceeded/);
    });

    test("test timeout exceeded - expected to fail", async ({ page }) => {
        test.fail();
        test.setTimeout(3_000);

        await page.goto(DYNAMIC_LOADING_URL);
        // Waiting longer than the test timeout -> "Test timeout of 3000ms exceeded"
        await page.waitForTimeout(5_000);
    });
});

test.describe("Timeouts set for a whole describe block", () => {
    // Every test in this block gets a 45s timeout
    test.describe.configure({ timeout: 45_000 });

    test("describe.configure timeout is applied", async ({ page }) => {
        expect(test.info().timeout).toBe(45_000);

        await page.goto(DYNAMIC_LOADING_URL);
        await page.locator("#start button").click();
        await expect(page.locator("#finish")).toBeVisible({ timeout: 10_000 });
    });
});
