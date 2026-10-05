-- Run once against your MySQL server:  mysql -u root -p < tests/test-data/orangehrm-login.sql
CREATE DATABASE IF NOT EXISTS orangehrm_testdata;
USE orangehrm_testdata;

DROP TABLE IF EXISTS login_data;
CREATE TABLE login_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL DEFAULT '',
    password VARCHAR(100) NOT NULL DEFAULT '',
    expected ENUM('success', 'invalid', 'required') NOT NULL
);

INSERT INTO login_data (test_name, username, password, expected) VALUES
    ('valid credentials', 'Admin', 'admin123', 'success'),
    ('wrong password', 'Admin', 'wrong123', 'invalid'),
    ('wrong username', 'NoSuchUser', 'admin123', 'invalid'),
    ('empty username', '', 'admin123', 'required'),
    ('empty password', 'Admin', '', 'required');
