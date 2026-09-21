import { test, expect } from "@playwright/test";

test('Drag the "Drag me" box onto "Drop here" and verify the color change', async ({ page }) => {
    // Step 1: Go to https://demoqa.com/droppable
    await page.goto("https://demoqa.com/droppable");
    // The page injects ads after load that shift the layout; networkidle
    // is unreliable here since ad scripts keep polling, so wait a fixed
    // amount instead to let the layout settle before measuring positions.
    await page.waitForTimeout(2000);

    const simpleTab = page.locator("#droppableExample-tabpane-simple");
    const draggable = simpleTab.locator("#draggable");
    const droppable = simpleTab.locator("#droppable");

    // Step 2: Drag the "Drag me" box to "Drop here" box
    
    await draggable.scrollIntoViewIfNeeded();
    const srcBox = await draggable.boundingBox();
    const dstBox = await droppable.boundingBox();
    if (!srcBox || !dstBox) throw new Error("Could not locate draggable/droppable boxes");

    await page.mouse.move(srcBox.x + srcBox.width / 2, srcBox.y + srcBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(100);
    await page.mouse.move(srcBox.x + srcBox.width / 2 + 10, srcBox.y + srcBox.height / 2, { steps: 5 });
    await page.waitForTimeout(100);
    await page.mouse.move(dstBox.x + dstBox.width / 2, dstBox.y + dstBox.height / 2, { steps: 30 });
    await page.waitForTimeout(200);
    await page.mouse.up();

    // Step 3: Verify the color of "Drop here" changed to blue
    await expect(droppable).toHaveText("Dropped!");
    await expect(droppable).toHaveCSS("background-color", "rgb(70, 130, 180)");
});
