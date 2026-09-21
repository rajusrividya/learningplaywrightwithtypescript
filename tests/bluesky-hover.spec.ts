import { test, expect } from "@playwright/test";

test("Hover over @vibium.bsky.social on the first post and verify follower count", async ({ page }) => {
    // Step 1: Go to https://bsky.app/profile/vibium.bsky.social
    await page.goto("https://bsky.app/profile/vibium.bsky.social");

    const firstPost = page.locator('[data-testid="feedItem-by-vibium.bsky.social"]').first();
    await expect(firstPost).toBeVisible({ timeout: 15000 });

    // Step 2: Hover over @vibium.bsky.social on the first post and it shows more details
    const handle = firstPost.getByText("@vibium.bsky.social", { exact: true });
    await handle.hover();

    
    const followersLinks = page.locator('a[href="/profile/vibium.bsky.social/followers"]');
    await expect(followersLinks).toHaveCount(2);

    // Step 3: Verify the followers are 29 or any other number you see
    const hoverCardFollowers = followersLinks.last();
    const ariaLabel = await hoverCardFollowers.getAttribute("aria-label");
    const followerCount = Number(ariaLabel?.match(/\d+/)?.[0]);

    expect(Number.isInteger(followerCount)).toBe(true);
    expect(followerCount).toBeGreaterThanOrEqual(0);
    console.log(`Followers shown in hover card: ${followerCount}`);
});
