"use strict"
const request = require('request');
var express = require('express');
var utils = require('../../../../utils');
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var router = express.Router();
var getStudentId = require('../../course/getStudentId');

var csrf = require('csurf');
var csrfProtection = csrf();
var StudentId = getStudentId.getStudentId.studentId;

// submit1 抵免或換修
// submit2 英檢

/*router.post('/students/graduate/english', csrfProtection, function(req, res){
    var submit1 = req.body.check1.state;
    var submit2 = req.body.check2.state;i
    let eng_state = "0";
    if(req.session.profile){
        let studentId = res.locals.studentId;
        if(submit1)
            eng_state = "1";
        else{
            if(submit2)
                eng_state = "21";
            else
                eng_state = "22";
        }
        setSubmitState(studentId, eng_state);
    }
    res.json({ check: {state: eng_state } });
});*/

router.get('/students/graduate/english', StudentId, function(req, res){
    let personId = req.profile[0].student_id;
    query.findPerson(personId, function(err, result){
        if(err){
            res.redirect('/');
        }
        else {
            ////console.log(result);
            var english = JSON.parse(result)[0].en_certificate;
            res.json({ check: {state: english } });
            /*if(JSON.parse(result)[0].en_certificate == "0")
                res.json({ check: {state: "0" } });
            else if(JSON.parse(result)[0].en_certificate == "1")
                res.json({ check: {state: "1" } });
            else if(JSON.parse(result)[0].en_certificate === "2")
                res.json({ check: {state: "21" } });
            else if(JSON.parse(result)[0].en_certificate === "22")
                res.json({ check: {state: "22" } });
            else 
                res.json({ check: {state: "0" } });*/
        }
    });
});
/*
var setSubmitState = function(studentId, state){
  query.setEnCertificate(studentId, state);
}
*/
module.exports = router;

