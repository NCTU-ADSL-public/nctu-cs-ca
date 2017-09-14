var express = require('express');
var router = express.Router();
var query = require('../../db/msql');

console.log(query);

router.get('/students/info', function(req, res){

    console.log('Get request to /students/info');
    var tempObj = JSON.parse(req.session.profile);
    var studentId = tempObj.username;
    if(!studentId){
          console.log("No Student Id");
          return
    }
    var result;
    var studentId = "0312512";
    query.findPerson(studentId, function(err,student){
        if(err){
            console.log("Can't find student");
            throw err;
            return;
        }
        if(!student){
            return;
        }
        console.log("find student");
        student = JSON.parse(student);
        result = JSON.parse(req.session.profile);
        //console.log("student");
        //console.log(student);
        result.studentInfo = student;
     });

    

});

module.exports = router;

