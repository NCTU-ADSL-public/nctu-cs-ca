var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var table = {};
var nodemailer = require('nodemailer');
var mail_info = require('../../../auth/nctu/mail_info');

// offset table----------------------------------------------------------------------

/* 助理改變抵免申請單狀態，並寄信通知 */
table.offsetApplySetAgree = function(req, res, next) {
	if(req.session.profile) {
        var assistant_email = '';
        var teacher_email = '';
        var assistantId = utils.getPersonId(JSON.parse(req.session.profile));
        query.ShowUserInfo(assistantId, function(err,result){
            if(err){
                throw err;
                return;
            }
            if(!result){
                return;
            }
            result = JSON.parse(result);
	    	assistant_email = result[0].email;
        });
        if(req.body.transferTo){
            query.ShowUserInfo(req.body.transferTo, function(err,result){
                if(err){
                    throw err;
                    return;
                }
                if(!result){
                    return;
                }
                result = JSON.parse(result);
	    	    teacher_email = result[0].email;
            });
        }

    	var state_check = [];
        var mails = [];
        for(var i = 0; i < req.body.courses.length; i++) {
        	var data = {
            	timestamp: req.body.courses[i].timestamp,
                student_id: req.body.courses[i].sid,
                state: req.body.status,
                // status: 0 申請中，1 等候主管同意，2 同意抵免，3 抵免失敗(助理不同意)，4 抵免失敗(教授不同意)，5 等候老師同意，6 退回等學生修改
                reject_reason: req.body.courses[i].reason,
                transferto:req.body.transferTo
            }
            query.SetOffsetApplyFormAgreeStatus(data, function(err,result){
            	if (err) {
                	throw err;
                    res.redirect('/');
                }
                if (!result)
                	res.redirect('/');     
                else {
                	result = JSON.parse(result);
                    state_check.push(result);
                }
            });
            query.ShowUserInfo(req.body.courses[i].sid, function(err,result){
                if(err){
                    throw err;
                    return;
                }
                if(!result){
                    return;
                }
                result = JSON.parse(result);
                mails.push(result[0].email);
            });
		}
	    setTimeout(function() {
            var mailString='';
            var nameString='';
            for(var j = 0; j< mails.length; j++){
                mailString = mailString + mails[j] + ',';
                //nameString = nameString + info.participants[j] + ',';
            }
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: mail_info.auth
            });
            
            var options = {
                //寄件者
                from: 'nctucsca@gmail.com',
                //收件者
                to: mailString, 
                //副本
                cc: /*req.body.sender_email*/'',
                //密件副本
                bcc: '',
                //主旨
                subject: '', // Subject line
                //純文字
                /*text: 'Hello world2',*/ // plaintext body
                //嵌入 html 的內文
                html: '<p>此信件由系統自動發送，請勿直接回信！若有任何疑問，請至系辦詢問助理，謝謝。</p><br/><p>請進入交大資工線上助理核可申請表/確認申請表狀態：<a href = "https://dinodino.nctu.edu.tw"> 點此進入系統</a></p><br/><br/><p>Best Regards,</p><p>交大資工線上助理 NCTU CSCA</p>'
                //附件檔案
                /*attachments: [ {
                    filename: 'text01.txt',
                    content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
                }]*/
            };
            
            if(req.body.status == 2){
                options.subject = '[交大資工線上助理]同意抵免申請郵件通知';
            }
            else if(req.body.status == 3){
                options.subject = '[交大資工線上助理]不同意抵免申請郵件通知';
            }
            else if(req.body.status == 5){
                options.to = teacher_email;
                options.subject = '[交大資工線上助理]轉交抵免申請郵件通知';
                options.html = '<p>此信件由系統自動發送，請勿直接回信！抵免申請審核已由助理轉交至老師，等候老師同意。若有任何疑問，請至系辦詢問助理，謝謝。</p><br/><p>請進入交大資工線上助理核可申請表/確認申請表狀態：<a href = "https://dinodino.nctu.edu.tw"> 點此進入系統</a></p><br/><br/><p>Best Regards,</p><p>交大資工線上助理 NCTU CSCA</p>'
            }
            else if(req.body.status == 6){
                options.subject = '[交大資工線上助理]退回抵免申請(等候學生修改)郵件通知';
                options.html = '<p>此信件由系統自動發送，請勿直接回信！退回申請原因請進入系統查看。若有任何疑問，請至系辦詢問助理，謝謝。</p><br/><p>請進入交大資工線上助理確認申請表狀態：<a href = "https://dinodino.nctu.edu.tw"> 點此進入系統</a></p><br/><br/><p>Best Regards,</p><p>交大資工線上助理 NCTU CSCA</p>'
            }
            
            if(req.body.status == 2 || req.body.status == 3 || req.body.status == 5 || req.body.status == 6){
                transporter.sendMail(options, function(error, info){
                    if(error){
                        console.log(error);
                    }
                });
            }

        	var signal = {signal : JSON.parse(state_check[0].info.affectedRows)};
			req.setAgree = signal;
			if (req.setAgree) 
				next();
			else
				return;
        }, 1000);
                     
	}
    else
    	res.redirect('/');
}

/* 列出該學生的抵免申請單 */
table.offsetApplyInfo = function(req, res, next) {
	if (req.session.profile) {
        var StudentId = res.locals.studentId;
        var data = {student_id: StudentId};
        // console.log(data);
        query.ShowUserOffsetApplyForm(data, function(err,result) {
            if (err) {
                throw err;
                res.redirect('/');
            }
            if (!result)
                res.redirect('/');
            else {
                result = JSON.parse(result);
                var list = {
                    waive_course: [],
                    exempt_course: [],
                    compulsory_course: [],
                    english_course: []
                };
                for (var i = 0; i < result.length; i++) {
                    //轉校轉系抵免
                    var agree_status = parseInt(result[i].agree);
                    if (agree_status == 1 || agree_status == 5 )
                        agree_status = 0;
                    else if (agree_status == 2)
                        agree_status = 1;
                    else if (agree_status == 3 ||agree_status == 4)
                        agree_status = 2;
                    else if (agree_status == 6)
                        agree_status = 3;
                    if (result[i].offset_type === "2") {
                        var waive = {
                            "timestamp": result[i].timestamp,
                            "phone": result[i].phone,
                            "original_school": result[i].school_old,
                            "original_department": result[i].dep_old,
                            "current_school": "交通大學",
                            "current_department": "資工系",
                            "original_graduation_credit": parseInt(result[i].graduation_credit_old),
                            "apply_year": parseInt(result[i].apply_year),
                            "apply_semester": parseInt(result[i].apply_semester),
                            "original_course_year": parseInt(result[i].cos_year_old),
                            "original_course_semester": parseInt(result[i].cos_semester_old),
                            "original_course_name": result[i].cos_cname_old,
                            "original_course_department": result[i].cos_dep_old,
                            "original_course_credit": parseInt(result[i].credit_old),
                            "original_course_score": result[i].score_old,
                            "current_course_code": result[i].cos_code,
                            "current_course_name": result[i].cos_cname,
                            "current_course_credit": parseInt(result[i].credit),
                            "current_course_type": result[i].cos_type,
                            "file": result[i].file,
                            "status": agree_status,
                            "reject_reason": result[i].reject_reason
                        };
                        list.waive_course.push(waive);
                    } else if (result[i].offset_type === "1") { // 英授抵免
                        var english = {
                            "timestamp": result[i].timestamp,
                            "apply_year" : parseInt(result[i].apply_year),
                            "apply_semester" : parseInt(result[i].apply_semester),
                            "phone": result[i].phone,
                            "reason": result[i].reason,
                            "department": result[i].cos_dep_old, 
                            "teacher": result[i].cos_tname_old,
                            "credit": parseInt(result[i].credit),
                            "course_code": result[i].cos_code_old,
                            "course_name": result[i].cos_cname_old,
                            "file": result[i].file,
                            "status": agree_status,
                            "reject_reason": result[i].reject_reason
                        };
                        list.english_course.push(english);
                    } else if (result[i].offset_type === "0") { // 外系抵免
                        var compulsory = {
                            "timestamp": result[i].timestamp,
                            "apply_year" : parseInt(result[i].apply_year),
                            "apply_semester" : parseInt(result[i].apply_semester),
                            "phone": result[i].phone,
                            "reason": { "type" :result[i].reason_type,
                                        "content": result[i].reason
                                        },
                            "department": result[i].cos_dep_old, 
                            "teacher": result[i].cos_tname_old,
                            "credit": parseInt(result[i].credit),
                            "course_year":parseInt(result[i].cos_year_old),
                            "course_semester":parseInt(result[i].cos_semester_old),
                            "course_code": result[i].cos_code,
                            "course_name": result[i].cos_cname,
                            "original_course_code": result[i].cos_code_old,
                            "original_course_name": result[i].cos_cname_old,
                            "original_course_credit": parseInt(result[i].credit_old),
                            "file": result[i].file,
                            "status": agree_status,
                            "reject_reason": result[i].reject_reason
                        };
                        list.compulsory_course.push(compulsory);
                    } else if (result[i].offset_type === "3") {
                        var exempt = {
                            "timestamp": result[i].timestamp,
                            "phone": result[i].phone,
                            "apply_year" : parseInt(result[i].apply_year),
                            "apply_semester" : parseInt(result[i].apply_semester),
                            "original_course_year": parseInt(result[i].cos_year_old),
                            "original_course_semester": parseInt(result[i].cos_semester_old),
                            "original_course_name": result[i].cos_cname_old,
                            "original_course_department": result[i].cos_dep_old,
                            "original_course_credit": parseInt(result[i].credit_old),
                            "original_course_score": result[i].score_old,
                            "current_course_code": result[i].cos_code,
                            "current_course_name": result[i].cos_cname,
                            "current_course_credit": parseInt(result[i].credit),
                            "file": result[i].file,
                            "current_course_type": result[i].cos_type,
                            "status": agree_status,
                            "reject_reason": result[i].reject_reason
                        };
                        list.exempt_course.push(exempt);
                    }
                }
            }
            req.info = list;
		    if (req.info) 
			    next();
		    else
		    	return;
        });
    }
    else
        res.redirect('/');
}

