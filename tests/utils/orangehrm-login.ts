import { Page, expect } from "@playwright/test";

export const LOGIN_URL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

// "success"  -> lands on the Dashboard
// "invalid"  -> shows the "Invalid credentials" alert
// "required" -> shows the "Required" field validation message
export type ExpectedResult = "success" | "invalid" | "required";

export interface LoginData {
    testName: string;
    username: string;
    password: string;
    expected: ExpectedResult;
}

export async function loginAndVerify(page: Page, data: LoginData) {
    // Step 1: Goto the OrangeHRM login page
    await page.goto(LOGIN_URL);

    // Step 2: Enter username and password, then click Login
    await page.getByPlaceholder("Username").fill(data.username);
    await page.getByPlaceholder("Password").fill(data.password);
    await page.getByRole("button", { name: "Login" }).click();

    // Step 3: Verify the result
    if (data.expected === "success") {
        await expect(page).toHaveURL(/\/dashboard/);
        await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    } else if (data.expected === "invalid") {
        await expect(page.locator(".oxd-alert-content-text")).toHaveText("Invalid credentials");
    } else {
        await expect(page.locator(".oxd-input-field-error-message").first()).toHaveText("Required");
    }
}
