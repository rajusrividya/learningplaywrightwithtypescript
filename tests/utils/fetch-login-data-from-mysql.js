// Playwright needs the test data synchronously while it collects tests, but mysql2 is async.
// The MySQL spec runs this script with execFileSync and reads the rows as JSON from stdout.
const mysql = require("mysql2/promise");

(async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "orangehrm_testdata",
    });
    const [rows] = await connection.query(
        "SELECT test_name AS testName, username, password, expected FROM login_data ORDER BY id"
    );
    await connection.end();
    process.stdout.write(JSON.stringify(rows));
})().catch((error) => {
    process.stderr.write(String(error.message || error));
    process.exit(1);
});
