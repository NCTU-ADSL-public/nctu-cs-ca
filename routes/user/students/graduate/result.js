var express = require('express');
var utils = require('../../../../utils');
var router = express.Router();

router.get('/students/graduate/result',function(req, res){
    //console.log("in students/graduate/result");
    //console.log(req);
    //console.log("course:");
    //console.log(req.courseResult);
    res.send(req);
});

module.exports = router;

