const { query } = require('express');
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
    configuration.connection.query(query,[studentNumber],(err,result)=>{
      if(err){res.json({success:false , err})}
      else{
        let last_topic ="";
        let send_data = [];// Array of data objects
        for(let row of result){
          // Done to not go over a topic again
          if(row.topic === last_topic ){
            continue;
          }else{
            last_topic = row.topic;
          }
         
          let items_array = []; // Array to hold items
          for(let i =0; i < result.length ;i++){
              if(result[i].topic == row.topic)
                items_array.push(result[i].checkListItem);
          }
          let data = {topic:row.topic ,items : items_array,course_name:row.courseName,deadline :row.deadline ,visibility: row.visibility};
          send_data.push(data);
        }
        res.json(JSON.parse(JSON.stringify(send_data)));

      }
    });
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


checkListRouter.get('/checklist/completed',(req, res)=>{
    let studentNumber = req.query.studentNumber;
    let courseName = req.query.courseName;
    let checkListTopic = req.query.topic;
    console.log(studentNumber);
    let query = `SELECT DISTINCT
                students.studentID,
                checklist.checkListID,
                checklist.deadline,
                checklist.topic,
                course.courseName
                FROM 
                students    
                JOIN
                  completedchecklist ON completedchecklist.studentID = students.studentID
                JOIN 
                  checklist ON checklist.checkListID = completedchecklist.checkListID
                JOIN 
                  course ON course.courseID = completedchecklist.courseID
                WHERE students.studentNumber = ?
                `;

    configuration.connection.query(query,[studentNumber],(err,results)=>{
        if(err){
          res.json({
            success:false,
            message:err
          });
        }else{
          res.json({
            success:true,
            message:"Succesfully retrieved",
            results
          }); 
        }
    });
});

/**
 * TODO : submit ENDPOINT 
 * Used when submitting everything that a student has entered, the outcomes and stuff corresponding to the checklist items
 */
checkListRouter.post('/checklist/submit',(req,res)=>{
  let studentNumber = req.body.studentNumber;
  let courseName = req.body.courseName;
  let checkListTopic = req.body.topic;
  let outcomes = req.body.outcomes;


      /**
     * Update database using stored procedure
     * NAME : checkListCompleted
     * Argc : 3
     * Arguments = courseName,studentNumber,checkListTopic
     *  */ 
    
    let query = "CALL checklistcompleted(?,?,?,?)";
    configuration.connection.query(query,[courseName,studentNumber,checkListTopic,outcomes],(err,results)=>{
      if(err){
        res.json({
          success:false,
          message:err
        });
      }else{
        res.json({
          success:true,
          message:"Succesfully retrieved",
          results
        }); 
      }
  });
});
checkListRouter.get('/checklist/delete',(req,res)=>{
  let courseName = req.query.courseName;
  let topic = req.query.topic;

  let deleteQuery = "CALL deletechecklist(?,?)";
  configuration.connection.query(deleteQuery,[courseName,topic],(err,row)=>{
    if(err){
      res.json({
        success:false,
        err
      });
    }else{
      res.json({
        success:true,
        message: "Checklist deleted successfully."
      });
    }
  });
});
module.exports = checkListRouter;