/* 列出所有學生的抵免申請單 */
table.offsetApplyShow = function(req, res, next) {
	if(req.session.profile) {           
    	var data1 = {student_id: '0516003'};
        var data2 = {all_student: true};
        // var year = req.body.apply_year;
        // var sem = req.body.apply_semester;
        query.ShowUserOffsetApplyForm(data2, function(err,result) {
        	if(err){
            	throw err;
               	res.redirect('/');
            }
            if(!result)
            	res.redirect('/');
            else {
               	result = JSON.parse(result);
                //console.log(result);
                var group = [];   
                for(var i = 0; i < result.length; i++){
                    // if(result[i].apply_year != year || result[i].apply_semester != sem) continue;
                	var one = {
                    	"apply_year" : result[i].apply_year,
                        "apply_semester" : parseInt(result[i].apply_semester),
                        "sid": result[i].student_id,
                        "name": result[i].sname,
                        "program": result[i].program,
                        "grade": result[i].grade,
                        "info": result[i].program + "大" + result[i].grade,
                   	    "phone": result[i].phone,
                        "nameA": result[i].cos_cname_old,
              	        "codeA": result[i].cos_code_old,
                        "department": result[i].cos_dep_old, 
                        "teacher": result[i].cos_tname_old,
                        "creditA": parseInt(result[i].credit_old),
                        "nameB": result[i].cos_cname,
                        "codeB": result[i].cos_code,
                        "creditB": parseInt(result[i].credit),
                        "typeB": result[i].cos_type,
                        "type": parseInt(result[i].offset_type),
                        "score": result[i].score_old,
                        "reason": result[i].reason,
                        "reason_type" : result[i].reason_type,
                        "reject_reason": result[i].reject_reason,
                        "status": parseInt(result[i].agree),
                        "previous": result[i].previous == "0" ? false : true,
                        "date": result[i].timestamp,
                        "transferTo": "",
                        "cos_year_old": result[i].cos_year_old,
                        "cos_semester_old": parseInt(result[i].cos_semester_old),
                        "resend": parseInt(result[i].resend) === 1 ? true : false
                 	};
                    // "file": result[i].file,

                    if (one.type == 0) {
                    	one.nameA = result[i].cos_cname;
                        one.codeA = result[i].cos_code;
                        one.creditA = parseInt(result[i].credit);
                        one.nameB = result[i].cos_cname_old;
                        one.codeB = result[i].cos_code_old;
                        one.creditB = parseInt(result[i].credit_old);
                   	}
                    if (result[i].transferto != null)
            	        one.transferTo = result[i].transferto;
                   	group.push(one);
                }
                req.show = group;
                next();
                /*
                if (group.length == result.length) {
                    req.show = group;
                    if (req.show)
                        next();
                    else
                        return;
                } 
                */
            }
        });                           
    }
    else
    	res.redirect('/');
}


table.offsetApplyFile = function(req, res, next) {
    if (req.session.profile) {
        var input = req.body;
        query.ShowUserOffsetApplyForm({all_student: true}, function(err, result) {
        	if(err){
            	throw err;
               	res.redirect('/');
            }
            if(!result)
            	res.redirect('/');
            else {
               	result = JSON.parse(result);
                for (var i = 0; i < result.length; i++) {
                    if (result[i].timestamp !== input.date || result[i].student_id !== input.sid)
                        continue;
                    req.file = {
                        "file": result[i].file
                    }
                    next();
                }
            }
        });
    } else res.redirect('/');
}


// ----------------------------------------------------------------------offset table

// research table--------------------------------------------------------------------

/*  列出該年級所有學生的專題資訊 */
table.researchStudentList = function(req, res, next) {
	if (req.session.profile) {
   		query.ShowGradeStudentIdList(req.body.grade,function(err, ID_list) {
        	if (err) {
            	throw err;
            	res.redirect('/');
        	}	
        	if (!ID_list)
            	res.redirect('/');
       		else {
            	var project = [];
            	var count = 0;
            	var index = [];
            	ID_list = JSON.parse(ID_list);
            	for (var i=0; i<ID_list.length; i++) {
                	var list = {
                    	student:{
                        	id:'',
                            name:'',
                            program:''
                        },
                        project:{
                            status:3,
                            title:'',
                            professor_name:''
                        }
                    }
                	list.student.id = ID_list[i].student_id;
                	list.student.name = ID_list[i].sname;
               		list.student.program = ID_list[i].program;
                	index[ID_list[i].student_id] = count;
                	count++;
                	project.push(list);
            	}              
            	for (var i=0; i<ID_list.length; i++) {
                    query.ShowStudentResearchInfo(ID_list[i].student_id, function(err, research) {
                    	if(err)
                        	throw err;
                    	if(!research)
                        	res.redirect('/');
                        else {
                            research = JSON.parse(research);
                           	if(research.length!=0){
                               	var id = index[research[research.length -1].student_id];
                               	if(research[research.length - 1].add_status == 0)
                                   	project[id].project.status = 0;
                               	else
                                   	project[id].project.status = 1;
                               	project[id].project.title = research[research.length - 1].research_title;
                               	project[id].project.professor_name = research[research.length -1 ].tname;   
                           	}					
                       	}		
                    });
            	}
           		for (var i=0; i<ID_list.length; i++) {       
                	query.ShowStudentResearchApplyForm(ID_list[i].student_id, function(err, applyform) {
                    	if (err)
                        	throw err;
                    	if (!applyform)
                        	res.redirect('/');
                    	else {		
                        	applyform = JSON.parse(applyform);
                        	//console.log(applyform);
                        	if (applyform.length!=0) {
                            	//console.log(applyform[0].student_id);
                            	var id = index[applyform[0].student_id.substring(0,7)];
                            
                            	if (applyform[0].agree == 0 || applyform[0].agree == 2)
                                	project[id].project.status = 2;
                            //else if(applyform[0].agree == 3)
                            //	project[id].project.status =2;
                            
                            	project[id].project.title = applyform[0].research_title;
                            	project[id].project.professor_name = applyform[0].tname;
                
                        	}
                    	}
                	});        
            	}
            	setTimeout(function() {
					req.studentList = project;
					if (req.studentList)
						next();
					else
						return;
            	}, 500);
        	}
    	});
	}
	else
    	res.redirect('/'); 
}

