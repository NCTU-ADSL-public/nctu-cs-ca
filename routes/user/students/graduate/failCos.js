var express = require('express');
var apps = express();
var utils = require('../../../../utils');
var router = express.Router();
var getStudentId = require('../../course/getStudentId');
var query = require('../../course/query');
var fail = require('../../course/fail');

var StudentId = getStudentId.getStudentId.studentId;
var queryPass = query.query.queryPass;
var processFail = fail.fail.processFail;

router.get('/students/course/fail', StudentId, queryPass, processFail, function(req, res){
    res.send(res.locals.failCos);
});

module.exports = router;
