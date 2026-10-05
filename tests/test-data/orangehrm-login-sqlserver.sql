-- Open this file in SQL Server Management Studio and click Execute (F5)
IF DB_ID('orangehrm_testdata') IS NULL
    CREATE DATABASE orangehrm_testdata;
GO

USE orangehrm_testdata;
GO

DROP TABLE IF EXISTS login_data;
CREATE TABLE login_data (
    id INT IDENTITY(1,1) PRIMARY KEY,
    test_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL DEFAULT '',
    password VARCHAR(100) NOT NULL DEFAULT '',
    expected VARCHAR(20) NOT NULL CHECK (expected IN ('success', 'invalid', 'required'))
);

INSERT INTO login_data (test_name, username, password, expected) VALUES
    ('valid credentials', 'Admin', 'admin123', 'success'),
    ('wrong password', 'Admin', 'wrong123', 'invalid'),
    ('wrong username', 'NoSuchUser', 'admin123', 'invalid'),
    ('empty username', '', 'admin123', 'required'),
    ('empty password', 'Admin', '', 'required');

SELECT * FROM login_data;