/* 列出所有學生的專題資訊 */
table.researchStudentListDownload = function(req, res, next) {
	if (req.session.profile) {
    	req.body.grade = '';
    	var accept_num_semester = req.body.semester.substring(0, 3);
    	var tid = { teacher_id: '' };
    	query.ShowTeacherInfoResearchCnt(tid, function(err, ID_list) {
        	if (err) {
            	throw err;
            	res.redirect('/');
        	}
        	if (!ID_list) res.redirect('/');
        	else {
            	var group = [];
            	var Count = 0;
            	var Index = [];
            	ID_list = JSON.parse(ID_list);
            	for (var i = 0; i < ID_list.length; i++) {
                	var list = {
                    	professor_name: ID_list[i].tname,
                    	accept_status: 0,
                    	pending_status: 0,
                    	gradeCnt: 0,
                    	accepted: {
                        	projects: [],
                    	},
                    	pending: {
                        	projects: [],
                    	},
                	};
                	for (var j = 0; j < ID_list[i].gradeCnt.length; j++) {
                    	if (ID_list[i].gradeCnt[j].grade == accept_num_semester) {
                        	list.gradeCnt = parseInt(ID_list[i].gradeCnt[j].scount);
                        	break;
                    	}
                	}
                	Index[ID_list[i].teacher_id] = Count;
                	Count++;
                	if (list.gradeCnt === null) list.gradeCnt = 0;
                	group.push(list);
            	}
            	var student_cnt = 0;
            	for (var i = 0; i < ID_list.length; i++) {
                	query.ShowGradeTeacherResearchStudent(ID_list[i].teacher_id, req.body.grade, function(err,result) {
                    	if (err) {
                        	throw err;
                        	return;
                    	}
                	if (!result) return;
                	else {
                    	result = JSON.parse(result);
                    	var index = [];
                    	var count = 0;
                    	for (var j = 0; j < result.length; j++) {
                			if (index[result[j].research_title] == null && result[j].semester == req.body.semester) {
                    			var project = {
                        			title: '',
                        			students: [],
                        			title_number: ''
                    			};
                    			project.title = result[j].research_title;
                    			var Id = Index[result[j].teacher_id];
                    			group[Id].accepted.projects.push(project);
                    			index[result[j].research_title] = count;
                    			count++;
                			}
            			}
            			for (var j = 0; j < result.length; j++) {
                			if (result[j].semester == req.body.semester) {
                    			var student = {
                        			id: '',
                        			name: '',
                        			program: '',
                        			semester: '',
                        			first_second: '',
                        			status: null,
                        			add_status: 0
                    			};
                    			student.id = result[j].student_id;
                    			student.name = result[j].sname;
                    			student.program = result[j].class_detail;
                    			student.semester = result[j].semester;
                    			student.first_second = result[j].first_second;
                    			student.status = result[j].status;
                    			student.add_status = result[j].add_status;
                    			var id = index[result[j].research_title];
                    			var Id = Index[result[j].teacher_id];
                    			group[Id].accepted.projects[id].students.push(student);
                    			student_cnt++;
                    			if (result[j].add_status == 0 && group[Id].accept_status == 0)
                        			group[Id].accept_status = 1;
                			}
            			}
            		}
          		});
        	}
        	for (var i = 0; i < ID_list.length; i++) {
          		query.ShowTeacherResearchApplyFormList(ID_list[i].teacher_id, function(err, result) {
            		if (err) {
             	 		throw err;
              			return;
            		}
            		if (!result) return;
            		else {
             	 		result = JSON.parse(result);
              			var index = [];
              			var count = 0;
              			for (var j = 0; j < result.length; j++) {
                			if (index[result[j].research_title] == null) {
                 				var project = {
                    				title: '',
                    				students: [],
                    				title_number: '',
                  				};
                  				project.title = result[j].research_title;
                  				var Id = Index[result[j].teacher_id];
                  				group[Id].pending.projects.push(project);
                  				index[result[j].research_title] = count;
                  				count++;

                  				if (group[Id].pending_status == 0) group[Id].pending_status = 1;
                			}
              			}
              			for (var j = 0; j < result.length; j++) {
                			var student = {
                  				id: '',
                  				name: '',
                  				program: '',
                  				first_second: '',
                  				status: null,
                			};
                			student.id = result[j].student_id;
                			student.name = result[j].sname;
                			student.program = result[j].program;
                			student.first_second = result[j].first_second;
                			student.status = result[j].status;
                			var id = index[result[j].research_title];
                			var Id = Index[result[j].teacher_id];
                			group[Id].pending.projects[id].students.push(student);
                			student_cnt++;
              			}
            		}
          		});
        	}
        	var return_list = [];
        	setTimeout(function() {
            	for (var i = 0; i < group.length; i++) {
                	var Tname = group[i].professor_name;
                	var project_ac_list = group[i].accepted.projects;
                	var project_pending_list = group[i].pending.projects;
                	for (var j = 0; j < project_ac_list.length; j++) {
                    	var student_list = project_ac_list[j].students;
                    	for (var k = 0; k < student_list.length; k++) {
                        	var student = {
                            	student_id: '',
                            	sname: '',
                            	tname: '',
                            	research_title: '',
                            	first_second: '',
                        	};
                        	student.tname = Tname;
                        	student.research_title = project_ac_list[j].title;
                        	student.student_id = student_list[k].id;
                        	student.sname = student_list[k].name;
                        	student.first_second = student_list[k].first_second;
                        	return_list.push(student);
                    	}
                	}
                	for (var j = 0; j < project_pending_list.length; j++) {
                    	var student_list = project_pending_list[j].students;
                    	for (var k = 0; k < student_list.length; k++) {
                        	var student = {
                            	student_id: '',
                            	sname: '',
                            	tname: '',
                            	research_title: '',
                            	first_second: '',
                        	};
                        	student.tname = Tname;
                        	student.research_title = project_pending_list[j].title;
                        	student.student_id = student_list[k].id;
                        	student.sname = student_list[k].name;
                        	student.first_second = student_list[k].first_second;
                        	return_list.push(student);
                    	}
                	}
            	}
            	if (return_list.length == student_cnt) {
					req.studentListDownload = return_list;
					if (req.studentListDownload)
						next();
					else
						return;
				}
        	}, 1000);
		}
    	});
	} 
	else 
    	res.redirect('/');
}

