"use strict"
const request = require('request');
var express = require('express');
var utils = require('../../../../utils');
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var getStudentId = require('../../course/getStudentId');
var router = express.Router();
var studentId = getStudentId.getStudentId.studentId; 
var csrf = require('csurf');
var csrfProtection = csrf();

// submit1 抵免或換修
// submit2 英檢

router.post('/assistants/graduate/english', csrfProtection, function(req, res){
    var submit1 = req.body.check1.state;
    var submit2 = req.body.check2.state;
    let eng_state = "0";
    if(req.session.profile){
        var studentId = res.locals.studentId;
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
});

router.get('/assistants/graduate/english', studentId, function(req, res){
    var personId =res.locals.studentId;
    query.findPerson(personId, function(err, result){
        if(err){
            res.redirect('/');
        }
        else {
            var english = JSON.parse(result)[0].en_certificate;
            res.json({ check: {state: english } });
            ////console.log(result);
            /*
            if(JSON.parse(result)[0].en_certificate == "1")
                res.json({ check: {state: "1" } });
            else if(JSON.parse(result)[0].en_certificate === "21")
                res.json({ check: {state: "21" } });
            else if(JSON.parse(result)[0].en_certificate === "22")
                res.json({ check: {state: "22" } });
            else 
                res.json({ check: {state: "0" } });*/
        }
    });
});

var setSubmitState = function(studentId, state){
  query.setEnCertificate(studentId, state);
}

module.exports = router;

