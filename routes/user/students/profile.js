var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var utils = require('../../../utils');

router.get('/students/profile', function(req, res){

    if(req.session.profile){
        var studentId = utils.getPersonId(JSON.parse(req.session.profile));

        if(!studentId){
              console.log("No Student Id");
              return;
        }
        query.findPerson(studentId, function(err,result){
            if(err){
                console.log("Can't find student");
                throw err;
                return;
            }
            if(!result){
                return;
            }
            console.log("profile:");
            console.log(result);
	    res.send(result);
	    //query.close();
        });
    }
    else{
        return;
    }

});

module.exports = router;