/* 列出該教授的專題學生資訊 */
table.researchProfessorList = function(req, res, next) {
	if (req.session.profile) {
    	//req.body.grade = (req.body.grade == 'all') ? '' : req.body.grade;
    	//var accept_num_semester = req.body.semester.substring(0,3);
        
        var accept_num_semester = req.body.year;
        var year_semester = req.body.year + '-' + req.body.semester;
    	
        //console.log(accept_num_semester);
    	var tid = { teacher_id:'' }
    	query.ShowTeacherInfoResearchCnt(tid, function(err, ID_list) {
        	if (err) {
            	throw err;
            	res.redirect('/');
        	}
        	if(!ID_list)
            	res.redirect('/');
        	else {
            	var group = [];
            	var Count = 0;
            	var Index = [];
            	ID_list = JSON.parse(ID_list);
            	for (var i=0; i<ID_list.length; i++) {
                	var list = {
                    	professor_name:ID_list[i].tname,
                    	accept_status:0,
                    	pending_status:0,
                    	gradeCnt:0,
                    	accepted:{
                        	projects:[]
                    	},
                    	pending:{
                        	projects:[]
                    	}
                	}
                    for (var j=0; j<ID_list[i].gradeCnt.length;j++) {
                        if (ID_list[i].gradeCnt[j].grade == accept_num_semester) {
                            list.gradeCnt = parseInt(ID_list[i].gradeCnt[j].scount);
                            break;
                        }
                    }
                	Index[ID_list[i].teacher_id] = Count;
                	Count ++;
                	if(list.gradeCnt === null)
                    	list.gradeCnt = 0 ;
                	group.push(list);
            	}
            	for (var i=0; i<ID_list.length; i++) {
                	//query.ShowGradeTeacherResearchStudent(ID_list[i].teacher_id,req.body.grade, function(err, result) {
                	query.ShowGradeTeacherResearchStudent(ID_list[i].teacher_id,'', function(err, result) {
                    	if (err) {
                        	throw err;
                        	return;
                    	}
                    	if (!result)
                        	return;
                    	else {
                        	result = JSON.parse(result);
                        	//console.log(result);
                        //  	if (req.body.semester == 'all') {
                        //       	var index = [];
                        //       	var count = 0;
                        //       	var index_sid = [];
                        //       	var count_sid = 0;
                        //    	for (var j = 0; j<result.length; j++) {
                        //        	if (index[result[j].research_title] == null) {
                        //            	var project = {
                        //                    title: '',
                        //           	        students : [],
                        //            	}
                        //            	project.title = result[j].research_title;
                        //            	var Id = Index[result[j].teacher_id];
                        //            	group[Id].accepted.projects.push(project);
                        //            	index[result[j].research_title] = count;
                        //            	count++;
                        //        	}  
                        //    	}
                        //    	for (var j = 0; j<result.length; j++) {
                        //            var student = {
                        //                id: '',
                        //                name: '',
                        //                program: '',
                        //                semester:'',
                        //                first_second:'',
                        //                status: null,
                        //                add_status:0	
                        //            //	score: null,
                        //            }
                        //            if (index_sid[result[j].student_id] == null) {
                        //                student.id = result[j].student_id;
                        //                student.name = result[j].sname;
                        //                student.program = result[j].class_detail;
                        //                student.semester = result[j].semester;
                        //                student.first_second = result[j].first_second;
                        //                student.status = result[j].status;
                        //                student.add_status = result[j].add_status;
                        //                var id = index[result[j].research_title];
                        //                var Id = Index[result[j].teacher_id];
                        //                group[Id].accepted.projects[id].students.push(student);
                        //                index_sid[result[j].student_id] = count_sid;
                        //                count_sid++;
                        //                if((result[j].add_status == 0) && (group[Id].accept_status == 0))
                        //                    group[Id].accept_status = 1;
                        //            } else {
                        //                var id = index[result[j].research_title];
                        //                var Id = Index[result[j].teacher_id];
                        //                var flag = 1;
                        //                for (var k =0 ;k < group[Id].accepted.projects[id].students.length ; k++) {  /*update to second semester*/
                        //                    if (result[j].student_id == group[Id].accepted.projects[id].students[k].id) {
                        //                        group[Id].accepted.projects[id].students[k].name = result[j].sname;
                        //                        group[Id].accepted.projects[id].students[k].program = result[j].class_detail;
                        //                        group[Id].accepted.projects[id].students[k].semester = result[j].semester;
                        //                        group[Id].accepted.projects[id].students[k].first_second = result[j].first_second;
                        //                        group[Id].accepted.projects[id].students[k].status = result[j].status;
                        //                        group[Id].accepted.projects[id].students[k].add_status = result[j].add_status;
                        //                        flag = 0;
                        //                        break;
                        //                    }
                        //                    else
                        //                        flag = 1;
                        //                }
                        //                if (flag){ /*change teacher*/
                        //                    student.id = result[j].student_id;
                        //                    student.name = result[j].sname;
                        //                    student.program = result[j].class_detail;
                        //                    student.semester = result[j].semester;
                        //                    student.first_second = result[j].first_second;
                        //                    student.status = result[j].status;
                        //                    student.add_status = result[j].add_status;
                        //                    group[Id].accepted.projects[id].students.push(student);
                        //                }						

                   /**/ //             }

                   /**/ //         }		
                            
                        // 	} else {
                            	var index = [];
                            	var count = 0;
                            	for (var j = 0; j<result.length; j++) { 
                                	if ((index[result[j].research_title] == null)&& (result[j].semester == /*req.body.semester*/year_semester) && (result[j].first_second == req.body.first_second)) {
                                    	var project = {
                                            title: '',
                                            students : [],
                                    	}
                                    	project.title = result[j].research_title;
                                    	var Id = Index[result[j].teacher_id];
                                    	group[Id].accepted.projects.push(project);
                                    	index[result[j].research_title] = count;
                                    	count++;
                                	}  
                            	}
                            	for (var j = 0; j<result.length; j++) {
                                	if ((result[j].semester == /*req.body.semester*/ year_semester) && (result[j].first_second == req.body.first_second)) {
                                    	var student = {
                                        	id: '',
                                        	name: '',
                                        	program: '',
                                        	semester:'',
                                        	first_second:'',
                                        	status: null,
                                        	add_status: 0	
                                    	}
                                    	student.id = result[j].student_id;
                                    	student.name = result[j].sname;
                                    	student.program = result[j].class_detail;
                                    	student.semester = result[j].semester;
                                    	student.first_second = result[j].first_second;
                                    	student.status = result[j].status;
                                    	student.add_status = result[j].add_status;
                                    	var id = index[result[j].research_title];
                                    	var Id = Index[result[j].teacher_id];
                                    	group[Id].accepted.projects[id].students.push(student);
                                    	if((result[j].add_status == 0) && (group[Id].accept_status == 0))
                                    	group[Id].accept_status = 1;
                                	}
                            	}
                       // 	}
                    	}
                	});
            	}
            	for (var i=0; i<ID_list.length; i++) {
                	query.ShowTeacherResearchApplyFormList(ID_list[i].teacher_id, function(err, result){
                    	if (err) {
                        	throw err;
                        	return;
                    	}
                    	if(!result)
                        	return;
                    	else {
                        	result = JSON.parse(result);
                        	var index = [];
                        	var count = 0;
                        	for (var j = 0; j<result.length; j++) {
                            	if (index[result[j].research_title] == null) {
                                	var project = {
                                        title: '',
                                        students : [],
                                	}
                                	project.title = result[j].research_title;
                                	var Id = Index[result[j].teacher_id];
                                	group[Id].pending.projects.push(project);
                                	index[result[j].research_title] = count;
                                	count++;
                                	if(group[Id].pending_status == 0)
                                    	group[Id].pending_status = 1;
                            	}  
                        	}
                        	for (var j = 0; j<result.length; j++) {	
                            	var student = {
                                	id: '',
                                	name: '',
                                	program: '',
                                	first_second:'',
                                	status: null	
                            	}
                            	student.id = result[j].student_id;
                            	student.name = result[j].sname;
                            	student.program = result[j].program;
                            	student.first_second = result[j].first_second;
                            	student.status = result[j].status;
                            	var id = index[result[j].research_title];
                            	var Id = Index[result[j].teacher_id];
                            	group[Id].pending.projects[id].students.push(student);
                                    
                        	}	
                    	}
                	});
            	}
            	setTimeout(function() {
                	req.professorList = group;
					if (req.professorList)
						next();
					else
						return;
            	}, 1000);
        	}
    	});	
	}
	else
    	res.redirect('/');
}

/*  列出該學期專題一或二的所有成績資訊 */
table.researchGradeList = function(req, res, next) {
	if(req.session.profile){ 
    	var input = { semester: req.body.semester, first_second: req.body.first_second };
    	query.ShowResearchScoreComment(input, function(err,result) {	
        	if (err) {
            	throw err;
            	res.redirect('/');
        	}
        	if (!result)
            	res.redirect('/');
        	else {
            	result = JSON.parse(result);
            	var index = [];
            	var groups = [];
            	for (var i = 0; i<result.length; i++) {
                    var list = {
                    	professor_name: '',
                        student: {
                        	id:'',
                            name:'',
                            score:null,
                            comment:''
                        }			
                    }
                    list.professor_name = result[i].tname;
                    list.student.id = result[i].student_id;
                    list.student.name = result[i].sname;
                    list.student.score = parseInt(result[i].score);
                    list.student.comment = result[i].comment;
                    list.student.research_title = result[i].research_title;
                    groups.push(list);
            	}
            	if (groups.length == result.length) {
                    req.gradeList = groups;
                    if (req.gradeList) 
                        next();
                    else
                        return;
                }
        	}			
    	});	
    
	}
	else
    	res.redirect('/');
}

