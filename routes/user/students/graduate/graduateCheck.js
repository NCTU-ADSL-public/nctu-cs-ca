"use strict"
const request = require('request');
var express = require('express');
var utils = require('../../../../utils');
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf();

router.post('/students/graduate/check', csrfProtection, function(req, res){
    var submit = req.body.check.state;

    if(req.session.profile && submit){
        utils.getPersonIdwCb(JSON.parse(req.session.profile), setSubmitState);
    }
});

router.get('/students/graduate/check',function(req, res){
    let personId = res.locals.studentId;
    //console.log(personId);
    query.findPerson(personId, function(err, result){
        if(err){
            ////console.log(err);
            res.redirect('/');
        }
        else {
            if(JSON.parse(result)[0].graduate_submit === "1")
                res.send({ check: {state: true } });
            else
                res.send({ check: {state: false } });
        }
    });
});

var setSubmitState = function(studentId){
  query.setStudentGraduateSubmit(studentId, '1');
}

module.exports = router;

