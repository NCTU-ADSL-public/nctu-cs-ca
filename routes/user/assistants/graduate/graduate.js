var express = require('express');
var apps = express();
var table = require('./table');
var utils = require('../../../../utils');
var router = express.Router();
var getCourse = table.tables.getCourse;
var getPass = table.tables.getPass;
var getRules = table.tables.getRule;
var getList = table.tables.getList;

router.get('/assistants/graduate/original', queryPass, queryCourse, queryRule, processOther, processCS, processResult, function(req, res){
	res.send(res.locals.courseResult);
});

function queryPass(req, res, next){
    //console.log("queryPass");
   if(req.session.profile){
	    var studentId = req.query.student_id;
			console.log("in graduate query Pass ID");
	 	 console.log(studentId);
         if(!studentId){
         	console.log("No Student Id");
                return;
         }
         else{
           	table.tables.getPass(studentId,function(pass){
                req.pass = pass;
		if(req.pass)
                  next();
                else{
                  console.log("Cannot get pass");
                  return;
                }
            });
         }
    }
    else {
        res.redirect('/');
    }
}

function queryCourse(req, res, next){

    if(req.session.profile){
  		var studentId = req.query.student_id;
			console.log("in graduate queryCourse ID");
	         console.log(studentId);
  		if(!studentId){
  			console.log("No Student Id");
  			return;
  	  }
      else{
        table.tables.getCourse(studentId, function(course){
          req.course = course;
	  if(req.course)
            next();
          else{
              console.log("Cannot get course");
              return;
          }
        });
      }
    }
    else {
      res.redirect('/');
    }
}

function queryRule(req, res, next){
    if(req.session.profile){
         var studentId = req.query.student_id;
				 console.log("in graduate queryRule ID");
			          console.log(studentId);
							  if(!studentId){
                        console.log("No Student Id");
                        return;
                }
                else{
                     table.tables.getRule(studentId,function(rules){
                          req.rules = rules;
			  if(req.rules)
                             next();
                          else{
                             console.log("Cannot get rules");
                             return;
                          }
                     });
                }
     }
     else{
       res.redirect('/');
     }
}