/* 該學期專題一或二的成績表下載 */
table.researchGradeDownload = function(req, res, next) {
	if (req.session.profile) { 
    	var input = { semester: req.body.semester, first_second: req.body.first_second };
    	query.ShowResearchScoreComment(input, function(err,result) {	
        	if (err) {
            	throw err;
            	res.redirect('/');
       		}
        	if (!result)
            	res.redirect('/');
			result = JSON.parse(result)
			req.gradeDownload = result;
			if (req.gradeDownload)
				next();
			else
				return;
    	});	
	}
	else
    	res.redirect('/');
}

/* 助理更改該學生專題成績和評論 */
table.researchSetScore = function(req, res, next) {
	if (req.session.profile) {
        var content = {
            student_id: req.body.student_id,
            tname: req.body.tname,
            research_title: req.body.research_title,
            first_second: parseInt(req.body.first_second),
            semester: req.body.semester,
            new_score: parseInt(req.body.new_score),
            new_comment: req.body.new_comment
        };
        query.SetResearchScoreComment(content, function(err, result) {
            if (err) 
                throw err;
			var signal = { signal: 1 };
			req.setScore = signal;
			if (req.setScore)
				next();
			else
				return;	
            res.send(result);
        });
    }
}

/* 刪除該學生的專題資訊(讓助理可以刪掉CPE未過但被教授同意的人的專題) */
table.researchDelete = function(req, res, next) {
	if (req.session.profile) {
    	var info = { student_id: req.body.student_id, first_second: req.body.first_second, semester: req.body.semester };
    	query.DeleteResearch(info, function(err, result) {
        	if (err) {
            	throw err;
            	res.redirect('/');
        	}
        	if (!result)
        	    res.redirect('/');
        	result = JSON.parse(result);
        	req.delete = result;
			if (req.delete)
				next();
			else
				return;
    	});	 
	} else {
    	res.redirect('/');
	} 
}

/* 修改專題資料的 add_status, 0代表尚未加選 1代表已加選 */
table.researchSetAddStatus = function(req, res, next) {
	if (req.session.profile) {   
    	var info = { 
        	student_id: req.body.student_id, 
        	research_title: req.body.research_title, 
        	semester: req.body.semester, 
        	first_second: req.body.first_second,
        	add_status: 1 
    	};
    	query.SetResearchAddStatus(info, function(err, result) {
        	if (err) {
            	throw err;
            	res.redirect('/');
        	}
        	if (!result)
            	res.redirect('/');
        	result = JSON.parse(result);
        	req.setAddStatus = result;
        	if (req.setAddStatus)
            	next();
        	else
            	return;     
    	});
	}
	else
    	res.redirect('/');
}

/* CPE未通過申請專題:first_second = 3, 助理確認CPE通過後可將 3 改為 1 */
table.researchSetFirstSecond = function(req, res, next) {
	if (req.session.profile) {
    	let student_id = { student_id : req.body.student_id};
        query.SetFirstSecond(student_id, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');    
            }
            if (!result)
                res.redirect('/');
            result = JSON.parse(result);
            var signal = {
                signal: (parseInt(result.info.affectedRows) > 0)?1:0
            }
            req.setFirstSecond = signal;
			if (req.setFirstSecond)
				next();
			else
				return;
        });
    } else {
        res.redirect('/');
    }
}

// --------------------------------------------------------------------research table

// graduate table--------------------------------------------------------------------

/* 該年級所有學生的畢業預審下載 */
table.graduateStudentListDownload = function(req, res, next) {
	if (req.session.profile) { 
        var graduateList = [];
        var grade = { grade: req.body.grade };
        query.ShowGivenGradeStudentID(grade, function(error, studentList) {
            if (error) {
				throw error;
				res.redirect('/');
			}
			if (!studentList)
				 res.redirect('/');
            studentList = JSON.parse(studentList);
            for (var i = 0; i < studentList.length; i++) {
                var student_id = { student_id: studentList[i].student_id};
                query.ShowStudentGraduate(student_id, function(err,result) {	
			        if (err) {
				        throw err;
				        res.redirect('/');
			        }
			        if (!result)
				        res.redirect('/');
                    result = JSON.parse(result);
                    graduateList.push(result);
    	        });	
            }
        });
        setTimeout(function() {
			req.studentListDownload = graduateList;
			if (req.studentListDownload)
				next();
			else
				return;
        }, 1000);	
    }
	else
        res.redirect('/');
}

/* 列出該年級所有學生的畢業預審 */
table.graduateStudentList = function(req, res, next) {
	var grades = { grade: req.body.grade };
    var list = [];
    if (req.session.profile) {
        query.ShowGivenGradeStudentID(grades, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');
            } else if (!result) {
                res.redirect('/');
            } else {
                var all_result = JSON.parse(result);
                for (var i = 0; i < all_result.length; i++) {
                    var studentID = {student_id: all_result[i].student_id};
                    // var studentID = {student_id: '0616220'};
                    // list.push(studentID);
                    query.ShowStudentGraduate(studentID, function(err, graduate_result) {
                        if (err) {
                            throw err;
                            res.redirect('/');
                        } else if (!graduate_result) {
                            res.redirect('/');
                        } else {
                            var output = JSON.parse(graduate_result)
                            output.map( student => {
                                if (student.submit_status === null) { student.submit_status = 0; }
                                if (student.submit_type === null) { student.submit_type = 0; }
                                if (student.en_status === null) { student.en_status = 0; }
                                student.submit_status = parseInt(student.submit_status);
                                list.push(student);
                                // list.push(studentID);
                            });
                            // list.push(studentID);
                            // list.push(JSON.parse(graduate_result));
                        }
                    });
                }
            }
        });
        setTimeout(function() {
		    req.studentList = list;
            if (req.studentList)
                next();
            else
                return;    
        }, 500);
    } else {
        res.redirect('/');
    }
}

