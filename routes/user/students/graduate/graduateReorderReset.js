"use strict"
var express = require('express');
var utils = require('../../../../utils');
var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf();

router.post('/students/graduate/reorder/reset', csrfProtection, function(req, res){

    var studentId = utils.getPersonId(JSON.parse(req.session.profile));
    query.cosMotionDelete(studentId);
    res.send("Hello Danny");

});


module.exports = router;

