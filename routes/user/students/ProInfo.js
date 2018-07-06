var express = require('express');
var router = express.Router();
var query = require('../../../db/msql');
var fs = require('fs');
var csrf = require('csurf');
var csrfProtection = csrf();
router.post('/students/ProInfo', csrfProtection, function(req, res){

    if(req.session.profile){

		var teacherID = req.body.teacher_id;
       // console.log("tid:"+teacherID);
        //var teacherName = '彭文志';
        var info;
        var IDlist;
        query.findTeacherInfo(teacherID, function(err, info){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!info)
                res.redirect('/');
            info = JSON.parse(info);
			//console.log(info)
            query.returnTeacherIdList(function(err, IDlist){
                if(err){
                    throw err;
                    res.redirect('/');
                }
                if(!IDlist)
                    res.redirect('/');
                IDlist = JSON.parse(IDlist);
                //console.log(IDlist);
				var empty =0;
                for(var i = 0; i<IDlist.length; i++){
					
                    if(IDlist[i].teacher_id == teacherID){
                        var route = '/home/nctuca/db_data/photo/' + IDlist[i].teacher_id + '.jpg';
                        //var route = '/home/nctuca/db_data/photo/T8152.jpg'
                        var path = 'professor/'+ IDlist[i].teacher_id + '.jpg';
                        //var path = '/T8908.jpg'
                       // console.log(path);
						
						//empty = 1;
					//	break;
						
                        try{
                            var stats = fs.statSync(route);
                            info[0].photo = path;
                            res.send(info);
                        }
                        catch(err){
                            info[0].photo = "";
                            res.send(info);
                        }
						
                        break;
                    }
					//else
					//	empty = 0;
					
                }
			//	if(empty==1){
			//		info[0].photo = path;
              //      res.send(info);
					
			//	}
			//	else{
			//		info[0].photo = "";
              //      res.send(info);
			//	}
            });
        });
     }
     else
        res.redirect('/');

});

module.exports = router;
