import { test } from "@playwright/test";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { LoginData, loginAndVerify } from "./utils/orangehrm-login";

// Read the test data from the CSV file (first row is the header)
const loginData: LoginData[] = parse(
    fs.readFileSync(path.join(__dirname, "test-data", "orangehrm-login.csv"), "utf-8"),
    { columns: true, skip_empty_lines: true }
);

// One test is generated for every row in the CSV file
for (const data of loginData) {
    test(`OrangeHRM login (CSV) - ${data.testName}`, async ({ page }) => {
        await loginAndVerify(page, data);
    });
}