/* 改變某學生畢業預審 */
table.graduateStudentListUpdate = function(req, res, next) {
	var courseResult = res.locals.courseResult;
    var studentId = res.locals.studentId;
    query.ShowUserInfo(studentId, function(err, result) {
        if (err) {
            throw err;
            res.redirect('/');
        } else if (!result) {
            res.redirect('/');
        } else {
            //res.send(result);
            var [info] = JSON.parse(result);
            var list = {
				'student_id': '',
    			'sname': '',
    			'program': '',
    			'total_credit': 0,
    			'en_course': 0,
    			'submit_status': 0,
    			'graduate_status': 0,
    			'pro': 1,
    			'other': 1,
    			'net': [],
    			'media': [],
                'submit_type': -1,
    			'old_total': 1,
    			'old_contemp': 2,
    			'old_culture': 2,
    			'old_history': 2,
    			'old_citizen': 2,
    			'old_group': 2,
                'old_science': 2,
    			'new_total': 1,
                'new_core_total': 0,
    			'new_core_society': 2,
    			'new_core_humanity': 2,
    			'new_basic': 1,
    			'new_cross': 1,
    			'en_status': 1,
                'en_total': 1,
    			'en_basic': 1,
    			'en_advanced': 1,
    			'pe': 6,
    			'service': 2,
    			'art': 2,
    			'mentor': 2,
    			'compulse': [],
                'current': []
			};

            var will_list = {
                'total': 0,
                'compulse': 0,
                'pro': 0,
                'other': 0,
                'en_total': 0,
                'en_basic': 0,
                'en_advanced': 0,
                'old_total': 0,
                'old_contemp': 0,
    			'old_culture': 0,
    			'old_history': 0,
    			'old_citizen': 0,
    			'old_group': 0,
                'old_science': 0,
                'new_total': 0,
                'new_core_total': 0,
    			'new_core_society': 0,
    			'new_core_humanity': 0,
    			'new_basic': 0,
    			'new_cross': 0,
                'pe': 0,
                'service': 0,
                'art': 0,
                'mentor': 0,
                'en_course': 0,
                'net': 9,
                'media': 9
            };

            var [compulse, pro, other, lang, general_old, general_new, pe, service, art, graduate, credit] = courseResult;
            list.student_id = info.student_id;
            list.sname = info.sname;
            list.program = info.program;
            
            if (info.graduate_submit === null) { info.graduate_submit = '0'; }
            list.submit_status = parseInt(info.graduate_submit);
            

            //general_old
            
            if (info.submit_type === null) { info.submit_type = '0'; }
            list.submit_type = parseInt(info.submit_type);
            list.old_total = credit.general_require - credit.general;
            var mapping = {'文化': 'culture', '公民': 'citizen', '群己': 'group', '自然': 'science', '歷史': 'history', '通識': 'contemp'};
            var old = {
                'culture': 2,
                'citizen': 2,
                'group': 2,
                'science': 2,
                'history': 2,
                'contemp': 2
            };
            var will_old = {
                'culture': 0,
                'citizen': 0,
                'group': 0,
                'science': 0,
                'history': 0,
                'contemp': 0
            };
            for (var i = 0; i < general_old.course.length; i++) {
                if (general_old.course[i].complete) {
                    old[mapping[general_old.course[i].dimension]] -= general_old.course[i].realCredit;
                } else {
                    if (general_old.course[i].reason === 'now') {
                        will_list.total += general_old.course[i].originalCredit;
                        will_old[mapping[general_old.course[i].dimension]] += general_old.course[i].originalCredit;
                    }
                }
            }
            list.old_culture = old.culture;
            list.old_citizen = old.citizen;
            list.old_group = old.group;
            list.old_science = old.science;
            list.old_history = old.history;
            list.old_contemp = old.contemp;
            will_list.old_culture = will_old.culture;
            will_list.old_citizen = will_old.citizen;
            will_list.old_group = will_old.group;
            will_list.old_science = will_old.science;
            will_list.old_history = will_old.history;
            will_list.old_contemp = will_old.contemp;
            var old_pass = (list.old_culture <= 0 && list.old_citizen <= 0 && list.old_group <= 0 && list.old_science <= 0 && list.old_history <= 0 && list.old_contemp <= 0 && list.old_total <= 0);
            var will_old_pass = (list.old_culture - will_list.old_culture <= 0 && list.old_citizen - will_list.old_citizen <= 0 && list.old_group - will_list.old_group <= 0 && list.old_science - will_list.old_science <= 0 && list.old_history - will_list.old_history <= 0 && list.old_contemp - will_list.old_contemp <= 0 && list.old_total - will_list.old_total <= 0);

            
            //general_new
            list.new_total = credit.general_new_require - credit.general_new;
            list.new_core_total = general_new.require.core;
            for (var i = 0; i < general_new.course.length; i++) {
                if (general_new.course[i].complete && general_new.course[i].dimension != '') {
                    if (general_new.course[i].dimension.substring(0, 1) === '核') {
                        if (general_new.course[i].dimension.substring(3, 5) === '社會') {
                            list.new_core_society -= general_new.course[i].realCredit;
                            list.new_core_total -= general_new.course[i].realCredit;
                        } else if (general_new.course[i].dimension.substring(3, 5) === '人文') {
                            list.new_core_humanity -= general_new.course[i].realCredit;
                            list.new_core_total -= general_new.course[i].realCredit;
                        }
                    }
                } else {
                    if (general_new.course[i].reason === 'now') {
                        will_list.total += general_new.course[i].originalCredit;
                        will_list.new_total += general_new.course[i].originalCredit;
                        if (general_new.course[i].dimension.substring(0, 1) === '核') {
                            if (general_new.course[i].dimension.substring(3, 5) === '社會') {
                                will_list.new_core_total += general_new.course[i].originalCredit;
                                will_list.new_core_society += general_new.course[i].originalCredit;
                            } else if (general_new.course[i].dimension.substring(3, 5) === '人文') {
                                will_list.new_core_total += general_new.course[i].originalCredit;
                                will_list.new_core_humanity += general_new.course[i].originalCredit;
                            }
                        } else if (general_new.course[i].dimension.substring(0, 1) === '跨') {
                            will_list.new_cross += general_new.course[i].originalCredit;
                        } else if (general_new.course[i].dimension.substring(0, 1) === '校') {
                            will_list.new_cross += general_new.course[i].originalCredit;
                        }
                    }
                }
            }
            list.new_basic = general_new.require.basic - general_new.credit.basic;
            list.new_cross = general_new.require.cross - general_new.credit.cross;
            var new_pass = (list.new_total <= 0 && list.new_core_total <= 0 && list.new_core_society <= 0 && list.new_core_humanity <= 0 && list.new_basic <= 0 && list.new_cross <= 0);
            var will_new_pass = (list.new_total + will_list.new_total <= 0 && list.new_core_total + will_list.new_core_total <= 0 && list.new_core_society + will_list.new_core_society <= 0 && list.new_core_humanity + will_list.new_core_humanity <= 0 && list.new_basic + will_list.new_basic <= 0 && list.new_cross + will_list.new_cross <= 0);

            var general_pass = false;
			var will_general_pass = false;
            if (parseInt(studentId.substring(0, 2)) <= 5) {
                if (list.submit_type === 0) {
                    general_pass = old_pass;
					will_general_pass = will_old_pass;
                } else if (list.submit_type === 1) {
                    general_pass = new_pass;
					will_general_pass = will_new_pass;
                }
            } else {
                general_pass = new_pass;
				will_general_pass = will_new_pass;
            }
            
            //lang
            if (info.en_certificate === null) { info.en_certificate = '0'; }
            list.en_status = parseInt(info.en_certificate);
            list.en_total = credit.language_require - credit.language;
            var basic_credit = 0;
            var advanced_credit = 0;
            var second_credit = 0;
            var will_basic = 0;
            var will_advanced = 0;
            var will_second = 0;
            for (var i = 0; i < lang.course.length; i++) {
                if (lang.course[i].complete) {
                    if (lang.course[i].cn.substring(0, 2) === '大一') {
                        basic_credit += lang.course[i].originalCredit;
                    } else if (lang.course[i].cn.substring(0, 4) === '進階英文') {
                        advanced_credit += lang.course[i].originalCredit;
                    } else {
                        second_credit += lang.course[i].originalCredit;
                    }
                } else {
                    if (lang.course[i].reason === 'now') {
                        if (lang.course[i].cn.substring(0, 2) === '大一') {
                            will_basic += lang.course[i].originalCredit;
                        } else if (lang.course[i].cn.substring(0, 4) === '進階英文') {
                            will_advanced += lang.course[i].originalCredit;
                        } else {
                            will_second += lang.course[i].originalCredit;
                        }
                    }
                }
            }
            if (list.en_status === 0) {
                list.en_basic  = 4 - basic_credit;
                list.en_advanced = 4 - advanced_credit;
                list.en_total = 8 - basic_credit - second_credit;
                will_list.en_basic = list.en_basic - will_basic;
                will_list.en_advanced = list.en_advanced - will_advanced;
                will_list.en_total = list.en_total - will_basic - will_second;
            } else if (list.en_status === 2 || list.en_status === 3 || list.en_status === 4) {
                list.en_basic = 4 - basic_credit;
                list.en_advanced = 4 - advanced_credit - second_credit;
                list.en_total = 8 - basic_credit - advanced_credit - second_credit;
                will_list.en_basic = list.en_basic - will_basic;
                will_list.en_advanced = list.en_advanced - will_advanced;
                will_list.en_total = list.en_total - will_basic - will_advanced - will_second;
            } else if (list.en_status === 1) {
                list.en_basic = 0;
                list.en_advanced = 0;
                list.en_total = 0;
            }
            var en_pass = (list.en_total <= 0 && list.en_basic <= 0 && list.en_advanced <= 0);
            var will_en_pass = (will_list.en_total <= 0 && will_list.en_basic <= 0 && will_list.en_advanced <= 0);
            
            var net_map = {'計算機網': 0, '網路程式': 1, '網路通訊': 2};
            var media_map = {'計算機圖': 0, '影像處理': 1, '數值方法': 2};
            var net_course = ['計算機網路概論', '網路程式設計概論', '網路通訊原理'];
            var media_course = ['計算機圖學概論', '影像處理概論', '數值方法'];
            var net_complete = [0, 0, 0];
            var media_complete = [0, 0, 0];
            var net_credit = 9;
            var media_credit = 9;

            for (var i = 0; i < compulse.course.length; i++) {
                if (compulse.course[i].complete) {
                    if (compulse.course[i].cn.substring(0, 4) === '導師時間') {
                        list.mentor -= 1;
                    } else {
                        var cn = compulse.course[i].cn;
                        if (compulse.course[i].english === true && compulse.course[i].code.substring(0, 3) === 'DCP') {
                            list.en_course = 1;
                        }

                        if (cn.substring(0, 7) === '計算機網路概論' || cn.substring(0, 8) === '網路程式設計概論' || cn.substring(0, 6) === '網路通訊原理') {
                            net_credit -= 3;
                            net_complete[net_map[cn.substring(0, 4)]] = 1;
                        } else if (cn.substring(0, 7) === '計算機圖學概論' || cn.substring(0, 6) === '影像處理概論' || cn.substring(0, 4) === '數值方法') {
                            media_credit -= 3;
                            media_complete[media_map[cn.substring(0, 4)]] = 1;
                        }
                    }
                } else {
                    if (compulse.course[i].reason === 'now') {
                        list.current.push(compulse.course[i].cn);
                        if (compulse.course[i].cn.substring(0, 4) === '導師時間') {
                            will_list.mentor += 1;
                        } else {
                            var cn = compulse.course[i].cn;
                            if (compulse.course[i].english === true && compulse.course[i].code.substring(0, 3) === 'DCP') {
                                will_list.en_course = 1;
                            }
                            if (cn.substring(0, 7) === '計算機網路概論' || cn.substring(0, 8) === '網路程式設計概論' || cn.substring(0, 6) === '網路通訊原理') {
                                will_list.net += 3;
                            } else if (cn.substring(0, 7) === '計算機圖學概論' || cn.substring(0, 6) === '影像處理概論' || cn.substring(0, 4) === '數值方法') {
                                will_list.media += 3;
                            }
                        }
                        will_list.compulse += compulse.course[i].originalCredit;
                        will_list.total += compulse.course[i].originalCredit;
                    } else {
                        list.compulse.push(compulse.course[i].cn);
                    }
                }
            }
            
            for (var i = 0; i < pro.course.length; i++) {
                if (pro.course[i].complete) {
                    var cn = pro.course[i].cn;
                    if (pro.course[i].english === true && pro.course[i].code.substring(0, 3) === 'DCP') {
                        list.en_course = 1;
                    }
                    if (cn.substring(0, 7) === '計算機網路概論' || cn.substring(0, 8) === '網路程式設計概論' || cn.substring(0, 6) === '網路通訊原理') {
                        net_credit -= 3;
                        net_complete[net_map[cn.substring(0, 4)]] = 1;
                    } else if (cn.substring(0, 7) === '計算機圖學概論' || cn.substring(0, 6) === '影像處理概論' || cn.substring(0, 4) === '數值方法') {
                        media_credit -= 3;
                        media_complete[media_map[cn.substring(0, 4)]] = 1;
                    }
                } else {
                    if (pro.course[i].reason === 'now') {
                        var cn = pro.course[i].cn;
                        if (pro.course[i].english === true && pro.course[i].code.substring(0, 3) === 'DCP') {
                            will_list.en_course = 1;
                        }
                        if (cn.substring(0, 7) === '計算機網路概論' || cn.substring(0, 8) === '網路程式設計概論' || cn.substring(0, 6) === '網路通訊原理') {
                            will_list.net += 3;
                        } else if (cn.substring(0, 7) === '計算機圖學概論' || cn.substring(0, 6) === '影像處理概論' || cn.substring(0, 4) === '數值方法') {
                            will_list.media += 3;
                        }
                        will_list.pro += pro.course[i].originalCredit;
                        will_list.total += pro.course[i].originalCredit;
                    }
                }
            }

            for (var i = 0; i < 3; i++) {
                if (net_complete[i] === 1) {
                    list.net.push(net_course[i]);
                }
                if (media_complete[i] === 1) {
                    list.media.push(media_course[i]);
                }
            }

            list.net_credit = net_credit;
            list.media_credit = media_credit;
            
            for (var i = 0; i < other.course.length; i++) {
                if (!other.course[i].complete && other.course[i].reason === 'now') {
                    will_list.other += other.course[i].originalCredit;
                    will_list.total += other.course[i].originalCredit;
                }
            }

            for (var i = 0; i < pe.course.length; i++) {
                if (!pe.course[i].complete && pe.course[i].reason === 'now') {
                    will_list.pe += 1;
                }
            }

            for (var i = 0; i < service.course.length; i++) {
                if (!service.course[i].complete && service.course[i].reason === 'now') {
                    will_list.service += 1;
                }
            }

            for (var i = 0; i < art.course.length; i++) {
                if (!art.course[i].complete && art.course[i].reason === 'now') {
                    will_list.art += 1;
                }
            }
            
            list.total_credit = credit.total;
            var total_pass = list.total_credit >= credit.total_require;
            var will_total_pass = (list.total_credit + will_list.total) >= credit.total_require;

            list.pro = credit.pro_require - credit.pro;
            var pro_pass = list.pro <= 0;
            var will_pro_pass = (list.pro - will_list.pro) <= 0;

            list.other = credit.other_require - credit.other;
            var other_pass = list.other <= 0;
            var will_other_pass = (list.other - will_list.other) <= 0;

            list.pe = credit.pe_require - credit.pe;
            var pe_pass = list.pe <= 0;
            var will_pe_pass = (list.pe - will_list.pe) <= 0;

            list.service = credit.service_require - credit.service;
            var service_pass = list.service <= 0;
            var will_service_pass = (list.service - will_list.service) <= 0;

            list.art = credit.art_require - credit.art;
            var art_pass = list.art <= 0;
            var will_art_pass = (list.art - will_list.art) <= 0;

            var mentor_pass = list.mentor <= 0;
            var will_mentor_pass = (list.mentor - will_list.mentor) <= 0;

            var net_media_pass = (net_credit <= 0 || media_credit <= 0);
            var will_net_media_pass = (list.net - will_list.net <= 0 || list.media - will_list.media <= 0);

            var eng_pass = list.en_course === 1;
            var will_eng_pass = will_list.en_course === 1;

            var compulse_pass = (credit.compulse_require - credit.compulsory) <= 0;
            var will_compulse_pass = (credit.compulse_require - credit.compulse - will_list.compulse) <= 0;
        
            var pass = (total_pass && compulse_pass && pro_pass && other_pass && general_pass && en_pass && pe_pass && service_pass && art_pass && mentor_pass && eng_pass);
            /*
            list.total_pass = total_pass;
            list.compulse_pass = compulse_pass;
            list.pro_pass = pro_pass;
            list.other_pass = other_pass;
            list.general_pass = general_pass;
            list.old_pass = old_pass;
            list.new_pass = new_pass;
            list.en_pass = en_pass;
            list.pe_pass = pe_pass;
            list.service_pass = service_pass;
            list.art_pass = art_pass;
            list.mentor_pass = mentor_pass;
            list.eng_pass = eng_pass;
            list.compulse_require = credit.compulse_require;
            list.compulse_credit = credit.compulsory;
            */

            var will_pass = (will_total_pass && will_compulse_pass && will_pro_pass && will_other_pass && will_general_pass && will_en_pass && will_pe_pass && will_service_pass && will_art_pass && will_mentor_pass && will_eng_pass);

            if (pass) {
                list.graduate_status = 2;
            } else if (will_pass) {
                list.graduate_status = 1;
            } else {
                list.graduate_status = 0;
            }
            
            list.pro = Math.max(0, list.pro);
            list.other = Math.max(0, list.other);
            list.old_total = Math.max(0, list.old_total);
            list.old_contemp = Math.max(0, list.old_contemp);
            list.old_culture = Math.max(0, list.old_culture);
            list.old_history = Math.max(0, list.old_history);
            list.old_citizen = Math.max(0, list.old_citizen);
            list.old_group = Math.max(0, list.old_group);
            list.old_science = Math.max(0, list.old_science);
            list.new_total = Math.max(0, list.new_total);
            list.new_core_total = Math.max(0, list.new_core_total);
            list.new_core_society = Math.max(0, list.new_core_society);
            list.new_core_humanity = Math.max(0, list.new_core_humanity);
            list.new_basic = Math.max(0, list.new_basic);
            list.new_cross = Math.max(0, list.new_cross);
            list.en_total = Math.max(0, list.en_total);
            list.en_basic = Math.max(0, list.en_basic);
            list.en_advanced = Math.max(0, list.en_advanced);
            list.pe = Math.max(0, list.pe);
            list.service = Math.max(0, list.service);
            list.art = Math.max(0, list.art);
            list.mentor = Math.max(0, list.mentor);
            
            setTimeout(function() {
                query.CreateStudentGraduate(list, function(err, result2) {
                    if (err) {
                        throw err;
                        res.redirect('/');
                    } else if (!result2) {
                        res.redirect('/');
                    } else {
					    result2 = JSON.parse(result2);
					    req.studentListUpdate = result2;
					    if (req.studentListUpdate)
						    next();
					    else
						    return;
                    }
                });
            }, 1000);
        }
    }); 
}

