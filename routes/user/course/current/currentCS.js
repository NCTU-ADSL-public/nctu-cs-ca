var utils = require('../../../../utils');
var currentCS = {};
currentCS.processCS = function(req, res, next){
	var courseResult = res.locals.courseResult;
	var now = JSON.parse(req.now);
	
	var taken = [];
	var detail = [];
	var trueCounter;
	var cosNumber;
	if(req.session.profile){
		var studentId = res.locals.studentId;
		var temp = parseInt(studentId.substring(0,2));
		// the year the student enter school
		var school_year = (100 + temp);
		if(!studentId){
			////console.log("No Student Id");
			return;
		}
		for(var i=0; i<now.length; i++){
			detail[now[i].cos_code] = now[i];
			taken[now[i].cos_code] = true;
		}
		// determine compulsory courses
		var compulse = req.course.compulse;
		//////console.log(compulse);
		for(var q=0; q<compulse.length; q++){
            cosNumber = compulse[q].cos_codes;
  			for(var k=0; k<cosNumber.length; k++){
  				var cosInfo = {
                                        cn:'',
                                        en:'',
                                        code:'',
                                        score: -1,
                                        realCredit:0,
                                        originalCredit:0,
                                        complete:false,
                                        english:false,
                                        grade: '0',
                                        year: 4,
                                        semester:1,
                                        reason: 'now'
                                };
				if(taken[cosNumber[k]] === true){
  				  	var reg = compulse[q].cos_cname.substring(0,3);
                    cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
					if(reg == '物化生'){
                        var temp = detail[cosNumber[k]].cos_cname.substring(0,2);
						cosInfo.cn = detail[cosNumber[k]].cos_cname;
                        cosInfo.en = detail[cosNumber[k]].cos_ename;
					}
                    else{
					    cosInfo.cn = compulse[q].cos_cname;
                        cosInfo.en = compulse[q].cos_ename;
                        if(detail[cosNumber[k]].cos_typeext == '英文授課'){
                            if((detail[cosNumber[k]].cos_cname!= '基礎程式設計')&&(detail[cosNumber[k]].cos_cname!= '跨領域專題(一)')&&(detail[cosNumber[k]].cos_cname!='資訊工程專題(一)(英文授課)')&&(detail[cosNumber[k]].cos_cname!= '資訊工程專題(二)(英文授課)')&&(detail[cosNumber[k]].cos_cname!= '資訊工程研討(英文授課)')&&(detail[cosNumber[k]].cos_cname!= '資訊工程研討')){
                                if(cosNumber[k].substring(0,3) == 'DCP')
                                    cosInfo.english = true;
                            }
                        }
                    }
					cosInfo.code = cosNumber[k];
					for(var a = 0; a<courseResult[0].course.length; a++){
						var reg1 = courseResult[0].course[a].cn;
						var reg2 = cosInfo.cn.substring(0,2);
						if(courseResult[0].course[a].cn == cosInfo.cn){
							if(courseResult[0].course[a].complete == true)
								courseResult[0].course[a].reason = 'now';
							else
								courseResult[0].course[a] = cosInfo;
							break;
						}
						else{
							if(reg == '物化生'){
                                if(reg2 == '物理'||reg2 == '化學'||reg2 == '普通'){
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
				    		
		var core = req.course.core;
                for(var q=0; q<core.length; q++){
                        cosNumber = core[q].cos_codes;
                        var cosInfo = {
                                        cn:'',
                                        en:'',
                                        code:'',
                                        score: -1,
                                        originalCredit:0,
                                        complete:false,
                                        english:false,
                                        grade: '0',
                                        year: 4,
                                        semester:1,
                                        reason: 'now'
                                };
                        for(var k=0; k<cosNumber.length; k++){
                                if(taken[cosNumber[k]] === true){
                                        cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
                                        cosInfo.cn = core[q].cos_cname;
                                        cosInfo.en = core[q].cos_ename;
                                        cosInfo.code = cosNumber[k];
                                        if(detail[cosNumber[k]].cos_typeext == '英文授課')
                                            cosInfo.english = true;
					for(var a = 0; a<courseResult[1].course.length; a++){
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
		var other = req.course.others;
                for(var q=0; q<other.length; q++){
                        cosNumber = other[q].cos_codes;
                        var cosInfo = {
                                        cn:'',
                                        en:'',
                                        code:'',
                                        score: -1,
                                        originalCredit:0,
                                        complete:false,
                                        english:false,
                                        grade: '0',
                                        year: 4,
                                        semester:1,
                                        reason: 'now'
                                };
                        for(var k=0; k<cosNumber.length; k++){
                                if(taken[cosNumber[k]] === true){
                                        cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
                                        cosInfo.cn = other[q].cos_cname;
                                        cosInfo.en = other[q].cos_ename;
                                        cosInfo.code = cosNumber[k];
                                        if(detail[cosNumber[k]].cos_typeext == '英文授課')
                                            cosInfo.english = true;
					for(var a = 0; a<courseResult[2].course.length; a++){
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
		var vice = req.course.vice;
                for(var q=0; q<vice.length; q++){
                        cosNumber = vice[q].cos_codes;
                        var cosInfo = {
                                        cn:'',
                                        en:'',
                                        code:'',
                                        score: -1,
                                        originalCredit:0,
                                        complete:false,
                                        english:false,
                                        grade: '0',
                                        year: 4,
                                        semester:1,
                                        reason: 'now'
                                };
                        for(var k=0; k<cosNumber.length; k++){
                                if(taken[cosNumber[k]] === true){
                                        cosInfo.originalCredit = parseInt(detail[cosNumber[k]].cos_credit);
                                        cosInfo.cn = vice[q].cos_cname;
                                        cosInfo.en = vice[q].cos_ename;
                                        cosInfo.code = cosNumber[k];
                                        if(detail[cosNumber[k]].cos_typeext == '英文授課')
                                            cosInfo.english = true;
                                        for(var a = 0; a<courseResult[2].course.length; a++){
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
