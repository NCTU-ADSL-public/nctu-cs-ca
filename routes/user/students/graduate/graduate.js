var express = require('express');
var apps = express();
var table = require('./table');
var utils = require('../../../../utils');
var router = express.Router();
var getCourse = table.tables.getCourse;
var getPass = table.tables.getPass;
var getRules = table.tables.getRule;
var getList = table.tables.getList;
//var CourseResult = ["hi"];

router.get('/assistants/graduate/list', function(req, res){
	if(req.session.profile){
                var studentId = utils.getPersonId(JSON.parse(req.session.profile));
                var list;
		//var program = req.profile[0].program;
                //var student = { ID:'', program:''};
                //student.ID = studentId;
                //student.program = program;

                if(!studentId){
                        console.log("No Student Id");
                        return;
                }
                else{
                     //console.log("queryCourseElse");
                     table.tables.getList(studentId, function(list){
                     		if(!list){
					console.log("No list");
					return;
				}
				else
					res.send(list);	
		     });
                }
    }
});

router.get('/students/graduate', queryPass, queryCourse, queryRule, processOther, processCS, processResult, function(req, res){
    //console.log("Here," + JSON.stringify(res.locals.courseResult)); 
    	//req.courseResult = JSON.stringify(res.locals.courseResult);
	//console.log("in students/graduate");
	//console.log(req);
	//console.log(req);
	res.send(res.locals.courseResult);	

});
/*
router.get('/students/graduate/result', queryRule ,function(req, res){
       /* //console.log("queryRule");
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
	var rules = JSON.parse(req.rules);
	console.log("req.profile.course in the second:");
	console.log(req.profile);
	console.log(req.profile.course);
	var CourseResult = apps.locals.course;
	//console.log("course with apps");
	//console.log(CourseResult);
	result.compulsory = CourseResult[0].credit;
	result.core =  CourseResult[1].credit;
	result.core_require = rules[0].core_credit;
	result.vice = CourseResult[2].credit;
	result.vice_require = rules[0].sub_core_credit;
	result.pro = CourseResult[3].credit;
	result.pro_require = rules[0].pro_credit;
	result.other = CourseResult[4].credit;
	result.other_require = rules[0].free_credit;
	result.language = CourseResult[5].credit;
	result.general = CourseResult[6].credit;
	result.pe = CourseResult[7].course.length;
	result.service = CourseResult[8].course.length;
	result.art = CourseResult[9].course.length;
	for(var i = 0; i<CourseResult.length; i++)
		result.total += CourseResult[i].credit;
	//console.log("in students/graduate/result");
	//console.log(result);
	res.send(result);

});
*/
function queryPass(req, res, next){
    //console.log("queryPass");
    if(req.session.profile){
	 var studentId = utils.getPersonId(JSON.parse(req.session.profile));
                if(!studentId){
                        console.log("No Student Id");
                        return;
                }
                else{
                     table.tables.getPass(studentId,function(pass){
                         req.pass = pass;
                         if(req.pass)
                             next();
                     });
                }
     }
}

function queryCourse(req, res, next){
    //console.log("queryCourse");
    if(req.session.profile){
		var studentId = utils.getPersonId(JSON.parse(req.session.profile));
		var program = req.profile[0].program;
		//var student = { ID:'', program:''};
                //student.ID = studentId;
                //student.program = program;
                
		if(!studentId){
			console.log("No Student Id");
			return;
	        }
                else{ 
                     //console.log("queryCourseElse");
                     table.tables.getCourse(studentId, function(course){
                         req.course = course;
                         if(req.course)
                             next();
                     });
                }
    }

}

function queryRule(req, res, next){
    //console.log("queryRule");
    if(req.session.profile){
         var studentId = utils.getPersonId(JSON.parse(req.session.profile));
                if(!studentId){
                        console.log("No Student Id");
                        return;
                }
                else{
                     table.tables.getRule(studentId,function(rules){
                         //console.log("getRule:" + JSON.stringify(rules));
                         req.rules = rules;
                         if(req.rules)
                             next();
                     });
                }
     }
}

