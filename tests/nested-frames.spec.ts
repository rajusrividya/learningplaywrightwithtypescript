import { test, expect } from "@playwright/test";

test("Open Nested Frames and verify the text on each frame", async ({ page }) => {
    // the-internet.herokuapp.com is often slow to serve its CSS/JS, so allow extra time for page loads
    test.setTimeout(120_000);

    // Step 1: Go to https://the-internet.herokuapp.com/frames
    await page.goto("https://the-internet.herokuapp.com/frames");

    // Step 2: Click on "Nested Frames"
    await page.getByRole("link", { name: "Nested Frames" }).click();
    await expect(page).toHaveURL(/nested_frames/);

    // Step 3: Verify the text on each of the frames
    const topFrame = page.frameLocator('frame[name="frame-top"]');

    await expect(topFrame.frameLocator('frame[name="frame-left"]').locator("body")).toHaveText("LEFT", { timeout: 30_000 });
    await expect(topFrame.frameLocator('frame[name="frame-middle"]').locator("#content")).toHaveText("MIDDLE", { timeout: 30_000 });
    await expect(topFrame.frameLocator('frame[name="frame-right"]').locator("body")).toHaveText("RIGHT", { timeout: 30_000 });
    await expect(page.frameLocator('frame[name="frame-bottom"]').locator("body")).toHaveText("BOTTOM", { timeout: 30_000 });
});
