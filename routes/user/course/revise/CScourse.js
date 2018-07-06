var utils = require('../../../../utils');
var CScourse = {};

CScourse.processCS = function(req, res, next){

	var courseResult = res.locals.courseResult;
	var notCS = res.locals.notCS;
	var EnglishCourse = res.locals.English;
	var free = res.locals.free;
	var offset = JSON.parse(req.free);
    //console.log(offset);
	var PCB = {
		physic: [],
		chemistry: [],
		biology: []
	}
	var taken = [];
	var detail = [];
	var trueCounter;
	var cosNumber;
	if(req.session.profile){
		var studentId = res.locals.studentId;
        var TeacherTime = res.locals.teacher;
        var offsetTeacherTime = res.locals.offsetTeacher;
        ////console.log(TeacherTime);
        var TeacherSame = [];
		var temp = parseInt(studentId.substring(1,2));
		var school_year = (100 + temp);
		var program = req.profile[0].program;
        var Tcount = 0;
        var sameCount = 0;
		if(!studentId){
			//console.log("No Student Id");
			return;
		}
		var pass = JSON.parse(req.pass);
//		console.log(pass);
		var rules = JSON.parse(req.rules);
                //language.require = 8;
		for(var i=0; i<pass.length; i++){
			if(pass[i].cos_cname == '導師時間'){
               // console.log(pass[i]);

                if(taken[pass[i].cos_code] == true){
                    sameCount++;
                    var changeCode = pass[i].cos_code + '_' + sameCount;
                    taken[changeCode] = true;
                    detail[changeCode] = pass[i];
                    ////console.log("temp"+changeCode);
                    ////console.log("sane count"+sameCount);

                }
                else{
                    taken[pass[i].cos_code] = true;
                    detail[pass[i].cos_code] = pass[i];
                }
            }
            else{
                if(taken[pass[i].cos_code] == true){
                    if(pass[i].pass_fail == '通過'){
                        if(detail[pass[i].cos_code].pass_fail == '通過'){
                            if(parseInt(pass[i].score) > parseInt(detail[pass[i].cos_code].score))
                                detail[pass[i].cos_code] = pass[i];
                        }
                        else
                            detail[pass[i].cos_code] = pass[i];
                    }
                }
                else{
                    detail[pass[i].cos_code] = pass[i];
			        taken[pass[i].cos_code] = true;
                }
            }
		}
		// determine compulsory courses
		var compulse = req.course.compulse;
       // console.log(compulse);
        var teacherCount = 0;
		var PCBnum = [];
		var offsetNameCheck = [];
        var offsetCodeCheck = [];
		for(i = 0; i<offset.length; i++){
            offsetNameCheck[offset[i].cos_cname] = true;
            offsetCodeCheck[offset[i].cos_code] = true;
        }
		for(var q=0; q<compulse.length; q++){
			if(compulse[q].cos_cname == '導師時間'){
                for(var t = 0; t<TeacherTime.length; t++){
                     ////console.log("in inside teacher");
                     ////console.log(TeacherTime[t]);
                     var cosInfo = JSON.stringify(TeacherTime[t]);
                     cosInfo = JSON.parse(cosInfo);
                     cosInfo.realCredit = 0;
                     cosInfo.reason = 'notCS';
                     ////console.log(cosInfo);
                     courseResult[0].course.push(cosInfo);
                     Tcount++;
                }
                for(var t = 0; t<offsetTeacherTime.length; t++)
                    Tcount++;
                if(offsetNameCheck[compulse[q].cos_cname] == true);
                else{
                cosNumber = compulse[q].cos_codes;
                for(var k = 0; k<cosNumber.length; k++){
                    var cosInfo = {
                            cn:'',
                            en:'',
                            score:'',
                            code:'',
                            realCredit:'',
                            originalCredit:'',
                            type:'必修',
                            complete:'',
                            grade:'0',
                            english:false,
                            year:'',
                            semester:'',
                            reason:'CS',
                            move:false
                    };
                    cosInfo.cn = compulse[q].cos_cname;
                    cosInfo.en = compulse[q].cos_ename;
                    
                    if(taken[cosNumber[k]] === true){
                        for(var w = 0; w<3; w++){
                            var cosInfo = {
                                    cn:'',
                                    en:'',
                                    score:'',
                                    realCredit:0,
                                    originalCredit:0,
                                    type:'必修',
                                    complete:'',
                                    grade:'0',
                                    english:false,
                                    year:'',
                                    semester:'',
                                    reason:'CS',
                                    move:false
                            };
                            if(w != 0)
                                cosNumber[k] = cosNumber[k] + '_' + w;
                            if(taken[cosNumber[k]] === true){
                                if(detail[cosNumber[k]].pass_fail == '通過'){
                                    cosInfo.cn = compulse[q].cos_cname;
                                    cosInfo.en = compulse[q].cos_ename;
                                    cosInfo.complete = true;
                                    cosInfo.score = parseInt(detail[cosNumber[k]].score);
                                    cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
                                    cosInfo.code = detail[cosNumber[k]].cos_code + '_' + Tcount;
                                    cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                                    cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
                                    cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
                                    cosInfo.type = detail[cosNumber[k]].cos_type;
                                    courseResult[0].course.push(cosInfo);
                                    courseResult[0].credit += parseInt(detail[cosNumber[k]].cos_credit);
                                    Tcount++;
                                    //console.log(Tcount);
                                    //console.log(cosInfo);
                                }
                            }
                        }
                    }
                    }
                }
                for(var w = 0; w<(2 - Tcount); w++){
                    var cosInfo = {
                            cn:'',
                            en:'',
                            score:'',
                            code:'',
                            realCredit:'',
                            originalCredit:0,
                            type:'必修',
                            complete:false,
                            grade:'0',
                            english:false,
                            year:'',
                            semester:'',
                            reason:'CS',
                            move:false
                    };
                    cosInfo.cn = compulse[q].cos_cname;
                    cosInfo.en = compulse[q].cos_ename;
                    courseResult[0].course.push(cosInfo);
                }
                continue;
            }
            trueCounter = 0;
			var more = [];
			cosNumber = compulse[q].cos_codes;
			if(notCS[compulse[q].cos_cname] === true){
                //free[compulse[q].cos_cname].reason = 'notCS';
				free[compulse[q].cos_cname].complete = true;
                var cosInfo = JSON.stringify(free[compulse[q].cos_cname]);
                cosInfo = JSON.parse(cosInfo);
                cosInfo.reason = 'notCS';
                cosInfo.realCredit = 0;
				courseResult[0].course.push(cosInfo);
			}
            else if(offsetNameCheck[compulse[q].cos_cname] == true);
			else{
				for(var k=0; k<cosNumber.length; k++){
					var cosInfo = {
                                		cn:'',
                                		en:'',
                                		score: '',
						code:'',
                                		realCredit: 0,
                                		originalCredit: '',
                                        type:'',
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
						cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
						cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
						cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
                        cosInfo.type = detail[cosNumber[k]].cos_type;
						var reg = detail[cosNumber[k]].cos_cname.substring(0,2);
                        var reg2 = compulse[q].cos_cname.substring(0,3);
						trueCounter++;
				     	if(detail[cosNumber[k]].pass_fail == '通過'){
							cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
                            cosInfo.complete = true;
                            cosInfo.score = parseInt(detail[cosNumber[k]].score);
                            cosInfo.grade = detail[cosNumber[k]].score_level;
							if(reg2 == '物化生'){
									PCBnum.push(cosNumber[k]);
							    }
				    	}
				   		else{
					     		if(reg2 != '物化生')
                                    cosInfo.complete = false;
                                else
                                    PCBnum.push(cosNumber[k]);
				    		}
				    		reg = compulse[q].cos_cname.substring(0,3);
                                   		if(reg != '物化生'){
                                    			more.push(cosInfo);
                                    		}
					}
				}
				if(trueCounter == 0){
					//var checkCount = 0;
                    if(offsetNameCheck[cosInfo.cn] != true){
                        var checkCount = 0;
                        for(var w = 0; w<cosNumber.length; w++){
                            if(offsetCodeCheck[cosNumber[w]] === true){
                                //console.log("match in revise");
                                //console.log(cosInfo); 
                                break;
                            }
                            checkCount++;
                            
                        }  
                        if(checkCount == cosNumber.length){
                            reg = cosInfo.cn.substring(0,3);
                            if(reg != '物化生'){
                                cosInfo.complete = false;
                                courseResult[0].course.push(cosInfo);
                            }
                            else{
                                if((offsetNameCheck['物理(一)']!=true)&&(offsetNameCheck['物理(二)']!=true)&&(offsetNameCheck['化學(一)']!=true)&&(offsetNameCheck['化學(二)']!=true)&&(offsetNameCheck['生物(一)']!=true)&&(offsetNameCheck['生物(二)']!=true)){
                                    cosInfo.code = cosNumber[0];
                                    cosInfo.complete = false;
                                    courseResult[0].course.push(cosInfo);
                                }
                            }
                        }
                    }

				}
				else if(more.length >= 1){
					//console.log("more");
                    //console.log(more);
                    var max = 0;
                                        var credit;
                                        var index = 0;
                                        var code;
                                        if(more.length == 1){
                                                if(more[0].complete == true){
                                                        code = more[0].code;
                                                        credit = parseInt(detail[more[0].code].cos_credit);
                                                       // courseResult[0].credit += credit;
                                                        if(detail[code].cos_typeext == '英文授課'){
                                                        	 if((more[0].cn!= '基礎程式設計')&&(detail[code].cos_cname!= '跨領域專題(一)')&&(detail[code].cos_cname!= '資訊工程專題(一)(英文授課)')&&(detail[code].cos_cname!= '資訊工程專題(二)(英文授課)')&&(detail[code].cos_cname!= '資訊工程研討(英文授課)')&&(detail[code].cos_cname!= '資訊工程研討')){
									if(code.substring(0,3) == 'DCP'){
                                                                                more[0].english = true;
										EnglishCourse.push(more[0]);
									}
                                                                }
                                                        }
                             //console.log("temp:");
                             //console.log(temp);
                             if(more[0].cn == '微處理機系統實驗'){
                                if(temp > 3){
                                    var cosAdd = JSON.stringify(more[0]);
                                    cosAdd = JSON.parse(cosAdd);
                                    cosAdd.realCredit = 1;  
                                    cosAdd.code = more[0].code + '_one';
                                    more[0].realCredit = 2;
                                    if(courseResult[3].credit < courseResult[3].require) {
                                        courseResult[3].credit += cosAdd.realCredit;
                                        courseResult[3].course.push(cosAdd);
                                    }
                                    else{
                                        courseResult[4].credit += cosAdd.realCredit;
                                        courseResult[4].course.push(cosAdd);
                                    }
                                    courseResult[0].credit += more[0].realCredit;
                                    courseResult[0].course.push(more[0]);
                                } 
                                else{
                                  courseResult[0].credit += credit;
                                  courseResult[0].course.push(more[0]);  
                                 }  
                             }     
                             else{                                     
                                 courseResult[0].credit += credit;                             
							     courseResult[0].course.push(more[0]);
                             }
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
                                                        //courseResult[0].credit += credit;
                                                        if(detail[code].cos_typeext == '英文授課'){
                                                        	if((more[index].cn!= '基礎程式設計')&&(detail[code].cos_cname!= '跨領域專題(一)')&&(detail[code].cos_cname!= '資訊工程專題(一)(英文授課)')&&(detail[code].cos_cname!= '資訊工程專題(二)(英文授課)')&&(detail[code].cos_cname!= '資訊工程研討(英文授課)')&&(detail[code].cos_cname!= '資訊工程研討')){
									if(code.substring(0,3) == 'DCP'){
                                                                                more[index].english = true;
										EnglishCourse.push(more[index]);
									}
                                                                }
                                                        }
                            if(more[index].cn =='微處理機系統實驗'){
                                if(temp > 3){
                                    var cosAdd = JSON.stringify(more[index]);
                                    cosAdd = JSON.parse(cosAdd);
                                    cosAdd.realCredit = 1;
                                    cosAdd.code = more[index].code + '_one';
                                    more[index].realCredit = 2;
                                    if(courseResult[3].credit < courseResult[3].require){
                                        courseResult[3].credit += cosAdd.realCredit;
                                        courseResult[3].course.push(cosAdd);
                                    }
                                    else{
                                        courseResult[4].credit += cosAdd.realCredit;
                                        courseResult[4].course.push(cosAdd);
                                    }
                                    courseResult[0].credit += more[index].realCredit;
                                    courseResult[0].course.push(more[index]);
                                }
                                else{
                                    courseResult[0].credit += credit;
                                    courseResult[0].course.push(more[index]);
                                }
                             }
                             else{
                                courseResult[0].credit += credit;
                                courseResult[0].course.push(more[index]);
                            }
                            }
                                                else
                                                        courseResult[0].course.push(more[index]);
                                        }
				}
			}
            ////console.log(teacherCount);
            /*if(teacherCount < 1)
                if(compulse[q].cos_cname == '導師時間'){
                    ////console.log(q);
                    q--;
                    ////console.log(q);
                    teacherCount++;
                }*/
		}
		//determine PCB to put in compulse or professional
		
        for(i = 0; i<PCBnum.length; i++){
			 var PCBcos = {
                                 cn:'',
                                 en:'',
                                 score: -1,
				                 grade:'0',
                                 code:'',
                                 realCredit: 0,
                                 originalCredit: 0,
                                 type:'',
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
			PCBcos.complete = detail[PCBnum[i]].pass_fail;
			PCBcos.year = parseInt(detail[PCBnum[i]].year) - school_year + 1;
			PCBcos.semester = parseInt(detail[PCBnum[i]].semester);
            PCBcos.type = detail[PCBnum[i]].cos_type;
            PCBcos.code = detail[PCBnum[i]].cos_code;
            if(PCBcos.complete == '通過'){
			    PCBcos.complete = true;
                var temp = detail[PCBnum[i]].cos_cname.substring(0,2);
			    if(temp == '物理')
				    PCB.physic.push(PCBcos);
			    else if(temp == '化學')
				    PCB.chemistry.push(PCBcos);
			    else
				    PCB.biology.push(PCBcos);
            }
            else{
                PCBcos.complete = false;
               // courseResult[0].course.push(PCBcos);
            }
		}
		if(PCB.biology.length != 0){
			if(PCB.biology.length == 2){
				for(var s = 0; s<PCB.biology.length; s++){
                                        courseResult[0].credit += PCB.biology[s].originalCredit;
                                        courseResult[0].course.push(PCB.biology[s]);
                                }
				for(var s = 0; s<PCB.chemistry.length; s++){
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
				for(var s = 0; s<PCB.physic.length; s++){
                    PCB.physic[s].move = true;
					var cosAdd = JSON.stringify(PCB.physic[s]);
                    cosAdd = JSON.parse(cosAdd);
                    cosAdd.realCredit = 1;
                    cosAdd.code = PCB.physic[s].code + '_one';
                    PCB.physic[s].realCredit = 3;
                    if(courseResult[3].credit < courseResult[3].require){
						courseResult[3].credit += PCB.physic[s].realCredit;
                        courseResult[3].course.push(PCB.physic[s]);
                        courseResult[3].credit += cosAdd.realCredit;
                        courseResult[3].course.push(cosAdd);
					}
					else{
                                                courseResult[4].credit += PCB.physic[s].realCredit;
                                                courseResult[4].course.push(PCB.physic[s]);
                                                courseResult[4].credit += cosAdd.realCredit;
                                                courseResult[4].course.push(cosAdd);
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
                        var cosAdd = JSON.stringify(PCB.physic[s]);
                        cosAdd = JSON.parse(cosAdd);
                        cosAdd.realCredit = 1;
                        cosAdd.code = PCB.physic[s].code + '_one';
                        PCB.physic[s].realCredit = 3;
						if(courseResult[3].credit < courseResult[3].require){
							courseResult[3].credit += PCB.physic[s].realCredit;
							courseResult[3].course.push(PCB.physic[s]);
                            courseResult[3].credit += cosAdd.realCredit;
                            courseResult[3].course.push(cosAdd);
						}
						else{
                                                	courseResult[4].credit += PCB.physic[s].realCredit;
                                                	courseResult[4].course.push(PCB.physic[s]);
                                                    courseResult[4].credit += cosAdd.realCredit;
                                                    courseResult[4].course.push(cosAdd);
                                        	}
					}
				}
				else{
					for(s = 0; s<PCB.physic.length; s++){
                        if(s == 0){
                                                        PCB.physic[s].realCredit = PCB.physic[s].originalCredit - 1;
							courseResult[0].credit += PCB.physic[s].realCredit;
							if(courseResult[3].credit < courseResult[3].require){
								var cosInfo = JSON.stringify(PCB.physic[s]);
                                cosInfo = JSON.parse(cosInfo);
                                cosInfo.realCredit = 1;
                                cosInfo.code = PCB.physic[s].code + '_one';
                                courseResult[3].credit++;
								courseResult[3].course.push(cosInfo);
							}
							else{
                                var cosInfo = JSON.stringify(PCB.physic[s]);
                                cosInfo = JSON.parse(cosInfo);
                                cosInfo.realCredit = 1;
                                cosInfo.code = PCB.physic[s].code + '_one';
                                courseResult[4].credit++;
								courseResult[4].course.push(cosInfo);
							}
                            courseResult[0].course.push(PCB.physic[s]);
                                                }
                                                       else{
                                                        PCB.physic[s].move = true;
                                                        var cosAdd = JSON.stringify(PCB.physic[s]);
                                                        cosAdd = JSON.parse(cosAdd);
                                                        cosAdd.realCredit = 1;
                                                        cosAdd.code = PCB.physic[s].code + '_one';
                                                        PCB.physic[s].realCredit = 3;
							if(courseResult[3].credit < courseResult[3].require){
								courseResult[3].credit += PCB.physic[s].realCredit;
                                                       		courseResult[3].course.push(PCB.physic[s]);
                                                            courseResult[3].credit += cosAdd.realCredit;
                                                            courseResult[3].course.push(cosAdd);
							}
							else{
                                                        	courseResult[4].credit += PCB.physic[s].realCredit;
                                                        	courseResult[4].course.push(PCB.physic[s]);
                                                            courseResult[4].credit += cosAdd.realCredit;
                                                            courseResult[4].course.push(cosAdd);
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
                    var cosAdd = JSON.stringify(PCB.physic[s]);
                    cosAdd = JSON.parse(cosAdd);
                    cosAdd.realCredit = 1;
                    cosAdd.code = PCB.physic[s].code + '_one';
                    PCB.physic[s].realCredit = 3;
					if(courseResult[3].credit < courseResult[3].require){
						courseResult[3].credit += PCB.physic[s].realCredit;
                                       	 	courseResult[3].course.push(PCB.physic[s]);
                                            courseResult[3].credit += cosAdd.realCredit;
                                            courseResult[3].course.push(cosAdd);
					}
					else{
                                                courseResult[4].credit += PCB.physic[s].realCredit;
                                                courseResult[4].course.push(PCB.physic[s]);
                                                courseResult[4].credit += cosAdd.realCredit;
                                                courseResult[4].course.push(cosAdd);
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
                                var cosInfo = JSON.stringify(PCB.physic[s]);
                                cosInfo = JSON.parse(cosInfo);
                                cosInfo.realCredit = 1;
                                cosInfo.code = PCB.physic[s].code + '_one';
                                courseResult[3].credit++;
								courseResult[3].course.push(cosInfo);
							}
							else{
                                var cosInfo = JSON.stringify(PCB.physic[s]);
                                cosInfo = JSON.parse(cosInfo);
                                cosInfo.realCredit = 1;
                                cosInfo.code = PCB.physic[s].code + '_one';
                                courseResult[4].credit++;
								courseResult[4].course.push(cosInfo);
							}
                                                        courseResult[0].course.push(PCB.physic[s]);
                                                }
                                                else{
                                                        PCB.physic[s].move = true;
                                                        var cosAdd = JSON.stringify(PCB.physic[s]);
                                                        cosAdd = JSON.parse(cosAdd);
                                                        cosAdd.realCredit = 1;
                                                        cosAdd.code = PCB.physic[s].code + '_one';
                                                         PCB.physic[s].realCredit = 3;
							if(courseResult[3].credit < courseResult[3].require){
								courseResult[3].credit += PCB.physic[s].realCredit;
                                                        	courseResult[3].course.push(PCB.physic[s]);
                                                            courseResult[3].credit += cosAdd.realCredit;
                                                            courseResult[3].course.push(cosAdd);
							}
							else{
                                                		courseResult[4].credit += PCB.physic[s].realCredit;
                                                		courseResult[4].course.push(PCB.physic[s]);
                                                        courseResult[4].credit += cosAdd.realCredit;
                                                        courseResult[4].course.push(cosAdd);
                                        		}
                                                }
                                        }
			}

		}
		else{
			//console.log("PCB");
            //console.log(PCB);
            for(s = 0; s<PCB.physic.length; s++){
               	PCB.physic[s].realCredit = PCB.physic[s].originalCredit - 1;
				courseResult[0].credit += PCB.physic[s].realCredit;
				if(courseResult[3].credit < courseResult[3].require){
                    var cosInfo = JSON.stringify(PCB.physic[s]);
                    cosInfo = JSON.parse(cosInfo);
                    cosInfo.realCredit = 1;
                    cosInfo.code = PCB.physic[s].code + '_one';
                    courseResult[3].credit++;
					courseResult[3].course.push(cosInfo);
				}
				else{
                    var cosInfo = JSON.stringify(PCB.physic[s]);
                    cosInfo = JSON.parse(cosInfo);
                    cosInfo.realCredit = 1;
                    cosInfo.code = PCB.physic[s].code + '_one';
                    courseResult[4].credit++;
					courseResult[4].course.push(cosInfo);
				}
                                courseResult[0].course.push(PCB.physic[s]);
             }

		}
		//determine the core
		var core = req.course.core;
        //console.log(req.course);
        //console.log("core");
        //console.log(core);
		for(var q=0; q<core.length; q++){
                        var more = [];
			trueCounter = 0;
			if(notCS[core[q].cos_cname] === true){
				free[core[q].cos_cname].complete = true;
                var cosInfo = JSON.stringify(free[core[q].cos_cname]);
                cosInfo = JSON.parse(cosInfo);
                cosInfo.realCredit = 0;
                cosInfo.reason = 'notCS';
                courseResult[1].course.push(cosInfo);
            }
            else if(offsetNameCheck[core[q].cos_cname] == true);
			else{
                        	cosNumber = core[q].cos_codes;
				////console.log(cosNumber);
                        	for(var k=0; k<cosNumber.length; k++){
                                	var cosInfo = {
                                		cn:'',
                                		en:'',
                                		score: '',
						code:'',
                                		grade:'0',
                                		complete:'0',
                                        type:'',
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
						cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
						cosInfo.semester = parseInt(detail[cosNumber[k]].semester);					   
                        cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
						cosInfo.type = detail[cosNumber[k]].cos_type;
                        trueCounter++;
				    		if(detail[cosNumber[k]].pass_fail == '通過'){
							    cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
                                cosInfo.score = parseInt(detail[cosNumber[k]].score);
                                cosInfo.grade = detail[cosNumber[k]].score_level;
                                cosInfo.complete = true;
                            }
				     		else
				      			cosInfo.complete = false;
						more.push(cosInfo);
					}
                        	}
                        	if(trueCounter == 0){
                                	if(offsetNameCheck[cosInfo.cn] != true){
						                cosInfo.code = cosNumber[0];
                                        cosInfo.complete = false;
						                courseResult[1].course.push(cosInfo);
					}
				}
				else if(more.length >= 1){
					var max = 0;
                                        var credit;
                                        var index = 0;
                                        var code;
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
		var other = req.course.others;
		for(var q=0; q<other.length; q++){
                        var more = [];
			trueCounter = 0;
			if(notCS[other[q].cos_cname] === true){
				free[other[q].cos_cname].complete = true;
                var cosInfo = JSON.stringify(free[other[q].cos_cname]);
                cosInfo = JSON.parse(cosInfo);
                cosInfo.realCredit = 0;
                cosInfo.reason = 'notCS';
                courseResult[2].course.push(cosInfo);
            }
            else if(offsetNameCheck[other[q].cos_cname] == true);
			else{
                        	cosNumber = other[q].cos_codes;
                        	////console.log(cosNumber);
                        	for(var k=0; k<cosNumber.length; k++){
                               		var cosInfo = {
                                		cn:'',
                                		en:'',
						code:'',
						english:false,
                                		score: '',
                                		grade:'0',
                                        type:'',
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
						cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;								     cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
						cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
                        cosInfo.type = detail[cosNumber[k]].cos_type;
						trueCounter++;
						if(detail[cosNumber[k]].pass_fail == '通過'){
							cosInfo.complete = true;
                            cosInfo.score = parseInt(detail[cosNumber[k]].score);
                            cosInfo.grade = detail[cosNumber[k]].score_level;
                            cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
                        }
						else
							cosInfo.complete = false;
						more.push(cosInfo);
					}
                        	}
                        	if(trueCounter == 0){
					if(offsetNameCheck[cosInfo.cn] != true){
						cosInfo.complete = false;
                        cosInfo.code = cosNumber[0];
						//courseResult[2].course.push(cosInfo);
					}
				}
				else if(more.length >= 1){
					var max = 0;
                                        var credit;
                                        var index = 0;
                                        var code;
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
                                                //else
                                                        //courseResult[2].course.push(more[0]);
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
                                                //else
                                                        //courseResult[2].course.push(more[index]);
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
				 free[vice[q].cos_cname].complete = true;
                 var cosInfo = JSON.stringify(free[vice[q].cos_cname]);
                 cosInfo = JSON.parse(cosInfo);
                 cosInfo.realCredit = 0;
                 cosInfo.reason = 'notCS';
                 courseResult[2].course.push(cosInfo);
            }
            else if(offsetNameCheck[vice[q].cos_cname] == true);
			else{
                        	cosNumber = vice[q].cos_codes;
                        	////console.log(cosNumber);
                        	for(var k=0; k<cosNumber.length; k++){
                                	var cosInfo = {
                                		cn:'',
                                		en:'',
						code:'',
						english:false,
                                		score: '',
                                		grade:'0',
                                        type:'',
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
					////console.log(cosNumber[k]);
                                	if(taken[cosNumber[k]] === true){
						cosInfo.code = cosNumber[k];
						cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
						cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
						cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
                        cosInfo.type = detail[cosNumber[k]].cos_type;
						trueCounter++;
						if(detail[cosNumber[k]].pass_fail == '通過'){
							cosInfo.complete = true;
                            cosInfo.score = parseInt(detail[cosNumber[k]].score);
                            cosInfo.grade = detail[cosNumber[k]].score_level;
                            cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
						}
						else
							cosInfo.complete = false;
						more.push(cosInfo);
					}
                        	}
                        	if(trueCounter == 0){
                                	if(offsetNameCheck[cosInfo.cn] != true){
						cosInfo.complete = false;
                        cosInfo.code = cosNumber[0];
						//courseResult[2].course.push(cosInfo);
					}
				}
				else if(more.length >= 1){
					var max = 0;
                                        var credit;
                                        var index = 0;
                                        var code;
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
                                                //else
                                                       // courseResult[2].course.push(more[0]);
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
                                                //else
                                                        //courseResult[2].course.push(more[index]);
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
	res.locals.free = free;
	res.locals.notCS = notCS;
        next();
}

exports.CScourse = CScourse;