function processCS(req, res, next){
       	//console.log("notCS at second");
	var courseResult = res.locals.courseResult;
	var notCS = res.locals.notCS;
	//console.log(notCS);
	var courses = {
		compulse: [],
		core: [],
		vice:[],
		others: [],
		elective:[],
		total:[]
	}
	var taken = [];
	var CodeToName = [];
	var rule = [];
	var credit = [];
	var taken_year = [];
	var taken_semester = [];
	var trueCounter;
	var cosNumber;
	if(req.session.profile){
		var studentId = utils.getPersonId(JSON.parse(req.session.profile));	
		var program = req.profile[0].program;
		if(!studentId){
			console.log("No Student Id");
			return;
		}
		var pass = JSON.parse(req.pass);
		//console.log(pass);
		var rules = JSON.parse(req.rules);
                //language.require = 8;
		for(var i=0; i<pass.length; i++){
			//console.log(pass[0]);
			taken[pass[i].cos_code] = true;
			credit[pass[i].cos_code] = parseInt(pass[i].cos_credit);
		}
		//record pass course code to name
		for(var i=0; i<pass.length; i++){
                        CodeToName[pass[i].cos_code] = pass[i].cos_cname;
                }
		//record pass course code to taken year
		for(i=0; i<pass.length; i++){
                        taken_year[pass[i].cos_code] = pass[i].year;
                }
		//record pass course code to taken semester
		for(i=0; i<pass.length; i++){
                        taken_semester[pass[i].cos_code] = pass[i].semester;
                }
		// determine compulsory courses
		var compulse = req.course.compulse;
		//console.log("get compulse classes");
		//console.log(compulse[0]);
		//var phyFlag = 0;
		var BorCorPFlag = 0;
		for(var q=0; q<compulse.length; q++){
			var cosInfo = {
                		cn:'',
                		en:'',
				score: 0,
                		complete:'',
				year:'',
				semester:'',
				reason: 'CS',
				move: false
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
					cosInfo.score = 60;
					cosInfo.year = parseInt(taken_year[cosNumber[k]]);
					cosInfo.semester = parseInt(taken_semester[cosNumber[k]]);
					var reg = CodeToName[cosNumber[k]].substring(0,2);
					trueCounter++;
					cosInfo.complete = true;
					if(reg == '物理' || reg == '化學' || reg == '生物'){
						BorCorPFlag++;
						if(BorCorPFlag <= 2){
						//Physics only counts 3//the left 1 credit can be moved to otherElect
							if(reg == '物理'){
								//console.log(reg);
								courseResult[0].credit += (credit[cosNumber[k]] - 1);
								//otherElect.credit ++;
							} 
							else
								courseResult[0].credit += credit[cosNumber[k]];
						}
						else{ //more B or C or P the credits count as otherElect
							cosInfo.move = true;
							if(reg == '物理')
								courseResult[0].credit += (credit[cosNumber[k]] - 1);
							else
								courseResult[0].credit += credit[cosNumber[k]];
							//otherElect.credit += credit[cosNumber[k]];
							//otherElect.course.push(cosInfo);
						}
						courseResult[0].course.push(cosInfo);
					}
					else{
						courseResult[0].credit += credit[cosNumber[k]];
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
		//determine the core 
		//console.log("core require:");
		//console.log(rules[0].core_credit);
		var core = req.course.core;
		//console.log("get core class");
		//console.log(core[0]);
		for(var q=0; q<core.length; q++){
                        var cosInfo = {
                                cn:'',
                                en:'',
				score: 0,
                                complete:'',
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
                                        cosInfo.score = 60;
					cosInfo.complete = true;
					cosInfo.year = parseInt(taken_year[cosNumber[k]]);
                                        cosInfo.semester = parseInt(taken_semester[cosNumber[k]]);
					trueCounter++;
					courseResult[1].credit += credit[cosNumber[k]];
					//more than the rules core class can be count as professional courses;
					if(courseResult[1].credit > rules[0].core_credit){
						cosInfo.move = true;
						courseResult[3].course.push(cosInfo);
						courseResult[3].credit += credit[cosNumber[k]];
						courseResult[1].credit -= credit[cosNumber[k]];
					}
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
				score: 0,
                                complete:'',
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
                                        cosInfo.score = 60;
					cosInfo.year = parseInt(taken_year[cosNumber[k]]);
                                        cosInfo.semester = parseInt(taken_semester[cosNumber[k]]);
					if(courseResult[2].credit > rules[0].sub_core_credit)
						cosInfo.move = true;
					cosInfo.complete = true;
					trueCounter++;
					courseResult[2].credit += credit[cosNumber[k]];
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
		//console.log("get vice classes");
		//console.log(vice[0]);
		for(var q=0; q<vice.length; q++){
                        var cosInfo = {
                                cn:'',
                                en:'',
				score: 0,
                                complete:'',
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
                                        cosInfo.score = 60;
					cosInfo.year = parseInt(taken_year[cosNumber[k]]);
                                        cosInfo.semester = parseInt(taken_semester[cosNumber[k]]);
					if(courseResult[2].credit > rules[0].sub_core_credit)
                                        	cosInfo.move = true;
					cosInfo.complete = true;
					trueCounter++;
					courseResult[2].credit += credit[cosNumber[k]];
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
	else
	  return;
	res.locals.courseResult = courseResult; 
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

	//var courseResult = res.locals.courseResult;
	//console.log("here!!");
	//console.log(courseResult[0]);
	var rules = JSON.parse(req.rules);
	var program = req.profile[0].program;
        var pass = JSON.parse(req.pass);
	var rule = [];
	var CSname = [];
	var notCS = [];
	var total = req.course.total;
        //determine the elective
        //console.log(pass);
       	//console.log(total);
	if(req.session.profile){
        
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
	//console.log("CSname");
	//console.log(CSname);
	for(var q = 0; q<pass.length; q++){
        	var cosInfo = {
                	cn:'',
                       	en:'',
			score: 0,
			reason: 'CS',
                        complete:'',
			year: '',
			semester: ''
                 };
                var temp = pass[q].cos_code.substring(0,3);
                cosInfo.cn = pass[q].cos_cname;
                cosInfo.en = '';
		cosInfo.score = 60;
                cosInfo.complete = true;
		cosInfo.year = parseInt(pass[q].year);
		cosInfo.semester = parseInt(pass[q].semester);
                if(rule[pass[q].cos_code] != true){
                	if(temp == 'DCP' || temp == 'IOC' || temp == 'IOE' || temp == 'ILE'){
                        	if(pass[q].cos_cname == '服務學習(一)' || pass[q].cos_cname == '服務學習(二)'){
                                	service.credit += parseInt(pass[q].cos_credit);
                                        service.course.push(cosInfo);
                                }
                                else{
                                        if(pass[q].cos_cname != '導師時間'){
						elective.credit += parseInt(pass[q].cos_credit);
                                        	elective.course.push(cosInfo);
					}
					else{
						//console.log(pass[q].cos_cname);
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
	else
		return;
	res.locals.courseResult = courseResult;
	//apps.locals.course = courseResult;
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

	var rules = JSON.parse(req.rules);
        var CourseResult = res.locals.courseResult;
        //console.log("course Result");
        //console.log(CourseResult);
        result.compulsory = CourseResult[0].credit;
        result.core =  CourseResult[1].credit;
        result.core_require = parseInt(rules[0].core_credit);
        result.vice = CourseResult[2].credit;
        result.vice_require = parseInt(rules[0].sub_core_credit);
        result.pro = CourseResult[3].credit;
        result.pro_require = parseInt(rules[0].pro_credit);
        result.other = CourseResult[4].credit;
        result.other_require = parseInt(rules[0].free_credit);
        result.language = CourseResult[5].credit;
        result.general = CourseResult[6].credit;
        result.pe = CourseResult[7].course.length;
        result.service = CourseResult[8].course.length;
        result.art = CourseResult[9].course.length;
        for(var i = 0; i<CourseResult.length; i++)
                result.total += CourseResult[i].credit;
        //console.log("in students/graduate/result");
        //console.log(result);
	CourseResult.push(result);
	res.locals.courseResult = CourseResult;
	next();
        //res.send(result);
	//res.send(CourseResult);




}

module.exports = router;


















