const request = require('request');
var utils = require('../../../../../utils');
var CScourse = {};
CScourse.processCS = function(req, res, next){
	var courseResult = res.locals.courseResult;
	var notCS = res.locals.notCS;
	var EnglishCourse = res.locals.English;
	var free = res.locals.free;
	var offset = JSON.parse(req.free);
	var courses = {
		compulse: [],
		core: [],
		vice:[],
		others: [],
		elective:[],
		total:[]
	}
	var taken = [];
	var detail = [];
	var trueCounter;
	var cosNumber;
	if(req.session.profile){
		var studentId = req.query.student_id;
		var temp = parseInt(studentId.substring(0,2));
		var PCBnum = [];
		var NameDetail = [];
		var offsetCheck = [];
		var offsetNameCheck = [];
		// the year the student enter school
		var school_year = (100 + temp);
		if(!studentId){
			console.log("No Student Id");
			return;
		}
		var pass = JSON.parse(req.pass);
		//console.log(pass);
		var rules = JSON.parse(req.rules);
		for(var i=0; i<pass.length; i++){
			detail[pass[i].cos_code] = pass[i];
			taken[pass[i].cos_code] = true;
		}
		for(i = 0; i<offset.length; i++){
			//offsetCheck[offset[i].cos_code] = true;
			offsetNameCheck[offset[i].cos_cname] = true;
		}
		// determine compulsory courses
		var compulse = req.course.compulse;
		//console.log(compulse);
		for(var q=0; q<compulse.length; q++){
			var more = [];
			trueCounter = 0;
			cosNumber = compulse[q].cos_codes;
			if(notCS[compulse[q].cos_cname] === true){
				free[compulse[q].cos_cname].reason = 'notCS';
				free[compulse[q].cos_cname].complete = true;
				courseResult[0].course.push(free[compulse[q].cos_cname]);
			}
			else{
  				for(var k=0; k<cosNumber.length; k++){
					 var cosInfo = {
                                		cn:'',
                                		en:'',
						code:'',
                                		score: -1,
                                		complete:'0',
						english:false,
                                		grade: '0',
                                		year:'',
                                		semester:'',
                                		reason: 'CS'
                        		};
					cosInfo.cn = compulse[q].cos_cname;
                        		cosInfo.en = compulse[q].cos_ename;
  					if(taken[cosNumber[k]] === true){
  				  		cosInfo.code = cosNumber[k];
						cosInfo.score = parseInt(detail[cosNumber[k]].score);
  						cosInfo.grade = detail[cosNumber[k]].score_level;
  						cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
  						cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
  						var reg = detail[cosNumber[k]].cos_cname.substring(0,2);
  						trueCounter++;
  				     		if(detail[cosNumber[k]].pass_fail == '通過'){
  					          	//console.log(detail[cosNumber[k]]);
							cosInfo.complete = true;
  					          	if(reg == '物理' || reg == '化學' || reg == '生物' ){
								if(reg == '物理')
                                					PCBnum.push(cosNumber[k]);
                              					else if(reg == '化學')
                                					PCBnum.push(cosNumber[k]);
                              					else
                                					PCBnum.push(cosNumber[k]);
  					          	}
  				    		}
  				       		else{
  					     		cosInfo.complete = false;
  				    		}
						reg = compulse[q].cos_cname.substring(0,3);
						if(reg != '物化生'){
							more.push(cosInfo);
						}
  					}
  				}
  				if(trueCounter == 0){
					if(offsetNameCheck[cosInfo.cn] != true){
  						reg = cosInfo.cn.substring(0,3);
						if(reg != '物化生'){
							cosInfo.complete = false;
							courseResult[0].course.push(cosInfo);
						}
						else{
							if((offsetNameCheck['物理(一)']!=true)&&(offsetNameCheck['物理(二)']!=true)&&(offsetNameCheck['化學(一)']!=true)&&(offsetNameCheck['化學(二)']!=true)&&(offsetNameCheck['生物(一)']!=true)&&(offsetNameCheck['生物(二)']!=true)){
								cosInfo.complete = false;
								courseResult[0].course.push(cosInfo);
							}
						}
					}
  				}
				else if(more.length >= 1){
					var max = 0;
					var credit;
					var index;
					var code;
					if(more.length == 1){
						if(more[0].complete == true){
							code = more[0].code;
							credit = parseInt(detail[more[0].code].cos_credit);
							courseResult[0].credit += credit;
							if(detail[code].cos_typeext == '英文授課'){
                                                		if((more[0].cn!= '基礎程式設計')&&(detail[code].cos_cname!= '跨領域專題(一)')&&(detail[code].cos_cname!= '資訊工程專題(一)(英文授課)')&&(detail[code].cos_cname!= '資訊工程專題(二)(英文授課)')&&(detail[code].cos_cname!= '資訊工程研討(英文授課)')&&(detail[code].cos_cname!= '資訊工程研討')){
                                                         		if(code.substring(0,3) == 'DCP'){
                                                                		more[0].english = true;
										EnglishCourse.push(more[0]);
									}
                                                        	}
                                                 	}
							courseResult[0].course.push(more[0]);
						 }
						 else
							courseResult[0].course.push(more[0]);
					}

					else{
						for(var d = 0; d<more.length; d++){
							credit = parseInt(detail[more[d].code].cos_credit);
							if(more[d].complete == true){
								if(more[d].score >= max){
									index = d;
									max = more[d].score;
								}
							}
						}
						code = more[index].code;
						if(more[index].complete == true){
							courseResult[0].credit += credit;
							if(detail[code].cos_typeext == '英文授課'){
                                                		if((more[index].cn!= '基礎程式設計')&&(detail[code].cos_cname!= '跨領域專題(一)')&&(detail[code].cos_cname!= '資訊工程專題(一)(英文授課)')&&(detail[code].cos_cname!= '資訊工程專題(二)(英文授課)')&&(detail[code].cos_cname!= '資訊工程研討(英文授課)')&&(detail[code].cos_cname!= '資訊工程研討')){
                                                         		if(code.substring(0,3) == 'DCP'){
                                                                		more[index].english = true;
										EnglishCourse.push(more[index]);
									}
                                                         	}
                                                	}
							courseResult[0].course.push(more[index]);
                                        	}
						else
							courseResult[0].course.push(more[index]);
					}
				}
			}
		}
		for(var i = 0; i<PCBnum.length; i++){
                        var PCBcos = {
                                cn:'',
                                en:'',
                                score: -1,
                                complete:'0',
				grade:'0',
                                year:'',
                                semester:'',
                                reason: 'CS'
                        };
                        PCBcos.cn = detail[PCBnum[i]].cos_cname;
                        PCBcos.en = detail[PCBnum[i]].cos_ename;
                        PCBcos.score = detail[PCBnum[i]].score;
			PCBcos.grade = detail[PCBnum[i]].score_level;
                        PCBcos.complete = true;
                        PCBcos.year = parseInt(detail[PCBnum[i]].year) - school_year + 1;
                        PCBcos.semester = parseInt(detail[PCBnum[i]].semester);
                        var temp = detail[PCBnum[i]].cos_cname.substring(0,2);
                        if(temp == '物理'){
                                courseResult[0].credit += (parseInt(detail[PCBnum[i]].cos_credit) - 1);
				if(courseResult[3].credit < courseResult[3].require){
					courseResult[3].credit++;
					courseResult[3].course.push(PCBcos);

				}
				else{
					courseResult[4].credit++;
					courseResult[4].course.push(PCBcos);
				}
			}
                        else
				courseResult[0].credit += parseInt(detail[PCBnum[i]].cos_credit);
			courseResult[0].course.push(PCBcos);
                }
		//determine the core
		var core = req.course.core;
		for(var q=0; q<core.length; q++){
                        var more = [];
			trueCounter = 0;
			if(notCS[core[q].cos_cname] === true){
                                free[core[q].cos_cname].reason = 'notCS';
				free[core[q].cos_cname].complete = true;
                                courseResult[1].course.push(free[core[q].cos_cname]);
                        }
			else{
                        	cosNumber = core[q].cos_codes;
                        	for(var k=0; k<cosNumber.length; k++){
                                	 var cosInfo = {
                                                cn:'',
                                                en:'',
						code:'',
                                                score: -1,
                                                complete:'0',
						english:false,
                                                grade: '0',
                                                year:'',
                                                semester:'',
                                                reason: 'CS'
                                        };
                                        cosInfo.cn = core[q].cos_cname;
                                        cosInfo.en = core[q].cos_ename;
					if(taken[cosNumber[k]] === true){
                                  		cosInfo.code = cosNumber[k];
						cosInfo.score = parseInt(detail[cosNumber[k]].score);
                                  		cosInfo.grade = detail[cosNumber[k]].score_level;
                                  		cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                                  		cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
						trueCounter++;
				    		if(detail[cosNumber[k]].pass_fail == '通過')
							cosInfo.complete = true;
				     		else
				      			cosInfo.complete = false;
						more.push(cosInfo);

					}
                        	}
                        	if(trueCounter == 0){
                                	if(offsetNameCheck[cosInfo.cn] != true){
						cosInfo.complete = false;
						courseResult[1].course.push(cosInfo);
					}
				}
				else if(more.length >= 1){
                                        var max = 0;
                                        var credit;
                                        var index;
                                        var code;
                                        if(more.length == 1){
                                                if(more[0].complete == true){
							code = more[0].code;
                                                	credit = parseInt(detail[more[0].code].cos_credit);
                                                	courseResult[1].credit += credit;
                                                	if(detail[code].cos_typeext == '英文授課'){
                                                		more[0].english = true;
								EnglishCourse.push(more[0]);
							}
							courseResult[1].course.push(more[0]);
						}
						else
							courseResult[1].course.push(more[0]);
                                        }
					else{
                                                for(var d = 0; d<more.length; d++){
                                                        credit = parseInt(detail[more[d].code].cos_credit);
                                                        if(more[d].complete == true){
                                                                if(more[d].score >= max){
                                                                        index = d;
                                                                        max = more[d].score;
                                                                }
                                                        }
                                                }
						if(more[index].complete == true){
                                                	code = more[index].code;
                                                	courseResult[1].credit += credit;
                                                	if(detail[code].cos_typeext == '英文授課'){
                                                		more[index].english = true;
								EnglishCourse.push(more[index]);
							}
							courseResult[1].course.push(more[index]);
						}
						else
							courseResult[1].course.push(more[index]);
                                        }
				}
			}
                }
		if(courseResult[1].credit >= courseResult[1].require)
			courseResult[1].selection = true;
		//determine the other classes
		var other = req.course.others;
		for(var q=0; q<other.length; q++){
                        var more = [];
			trueCounter = 0;
			if(notCS[other[q].cos_cname] === true){
                                free[other[q].cos_cname].reason = 'notCS';
				free[other[q].cos_cname].complete = true;
				console.log(free[other[q].cos_cname]);
                                courseResult[2].course.push(free[other[q].cos_cname]);
                        }
			else{
                        	cosNumber = other[q].cos_codes;
                        	for(var k=0; k<cosNumber.length; k++){
                                	var cosInfo = {
                                		cn:'',
                               	 		en:'',
						code:'',
                                		score: -1,
						english:false,
                                		complete:'0',
                                		grade:'0',
                                		reason: 'CS',
                                		year: '',
                                		semester: ''
                        		};
                        		cosInfo.cn = other[q].cos_cname;
                        		cosInfo.en = other[q].cos_ename;

					if(taken[cosNumber[k]] === true){
                                  		cosInfo.code = cosNumber[k];
						cosInfo.score = parseInt(detail[cosNumber[k]].score);
                                  		cosInfo.grade = detail[cosNumber[k]].score_level;
                                  		cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                                 		cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
						trueCounter++;
						if(detail[cosNumber[k]].pass_fail == '通過'){
							cosInfo.complete = true;
						}
						else
							cosInfo.complete = false;
						more.push(cosInfo);
					}
                        	}
                        	if(trueCounter == 0){
					if(offsetNameCheck[cosInfo.cn] != true){
						cosInfo.complete = false;
						courseResult[2].course.push(cosInfo);
					}
				}
				else if(more.length >= 1){
                                        var max = 0;
                                        var credit;
                                        var index;
                                        var code;
                                        if(more.length == 1){
						if(more[0].complete == true){
							code = more[0].code;
                                                	credit = parseInt(detail[more[0].code].cos_credit);
                                                	courseResult[2].credit += credit;
                                                	if(detail[code].cos_typeext == '英文授課'){
                                                		more[0].english = true;
								EnglishCourse.push(more[0]);
							}
							courseResult[2].course.push(more[0]);
						}
						else
							courseResult[2].course.push(more[0]);
                                        }
					else{
                                                for(var d = 0; d<more.length; d++){
                                                        credit = parseInt(detail[more[d].code].cos_credit);
                                                        if(more[d].complete == true){
                                                                if(more[d].score >= max){
                                                                        index = d;
                                                                        max = more[d].score;
                                                                }
                                                        }
                                                }
						if(more[index].complete == true){
                                                	code = more[index].code;
                                                	courseResult[2].credit += credit;
                                                	if(detail[code].cos_typeext == '英文授課'){
                                                		more[index].english = true;
								EnglishCourse.push(more[index]);
							}
							courseResult[2].course.push(more[index]);
						}
						else
							courseResult[2].course.push(more[index]);
					}
				}
			}
                }
		//determine the vice
		var vice = req.course.vice;
		for(var q=0; q<vice.length; q++){
                        var more = [];
			trueCounter = 0;
			if(notCS[vice[q].cos_cname] === true){
                                 free[vice[q].cos_cname].reason = 'notCS';
				 free[vice[q].cos_cname].complete = true;
                                 courseResult[2].course.push(free[vice[q].cos_cname]);
                         }
			else{
                        	cosNumber = vice[q].cos_codes;
                        	for(var k=0; k<cosNumber.length; k++){
                                	var cosInfo = {
                                		cn:'',
                                		en:'',
						code:'',
                                		score: -1,
						english:false,
                                		complete:'0',
                                		grade:'0',
                                		reason: 'CS',
                                		year: '',
                                		semester: ''
                        		};
                        		cosInfo.cn = vice[q].cos_cname;
                        		cosInfo.en = vice[q].cos_ename;
					if(taken[cosNumber[k]] === true){
                                  		cosInfo.code = cosNumber[k];
						cosInfo.score = parseInt(detail[cosNumber[k]].score);
                                  		cosInfo.grade = detail[cosNumber[k]].score_level;
                                  		cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                                  		cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
						trueCounter++;
						if(detail[cosNumber[k]].pass_fail == '通過')
							cosInfo.complete = true;
						else
							cosInfo.complete = false;
						more.push(cosInfo);
					}
                        	}
                        	if(trueCounter == 0){
                                	if(offsetNameCheck[cosInfo.cn] != true){
						cosInfo.complete = false;
						courseResult[2].course.push(cosInfo);
					}
				}
				else if(more.length >= 1){
					var max = 0;
                                        var credit;
                                        var index;
                                        var code;
                                        if(more.length == 1){
                                                if(more[0].complete == true){
							code = more[0].code;
                                                	credit = parseInt(detail[more[0].code].cos_credit);
                                               	 	courseResult[2].credit += credit;
                                                	if(detail[code].cos_typeext == '英文授課'){
                                                		more[0].english = true;
								EnglishCourse.push(more[0]);
							}
							courseResult[2].course.push(more[0]);
						}
						else
							courseResult[2].course.push(more[0]);
                                        }
					else{
                                                for(var d = 0; d<more.length; d++){
                                                        credit = parseInt(detail[more[d].code].cos_credit);
                                                        if(more[d].complete == true){
                                                                if(more[d].score >= max){
                                                                        index = d;
                                                                        max = more[d].score;
                                                                }
                                                        }
                                                }
						if(more[index].complete == true){
                                                	code = more[index].code;
                                                	courseResult[2].credit += credit;
                                                	if(detail[code].cos_typeext == '英文授課'){
                                                		more[index].english = true;
								EnglishCourse.push(more[index]);
							}
							courseResult[2].course.push(more[index]);
						}
						else
							courseResult[2].course.push(more[index]);
                                        }
				}
			}
                }
		if(courseResult[2].credit >= courseResult[2].require)
			courseResult[2].selection = true;
	}
  	else {
      		res.redirect('/');
  	}
	res.locals.courseResult = courseResult;
	res.locals.English = EnglishCourse;
  	next();

}


exports.CScourse = CScourse;
