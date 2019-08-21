var express = require('express');
var router = express.Router();
//var query = require('../../course/query');
var query = require('../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.get('/students/leodetest',csrfProtection, function(req, res){
    if(req.session.profile) {
    	var list = {
				'student_id': '0416004',
    			'sname': '',
    			'program': '',
    			'total_credit': 0,
    			'en_course': 0,
    			'submit_status': 0,
    			'graduate_status': 0,
    			'pro': 1,
    			'other': 1,
    			'net': [],
    			'media': [],
                'submit_type': -1,
    			'old_total': 1,
    			'old_contemp': 2,
    			'old_culture': 2,
    			'old_history': 2,
    			'old_citizen': 2,
    			'old_group': 2,
                'old_science': 2,
    			'new_total': 1,
                'new_core_total': 0,
    			'new_core_society': 2,
    			'new_core_humanity': 2,
    			'new_basic': 1,
    			'new_cross': 1,
    			'en_status': 1,
                'en_total': 1,
    			'en_basic': 1,
    			'en_advanced': 1,
    			'pe': 6,
    			'service': 2,
    			'art': 2,
    			'mentor': 2,
    			'compulse': [],
                'current': []
		}; 
        /*query.ShowGivenGradeStudentID({grade: '四'}, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');
            }
            res.send(result);
        });*/
        /*
        query.CreateStudentGraduate(list, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');
            }
            res.send(result);
        });
        query.ShowStudentGraduate({student_id: '0416036'}, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');
            }
            res.send(result);
        });*/
        /*query.ShowUserAllScore('0516077',function (err, result){
            if (err) {
               throw err;
              res.redirect('/');
            }
            res.send(JSON.parse(result));
                });*/
        query.ShowUserOffsetApplyForm({all_student: true},function(err,result){
            if(err)
                throw err;
            res.send(JSON.parse(result));
        });  
    }
});

module.exports = router;
