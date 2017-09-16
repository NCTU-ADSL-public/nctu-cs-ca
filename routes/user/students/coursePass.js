var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var utils = require('../../../utils');

router.get('/students/coursePass', function(req, res){

    var studentId = utils.getStudentId(JSON.parse(req.session.profile));

    if(!studentId){
          console.log("No Student Id");
          return
    }
    query.showCosMapPass(studentId, function(err,result){
        if(err){
            console.log("Can't find student");
            throw err;
            return;
        }
        if(!result){
            return;
        }
	res.send(result);
     });

    

});

module.exports = router;

