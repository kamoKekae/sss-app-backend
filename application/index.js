const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json());// configure express server to parse requests with json payloads
const PORT = process.env.PORT || 5000;

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "student_survey_db",
});

connection.query()
app.get("/", (req, res) => {
  connection.query("SELECT * from comment", (err, rows) => {
    if (err) {
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        rows,
      });
    }
  });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

