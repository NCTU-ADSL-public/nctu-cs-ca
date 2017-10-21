var express = require('express');
var table = require('./table');
var utils = require('../../../../utils');
//var getCourse = table.tables.getCourse;
var router = express.Router();
var getCourse = table.tables.getCourse;
var getPass = table.tables.getPass;
var getRules = table.tables.getRule;
var CourseResult = ["hi"];

router.get('/students/graduate', queryPass, queryCourse, queryRule, processCS, processOther, function(req, res){
    //console.log("Here," + JSON.stringify(res.locals.courseResult)); 
    	//req.courseResult = JSON.stringify(res.locals.courseResult);
	//console.log("in students/graduate");
	//console.log(req);
	//console.log(req);
	res.send(res.locals.courseResult);	

});

router.get('/students/graduate/result', queryRule ,function(req, res){
        console.log("queryRule");
    //console.log("Here," + JSON.stringify(res.locals.courseResult)); 
        //req.courseResult = JSON.stringify(res.locals.courseResult);
        //console.log("in students/graduate");
        //console.log(req);
	var rules = JSON.parse(req.rules);
	//console.log("in students/graduate/result");
	console.log(CourseResult);
	res.send(CourseResult);

});

function queryPass(req, res, next){
    console.log("queryPass");
    if(req.session.profile){
	 var studentId = utils.getPersonId(JSON.parse(req.session.profile));
                if(!studentId){
                        console.log("No Student Id");
                        return;
                }
                else{
                     table.tables.getPass('0312512',function(pass){
                         req.pass = pass;
                         if(req.pass)
                             next();
                     });
                }
     }
}

function queryCourse(req, res, next){
    console.log("queryCourse");
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
                     console.log("queryCourseElse");
                     table.tables.getCourse('0312512', function(course){
                         req.course = course;
                         if(req.course)
                             next();
                     });
                }
    }

}

function queryRule(req, res, next){
    console.log("queryRule");
    if(req.session.profile){
         var studentId = utils.getPersonId(JSON.parse(req.session.profile));
                if(!studentId){
                        console.log("No Student Id");
                        return;
                }
                else{
                     table.tables.getRule(studentId,function(rules){
                         console.log("getRule:" + JSON.stringify(rules));
                         req.rules = rules;
                         if(req.rules)
                             next();
                     });
                }
     }
}

