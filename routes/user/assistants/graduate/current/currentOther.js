const request = require('request');
var utils = require('../../../../../utils');
let currentOther = {};
currentOther.processOther = function(req, res, next){
        
	let now = JSON.parse(req.now);
	let total = req.course.total;
	let courseResult = res.locals.courseResult;
	
	if(req.session.profile){

  		let studentId = req.query.student_id; 
          	let temp = parseInt(studentId.substring(0,2));
          	// the year the student enter school
          	let school_year = (100 + temp);
  		let rule= [];
		for(let q = 0; q<now.length; q++){
          		let cosInfo = {
                  		cn:'',
                         	en:'',
  				score: -1,
  				reason: 'now',
                          	complete:false,
  				grade:'0',
  				year: '',
  				semester: ''
                   	};
			let temp = now[q].cos_code.substring(0,3);
                  	cosInfo.cn = now[q].cos_cname;
                  	cosInfo.en = now[q].cos_ename;
  			cosInfo.year = 106 - school_year + 1;
  			cosInfo.semester = 1;
			for(let x = 0; x<total.length; x++){
                        	for(let a = 0; a<total[x].cos_codes.length; a++){
                                	rule[total[x].cos_codes[a]] = true;
                        	}
                	}

                  	if(rule[now[q].cos_code] != true){
                  		//if(cosInfo.complete === true){
  					if(temp == 'DCP' || temp == 'IOC' || temp == 'IOE' || temp == 'ILE' || temp == 'IDS'){
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
  						courseResult[9].course.push(cosInfo);
  		         		}
                           		else{
                                  		if(now[q].cos_type == '外語'){
							courseResult[5].course.push(cosInfo);
  				 		}
                                   		else if(now[q].cos_type == '通識'){
  							let brief = now[q].brief.substring(0,2);
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
