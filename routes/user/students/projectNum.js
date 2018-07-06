var express = require('express');
var apps = express();
var router = express.Router();
var getStudentId = require('../course/getStudentId');
var query = require('../course/query');

var StudentId = getStudentId.getStudentId.studentId;
var queryProjectNum = query.query.queryProjectNum;

router.get('/students/projectNum',StudentId, queryProjectNum, function(req, res){
  // console.log("Student:" + StudentId)
    res.send(JSON.parse(req.projectNum));
  
});

module.exports = router;
