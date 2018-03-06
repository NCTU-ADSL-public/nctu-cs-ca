var utils = require('../../../../utils');
var currentOther = {};
currentOther.processOther = function(req, res, next){
        
	var now = JSON.parse(req.now);
//    ////console.log("course this semester:");
   // console.log(now);
	var total = req.course.total;
	var courseResult = res.locals.courseResult;
	
	if(req.session.profile){

  		var studentId = res.locals.studentId;
        ////console.log("studentId in currentOther:"  + studentId);
        var temp = parseInt(studentId.substring(0,2));
          	// the year the student enter school
        var taken = [];
        
        for(var i = 0; i<(courseResult.length-1); i++)
            for(var q = 0; q<courseResult[i].course.length; q++){
                taken[courseResult[i].course[q].code] = true;
            }
        
        var school_year = (100 + temp);
  		var rule= [];
		for(var q = 0; q<now.length; q++){
          	var cosInfo = {
                  		cn:'',
                        en:'',
  				        score: -1,
  				        reason: 'now',
                        originalCredit:0,
                        realCredit:0,
                        complete:false,
  				        grade:'0',
  				        year: '',
  				        semester: '',
                        code:''
            };
			var temp = now[q].cos_code.substring(0,3);
            else
                cosInfo.code = now[q].cos_code;
            cosInfo.cn = now[q].cos_cname;
            cosInfo.en = now[q].cos_ename;
  			cosInfo.year = 106 - school_year + 1;
  			cosInfo.semester = 1;
            cosInfo.originalCredit = parseInt(now[q].cos_credit);            
			for(var x = 0; x<total.length; x++){
                for(var a = 0; a<total[x].cos_codes.length; a++){
                    rule[total[x].cos_codes[a]] = true;
                }
            }
            if(rule[now[q].cos_code] != true){
                  		//if(cosInfo.complete === true){
  					if(temp == 'DCP' || temp == 'IOC' || temp == 'IOE' || temp == 'ILE'|| temp == 'IDS'){
                        //////console.log("CS course");
                        //////console.log(now[q]);
                        if(now[q].cos_cname == '服務學習(一)' || now[q].cos_cname == '服務學習(二)'){
                            courseResult[8].course.push(cosInfo);
                        }
                        else{
                            if(now[q].cos_cname != '導師時間'){
                                courseResult[3].course.push(cosInfo);
  							}
  							else{
                                courseResult[0].course.push(cosInfo);
  							}
                        }
                    }
  			 		else if(temp == 'ART'){
  						if(taken[now[q].cos_code] === true){
                            console.log("get it");
                            cosInfo.code = now[q].cos_code + "_now";
                        }
                        courseResult[9].course.push(cosInfo);
  		            }
                    else{
                        if(now[q].cos_type == '外語'){
					        courseResult[5].course.push(cosInfo);
  				 		}
                        else if(now[q].cos_type == '通識'){
  						    var brief = now[q].brief.substring(0,2);
                            //////console.log("general course:");
                            //////console.log(now[q]);
                            cosInfo.dimension = brief;
                            courseResult[6].course.push(cosInfo);
                        }
  			            else{
                            if(temp == 'PYY'){
  						        courseResult[7].course.push(cosInfo);
                            }
                            else{
                                if(now[q].cos_typeext == '服務學習'){
  								    courseResult[8].course.push(cosInfo);
                                }
  								else if(now[q].cos_cname == '導師時間'){
  									courseResult[0].course.push(cosInfo);
  								}
                                else{
									courseResult[4].course.push(cosInfo);
                                }
                            }
                         }
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


exports.currentOther = currentOther;
