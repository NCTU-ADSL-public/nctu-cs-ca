const request = require('request');
var utils = require('../../../../../utils');
let CScourse = {};
CScourse.processCS = function(req, res, next){
	let courseResult = res.locals.courseResult;
	let notCS = res.locals.notCS;
	let EnglishCourse = res.locals.English;
	let free = res.locals.free;
	let offset = JSON.parse(req.free);
	let courses = {
		compulse: [],
		core: [],
		vice:[],
		others: [],
		elective:[],
		total:[]
	}
	let taken = [];
	let detail = [];
	let trueCounter;
	let cosNumber;
	if(req.session.profile){
		let studentId = req.query.student_id;
		let temp = parseInt(studentId.substring(0,2));
		let PCBnum = [];
		let NameDetail = [];
		let offsetCheck = [];
		let offsetNameCheck = [];
		// the year the student enter school
		let school_year = (100 + temp);
		if(!studentId){
			console.log("No Student Id");
			return;
		}
		let pass = JSON.parse(req.pass);
		//console.log(pass);
		let rules = JSON.parse(req.rules);
		for(let i=0; i<pass.length; i++){
			detail[pass[i].cos_code] = pass[i];
			taken[pass[i].cos_code] = true;
		}
		for(let i = 0; i<offset.length; i++){
			//offsetCheck[offset[i].cos_code] = true;
			offsetNameCheck[offset[i].cos_cname] = true;
		}
		// determine compulsory courses
		let compulse = req.course.compulse;
		//console.log(compulse);
					 let cosInfo = {
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
		for(let q=0; q<compulse.length; q++){
			let more = [];
			trueCounter = 0;
			cosNumber = compulse[q].cos_codes;
			if(notCS[compulse[q].cos_cname] === true){
				free[compulse[q].cos_cname].reason = 'notCS';
				free[compulse[q].cos_cname].complete = true;
				courseResult[0].course.push(free[compulse[q].cos_cname]);
			}
			else{
                let reg;
  				for(let k=0; k<cosNumber.length; k++){
					cosInfo.cn = compulse[q].cos_cname;
                        		cosInfo.en = compulse[q].cos_ename;
  					if(taken[cosNumber[k]] === true){
  				  		cosInfo.code = cosNumber[k];
						cosInfo.score = parseInt(detail[cosNumber[k]].score);
  						cosInfo.grade = detail[cosNumber[k]].score_level;
  						cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
  						cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
  						reg = detail[cosNumber[k]].cos_cname.substring(0,2);
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
					let max = 0;
					let credit;
					let index;
					let code;
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
						for(let d = 0; d<more.length; d++){
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
		for(let i = 0; i<PCBnum.length; i++){
                        let PCBcos = {
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
                        let temp = detail[PCBnum[i]].cos_cname.substring(0,2);
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
		let core = req.course.core;
		for(let q=0; q<core.length; q++){
                        let more = [];
			trueCounter = 0;
			if(notCS[core[q].cos_cname] === true){
                                free[core[q].cos_cname].reason = 'notCS';
				free[core[q].cos_cname].complete = true;
                                courseResult[1].course.push(free[core[q].cos_cname]);
                        }
			else{
                        	cosNumber = core[q].cos_codes;
                        	for(let k=0; k<cosNumber.length; k++){
                                	 let cosInfo = {
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
                                        let max = 0;
                                        let credit;
                                        let index;
                                        let code;
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
                                                for(let d = 0; d<more.length; d++){
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
		let other = req.course.others;
		for(let q=0; q<other.length; q++){
                        let more = [];
			trueCounter = 0;
			if(notCS[other[q].cos_cname] === true){
                                free[other[q].cos_cname].reason = 'notCS';
				free[other[q].cos_cname].complete = true;
				console.log(free[other[q].cos_cname]);
                                courseResult[2].course.push(free[other[q].cos_cname]);
                        }
			else{
                        	cosNumber = other[q].cos_codes;
                        	for(let k=0; k<cosNumber.length; k++){
                                	let cosInfo = {
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
                                        let max = 0;
                                        let credit;
                                        let index;
                                        let code;
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
                                                for(let d = 0; d<more.length; d++){
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
		let vice = req.course.vice;
		for(let q=0; q<vice.length; q++){
                        let more = [];
			trueCounter = 0;
			if(notCS[vice[q].cos_cname] === true){
                                 free[vice[q].cos_cname].reason = 'notCS';
				 free[vice[q].cos_cname].complete = true;
                                 courseResult[2].course.push(free[vice[q].cos_cname]);
                         }
			else{
                        	cosNumber = vice[q].cos_codes;
                        	for(let k=0; k<cosNumber.length; k++){
                                	let cosInfo = {
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
					let max = 0;
                                        let credit;
                                        let index;
                                        let code;
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
                                                for(let d = 0; d<more.length; d++){
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
