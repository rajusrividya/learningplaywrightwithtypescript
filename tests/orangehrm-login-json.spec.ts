import { test } from "@playwright/test";
import fs from "fs";
import path from "path";
import { LoginData, loginAndVerify } from "./utils/orangehrm-login";

// Read the test data from the JSON file
const loginData: LoginData[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, "test-data", "orangehrm-login.json"), "utf-8")
);

// One test is generated for every row in the JSON file
for (const data of loginData) {
    test(`OrangeHRM login (JSON) - ${data.testName}`, async ({ page }) => {
        await loginAndVerify(page, data);
    });
}