// --------------------------------------------------------------------graduate table

// advisee table---------------------------------------------------------------------

/* 列出所有教授的資訊 */
table.adviseeTeacherList = function(req, res, next) {
	if (req.session.profile) {	
    	query.ShowTeacherIdList(function(err, result) {
        	if (err) {
                throw err;
                res.redirect('/');
            }
            if (!result)
                res.redirect('/');
			else {
				result = JSON.parse(result);
				var list =[];
				for (var i=0;i<result.length;i++) {
					var info = {
						id : result[i].teacher_id,
						name : result[i].tname,
                        status: 0,
						email : result[i].email,
						all_students : parseInt(result[i].all_students),
						recent_failed : parseInt(result[i].recent_failed),
                        failed_students : parseInt(result[i].failed_students)
					}
                    if (info.id == "T9303" )
                        info.status = 1;
					list.push(info);
				}
				if (list.length == result.length) {
					req.teacherList = list;
					if (req.teacherList)
						next();
					else
						return;
				}
			}
        });
    }
    else
        res.redirect('/'); 
}

/* 列出該教授的所有導生的資訊 */
table.adviseeStudentList = function(req, res, next) {
	if (req.session.profile) {
    	var teacherId = req.body.teacher_id;
    	query.ShowTeacherMentors(teacherId, function(err, result) {
        	if (err) {
             	throw err;
             	res.redirect('/');
        	}
        	if (!result)
            	res.redirect('/');
			else {
				var info = [];
				result = JSON.parse(result);
				for (var i=0;i<result.length;i++) {
					query.ShowUserInfo(result[i].student_id, function(err,profile) {
						if (err) {
							throw err;
							res.redirect('/');
						}
						if (!profile) {
							res.redirect('/');
						} else {
							profile = JSON.parse(profile);
							profile = {
								student_id: profile[0].student_id,
			    				sname: profile[0].sname,
								program: profile[0].program,
								graduate: profile[0].graduate,
								graduate_submit: profile[0].graduate_submit,
								email: profile[0].email,
                            	recent_failed: (profile[0].recent_failed == "true")?true:false,
								failed: (profile[0].failed =="failed")?true:false
							}	
							info.push(profile);
						}
						if (info.length == result.length) {
							req.studentList = info;
                            if (req.studentList) 
                                next();
                            else 
                                return;
                        }
					});					
                }
            }
        });
    }
    else
        res.redirect('/');
}

