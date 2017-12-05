var express = require('express');
var query = require('../../../../../db/msql');
var router = express.Router();
var getStudentId = require('../../../course/getStudentId');
var StudentId = getStudentId.getStudentId.studentId;
var methods = require('./methods');
var checkCard = methods.method.checkCard;
var insertToDB = methods.method.insertToDB;

router.post('/students/graduate/change', StudentId, checkCard);


module.exports = router; 

