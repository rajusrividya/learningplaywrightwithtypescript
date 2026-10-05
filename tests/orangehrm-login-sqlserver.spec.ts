import { test } from "@playwright/test";
import { execFileSync } from "child_process";
import path from "path";
import { LoginData, loginAndVerify } from "./utils/orangehrm-login";

// Connection settings come from env vars: DB_SERVER, DB_INSTANCE, DB_USER, DB_PASSWORD, DB_NAME
// Create the table first with tests/test-data/orangehrm-login-sqlserver.sql
let loginData: LoginData[] = [];
let dbError = "";
try {
    const output = execFileSync(
        process.execPath,
        [path.join(__dirname, "utils", "fetch-login-data-from-sqlserver.js")],
        { encoding: "utf-8", stdio: ["ignore", "pipe", "pipe"] }
    );
    loginData = JSON.parse(output);
} catch (error: any) {
    dbError = error.stderr || error.message;
}

if (dbError) {
    test("OrangeHRM login (SQL Server)", () => {
        test.skip(true, `Could not read test data from SQL Server: ${dbError}`);
    });
}

// One test is generated for every row in the login_data table
for (const data of loginData) {
    test(`OrangeHRM login (SQL Server) - ${data.testName}`, async ({ page }) => {
        await loginAndVerify(page, data);
    });
}
