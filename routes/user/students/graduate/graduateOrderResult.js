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
    ////console.log("order Result");
    ////console.log(courses);
    
    /*for(var i = 0; i<courses.length; i++){
        var cos = courses[i].cosname;
        var pre = courses[i].pre;
        var next = courses[i].next;
        ////console.log(cos);
        ////console.log(pre);
        ////console.log(next);
        query.insertCosMotion(studentId, cos, pre, next);
    }*/


});


module.exports = router; 

