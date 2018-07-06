var express = require('express');
var apps = express();
var router = express.Router();
var getStudentId = require('../course/getStudentId');
var query = require('../course/query');

var StudentId = getStudentId.getStudentId.studentId;
var queryProject = query.query.queryProject;

router.get('/students/project', StudentId, queryProject, function(req, res){
   // console.log("student: " + StudentId);
    res.send(res.locals.project);
});

module.exports = router;

