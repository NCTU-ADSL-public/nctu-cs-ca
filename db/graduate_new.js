var express = require('express');
var table = require('./table');
var utils = require('../../../../utils');
//var getCourse = table.tables.getCourse;
var router = express.Router();
var getCourse = table.tables.getCourse;
var getPass = table.tables.getPass;

router.get('/students/graduate', queryPass ,queryCourse, processCourse, function(req, res){
    //console.log("Here," + JSON.stringify(res.locals.courseResult)); 
    res.send(res.locals.courseResult);	

});

function queryPass(req, res, next){
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
                     table.tables.getCourse(studentId, function(course){
                         req.course = course;
                         if(req.course)
                             next();
                     });
                }
    }

}

function processCourse(req, res, next){

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
		require: 58,
		course: []
	}
	var elective = {
		title: '專業選修',
		credit: 0,
		require: 12,
		course: []
	}
	var coreClass = {
		title: '核心',
		credit: 0,
		require: 9,
		course: []
	}
	var otherClass = {
		title: '副核心與他組核心',
		credit: 0,
		require: 9,
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
		console.log("req.profile");
		console.log(req.profile);
		var studentId = utils.getPersonId(JSON.parse(req.session.profile));	
		var program = req.profile[0].program;
		if(!studentId){
			console.log("No Student Id");
			return;
		}
		var pass = JSON.parse(req.pass);
		//console.log(pass);
		//console.log(req.course);
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
		//var phyFlag = 0;
		var BorCorPFlag = 0;
		
		//console.log(req.course.compulse);
		for(var q=0; q<compulse.length; q++){
			var cosInfo = {
                		cn:'',
                		en:'',
                		complete:''
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
						else //more B or C or P the credits count as otherElect
							otherElect.credit += credit[cosNumber[k]];
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
		console.log("Push compulsory");
		courseResult.push(compulsory);
		console.log(compulsory);
		var total = req.course.total;
		//determine the elective
		console.log(pass);
		//console.log(total);
		for(var x = 0; x<total.length; x++){
			for(var a = 0; a<total[x].cos_codes.length; a++){
				rule[total[x].cos_codes[a]] = true;
			}
		}
		for(q = 0; q<pass.length; q++){
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
						service.credit += parseInt(pass[q].cos_credit);
						service.course.push(cosInfo);
					}
					else{
						elective.credit += parseInt(pass[q].cos_credit);
                                                elective.course.push(cosInfo);
					}
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
							if(pass[q].cos_cname == '導師時間'){
								compulsory.course.push(cosInfo);
								compulsory.credit += parseInt(pass[q].cos_credit);
							}
							else{
								if(pass[q].cos_typeext == '服務學習'){
									service.course.push(cosInfo);
									service.credit += parseInt(pass[q].cos_credit);
								}
								else{
									otherElect.course.push(cosInfo);
									otherElect.credit += parseInt(pass[q].cos_credit);
								}
							}
						}
					}
				}
			}
		
		}
		if(program == '資電')
                        otherElect.require = 8;
                if(program == '資工')
                        otherElect.require = 12;
                if(program == '網多')
                        otherElect.require = 12;
		courseResult.push(elective);
		courseResult.push(otherElect);
		courseResult.push(language);
		courseResult.push(general);
		courseResult.push(peClass);
		courseResult.push(service);
		console.log(service);
		//console.log(otherElect);	
		//console.log(language);
		//console.log(general);
		//determine the language
		//console.log(elective);
		//determine the core 
		var core = req.course.core;
		//console.log("get core");
		//console.log(core);
		//console.log(core[0]);
		//console.log(core[0].cos_cname);
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
					coreClass.course.push(cosInfo);
				}
                        }
                        if(trueCounter == 0){
                                cosInfo.complete = false;
				coreClass.course.push(cosInfo);
			}
                }
		//console.log(coreClass);
		if(program == '資電')
			coreClass.require = 12;
		if(program == '資工')
			coreClass.require = 9;
		if(program == '網多')
			coreClass.require = 9;
		//console.log(coreClass);
		courseResult.push(coreClass);
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
		courseResult.push(otherClass);
		//console.log(courseResult);
		//res.locals.courseResult = courseResult; 
                //next();
	}
	else
	  return;
	res.locals.courseResult = courseResult; 
        //console.log("lala:" + JSON.stringify(courseResult));
        next();

}
module.exports = router;


