/* 列出該學生每學期平均,有無被21,各科成績 */
table.adviseeSemesterScoreList = function(req, res, next) {
	if (req.session.profile) {
    	var input = req.body.student_id;
    	query.ShowSemesterScore(input, function(err, result) {
        	if (err) {
            	throw err;
            	res.redirect('/');
        	}
        	if (!result)
            	res.redirect('/');
        	else {
            	result = JSON.parse(result);
            	var list = [];
            	for (var i = 0; i < result.length; i++) {
                	var grade = {
                    	semester: result[i].semester,
                    	failed: result[i].failed == 'false' ? false : true,
                    	avg: parseInt(result[i].avg),
                    	credit: parseInt(result[i].credit),
                    	score: []
                	};
                	for (var j = 0; j < result[i].score.length; j++) {
                    	var scoreObj = {
                        	cn: result[i].score[j].cn,
                        	en: result[i].score[j].en,
                        	score: (parseInt(result[i].score[j].score)> 0) ? parseInt(result[i].score[j].score) : null,
                        	pass: result[i].score[j].pass == '通過' ? true :( (result[i].score[j].pass == 'W') ? 'W' : false)
                    	}
                    	grade.score.push(scoreObj);
                	}
                	if (grade.score.length == result[i].score.length)
                    	list.push(grade);
            	}
            	if (list.length == result.length) {
					req.scoreList = list;
					if (req.scoreList) 
						next();
					else
						return;
				}
        	}
    	});
	}
	else
    	res.redirect('/');
}

// ---------------------------------------------------------------------advisee table

// other table-----------------------------------------------------------------------

table.createApplyPeriod = function(req, res, next){
    if (req.session.profile) {
        var input = req.body; 
        var info = {semester: '', type:'', begin:'', end: ''};
        info.semester = input.semester;
        if(input.hasOwnProperty('graduation')) {
            info.type = 'graduation';
            info.begin = input.graduation.begin;
            info.end = input.graduation.end;
        }
        else if(input.hasOwnProperty('project')) {
            info.type = 'research';
            info.begin = input.project.begin;
            info.end = input.project.end;
        }
        else if(input.hasOwnProperty('verify')) {
            info.type = 'offset';
            info.begin = input.verify.begin;
            info.end = input.verify.end;
        }
    	query.CreateApplyPeriod(info, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');    
            }
            if (!result)
                res.redirect('/');
            result = JSON.parse(result);
            var signal = {
                signal: (parseInt(result.info.affectedRows) > 0)?1:0
            }
            req.createApplyPeriod = signal;
			if (req.createApplyPeriod)
				next();
			else
				return;
        });
    }
    else
        res.redirect('/');
}

table.setApplyPeriod = function(req, res, next){
    if (req.session.profile) {
        var input = req.body; 
        var info = {semester: '', type:'', begin:'', end: ''};
        info.semester = input.semester;
        if(input.hasOwnProperty('graduation')) {
            info.type = 'graduation';
            info.begin = input.graduation.begin;
            info.end = input.graduation.end;
        }
        else if(input.hasOwnProperty('project')) {
            info.type = 'research';
            info.begin = input.project.begin;
            info.end = input.project.end;
        }
        else if(input.hasOwnProperty('verify')) {
            info.type = 'offset';
            info.begin = input.verify.begin;
            info.end = input.verify.end;
        }
    	query.SetApplyPeriod(info, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');    
            }
            if (!result)
                res.redirect('/');
            result = JSON.parse(result);
            var signal = {
                signal: (parseInt(result.info.affectedRows) > 0)?1:0
            }
            req.setApplyPeriod = signal;
			if (req.setApplyPeriod)
				next();
			else
				return;
        });
    }
    else
        res.redirect('/');
}

table.showApplyPeriod = function(req, res, next){
    if(req.session.profile) {
        var input = req.body;
        //var input = {semester: '108-1'};
        query.ShowApplyPeriod(input, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');    
            }
            if (!result)
                res.redirect('/');
            result = JSON.parse(result);
            var output = {
              "verify": {
                "begin": "",
                "end": ""
              },
              "project": {
                "begin": "",
                "end": ""
              },
              "graduation": {
                "begin": "",
                "end": ""
              }
            };
            output.verify.begin = result.offset.begin;
            output.verify.end = result.offset.end;
            output.project.begin = result.research.begin;
            output.project.end = result.research.end;
            output.graduation.begin = result.graduation.begin;
            output.graduation.end = result.graduation.end;
            req.showApplyPeriod = output;
			if (req.showApplyPeriod)
				next();
			else
				return;
        });
    }
    else
        res.redirect('/');

}
// ------------------------------------------------------------------------other table

exports.table = table;
