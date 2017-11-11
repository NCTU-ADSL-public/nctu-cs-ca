const request = require('request');
var utils = require('../../../../../utils');
let currentCS = {};
currentCS.processCS = function(req, res, next){
	let courseResult = res.locals.courseResult;
	let now = JSON.parse(req.now);
	
	let taken = [];
	let detail = [];
	let trueCounter;
	let cosNumber;
	if(req.session.profile){
		let studentId = req.query.student_id;
		let temp = parseInt(studentId.substring(0,2));
		// the year the student enter school
		let school_year = (100 + temp);
		if(!studentId){
			console.log("No Student Id");
			return;
		}
		for(let i=0; i<now.length; i++){
			detail[now[i].cos_code] = now[i];
			taken[now[i].cos_code] = true;
		}
		// determine compulsory courses
		let compulse = req.course.compulse;
		//console.log(compulse);
		for(let q=0; q<compulse.length; q++){
			cosNumber = compulse[q].cos_codes;
  			for(let k=0; k<cosNumber.length; k++){
  				let cosInfo = {
                                        cn:'',
                                        en:'',
                                        code:'',
                                        score: -1,
                                        complete:false,
                                        english:false,
                                        grade: '0',
                                        year: 4,
                                        semester:1,
                                        reason: 'now'
                                };
				if(taken[cosNumber[k]] === true){
  				  	let reg = compulse[q].cos_cname.substring(0,3);
					if(reg == '物化生'){
						let temp = datail[cosNumber[k]].cos_cname.substring(0,2);
						cosInfo.cn = detail[cosNumber[k]].cos_cname;
                                        	cosInfo.en = detail[cosNumber[k]].cos_ename;
					}
					cosInfo.cn = compulse[q].cos_cname;
                                	cosInfo.en = compulse[q].cos_ename;
					cosInfo.code = cosNumber[k];
					for(let a = 0; a<courseResult[0].course.length; a++){
						let reg1 = courseResult[0].course[a].cn;
						let reg2 = cosInfo.cn.substring(0,2);
						if(courseResult[0].course[a].cn == cosInfo.cn){
							if(courseResult[0].course[a].complete === true)
								courseResult[0].course[a].reason = 'now';
							else
								courseResult[0].course[a] = cosInfo;
							break;
						}
						else{
							if(reg == '物化生三選一(一)'){
								if(reg2 == '物理'||reg2 == '化學'||reg2 == '生物'){
									courseResult[0].course[a] = cosInfo;
                                                        		break;
								}
							}
						}
					}
					break;
  				}
			}
		}
				    		
		let core = req.course.core;
                for(let q=0; q<core.length; q++){
                        cosNumber = core[q].cos_codes;
                        let cosInfo = {
                                        cn:'',
                                        en:'',
                                        code:'',
                                        score: -1,
                                        complete:'false',
                                        english:false,
                                        grade: '0',
                                        year: 4,
                                        semester:1,
                                        reason: 'now'
                                };
                        for(let k=0; k<cosNumber.length; k++){
                                if(taken[cosNumber[k]] === true){
                                        cosInfo.cn = core[q].cos_cname;
                                        cosInfo.en = core[q].cos_ename;
                                        cosInfo.code = cosNumber[k];
					for(let a = 0; a<courseResult[1].course.length; a++){
                                                if(courseResult[1].course[a].cn == cosInfo.cn){
                                                        courseResult[1].course[a] = cosInfo;
                                                        break;
                                                }
                                        }
                                        break;
                                }
                        }
                }

		//determine the other classes
		let other = req.course.others;
                for(let q=0; q<other.length; q++){
                        cosNumber = other[q].cos_codes;
                        let cosInfo = {
                                        cn:'',
                                        en:'',
                                        code:'',
                                        score: -1,
                                        complete:'false',
                                        english:false,
                                        grade: '0',
                                        year: 4,
                                        semester:1,
                                        reason: 'CS'
                                };
                        for(let k=0; k<cosNumber.length; k++){
                                if(taken[cosNumber[k]] === true){
                                        cosInfo.cn = other[q].cos_cname;
                                        cosInfo.en = other[q].cos_ename;
                                        cosInfo.code = cosNumber[k];
					for(let a = 0; a<courseResult[2].course.length; a++){
                                                if(courseResult[2].course[a].cn == cosInfo.cn){
                                                        courseResult[2].course[a] = cosInfo;
                                                        break;
                                                }
                                        }
                                        break;
                                }
                        }
                }

		//determine the vice
		let vice = req.course.vice;
                for(let q=0; q<vice.length; q++){
                        cosNumber = vice[q].cos_codes;
                        let cosInfo = {
                                        cn:'',
                                        en:'',
                                        code:'',
                                        score: -1,
                                        complete:'false',
                                        english:false,
                                        grade: '0',
                                        year: 4,
                                        semester:1,
                                        reason: 'now'
                                };
                        for(let k=0; k<cosNumber.length; k++){
                                if(taken[cosNumber[k]] === true){
                                        cosInfo.cn = vice[q].cos_cname;
                                        cosInfo.en = vice[q].cos_ename;
                                        cosInfo.code = cosNumber[k];
                                        for(let a = 0; a<courseResult[2].course.length; a++){
                                                if(courseResult[2].course[a].cn == cosInfo.cn){
                                                        courseResult[2].course[a] = cosInfo;
                                                        break;
                                                }
                                        }
					break;
                                }
                        }
                }


	}
  	else {
      		res.redirect('/');
  	}
	res.locals.courseResult = courseResult;
  	next();

}


exports.currentCS = currentCS;