function processCS(req, res, next){
       console.log("processCS");
	var courseResult = [];
	var courses = {
		compulse: [],
		core: [],
		vice:[],
		others: [],
		elective:[],
		total:[]
	}
	var compulsory = {
		title: '共同必修',
		credit: 0,
		require: 0,
		course: []
	}
       	var elective = {
		title: '專業選修',
		credit: 0,
		require: 0,
		course: []
	}
	var coreClass = {
		title: '核心',
		credit: 0,
		require: 0,
		course: []
	}
	var otherClass = {
		title: '副核心與他組核心',
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
                require: 0,
                course: []
	}
	var service = {
		title: '服務學習',
		credit: 0,
		require: 0,
		course: []
	}
	var taken = [];
	var CodeToName = [];
	var rule = [];
	var credit = [];
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
		compulsory.require = rules[0].require_credit;
		coreClass.require = rules[0].core_credit;
		otherClass.require = rules[0].sub_core_credit;
		elective.require = rules[0].pro_credit;
		otherElect.require = rules[0].free_credit;
		//language.require = rules[0].foreign_credit;
                language.require = 8;
		for(var i=0; i<pass.length; i++){
			//console.log(pass[0]);
			taken[pass[i].cos_code] = true;
			credit[pass[i].cos_code] = parseInt(pass[i].cos_credit);
		}
		//record pass course code to name
		for(var i=0; i<pass.length; i++){
                        CodeToName[pass[i].cos_code] = pass[i].cos_cname;
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
                		complete:'',
				move: false
        		};
			cosInfo.cn = compulse[q].cos_cname;
			cosInfo.en = compulse[q].cos_ename;
			trueCounter = 0;
			cosNumber = compulse[q].cos_codes;
			for(var k=0; k<cosNumber.length; k++){
				//console.log(cosNumber[k]);
				if(taken[cosNumber[k]] === true){
					var reg = CodeToName[cosNumber[k]].substring(0,2);
					trueCounter++;
					cosInfo.complete = true;
					if(reg == '物理' || reg == '化學' || reg == '生物'){
						BorCorPFlag++;
						if(BorCorPFlag == 1){
						//Physics only counts 3//the left 1 credit can be moved to otherElect
							if(reg == '物理'){
								console.log(reg);
								compulsory.credit += (credit[cosNumber[k]] - 1);
								otherElect.credit ++;
							} 
							else
								compulsory.credit += credit[cosNumber[k]];
						}
						else{ //more B or C or P the credits count as otherElect
							cosInfo.move = true;
							//otherElect.credit += credit[cosNumber[k]];
							//otherElect.course.push(cosInfo);
						}
						compulsory.course.push(cosInfo);
					}
					else{
						compulsory.credit += credit[cosNumber[k]];
						compulsory.course.push(cosInfo);
					}
				}
			}
			if(trueCounter == 0){
				cosInfo.complete = false;
				compulsory.course.push(cosInfo);
			}		
		}
		//determine the core 
		console.log("core require:");
		console.log(rules[0].core_credit);
		var core = req.course.core;
		//console.log("get core class");
		//console.log(core[0]);
		for(var q=0; q<core.length; q++){
                        var cosInfo = {
                                cn:'',
                                en:'',
                                complete:''
                        };
			cosInfo.cn = core[q].cos_cname;
                        cosInfo.en = core[q].cos_ename;
                        trueCounter = 0;
                        cosNumber = core[q].cos_codes;
			//console.log(cosNumber);
                        for(var k=0; k<cosNumber.length; k++){
                                //console.log(cosNumber[k]);
                                if(taken[cosNumber[k]] === true){
                                        cosInfo.complete = true;
					trueCounter++;
					coreClass.credit += credit[cosNumber[k]];
					//more than the rules core class can be count as professional courses;
					if(coreClass.credit > rules[0].core_credit){
						cosInfo.move = true;
						elective.course.push(cosInfo);
						elective.credit += credit[cosNumber[k]];
						coreClass.credit -= credit[cosNumber[k]];
					}
					coreClass.course.push(cosInfo);
				}
                        }
                        if(trueCounter == 0){
                                cosInfo.complete = false;
				coreClass.course.push(cosInfo);
			}
                }
		//determine the other classes
		var other = req.course.others;
		for(var q=0; q<other.length; q++){
                        var cosInfo = {
                                cn:'',
                                en:'',
                                complete:''
                        };
			cosInfo.cn = other[q].cos_cname;
                        cosInfo.en = other[q].cos_ename;
                        trueCounter = 0;
                        cosNumber = other[q].cos_codes;
                        //console.log(cosNumber);
                        for(var k=0; k<cosNumber.length; k++){
                                //console.log(cosNumber[k]);
                                if(taken[cosNumber[k]] === true){
                                        if(otherClass.credit > rules[0].sub_core_credit)
						cosInfo.move = true;
					cosInfo.complete = true;
					trueCounter++;
					otherClass.credit += credit[cosNumber[k]];
					otherClass.course.push(cosInfo);
				}
                        }
                        if(trueCounter == 0){
				cosInfo.complete = false;
				otherClass.course.push(cosInfo);
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
                                complete:''
                        };
			cosInfo.cn = vice[q].cos_cname;
                        cosInfo.en = vice[q].cos_ename;
                        trueCounter = 0;
                        cosNumber = vice[q].cos_codes;
                        //console.log(cosNumber);
                        for(var k=0; k<cosNumber.length; k++){
                                //console.log(cosNumber[k]);
                                if(taken[cosNumber[k]] === true){
                                        if(otherClass.credit > rules[0].sub_core_credit)
                                        	cosInfo.move = true;
					cosInfo.complete = true;
					trueCounter++;
					otherClass.credit += credit[cosNumber[k]];
					otherClass.course.push(cosInfo);
				}
                        }
                        if(trueCounter == 0){
                                cosInfo.complete = false;
				otherClass.course.push(cosInfo);
			}
                }
		//console.log(otherClass.credit);
		//console.log(otherClass);
		courseResult.push(compulsory);
		courseResult.push(coreClass);
		courseResult.push(otherClass);
		courseResult.push(elective);
                courseResult.push(otherElect);
                courseResult.push(language);
                courseResult.push(general);
                courseResult.push(peClass);
                courseResult.push(service);
                console.log(service);

	}
	else
	  return;
	res.locals.courseResult = courseResult; 
        //console.log("lala:" + JSON.stringify(courseResult));
	//if((courseResult[0].course.length != 0) && (courseResult[1].course.length != 0) && (courseResult[2].course.length != 0))
        	next();

}

