var express = require('express');
var router = express.Router();
var query = require('../../../db/msql.js');
    
router.get('/assistants/students' , function(req, res){

    if(req.session.profile){

        let student_id = req.query.student_id;
        query.findPerson(student_id, function(err, result){
            if(err){
                    ////console.log("Can't find student");
                    res.status(500).send({ error: 'Something failed!' });
            }
            if(result == '[]'){
                    ////console.log("Can't find student");
                    res.status(500).send({ error: 'Something failed!' });
            }
            else
                res.send(result);
        });





    }





});

module.exports = router;
