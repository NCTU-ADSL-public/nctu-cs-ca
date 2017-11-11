const request = require('request');
var utils = require('../../../../../utils');
let Othercourse = {};

Othercourse.processOther = function(req, res, next){
	let courseResult = [];
	let compulsory = {
                title: '共同必修',
                credit: 0,
                require: 0,
                course: []
        }
        let coreClass = {
                title: '核心課程',
                credit: 0,
                require: 0,
                selection: false,
                course: []
        }
        let otherClass = {
                title: '副核心與他組核心',
                credit: 0,
                require: 0,
                selection: false,
                course: []
        }

	let elective = {
                title: '專業選修',
                credit: 0,
                require: 0,
                course: []
        }
	let language = {
                title: '外語',
                credit: 0,
                require: 8,
                course: []
        }
        let general = {
                title: '通識',
                credit: 0,
                require: 20,
                course: []
        }
        let otherElect = {
                title: '其他選修',
                credit: 0,
                require: 0,
                course: []
        }
	let peClass = {
                title: '體育',
                credit: 0,
                require: 6,
                course: []
        }
        let service = {
                title: '服務學習',
                credit: 0,
                require: 2,
                course: []
        }
        let art = {
                title: '藝文賞析',
                credit: 0,
                require: 2,
                course: []
        }
	let rules = JSON.parse(req.rules);
	let program = req.profile[0].program;
        let pass = JSON.parse(req.pass);
	let offset = JSON.parse(req.free);
	let generalCourse = JSON.parse(req.general);
	let generalCheck = [];
	let rule = [];
	let free = [];
	let CSname = [];
	let notCS = [];
	let EnglishCourse = [];
	let total = req.course.total;
	if(req.session.profile){

		let studentId = req.query.student_id;
	        let temp = parseInt(studentId.substring(0,2));
	        //console.log(temp);
	        // the year the student enter school
	        let school_year = (100 + temp);

		for(let i = 0; i<offset.length; i++){
			let cosInfo = {
                                cn:'',
                                en:'',
                                score: -1,
                                reason: 'CS',
                                complete:'0',
                                grade:'0',
                                year: '',
                                semester: ''
                        };
                        cosInfo.complete = true;
                        cosInfo.cn = offset[i].cos_cname;
                        cosInfo.year = parseInt(offset[i].apply_year) - school_year + 1;
                        cosInfo.semester = parseInt(offset[i].apply_semester);
                        if(offset[i].offset_type == '抵免')
                                cosInfo.reason = 'free1';
                        else if(offset[i].offset_type == '免修')
                                cosInfo.reason = 'free2';
                        if(offset[i].cos_type == '必修'){
                                compulsory.course.push(cosInfo);
                                compulsory.credit += parseInt(offset[i].credit);
                        }
			            else if(offset[i].cos_type == '選修'){
                                let temp = offset[i].cos_code.substring(0,3);
                                if(temp == 'DCP' || temp == 'IOC' || temp == 'IOE' || temp == 'ILE' || temp == 'IDS'){
                                        elective.course.push(cosInfo);
                                        elective.credit += parseInt(offset[i].credit);
                                }
                                else{
                                        otherElect.course.push(cosInfo);
                                        otherElect.credit += parseInt(offset[i].credit);
                                }
                        }
                        else if(offset[i].cos_type == '外語'){
                                language.course.push(cosInfo);
                                language.credit += parseInt(offset[i].credit);
                        }
                        else if(offset[i].cos_type == '通識'){
                                cosInfo.dimension = offset[i].brief;
                                general.course.push(cosInfo);
                                general.credit += parseInt(offset[i].credit);
                        }
                        else if(offset[i].cos_type == '服務學習'){
                                service.course.push(cosInfo);
                                service.credit += parseInt(offset[i].credit);
                        }
                        else if(offset[i].cos_type == '體育'){
                                peClass.course.push(cosInfo);
                                peClass.credit += parseInt(offset[i].credit);
                        }
		}
		for(let g = 0; g<generalCourse.length; g++){
                        generalCheck[generalCourse[g].cos_code] = true;
                }
		//console.log("After checking free");
		compulsory.require = parseInt(rules[0].require_credit);
	        coreClass.require = parseInt(rules[0].core_credit);
	        otherClass.require = parseInt(rules[0].sub_core_credit);
	        elective.require = parseInt(rules[0].pro_credit);
	        otherElect.require = parseInt(rules[0].free_credit);
	        language.require = parseInt(rules[0].foreign_credit);

		for(let x = 0; x<total.length; x++){
	        	for(let a = 0; a<total[x].cos_codes.length; a++){
	               		rule[total[x].cos_codes[a]] = true;
	                 }
	        }
		for(x = 0; x<total.length; x++){
	                 CSname[total[x].cos_cname] = true;
	        }
		for(let q = 0; q<pass.length; q++){
	        	let cosInfo = {
	                	cn:'',
	                       	en:'',
				score: -1,
				reason: 'CS',
	                        complete:'0',
				grade:'0',
				realCredit: 0,
				originalCredit: 0,
				english: false,
				year: '',
				semester: '',
				move: false
	                 };
	                let temp = pass[q].cos_code.substring(0,3);
	                cosInfo.cn = pass[q].cos_cname;
	                cosInfo.en = pass[q].cos_ename;
			cosInfo.originalCredit = parseInt(pass[q].cos_credit);
	                cosInfo.realCredit = parseInt(pass[q].cos_credit);
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
	                                	for(let w = 0; w< service.course.length; w++){
                                                	if(service.course[w].cn == pass[q].cos_cname){
                                                        	if(pass[q].score >= service.course[w].score){
                                                                	service.course[w] = cosInfo;
                                                                }
                                                                break;
                                                        }
                                                }
                                                if(w == service.course.length){
                                                        service.credit += parseInt(pass[q].cos_credit);
                                                        service.course.push(cosInfo);
                                                }
					}
	                                else{
	                                        if(pass[q].cos_cname != '導師時間'){
							for(let x = 0; x< elective.course.length; x++){
                                                        	if(elective.course[x].cn == pass[q].cos_cname){
                                                                	if(pass[q].score >= elective.course[x].score){
                                                                        	elective.course[x] = cosInfo;
                                                               		 }
                                                                	break;
                                                        	}
                                                        }
                                                        if(x == elective.course.length){
                                                                if(pass[q].cos_typeext == '英文授課'){
                                                                	cosInfo.english = true;
									EnglishCourse.push(cosInfo);
								}
								if(elective.credit >= elective.require){
                                                                        cosInfo.move = true;
									otherElect.credit += parseInt(pass[q].cos_credit);
                                                                        otherElect.course.push(cosInfo);
								}
								else{
									elective.credit += parseInt(pass[q].cos_credit);
                                                                	elective.course.push(cosInfo);
								}

                                                        }
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
						for(let h = 0; h< language.course.length; h++){
                                                	if(language.course[h].cn == pass[q].cos_cname){
                                                        	if(pass[q].score >= language.course[h].score){
                                                                	language.course[h] = cosInfo;
                                                                }
                                                                break;
                                                        }
                                                 }
                                                 if(h == language.course.length){
						 	if(language.credit >= language.require){
								cosInfo.move = true;
								otherElect.course.push(cosInfo);
								otherElect.credit += parseInt(pass[q].cos_credit);
							}
							else{
								language.course.push(cosInfo);
	                                        		language.credit += parseInt(pass[q].cos_credit);
							}
						}
					 }
	                                 else if(pass[q].cos_type == '通識'){
						let brief = pass[q].brief.substring(0,2);
                                                cosInfo.dimension = brief;
                                                for(let z = 0; z< general.course.length; z++){
                                                	if(general.course[z].cn == pass[q].cos_cname){
                                                        	if(pass[q].score >= general.course[z].score){
                                                                	general.course[z] = cosInfo;
                                                                }
                                                                break;
                                                         }
                                                }
                                                if(z == general.course.length){
							if(general.credit >= general.require){
								cosInfo.move = true;
								otherElect.course.push(cosInfo);
								otherElect.credit += parseInt(pass[q].cos_credit);
							}
							else{
	                                        		general.course.push(cosInfo);
	                                        		general.credit += parseInt(pass[q].cos_credit);
							}
						}
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
									cosInfo.complete = true;
	                                        			cosInfo.reason = 'NotCS';
									notCS[cosInfo.cn] = true;
									free[cosInfo.cn] = cosInfo;
								}
								for(let m = 0; m< otherElect.course.length; m++){
                                                                	if(otherElect.course[m].cn == pass[q].cos_cname){
                                                                        	if(pass[q].score >= otherElect.course[m].score){
                                                                                	otherElect.course[m] = cosInfo;
                                                                                }
                                                                                break;
                                                                         }
                                                                }
                                                                if(m == otherElect.course.length){
                                                                	if(generalCheck[pass[q].cos_code] === true){
                                                                                cosInfo.reason = 'general';
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
	res.locals.notCS = notCS;
	res.locals.English = EnglishCourse;
	res.locals.free = free;
 	next();
}

exports.Othercourse = Othercourse;