function processOther(req, res, next){
	console.log("processOther");
	var courseResult = res.locals.courseResult;
	//console.log("here!!");
	//console.log(courseResult[0]);
	var rules = JSON.parse(req.rules);
        console.log("in second rules");
	console.log(rules);
	var program = req.profile[0].program;
        var pass = JSON.parse(req.pass);
	var rule = [];
	var total = req.course.total;
        //determine the elective
        //console.log(pass);
       	//console.log(total);
        for(var x = 0; x<total.length; x++){
        	for(var a = 0; a<total[x].cos_codes.length; a++){
               		rule[total[x].cos_codes[a]] = true;
                 }
        }
	for(var q = 0; q<pass.length; q++){
        	var cosInfo = {
                	cn:'',
                       	en:'',
                        complete:''
                 };
                var temp = pass[q].cos_code.substring(0,3);
                cosInfo.cn = pass[q].cos_cname;
                cosInfo.en = '';
                cosInfo.complete = true;
                if(rule[pass[q].cos_code] != true){
                	if(temp == 'DCP' || temp == 'IOC' || temp == 'IOE' || temp == 'ILE'){
                        	if(pass[q].cos_cname == '服務學習(一)' || pass[q].cos_cname == '服務學習(一)'){
                                	courseResult[8].credit += parseInt(pass[q].cos_credit);
                                        courseResult[8].course.push(cosInfo);
                                }
                                else{
                                        if(pass[q].cos_cname != '導師時間'){
						courseResult[3].credit += parseInt(pass[q].cos_credit);
                                        	courseResult[3].course.push(cosInfo);
					}
					else{
						console.log(pass[q].cos_cname);
                                                courseResult[0].course.push(cosInfo);
                                                courseResult[0].credit += parseInt(pass[q].cos_credit);
					}
                                }
                         }
                         else{
                                if(pass[q].cos_type == '外語'){
                                         courseResult[5].course.push(cosInfo);
                                         courseResult[5].credit += parseInt(pass[q].cos_credit);
                                 }
                                 else if(pass[q].cos_type == '通識'){
                                         var brief = pass[q].brief.substring(0,2);
                                         cosInfo.dimension = brief;
                                         courseResult[6].course.push(cosInfo);
                                         courseResult[6].credit += parseInt(pass[q].cos_credit);
                                 }
			         else{
                                         if(temp == 'PYY'){
                                         	courseResult[7].course.push(cosInfo);
                                                courseResult[7].credit += parseInt(pass[q].cos_credit);
                                         }
                                         else{
                                                if(pass[q].cos_typeext == '服務學習'){
                                                	courseResult[8].course.push(cosInfo);
                                                        courseResult[8].credit += parseInt(pass[q].cos_credit);
                                                }
                                                else{
                                                        courseResult[4].course.push(cosInfo);
                                                        courseResult[4].credit += parseInt(pass[q].cos_credit);
                                                }
                                          }
                                  }
                           }
        	}

        }
	//console.log("compulsory");
	//console.log(courseResult[0]);
	if(program == '資電')
        	courseResult[4].require = 8;
        if(program == '資工')
                courseResult[4].require = 12;
        if(program == '網多')
                courseResult[4].require = 12;
	res.locals.courseResult = courseResult;
	CourseResult = courseResult;
       	next();


}

module.exports = router;


















