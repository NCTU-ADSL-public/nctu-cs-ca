var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var query = require('../../db/msql');
var utils = require('../../utils');

router.get('/students/info', function(req, res){

    var studentId = utils.getStudentId(JSON.parse(req.session.profile));

    if(!studentId){
          console.log("No Student Id");
          return
    }
    query.findPerson(studentId, function(err,result){
        if(err){
            console.log("Can't find student");
            throw err;
            return;
        }
        if(!result){
            return;
        }
	// check if not student ?
	// Doing this just to fit previous style
	// Personally I think we just should just do res.send(result) 
	// Idk how frontend parsed the data though
	var s = JSON.parse(req.session.profile);
        s.studentInfo = JSON.parse(result);
	res.send(s);
     });

    

});

module.exports = router;