function processCS(req, res, next){
	var courseResult = res.locals.courseResult;
	var notCS = res.locals.notCS;
	var EnglishCourse = res.locals.English;
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
		console.log("in graduate processCS ID");
         console.log(studentId);
		var temp = parseInt(studentId.substring(0,2));
		var PCBnum = [];
		// the year the student enter school
		var school_year = (100 + temp);
		if(!studentId){
			console.log("No Student Id");
			return;
		}
		var pass = JSON.parse(req.pass);
		//console.log(pass);
		var rules = JSON.parse(req.rules);
                //language.require = 8;
		for(var i=0; i<pass.length; i++){
			detail[pass[i].cos_code] = pass[i];
			taken[pass[i].cos_code] = true;
		}
		// determine compulsory courses
		var compulse = req.course.compulse;
		for(var q=0; q<compulse.length; q++){
			var cosInfo = {
                		cn:'',
                		en:'',
				score: -1,
                		complete:'0',
				grade: '0',
				year:'',
				semester:'',
				reason: 'CS'
        		};
			cosInfo.cn = compulse[q].cos_cname;
			cosInfo.en = compulse[q].cos_ename;
			trueCounter = 0;
			cosNumber = compulse[q].cos_codes;
			if(notCS[compulse[q].cos_cname] === true){
				cosInfo.reason = 'notCS';
				cosInfo.complete = true;
				courseResult[0].course.push(cosInfo);
			}
			else{
  			for(var k=0; k<cosNumber.length; k++){
  				//console.log(cosNumber[k]);
  				if(taken[cosNumber[k]] === true){
  				  cosInfo.score = parseInt(detail[cosNumber[k]].score);
  					cosInfo.grade = detail[cosNumber[k]].score_level;
  					cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
  					cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
  					var reg = detail[cosNumber[k]].cos_cname.substring(0,2);
  					trueCounter++;
  				     if(detail[cosNumber[k]].pass_fail == '通過'){
  					          cosInfo.complete = true;
  					          if(reg == '物理' || reg == '化學' || reg == '生物' ){
  						                if(reg == '物理')
                                PCBnum.push(cosNumber[k]);
                              else if(reg == '化學')
                                PCBnum.push(cosNumber[k]);
                              else
                                PCBnum.push(cosNumber[k]);
  					          }
            					else{
            					        if(detail[cosNumber[k]].cos_typeext == '英文授課'){
                                  				if((detail[cosNumber[k]].cos_cname!= '跨領域專題(一)')&&(detail[cosNumber[k]].cos_cname!= '資訊工程專題(一)(英文授課)')&&(detail[cosNumber[k]].cos_cname!= '資訊工程專題(二)(英文授課)')&&(detail[cosNumber[k]].cos_cname!= '資訊工程研討(英文授課)')&&(detail[cosNumber[k]].cos_cname!= '資訊工程研討')){
            								              if(cosNumber[k].substring(0,3) == 'DCP')
            									                     EnglishCourse.push(cosInfo);
            							        }
            						      }
            						      courseResult[0].credit += parseInt(detail[cosNumber[k]].cos_credit);
            						      courseResult[0].course.push(cosInfo);
            					}
  				    }
  				    else{
  					     cosInfo.complete = false;
  					     courseResult[0].course.push(cosInfo);
  				    }
  				}
  			}
  			if(trueCounter == 0){
  				cosInfo.complete = false;
  				courseResult[0].course.push(cosInfo);
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
                        var cosInfo = {
                                cn:'',
                                en:'',
				score: -1,
                                complete:'0',
				grade:'0',
				reason: 'CS',
				year: '',
				semester: ''
                        };
			cosInfo.cn = core[q].cos_cname;
                        cosInfo.en = core[q].cos_ename;
                        trueCounter = 0;
			if(notCS[core[q].cos_cname] === true){
                                cosInfo.reason = 'notCS';
				cosInfo.complete = true;
                                courseResult[1].course.push(cosInfo);
                        }
			else{
                        cosNumber = core[q].cos_codes;
			//console.log(cosNumber);
                        for(var k=0; k<cosNumber.length; k++){
                                //console.log(cosNumber[k]);
                                if(taken[cosNumber[k]] === true){
                                  cosInfo.score = parseInt(detail[cosNumber[k]].score);
                                  cosInfo.grade = detail[cosNumber[k]].score_level;
                                  cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                                  cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
					trueCounter++;
				    	if(detail[cosNumber[k]].pass_fail == '通過'){
						cosInfo.complete = true;
						if(detail[cosNumber[k]].cos_typeext == '英文授課')
							EnglishCourse.push(cosInfo);
						courseResult[1].credit += parseInt(detail[cosNumber[k]].cos_credit);
				     	}
				     	else
				      		cosInfo.complete = false;
				     	courseResult[1].course.push(cosInfo);
				}
                        }
                        if(trueCounter == 0){
                                cosInfo.complete = false;
				courseResult[1].course.push(cosInfo);
			}
			}
                }
		if(courseResult[1].credit >= courseResult[1].require)
			courseResult[1].selection = true;
		//determine the other classes
		var other = req.course.others;
		for(var q=0; q<other.length; q++){
                        var cosInfo = {
                                cn:'',
                                en:'',
				score: -1,
                                complete:'0',
				grade:'0',
				reason: 'CS',
				year: '',
				semester: ''
                        };
			cosInfo.cn = other[q].cos_cname;
                        cosInfo.en = other[q].cos_ename;
                        trueCounter = 0;
			if(notCS[other[q].cos_cname] === true){
                                cosInfo.reason = 'notCS';
				cosInfo.complete = true;
                                courseResult[2].course.push(cosInfo);
                        }
			else{
                        cosNumber = other[q].cos_codes;
                        //console.log(cosNumber);
                        for(var k=0; k<cosNumber.length; k++){
                                //console.log(cosNumber[k]);
                                if(taken[cosNumber[k]] === true){
                                  cosInfo.score = parseInt(detail[cosNumber[k]].score);
                                  cosInfo.grade = detail[cosNumber[k]].score_level;
                                  cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                                  cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
					trueCounter++;
					if(detail[cosNumber[k]].pass_fail == '通過'){
						if(detail[cosNumber[k]].cos_typeext == '英文授課')
							EnglishCourse.push(cosInfo);
						cosInfo.complete = true;
						courseResult[2].credit += parseInt(detail[cosNumber[k]].cos_credit);
					}
					else
						cosInfo.complete = false;
					courseResult[2].course.push(cosInfo);
				}
                        }
                        if(trueCounter == 0){
				cosInfo.complete = false;
				courseResult[2].course.push(cosInfo);
			}
			}
                }
		//determine the vice
		var vice = req.course.vice;
		for(var q=0; q<vice.length; q++){
                        var cosInfo = {
                                cn:'',
                                en:'',
				score: -1,
                                complete:'0',
				grade:'0',
				reason: 'CS',
				year: '',
				semester: ''
                        };
			cosInfo.cn = vice[q].cos_cname;
                        cosInfo.en = vice[q].cos_ename;
                        trueCounter = 0;
			if(notCS[vice[q].cos_cname] === true){
                                 cosInfo.reason = 'notCS';
				 cosInfo.complete = true;
                                 courseResult[2].course.push(cosInfo);
                         }
			else{
                        cosNumber = vice[q].cos_codes;
                        //console.log(cosNumber);
                        for(var k=0; k<cosNumber.length; k++){
                                //console.log(cosNumber[k]);
                                if(taken[cosNumber[k]] === true){
                                  cosInfo.score = parseInt(detail[cosNumber[k]].score);
                                  cosInfo.grade = detail[cosNumber[k]].score_level;
                                  cosInfo.year = parseInt(detail[cosNumber[k]].year) - school_year + 1;
                                  cosInfo.semester = parseInt(detail[cosNumber[k]].semester);
					trueCounter++;
					if(detail[cosNumber[k]].pass_fail == '通過'){
						cosInfo.complete = true;
						if(detail[cosNumber[k]].cos_typeext == '英文授課')
							EnglishCourse.push(cosInfo);
						courseResult[2].credit += parseInt(detail[cosNumber[k]].cos_credit);
					}
					else
						cosInfo.complete = false;
					courseResult[2].course.push(cosInfo);
				}
                        }
                        if(trueCounter == 0){
                                cosInfo.complete = false;
				courseResult[2].course.push(cosInfo);
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

function processOther(req, res, next){
	var courseResult = [];
	var compulsory = {
                title: '共同必修',
                credit: 0,
                require: 0,
                course: []
        }
        var coreClass = {
                title: '核心課程',
                credit: 0,
                require: 0,
                selection: false,
                course: []
        }
        var otherClass = {
                title: '副核心與他組核心',
                credit: 0,
                require: 0,
                selection: false,
                course: []
        }

	var elective = {
                title: '專業選修',
                credit: 0,
                require: 0,
                course: []
        }
	var language = {
                title: '外語',
                credit: 0,
                require: 8,
                course: []
        }
        var general = {
                title: '通識',
                credit: 0,
                require: 20,
                course: []
        }
        var otherElect = {
                title: '其他選修',
                credit: 0,
                require: 0,
                course: []
        }
	var peClass = {
                title: '體育',
                credit: 0,
                require: 6,
                course: []
        }
        var service = {
                title: '服務學習',
                credit: 0,
                require: 2,
                course: []
        }
        var art = {
                title: '藝文賞析',
                credit: 0,
                require: 2,
                course: []
        }

	var rules = JSON.parse(req.rules);
        var pass = JSON.parse(req.pass);
	var rule = [];
	var CSname = [];
	var notCS = [];
	var EnglishCourse = [];
	var total = req.course.total;
        //determine the elective
	if(req.session.profile){

  	var studentId = req.query.student_id;
		console.log("in graduate processOther  ID");
	         console.log(studentId);
          var temp = parseInt(studentId.substring(0,2));
          // the year the student enter school
          var school_year = (100 + temp);

  	compulsory.require = parseInt(rules[0].require_credit);
          coreClass.require = parseInt(rules[0].core_credit);
          otherClass.require = parseInt(rules[0].sub_core_credit);
          elective.require = parseInt(rules[0].pro_credit);
          otherElect.require = parseInt(rules[0].free_credit);
          language.require = parseInt(rules[0].foreign_credit);

  	for(var x = 0; x<total.length; x++){
          	for(var a = 0; a<total[x].cos_codes.length; a++){
                 		rule[total[x].cos_codes[a]] = true;
                   }
          }
  	for(x = 0; x<total.length; x++){
                   CSname[total[x].cos_cname] = true;
          }
  	for(var q = 0; q<pass.length; q++){
          	var cosInfo = {
                  	cn:'',
                         	en:'',
  			score: -1,
  			reason: 'CS',
                          complete:'0',
  			grade:'0',
  			year: '',
  			semester: ''
                   };
                  var temp = pass[q].cos_code.substring(0,3);
                  cosInfo.cn = pass[q].cos_cname;
                  cosInfo.en = pass[q].cos_ename;
  		cosInfo.score = pass[q].score;
  		cosInfo.grade = pass[q].score_level;
  		if(pass[q].pass_fail == '通過')
                  	cosInfo.complete = true;
  		else
  			cosInfo.complete = false;
  		cosInfo.year = parseInt(pass[q].year) - school_year + 1;
  		cosInfo.semester = parseInt(pass[q].semester);
                  if(rule[pass[q].cos_code] != true){
                  	if(cosInfo.complete === true){
  			if(temp == 'DCP' || temp == 'IOC' || temp == 'IOE' || temp == 'ILE'){
                          	if(pass[q].cos_cname == '服務學習(一)' || pass[q].cos_cname == '服務學習(二)'){
  					service.credit += parseInt(pass[q].cos_credit);
                                          service.course.push(cosInfo);
                                  }
                                  else{
                                          if(pass[q].cos_cname != '導師時間'){
  						if(pass[q].cos_typeext == '英文授課')
                                                          EnglishCourse.push(cosInfo);
  						elective.credit += parseInt(pass[q].cos_credit);
                                          	elective.course.push(cosInfo);
  					}
  					else{

                                                  compulsory.course.push(cosInfo);
                                                  compulsory.credit += parseInt(pass[q].cos_credit);
  					}
                                  }
                           }
  			 else if(temp == 'ART'){
  				art.credit += parseInt(pass[q].cos_credit);
  				art.course.push(cosInfo);
  		         }
                           else{
                                  if(pass[q].cos_type == '外語'){
  					 	language.course.push(cosInfo);
                                           	language.credit += parseInt(pass[q].cos_credit);
  				 }
                                   else if(pass[q].cos_type == '通識'){
  					var brief = pass[q].brief.substring(0,2);
                                          cosInfo.dimension = brief;
                                          general.course.push(cosInfo);
                                          general.credit += parseInt(pass[q].cos_credit);
                                   }
  			         else{
                                           if(temp == 'PYY'){
  						peClass.course.push(cosInfo);
                                                  peClass.credit += parseInt(pass[q].cos_credit);
                                           }
                                           else{
                                                  if(pass[q].cos_typeext == '服務學習'){
  							service.course.push(cosInfo);
                                                          service.credit += parseInt(pass[q].cos_credit);
                                                  }
  						else if(pass[q].cos_cname == '導師時間'){
  							compulsory.course.push(cosInfo);
                                                  	compulsory.credit += parseInt(pass[q].cos_credit);
  						}
                                                  else{
                                                          if(CSname[cosInfo.cn] == true){
  								//console.log(cosInfo.cn);
  								cosInfo.complete = true;
                                          			cosInfo.reason = 'NotCS';
  								notCS[cosInfo.cn] = true;
  							}
  							otherElect.course.push(cosInfo);
                                                          otherElect.credit += parseInt(pass[q].cos_credit);
                                                  }
                                            }
                                    }
                             }
  			}
          	}

          }
  	courseResult.push(compulsory);
          courseResult.push(coreClass);
          courseResult.push(otherClass);
  	courseResult.push(elective);
          courseResult.push(otherElect);
          courseResult.push(language);
          courseResult.push(general);
          courseResult.push(peClass);
          courseResult.push(service);
          courseResult.push(art);
	}
  else {
      res.redirect('/');
  }
	res.locals.courseResult = courseResult;
	res.locals.English = EnglishCourse;
	res.locals.notCS = notCS;
  next();


}

function processResult(req, res, next){

        var result = {
                total: 0,
                total_require: 128,
                compulsory: 0,
                compulse_require: 58,
                core: 0,
                core_require: 0,
                vice: 0,
                vice_require: 0,
                pro: 0,
                pro_require: 0,
                english: 0,
                english_require: 1,
                other: 0,
                other_require: 0,
                general: 0,
                general_require: 20,
                pe: 0,
                pe_require: 6,
                language: 0,
                language_require: 8,
                service: 0,
                service_require: 2,
                art: 0,
                art_require: 2
        }
  if(req.session.profile){
  	var rules = JSON.parse(req.rules);
          var CourseResult = res.locals.courseResult;
  	//console.log(CourseResult[0].course);
  	var EnglishCourse = res.locals.English;
          result.compulsory = CourseResult[0].credit;
          result.core =  CourseResult[1].credit;
          result.core_require = parseInt(rules[0].core_credit);
          result.vice = CourseResult[2].credit;
          result.vice_require = parseInt(rules[0].sub_core_credit);
          result.pro = CourseResult[3].credit;
          result.pro_require = parseInt(rules[0].pro_credit);
  	result.english = EnglishCourse.length;
          result.other = CourseResult[4].credit;
          result.other_require = parseInt(rules[0].free_credit);
          result.language = CourseResult[5].credit;
          result.general = CourseResult[6].credit;
          result.pe = CourseResult[7].course.length;
          result.service = CourseResult[8].course.length;
          result.art = CourseResult[9].course.length;
          for(var i = 0; i<CourseResult.length; i++)
                  result.total += CourseResult[i].credit;

  	CourseResult.push(result);
  }
  else {
      res.redirect('/');
  }
	res.locals.courseResult = CourseResult;
	next();


}

module.exports = router;
