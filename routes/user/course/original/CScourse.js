var utils = require('../../../../utils');
var CScourse = {};
CScourse.processCS = function(req, res, next){
	
    if(req.session.profile){
        var courseResult = res.locals.courseResult;
	    var notCS = res.locals.notCS;
	    var EnglishCourse = res.locals.English;
	    var free = res.locals.free;
	    var offset = JSON.parse(req.free);
        var TeacherTime = res.locals.teacher;
        var offsetTeacherTime = res.locals.offsetTeacher;
        var TeacherSame = [];
        //////console.log(offset);
	    var taken = [];
    	var detail = [];
	    var trueCounter;
	    var cosNumber;
        var sameCount = 0;
        var Tcount = 0;
		var studentId = res.locals.studentId;
		var temp = parseInt(studentId.substring(0,2));
		var PCBnum = [];
		var NameDetail = [];
		var offsetCheck = [];
		var offsetNameCheck = [];
        var offsetCodeCheck = [];
		// the year the student enter school
		var school_year = (100 + temp);
		if(!studentId){
			////////console.log("No Student Id");
			return;
		}
		var pass = JSON.parse(req.pass);
		//////console.log(pass);
		var rules = JSON.parse(req.rules);
		for(var i=0; i<pass.length; i++){
			if(pass[i].cos_cname == '導師時間'){
                if(taken[pass[i].cos_code] === true){
                    sameCount++;
                    var changeCode = pass[i].cos_code + '_' + sameCount;
                    taken[changeCode] = true;
                    detail[changeCode] = pass[i];
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
		for(i = 0; i<offset.length; i++){
			offsetCodeCheck[offset[i].cos_code] = true;
			offsetNameCheck[offset[i].cos_cname] = true;
		}
		// determine compulsory courses
		var compulse = req.course.compulse;
        var teacherCount = 0;
        // compulse from database
        // notCS : If a student take an [other course] that has the same name as [computer science courses]. It will be pushed into notCS array.
		for(var q=0; q<compulse.length; q++){
		    if(compulse[q].cos_cname == '導師時間'){
                for(var t = 0; t<TeacherTime.length; t++){
                    var cosInfo  = JSON.stringify(TeacherTime[t]);
                    cosInfo = JSON.parse(cosInfo);
                    cosInfo.realCredit = 0;
                    cosInfo.reason = 'notCS';
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
                            realCredit:0,
                            complete:'',
                            grade:'0',
                            english:false,
                            year:'',
                            semester:'',
                            reason:'CS',
                    };
                    cosInfo.cn = compulse[q].cos_cname;
                    cosInfo.en = compulse[q].cos_ename;
                    if(taken[cosNumber[k]] === true){
                        for(var w = 0; w<3; w++){
                            if(w != 0)
                                cosNumber[k] = cosNumber[k] + '_' + w;
                            if(taken[cosNumber[k]] === true){
                                if(detail[cosNumber[k]].pass_fail == '通過'){
                                    cosInfo.complete = true;
                                    cosInfo.score = parseInt(detail[cosNumber[k]].score);
                                    cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
                                    cosInfo.code = cosNumber[k];
                                    cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                                    cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
                                    courseResult[0].course.push(cosInfo);
                                    courseResult[0].credit += parseInt(detail[cosNumber[k]].cos_credit);
                                    Tcount++;
                                }    
                            }   
                        }   
                    }
                    }
                } 
                for(var w = 0; w < (2 - Tcount); w++){
                    var cosInfo = {
                            cn:'',
                            en:'',
                            score:'',
                            code:'',
                            realCredit:0,
                            complete:false,
                            grade:'0',
                            english:false,
                            year:'',
                            semester:'',
                            reason:'',   
                    };   
                    cosInfo.cn = compulse[q].cos_cname;
                    cosInfo.en = compulse[q].cos_ename;
                    courseResult[0].course.push(cosInfo);  
                }
                continue;
            }	
            
            var more = [];
			trueCounter = 0;
			cosNumber = compulse[q].cos_codes;
			if(notCS[compulse[q].cos_cname] === true){ // Find the courses in [notCS] which belongs to compulse 
				free[compulse[q].cos_cname].complete = true;
                var cosInfo = JSON.stringify(free[compulse[q].cos_cname]);
                cosInfo = JSON.parse(cosInfo);
                cosInfo.realCredit = 0;
                cosInfo.reason = 'notCS';
				courseResult[0].course.push(cosInfo);
			}
            else if(offsetNameCheck[compulse[q].cos_cname] == true);
			else{ // Process compulse course that is taken
  				for(var k=0; k<cosNumber.length; k++){ // { cosName : [cosNumbers] ... }
			        var cosInfo = {
                            cn:'',
                            en:'',
					        code:'',
                           	score: -1,
                            realCredit:0,
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
  						var reg = detail[cosNumber[k]].cos_cname.substring(0,2);
                        // detail is equal to pass, but index by course code 
                        var reg2 = compulse[q].cos_cname.substring(0,3);
  						trueCounter++; // how many This course did a student take
                        // eg: he might take both 線性代數 english and chinese course but the course number is different -> trueCounter = 2 in this case
  				     	if(detail[cosNumber[k]].pass_fail == '通過'){
                            cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                            cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
                            cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
                            cosInfo.score = parseInt(detail[cosNumber[k]].score);
                            cosInfo.grade = detail[cosNumber[k]].score_level;
                            cosInfo.complete = true;
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
							more.push(cosInfo); // if take two courses which relate to same name in group table we need to determine which course has higher score thus we push all of them to more array first
						}
  					}
  				}
  				if(trueCounter == 0){ // if did not appear in pass array from DB true counter will be 0 however the student might 抵免 this course thus we need to check
			        //////console.log("cos count = 0");
                    //////console.log(cosInfo);
                    if(offsetNameCheck[cosInfo.cn] != true){  
                        // offsetName 抵免
                        var checkCount = 0;
                        for(var w = 0; w<cosNumber.length; w++){
                            if(offsetCodeCheck[cosNumber[w]] === true){
                                //////console.log("match in original");
                                ///////console.log(cosInfo);
                                break;
                            }
                            else
                                checkCount++;
                        } // 1116 JOEY & SOPHIA
                        if(checkCount == cosNumber.length){
                            reg = cosInfo.cn.substring(0,3);
						    if(reg != '物化生'){
						    	cosInfo.complete = false;
							    courseResult[0].course.push(cosInfo);
						    }   
						    else{
							    //////console.log("In pcb fail");
                                //////console.log(cosInfo);
                                if((offsetNameCheck['物理(一)']!=true)&&(offsetNameCheck['物理(二)']!=true)&&(offsetNameCheck['化學(一)']!=true)&&(offsetNameCheck['化學(二)']!=true)&&(offsetNameCheck['生物(一)']!=true)&&(offsetNameCheck['生物(二)']!=true)){
								    cosInfo.complete = false;
								    courseResult[0].course.push(cosInfo);
							    }
						    }
                        }
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
							courseResult[0].credit += credit;
							if(detail[code].cos_typeext == '英文授課'){
                                if((more[0].cn!= '基礎程式設計')&&(detail[code].cos_cname!= '跨領域專題(一)')&&(detail[code].cos_cname!= '資訊工程專題(一)(英文授課)')&&(detail[code].cos_cname!= '資訊工程專題(二)(英文授課)')&&(detail[code].cos_cname!= '資訊工程研討(英文授課)')&&(detail[code].cos_cname!= '資訊工程研討')){
                                    if(code.substring(0,3) == 'DCP'){
                                        more[0].english = true;
										EnglishCourse.push(more[0]);
									}
                                 }
                            }
						 }
					     courseResult[0].course.push(more[0]);
					}
					else{
						//if(more[0].cn != '導師時間'){
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
                        }
						courseResult[0].course.push(more[index]);
                        //}
                        /*else{
                            for(var s = 0; s<more.length; s++){
                                if(more[s].complete == true){
                                    credit = parseInt(detail[more[s].code].cos_credit);
                                    courseResult[0].course.push(more[0]);
                                }
                            }
                        }*/
					}
				}
			}
            //////console.log(teacherCount);
            if(teacherCount < 1)
                if(compulse[q].cos_cname == '導師時間'){
                    //////console.log(q);
                    q--;
                    //////console.log(q);
                    teacherCount++;
                }
		}
		for(var i = 0; i<PCBnum.length; i++){
            var PCBcos = {
                    cn:'',
                    en:'',
                    score: -1,
                    realCredit:0,
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
             PCBcos.realCredit = parseInt(detail[PCBnum[i]].cos_credit);
             PCBcos.year = parseInt(detail[PCBnum[i]].year) - school_year + 1;
             PCBcos.complete = detail[PCBnum[i]].pass_fail;
             PCBcos.semester = parseInt(detail[PCBnum[i]].semester);
             var temp = detail[PCBnum[i]].cos_cname.substring(0,2);
             if(PCBcos.complete === '通過'){
                PCBcos.complete = true;
                if(temp == '物理'){
                    courseResult[0].credit += (parseInt(detail[PCBnum[i]].cos_credit) - 1);
                    PCBcos.realCredit = parseInt(detail[PCBnum[i]].cos_credit) - 1;
				    if(courseResult[3].credit < courseResult[3].require){
				        var cosInfo = JSON.stringify(PCBcos);
                        cosInfo = JSON.parse(cosInfo);
                        cosInfo.realCredit = 1;
                        courseResult[3].credit++;
                        courseResult[3].course.push(cosInfo);
				    }
				    else{
				        var cosInfo = JSON.stringify(PCBcos);
                        cosInfo = JSON.parse(cosInfo);
                        cosInfo.realCredit = 1;
                        courseResult[4].credit++;
				        courseResult[4].course.push(cosInfo);
				    }
			    }
                else
			            courseResult[0].credit += parseInt(detail[PCBnum[i]].cos_credit);
           }
           else{
                if(offsetCodeCheck[detail[PCBnum[i]].cos_code] != true)
                    PCBcos.complete = false;
           }
           courseResult[0].course.push(PCBcos);
			     //courseResult[0].course.push(PCBcos);
        }
		//determine the core
		var core = req.course.core;
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
                for(var k=0; k<cosNumber.length; k++){
                    var cosInfo = {
                            cn:'',
                            en:'',
						    code:'',
                            realCredit:0,
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
						trueCounter++;
				        if(detail[cosNumber[k]].pass_fail == '通過'){
						    cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                            cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
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
                            courseResult[1].credit += credit;
                            if(detail[code].cos_typeext == '英文授課'){
                                more[0].english = true;
								EnglishCourse.push(more[0]);
							}
						}
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
                            else
                                index = d;
                        }
						if(more[index].complete == true){
                        	code = more[index].code;
                            courseResult[1].credit += credit;
                            if(detail[code].cos_typeext == '英文授課'){
                                more[index].english = true;
								EnglishCourse.push(more[index]);
							}
						}
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
                for(var k=0; k<cosNumber.length; k++){
                    var cosInfo = {
                            cn:'',
                            en:'',
                            realCredit:0,
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
						trueCounter++;
						if(detail[cosNumber[k]].pass_fail == '通過'){
							cosInfo.complete = true;
                            cosInfo.score = parseInt(detail[cosNumber[k]].score);
                            cosInfo.grade = detail[cosNumber[k]].score_level;
                            cosInfo.realCredit = parseInt(detail[cosNumber[k]].cos_credit);
                            cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                            cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
						}
						else
							cosInfo.complete = false;
						more.push(cosInfo);
					 }
                }
                if(trueCounter == 0){
					if(offsetNameCheck[cosInfo.cn] != true){
						cosInfo.complete = false;
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
                            courseResult[2].credit += credit;
                            if(detail[code].cos_typeext == '英文授課'){
                                more[0].english = true;
								EnglishCourse.push(more[0]);
							}
							courseResult[2].course.push(more[0]);
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
                            courseResult[2].credit += credit;
                            if(detail[code].cos_typeext == '英文授課'){
                                more[index].english = true;
								EnglishCourse.push(more[index]);
							}
							courseResult[2].course.push(more[index]);
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
                        	for(var k=0; k<cosNumber.length; k++){
                                	var cosInfo = {
                                		cn:'',
                                		en:'',
						code:'',
                                		score: -1,
                                        realCredit:0,
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
                                  		cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                                  		cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
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
                                               	 	courseResult[2].credit += credit;
                                                	if(detail[code].cos_typeext == '英文授課'){
                                                		more[0].english = true;
								EnglishCourse.push(more[0]);
							}
							courseResult[2].course.push(more[0]);
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
                                                	courseResult[2].credit += credit;
                                                	if(detail[code].cos_typeext == '英文授課'){
                                                		more[index].english = true;
								EnglishCourse.push(more[index]);
							}
							courseResult[2].course.push(more[index]);
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
  	next();

}


exports.CScourse = CScourse;
