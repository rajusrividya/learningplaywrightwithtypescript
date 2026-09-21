import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test("Download the file and verify it is stored", async ({ page }) => {
    // Step 1: Visit https://demoqa.com/upload-download
    await page.goto("https://demoqa.com/upload-download");

    // Step 2: Click on Download Button and verify and store the file
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator("#downloadButton").click(),
    ]);

    expect(download.suggestedFilename()).toBe("sampleFile.jpeg");

    const savePath = path.join("downloads", download.suggestedFilename());
    await download.saveAs(savePath);

    expect(fs.existsSync(savePath)).toBe(true);
    expect(fs.statSync(savePath).size).toBeGreaterThan(0);
});
