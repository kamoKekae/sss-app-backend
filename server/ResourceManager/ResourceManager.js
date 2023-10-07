// Imports
const  express = require('express');

// Routes
const studentRouter = express.Router();
const checkListRouter = express.Router();

checkListRouter.get('/getCheckLists',(req,res)=>{
  let studentNumber = req.query.studentNumber;
  let query = `SELECT studentID FROM students where studentNumber=${studentNumber}`;
  

  // Get Students Primary ID and then get courses student enrolled in then get all checkLists
  if(studentNumber === undefined){
    res.send("No student Number provided");
  }else{
    connection.query(query,
      (err,rows)=>{
        if(err){
          res.json({
            success : false,
            err
          })
        }else{
          const studentPrimaryID = rows[0].studentID;
          
          // Get courses Student is enrolled in
          query = `SELECT courseID FROM enrollment where studentID=${studentPrimaryID}`;
          connection.query(query,(err,rows)=>{
              if(err){
                res.json({
                  success: false,
                  err
                });
              }else{

              res.json({
                success : true,
                rows,
                })
              }
          })
        }
      });
  }

  // if(studentNumber != undefined) res.send(studentNumber);
});

studentRouter.get("/checklist/", (req, res) => {
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

// Environment Variables
const PORT = process.env.PORT || 5000;

// Set up MySQL Variables
const mysql = require("mysql");
const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "student_survey_db",
});

// Resource Manager is a singleton
let instance;

class ResourceManager {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    instance = express();
    instance.listen(PORT, () => console.log(`listening on port ${PORT}`));

    instance.use(studentRouter);
    instance.use(checkListRouter);
    instance.use(express.json());// configure express server to parse requests with json payloads    
    this.API();
  }


  // commentAPI

    API(){
      console.log(connection);
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

