const { json } = require('express');
let configuration = require('./config.js'); // Import Configs Class

const checkListRouter = configuration.express.Router();

checkListRouter.get('/checklist/retrieve',(req,res)=>{
  let studentNumber = req.query.studentNumber;
  let query = `SELECT DISTINCT
          checklist.checkListID,
          checklist.topic,
          course.courseName,
          checklist.courseID,
          checklist.visibility,
          checklist.deadline,
          checklistitems.checkListItemID,
          checklistitems.checkListItem
        FROM
          students
        JOIN
          enrollment ON students.studentID = enrollment.studentID
        JOIN
          course ON enrollment.courseID = course.courseID
        JOIN
          checklist ON course.courseID = checklist.courseID
        JOIN
          checklistitems ON checklist.checkListID = checklistitems.checkListID
        WHERE
          students.studentNumber = ?`;  

  if(studentNumber === undefined){
    res.send("No student Number provided");
  }else{
    configuration.connection.query(query,[studentNumber],(err,row)=>{
      if(err){res.json({success:false , err})}
      res.json({success:true,row});});
  }
});

checkListRouter.post('/checklist/insert',(req,res)=>{

  let courseName = req.body.courseName;   
  let topic      =  req.body.topic;
  let deadline   = req.body.deadline;
  let visibility = req.body.visibility;
  let items      = req.body.items;  

  
  let query = 'INSERT INTO checklist (topic, courseID, visibility, deadline) VALUES (?, (SELECT courseID FROM course WHERE courseName = ?), ?, ?)';

  configuration.connection.getConnection((err,con)=>{
      // Insert new checklist in table
      con.query(query,[topic, courseName, visibility, deadline],(err,rows)=>{
        if(err){
          res.json({
            success : false, err,r : req.body.length});
          }
          else{
            query  = 'select LAST_INSERT_ID() as new_checklist_id';
            con.query(query,(err,rows)=>{
              if(err) res.json({
                success: false,err
              });
              else {
                let new_checklist = rows[0].new_checklist_id;
                console.log("Newly inserted checklist id :", new_checklist);
                // Insert Items into Database
                for(const item of items){
                  query = 'INSERT INTO checklistitems(checkListID , checkListItem) VALUES(?,?)';
                  con.query(query,[new_checklist,item],(err,results)=>{
                    if(err) res.send({err});// Stop execution if an error occurs
                  });
                }

                res.json({success:true ,message :"Items inserted successfully"});
              }
            })
          }
      });
  });
  


});

module.exports = checkListRouter;