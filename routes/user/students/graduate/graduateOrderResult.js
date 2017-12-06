var express = require('express');
var query = require('../../../../db/msql');
var router = express.Router();
var getStudentId = require('../../course/getStudentId');
var csrf = require('csurf');
var csrfProtection = csrf();
var StudentId = getStudentId.getStudentId.studentId;


router.post('/students/graduate/orderResult', StudentId, function(req, res){

    var orderResult = req.body;
    //console.log(orderResult);
    var courses = orderResult.POST;
    var studentId = res.locals.studentId;
    
    for(var i = 0; i<courses.length; i++){
        var cos = courses[i].id;
        var pre = courses[i].pre;
        var next = courses[i].next;
        query.insertCosMotion(studentId, cos, pre, next);
    }
    res.send("{danny danny}");

});


module.exports = router; 

