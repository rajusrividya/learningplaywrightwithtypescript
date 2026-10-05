import { test, expect } from "@playwright/test";

test("Open Nested Frames and verify the text on each frame", async ({ page }) => {
    // Step 1: Go to https://the-internet.herokuapp.com/frames
    await page.goto("https://the-internet.herokuapp.com/frames");

    // Step 2: Click on "Nested Frames"
    await page.getByRole("link", { name: "Nested Frames" }).click();
    await expect(page).toHaveURL(/nested_frames/);

    // Step 3: Verify the text on each of the frames
    const topFrame = page.frameLocator('frame[name="frame-top"]');

    await expect(topFrame.frameLocator('frame[name="frame-left"]').locator("body")).toHaveText("LEFT");
    await expect(topFrame.frameLocator('frame[name="frame-middle"]').locator("#content")).toHaveText("MIDDLE");
    await expect(topFrame.frameLocator('frame[name="frame-right"]').locator("body")).toHaveText("RIGHT");
    await expect(page.frameLocator('frame[name="frame-bottom"]').locator("body")).toHaveText("BOTTOM");
});
