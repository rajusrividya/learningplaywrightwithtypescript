// Playwright needs the test data synchronously while it collects tests, but mssql is async.
// The SQL Server spec runs this script with execFileSync and reads the rows as JSON from stdout.
const sql = require("mssql");

(async () => {
    const pool = await sql.connect({
        server: process.env.DB_SERVER || "localhost",
        user: process.env.DB_USER || "sa",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "orangehrm_testdata",
        options: {
            instanceName: process.env.DB_INSTANCE || "MSSQLSERVER2017",
            encrypt: false,
            trustServerCertificate: true,
        },
    });
    const result = await pool.request().query(
        "SELECT test_name AS testName, username, password, expected FROM login_data ORDER BY id"
    );
    await pool.close();
    process.stdout.write(JSON.stringify(result.recordset));
})().catch((error) => {
    process.stderr.write(String(error.message || error));
    process.exit(1);
});
