// Resource Manager is a singleton
let instance;

const  express = require('express');
// Mysql Variabiables

// Set up MySQL Variables
const mysql = require("mysql");
const PORT = process.env.PORT || 5000;
const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "student_survey_db",
});



class ResourceManager {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    instance = express();
    instance.listen(PORT, () => console.log(`listening on port ${PORT}`));
    instance.use(express.json());// configure express server to parse requests with json payloads    
    
    this.API();
  }

  // commentAPI

    API(){
        connection.query();
        instance.get("/students/", (req, res) => {
            connection.query("SELECT * from students", (err, rows) => {
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

    }

    
}

let ResourceManagerInstance = Object.freeze(new ResourceManager());

module.exports = {ResourceManagerInstance};



