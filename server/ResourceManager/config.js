// Used as a static class , has imports and environment variables
class configurations{
    // Imports
    static  express = require('express'); // Express Server
    // Environment Variables
    static PORT = process.env.PORT || 5000;
    // Set up MySQL Variables
    static mysql = require("mysql");

    static connection = this.mysql.createPool({
        connectionLimit: 10,
        host: process.env.MYSQL_HOST || "localhost",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "password",
        database: process.env.MYSQL_DATABASE || "student_survey_db",
    });
}

module.exports = configurations; // Export the blue Print