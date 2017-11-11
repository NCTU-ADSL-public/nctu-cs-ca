const request = require('request');
var utils = require('../../../../../utils');
let CScourse = {};

CScourse.processCS = function(req, res, next){

	let courseResult = res.locals.courseResult;
	let notCS = res.locals.notCS;
	let EnglishCourse = res.locals.English;
	let free = res.locals.free;
	let offset = JSON.parse(req.free);
	//console.log(notCS);
	let PCB = {
		physic: [],
		chemistry: [],
		biology: []
	}
	let taken = [];
	let detail = [];
	let trueCounter;
	let cosNumber;
	if(req.session.profile){
		let studentId = req.query.student_id;
		let temp = parseInt(studentId.substring(0,2));
		let school_year = (100 + temp);
		let program = req.profile[0].program;
		if(!studentId){
			console.log("No Student Id");
			return;
		}
		let pass = JSON.parse(req.pass);
		//console.log(pass);
		let rules = JSON.parse(req.rules);
                //language.require = 8;
		for(let i=0; i<pass.length; i++){
			detail[pass[i].cos_code] = pass[i];
			taken[pass[i].cos_code] = true;
		}
		// determine compulsory courses
		let compulse = req.course.compulse;
		let PCBnum = [];
		let offsetNameCheck = [];
		for(i = 0; i<offset.length; i++){
                        offsetNameCheck[offset[i].cos_cname] = true;
                }
		for(let q=0; q<compulse.length; q++){
			trueCounter = 0;
			let more = [];
			cosNumber = compulse[q].cos_codes;
			if(notCS[compulse[q].cos_cname] === true){
				free[compulse[q].cos_cname].reason = 'notCS';
				free[compulse[q].cos_cname].complete = true;
				courseResult[0].course.push(free[compulse[q].cos_cname]);
			}
			else{
				for(let k=0; k<cosNumber.length; k++){
					let cosInfo = {
                                		cn:'',
                                		en:'',
                                		score: -1,
						code:'',
                                		realCredit: 0,
                                		originalCredit: 0,
                                		complete:'0',
                                		grade:'0',
                                		english: false,
                                		year:'',
                                		semester:'',
                                		reason: 'CS',
                                		move: false
                        		};
                        		cosInfo.cn = compulse[q].cos_cname;
                        		cosInfo.en = compulse[q].cos_ename;
					if(taken[cosNumber[k]] === true){
						cosInfo.code = cosNumber[k];
						cosInfo.score = parseInt(detail[cosNumber[k]].score);
						cosInfo.grade = detail[cosNumber[k]].score_level;
						cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
						cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
						cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
						cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
						let reg = detail[cosNumber[k]].cos_cname.substring(0,2);
						trueCounter++;
				     		if(detail[cosNumber[k]].pass_fail == '通過'){
						//trueCounter++;
							cosInfo.complete = true;
							if(reg == '物理' || reg == '化學' || reg == '生物'){
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
		//determine PCB to put in compulse or professional
		for(i = 0; i<PCBnum.length; i++){
			 let PCBcos = {
                                 cn:'',
                                 en:'',
                                 score: -1,
				 grade:'0',
                                 realCredit: 0,
                                 originalCredit: 0,
                                 complete:'0',
				 english: false,
                                 year:'',
                                 semester:'',
                                 reason: 'CS',
                                 move: false
                         };
			PCBcos.cn = detail[PCBnum[i]].cos_cname;
			PCBcos.en = detail[PCBnum[i]].cos_ename;
			PCBcos.score = detail[PCBnum[i]].score;
			PCBcos.grade = detail[PCBnum[i]].score_level;
			PCBcos.realCredit = parseInt(detail[PCBnum[i]].cos_credit);
			PCBcos.originalCredit = parseInt(detail[PCBnum[i]].cos_credit);
			PCBcos.complete = true;
			PCBcos.year = parseInt(detail[PCBnum[i]].year) - school_year + 1;
			PCBcos.semester = parseInt(detail[PCBnum[i]].semester);
			let temp = detail[PCBnum[i]].cos_cname.substring(0,2);
			if(temp == '物理')
				PCB.physic.push(PCBcos);
			else if(temp == '化學')
				PCB.chemistry.push(PCBcos);
			else
				PCB.biology.push(PCBcos);
		}
		if(PCB.biology.length != 0){
			if(PCB.biology.length == 2){
				for(let s = 0; s<PCB.biology.length; s++){
                                        courseResult[0].credit += PCB.biology[s].originalCredit;
                                        courseResult[0].course.push(PCB.biology[s]);
                                }
				for(let s = 0; s<PCB.chemistry.length; s++){
                                        PCB.chemistry[s].move = true;
					if(courseResult[3].credit < courseResult[3].require){
						courseResult[3].credit += PCB.chemistry[s].originalCredit;
                                        	courseResult[3].course.push(PCB.chemistry[s]);
					}
					else{
						courseResult[4].credit += PCB.chemistry[s].originalCredit;
                                                courseResult[4].course.push(PCB.chemistry[s]);
					}
                                }
				for(let s = 0; s<PCB.physic.length; s++){
                                        PCB.physic[s].move = true;
					if(courseResult[3].credit < courseResult[3].require){
						courseResult[3].credit += PCB.physic[s].originalCredit;
                                        	courseResult[3].course.push(PCB.physic[s]);
					}
					else{
                                                courseResult[4].credit += PCB.physic[s].originalCredit;
                                                courseResult[4].course.push(PCB.physic[s]);
                                        }
                                }
			}
			else{
				courseResult[0].credit += PCB.biology[0].originalCredit;
				courseResult[0].course.push(PCB.biology[0]);
				if(PCB.chemistry.length != 0){
					for(s = 0; s<PCB.chemistry.length; s++){
						if(s == 0){
							courseResult[0].credit += PCB.chemistry[s].originalCredit;
							courseResult[0].course.push(PCB.chemistry[s]);
						}
						else{
							PCB.chemistry[s].move = true;
							if(courseResult[3].credit < courseResult[3].require){
								courseResult[3].credit += PCB.chemistry[s].originalCredit;
                                                        	courseResult[3].course.push(PCB.chemistry[s]);
							}
							else{
                                                		courseResult[4].credit += PCB.chemistry[s].originalCredit;
                                                		courseResult[4].course.push(PCB.chemistry[s]);
                                        		}
						}
					}
					for(s = 0; s<PCB.physic.length; s++){
						PCB.physic[s].move = true;
						if(courseResult[3].credit < courseResult[3].require){
							courseResult[3].credit += PCB.physic[s].originalCredit;
							courseResult[3].course.push(PCB.physic[s]);
						}
						else{
                                                	courseResult[4].credit += PCB.physic[s].originalCredit;
                                                	courseResult[4].course.push(PCB.physic[s]);
                                        	}
					}
				}
				else{
					for(s = 0; s<PCB.physic.length; s++){
                                                if(s == 0){
                                                        PCB.physic[s].realCredit = PCB.physic[s].originalCredit - 1;
							courseResult[0].credit += PCB.physic[s].realCredit;
							if(courseResult[3].credit < courseResult[3].require){
								courseResult[3].credit++;
								courseResult[3].course.push(PCB.physic[s]);
							}
							else{
								courseResult[4].credit++;
								courseResult[4].course.push(PCB.physic[s]);
							}
                                                        courseResult[0].course.push(PCB.physic[s]);
                                                }
                                                else{
                                                        PCB.physic[s].move = true;
							if(courseResult[3].credit < courseResult[3].require){
								courseResult[3].credit += PCB.physic[s].originalCredit;
                                                       		courseResult[3].course.push(PCB.physic[s]);
							}
							else{
                                                        	courseResult[4].credit += PCB.physic[s].originalCredit;
                                                        	courseResult[4].course.push(PCB.physic[s]);
                                                	}
                                                }
                                        }
				}
			}
		}
		else if(PCB.chemistry.length != 0){
			if(PCB.chemistry.length == 2){
				for(s = 0; s<PCB.chemistry.length; s++){
					courseResult[0].credit += PCB.chemistry[s].originalCredit;
					courseResult[0].course.push(PCB.chemistry[s]);
				}
				for(s = 0; s<PCB.physic.length; s++){
                                        PCB.physic[s].move = true;
					if(courseResult[3].credit < courseResult[3].require){
						courseResult[3].credit += PCB.physic[s].originalCredit;
                                       	 	courseResult[3].course.push(PCB.physic[s]);
					}
					else{
                                                courseResult[4].credit += PCB.physic[s].originalCredit;
                                                courseResult[4].course.push(PCB.physic[s]);
                                        }
                                }

			}
			else{
				courseResult[0].credit += PCB.chemistry[0].originalCredit;
                                courseResult[0].course.push(PCB.chemistry[0]);
				for(s = 0; s<PCB.physic.length; s++){
                                                if(s == 0){
                                                        PCB.physic[s].realCredit = PCB.physic[s].originalCredit - 1;
							courseResult[0].credit += PCB.physic[s].realCredit;
							if(courseResult[3].credit < courseResult[3].require){
								courseResult[3].credit++;
								courseResult[3].course.push(PCB.physic[s]);
							}
							else{
								courseResult[4].credit++;
								courseResult[4].course.push(PCB.physic[s]);
							}
                                                        courseResult[0].course.push(PCB.physic[s]);
                                                }
                                                else{
                                                        PCB.physic[s].move = true;
							if(courseResult[3].credit < courseResult[3].require){
								courseResult[3].credit += PCB.physic[s].originalCredit;
                                                        	courseResult[3].course.push(PCB.physic[s]);
							}
							else{
                                                		courseResult[4].credit += PCB.physic[s].originalCredit;
                                                		courseResult[4].course.push(PCB.physic[s]);
                                        		}
                                                }
                                        }
			}

		}
		else{
			for(s = 0; s<PCB.physic.length; s++){
                        	PCB.physic[s].realCredit = PCB.physic[s].originalCredit - 1;
				courseResult[0].credit += PCB.physic[s].realCredit;
				if(courseResult[3].credit < courseResult[3].require){
					courseResult[3].credit++;
					courseResult[3].course.push(PCB.physic[s]);
				}
				else{
					courseResult[4].credit++;
					courseResult[4].course.push(PCB.physic[s]);
				}
                                courseResult[0].course.push(PCB.physic[s]);
                        }

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
				//console.log(cosNumber);
                        	for(let k=0; k<cosNumber.length; k++){
                                	let cosInfo = {
                                		cn:'',
                                		en:'',
                                		score: -1,
						code:'',
                                		grade:'0',
                                		complete:'0',
                                		realCredit: 0,
                                		originalCredit: 0,
                                		english: false,
                                		reason: 'CS',
                                		year: '',
                               			semester: '',
                                		move: false
                        		};
                        		cosInfo.cn = core[q].cos_cname;
                        		cosInfo.en = core[q].cos_ename;
                                	if(taken[cosNumber[k]] === true){
						cosInfo.code = cosNumber[k];
						cosInfo.score = parseInt(detail[cosNumber[k]].score);
						cosInfo.grade = detail[cosNumber[k]].score_level;
						cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
						cosInfo.semester = parseInt(detail[cosNumber[k]].semester);					                		     cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
	  	   				cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
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
							if(detail[code].cos_typeext == '英文授課'){
                                                                more[0].english = true;
                                                                EnglishCourse.push(more[0]);
                                                        }
                                                        if(courseResult[1].credit >= courseResult[1].require){
                                                	//more than the rules core class can be count as professional courses;
                                                        	more[0].move = true;
								if(courseResult[3].credit >= courseResult[3].require){
                                                        		courseResult[4].course.push(more[0]);
                                                        		courseResult[4].credit += credit;
								}
								else{
									courseResult[3].course.push(more[0]);
                                                                        courseResult[3].credit += credit;
								}
                                                	}
                                                	else{
								courseResult[1].credit += credit;
                                                        	courseResult[1].course.push(more[0]);
							}
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
							if(detail[code].cos_typeext == '英文授課'){
                                                                more[index].english = true;
                                                                EnglishCourse.push(more[index]);
                                                        }
							if(courseResult[1].credit >= courseResult[1].require){
                                                        //more than the rules core class can be count as professional courses;
                                                                more[index].move = true;
								if(courseResult[3].credit >= courseResult[3].require){
                                                                        courseResult[4].course.push(more[index]);
                                                                        courseResult[4].credit += credit;
                                                                }
                                                                else{
                                                                        courseResult[3].course.push(more[index]);
                                                                        courseResult[3].credit += credit;
                                                                }
                                                        }
                                                        else{
                                                        	courseResult[1].credit += credit;
                                                        	courseResult[1].course.push(more[index]);
							}
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
                                courseResult[2].course.push(free[other[q].cos_cname]);
                        }
			else{
                        	cosNumber = other[q].cos_codes;
                        	//console.log(cosNumber);
                        	for(let k=0; k<cosNumber.length; k++){
                               		let cosInfo = {
                                		cn:'',
                                		en:'',
						code:'',
						english:false,
                                		score: -1,
                                		grade:'0',
                                		complete:'0',
                                		realCredit: 0,
                                		originalCredit: 0,
                                		reason: 'CS',
                                		year: '',
                                		semester: '',
                                		move: false
                        		};
                        		cosInfo.cn = other[q].cos_cname;
                        		cosInfo.en = other[q].cos_ename;
                               		if(taken[cosNumber[k]] === true){
						cosInfo.code = cosNumber[k];
						cosInfo.score = parseInt(detail[cosNumber[k]].score);
		  				cosInfo.grade = detail[cosNumber[k]].score_level;
						cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;								     cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
						cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
						cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
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
							if(detail[code].cos_typeext == '英文授課'){
                                                                more[0].english = true;
                                                                EnglishCourse.push(more[0]);
                                                        }
                                                	if(courseResult[2].credit >= courseResult[2].require){
                                                        //more than the rules core class can be count as professional courses;
                                                                more[0].move = true;
								if(courseResult[3].credit >= courseResult[3].require){
                                                                        courseResult[4].course.push(more[0]);
                                                                        courseResult[4].credit += credit;
                                                                }
                                                                else{
                                                                        courseResult[3].course.push(more[0]);
                                                                        courseResult[3].credit += credit;
                                                                }
                                                        }
                                                        else{
                                                                courseResult[2].credit += credit;
                                                                courseResult[2].course.push(more[0]);
                                                        }
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
							if(detail[code].cos_typeext == '英文授課'){
                                                                more[index].english = true;
                                                                EnglishCourse.push(more[index]);
                                                        }
							if(courseResult[2].credit >= courseResult[2].require){
                                                        //more than the rules core class can be count as professional courses;
                                                                more[index].move = true;
                                                                if(courseResult[3].credit >= courseResult[3].require){
                                                                        courseResult[4].course.push(more[index]);
                                                                        courseResult[4].credit += credit;
                                                                }
                                                                else{
                                                                        courseResult[3].course.push(more[index]);
                                                                        courseResult[3].credit += credit;
                                                                }
                                                        }
                                                        else{
                                                                courseResult[2].credit += credit;
                                                                courseResult[2].course.push(more[index]);
                                                        }
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
                        	//console.log(cosNumber);
                        	for(let k=0; k<cosNumber.length; k++){
                                	let cosInfo = {
                                		cn:'',
                                		en:'',
						code:'',
						english:false,
                                		score: -1,
                                		grade:'0',
                                		complete:'0',
                                		realCredit: 0,
                                		originalCredit: 0,
                                		reason: 'CS',
                                		year: '',
                                		semester: '',
                                		move: false
                        		};
                        		cosInfo.cn = vice[q].cos_cname;
                        		cosInfo.en = vice[q].cos_ename;
					//console.log(cosNumber[k]);
                                	if(taken[cosNumber[k]] === true){
						cosInfo.code = cosNumber[k];
						cosInfo.score = parseInt(detail[cosNumber[k]].score);
						cosInfo.grade = detail[cosNumber[k]].score_level;
						cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
						cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
						cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
						cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
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
							if(detail[code].cos_typeext == '英文授課'){
                                                                more[0].english = true;
                                                                EnglishCourse.push(more[0]);
                                                        }
                                                        if(courseResult[2].credit >= courseResult[2].require){
                                                        //more than the rules core class can be count as professional courses;
                                                                more[0].move = true;
                                                                if(courseResult[3].credit >= courseResult[3].require){
                                                                        courseResult[4].course.push(more[0]);
                                                                        courseResult[4].credit += credit;
                                                                }
                                                                else{
                                                                        courseResult[3].course.push(more[0]);
                                                                        courseResult[3].credit += credit;
                                                                }
                                                        }
                                                        else{
                                                                courseResult[2].credit += credit;
                                                                courseResult[2].course.push(more[0]);
                                                        }
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
							if(detail[code].cos_typeext == '英文授課'){
                                                                more[index].english = true;
                                                                EnglishCourse.push(more[index]);
                                                        }
                                                        if(courseResult[2].credit >= courseResult[2].require){
                                                        //more than the rules core class can be count as professional courses;
                                                                more[index].move = true;
                                                                if(courseResult[3].credit >= courseResult[3].require){
                                                                        courseResult[4].course.push(more[index]);
                                                                        courseResult[4].credit += credit;
                                                                }
                                                                else{
                                                                        courseResult[3].course.push(more[index]);
                                                                        courseResult[3].credit += credit;
                                                                }
                                                        }
                                                        else{
                                                                courseResult[2].credit += credit;
                                                                courseResult[2].course.push(more[index]);
                                                        }
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
