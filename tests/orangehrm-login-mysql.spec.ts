import { test } from "@playwright/test";
import { execFileSync } from "child_process";
import path from "path";
import { LoginData, loginAndVerify } from "./utils/orangehrm-login";

// Connection settings come from env vars: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
// Create the table first with tests/test-data/orangehrm-login.sql
let loginData: LoginData[] = [];
let dbError = "";
try {
    const output = execFileSync(
        process.execPath,
        [path.join(__dirname, "utils", "fetch-login-data-from-mysql.js")],
        { encoding: "utf-8", stdio: ["ignore", "pipe", "pipe"] }
    );
    loginData = JSON.parse(output);
} catch (error: any) {
    dbError = error.stderr || error.message;
}

if (dbError) {
    test("OrangeHRM login (MySQL)", () => {
        test.skip(true, `Could not read test data from MySQL: ${dbError}`);
    });
}

// One test is generated for every row in the login_data table
for (const data of loginData) {
    test(`OrangeHRM login (MySQL) - ${data.testName}`, async ({ page }) => {
        await loginAndVerify(page, data);
    });
}
