var query = require('../../../../db/msql');
var utils = require('../../../../utils');
var table = {};
var nodemailer = require('nodemailer');
var mail_info = require('../../../auth/nctu/mail_info');

table.curriculumAllCourses = function(req, res, next){
    if(req.session.profile){
        
        var teacherId = res.locals.teacherId;  
        query.ShowTeacherCosAll(teacherId, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            else{
                result = JSON.parse(result);
                for(let i = 0; i<result.length; i++){
                    let year = result[i].unique_id.substring(0,3);
                    let sem = result[i].unique_id.substring(4,5);
                    let id  = result[i].unique_id.substring(6,10);
                    if(sem == 1)
                        result[i].unique_id = year + '上(' + id+ ')';
                    else if(sem == 2)
                        result[i].unique_id = year + '下(' + id+ ')';
                    else
                        result[i].unique_id = year + '暑期(' + id+ ')';       
                }
                req.allCourses = result;
                if(req.allCourses)
                    next();
                else
                    return;
            }
        });
    }
    else
        res.redirect('/');

}

table.curriculumScoreInterval = function(req, res, next){
    if(req.session.profile){ 
        var cos_code = req.body.cos_code;
        var unique_id = req.body.unique_id;  
        var year = unique_id.substring(0,3);
        var sem = unique_id.substring(3,4);
        var id = unique_id.substring(5,9);

        if(sem == '上')
            unique_id = year + '-1-' + id;
        else if(sem == '下')
            unique_id = year + '-2-' + id;
        else
            unique_id = year + '-3-' + id;

        query.ShowCosScoreInterval(cos_code, unique_id, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            else{
                result = JSON.parse(result);
                req.scoreInterval = result;
                if(req.scoreInterval)
                    next();
                else
                    return;
            }
        });
   }
    else
        res.redirect('/');
}

table.curriculumScoreDetail = function(req, res, next){
    if(req.session.profile){ 
        var cos_code = req.body.cos_code;
        var unique_id = req.body.unique_id;  
        var year = unique_id.substring(0,3);
        var sem = unique_id.substring(3,4);
        var id = unique_id.substring(5,9);  
        if(sem == '上')
            unique_id = year + '-1-' + id;
        else if(sem == '下')
            unique_id = year + '-2-' + id;
        else
            unique_id = year + '-3-' + id;

        query.ShowCosScoreDetail(cos_code, unique_id, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            else{
                result = JSON.parse(result);
                req.scoreDetail = result;
                if(req.scoreDetail)
                    next();
                else
                    return;
            }
        });
   }
    else
        res.redirect('/');
}

table.offsetApplySetAgree = function(req, res, next){
    if(req.session.profile){
        var teacherId = utils.getPersonId(JSON.parse(req.session.profile));
		var teacher_email = '';
        query.ShowUserInfo(teacherId, function(err,result){
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

        var state_check = [];
		var mails = [];
        for(var i = 0; i < req.body.courses.length; i++){
            var data = {
                timestamp: req.body.courses[i].timestamp,
                student_id: req.body.courses[i].sid,
                state: req.body.status, 
                reject_reason: req.body.courses[i].reason,                    
                transferto:""
            }
            query.SetOffsetApplyFormAgreeStatus(data, function(err,result){
                if(err){
                    throw err;
                    res.redirect('/');
                }
                if(!result)
                    res.redirect('/');
                else{
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
        setTimeout(function(){
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
                html: '<p>此信件由系統自動發送，請勿直接回信！若有任何疑問，請直接聯絡 老師：'+teacher_email+'，謝謝。</p><br/><p>請進入交大資工線上助理確認申請表狀態：<a href = "https://dinodino.nctu.edu.tw"> 點此進入系統</a></p><br/><br/><p>Best Regards,</p><p>交大資工線上助理 NCTU CSCA</p>'
                //附件檔案
                /*attachments: [ {
                    filename: 'text01.txt',
                    content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
                }]*/
            };
            
            if(req.body.status == 2){
                options.subject = '[交大資工線上助理]同意抵免申請郵件通知';
            }
            else if(req.body.status == 4){
                options.subject = '[交大資工線上助理]不同意抵免申請郵件通知';
            }
            
            if(req.body.status == 2 || req.body.status == 4){
                transporter.sendMail(options, function(error, info){
                    if(error){
                        console.log(error);
                    }
                });
            }

            req.setAgree = {signal : JSON.parse(state_check[0].info.affectedRows)};               
            if(req.setAgree)
                next();
            else
                return;    
        },800);
    }
    else
        res.redirect('/');
}


table.offsetApplyFormList = function(req, res, next){
    if(req.session.profile){
        var teacherId = res.locals.teacherId;    
        var data1 = {student_id: '0516003'};
        var data2 = {all_student: true};
        query.ShowUserOffsetApplyForm(data2, function(err,result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            else{
                result = JSON.parse(result);
                var group = [];
                for(var i = 0; i < result.length; i++){
                    var one = {
                        "year" : result[i].apply_year,
                        "semester" : parseInt(result[i].apply_semester),
                        "sid": result[i].student_id,
                        "name": result[i].sname,
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
                        "reason_type": result[i].reason_type,
                        "reject_reason": result[i].reject_reason,
                        "status": parseInt(result[i].agree),
                        "previous": result[i].previous == "0" ? false : true,
                        "date": result[i].timestamp,
                        "file": result[i].file,
                        "transferTo": ""
                        };

                    if(one.type == 0){
                        one.nameA = result[i].cos_cname;
                        one.codeA = result[i].cos_code;
                        one.creditA = parseInt(result[i].credit);
                        one.nameB = result[i].cos_cname_old;
                        one.codeB = result[i].cos_code_old;
                        one.creditB = parseInt(result[i].credit_old);
                    }
                    if(result[i].transferto != null){
                        one.transferTo = result[i].transferto;
                        if(one.transferTo == teacherId){
                            group.push(one);
                        }
                    }
                }
                setTimeout(function(){
                    req.formList = group;              
                    if(req.formList)
                        next();
                    else
                        return; 
                },1000);
            }
        });                           
    }
    else
        res.redirect('/');
}

table.researchSetScore = function(req, res, next){
    if(req.session.profile){
        var content = {
            student_id: '',
            tname: '',
            research_title: '',
            first_second: 0,
            semester: '',
            new_score: 0,
            new_comment: ''
        }
        var info = req.body;
        query.ShowStudentFirstSecond(info.student_id,function(err,result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');

            result = JSON.parse(result);
            var fir_sec = parseInt(result[0].first_second);
            content.student_id = info.student_id;
            content.tname = info.tname;
            content.research_title = info.research_title;
            content.first_second = fir_sec;
            content.semester = info.year;
            content.new_score = parseInt(info.new_score);
            content.new_comment = info.comment;
        });
    
        setTimeout(function(){
            /*query.SetResearchScoreComment(content, function(err,result){
                if(err) throw err;
                var signal = { signal: 1 };
                req.setScore = signal;
                if(req.setScore)
                    next();
                else
                    return;
                res.send(result);
            });*/
            query.SetResearchScoreComment(content);
            req.setScore = {signal: content};           
                if(req.setScore)
                    next();
                else
                    return;
        },800);
    }
    else
        res.redirect('/');
}

table.researchSetTitle = function(req, res, next){
    if(req.session.profile){
        var info = req.body;
        var content = {research_title : info.research_title, tname : info.tname, first_second : info.first_second, semester:info.year, new_title : info.new_title};
        
        query.SetResearchTitle(content);
        setTimeout(function(){
            req.setTitle = {signal: 1};           
            if(req.setTitle)
                next();
            else
                return;
        },800);
    }
    else
        res.redirect('/');

}
table.researchList = function(req, res, next){
    if (req.session.profile) {

        var info = req.body;
        var teacher_id = info.teacherId;
        var sem = info.sem; 
        var group_list = [];
        
        var tname = "";
        var data = {teacher_id: teacher_id}
        query.ShowGradeTeacherResearchStudent(teacher_id,'', function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            
            result = JSON.parse(result);  
            if(result.length == 0){
                var projects = {  
                    groups:[]
                }
            }
            else{
                var index = [];
                var temp = result[0].research_title;
                var projects = {
                    cs_number:0, //*
                    other_number:0, //*
                    current_accept:0,
                    groups: []
                }
                
                var count = 0;
    
                for(var i = 0; i<result.length; i++){
                    if(index[result[i].research_title] == null){
                        if(result[i].semester != sem) continue;
                        var project = {
                                research_title: '',
                                participants : [],
                                year:'',
                                first_second: '',
                                }
                        project.year = result[i].semester;
                        project.research_title = result[i].research_title;
                        project.first_second = result[i].first_second;
                        projects.groups.push(project);
                        index[result[i].research_title] = count;
                        count++;
                    }  
                }
                var cs_number = 0, other_number = 0, cnt = 0;
                for(var i = 0; i<result.length; i++){
                    if(result[i].semester != sem) continue;
                    var student = {
                        student_id: '',
                        sname: '',
                        detail: '',
                        comment: '',
                        replace_pro:0,
                        score: null
                    }
                    student.student_id = result[i].student_id;
                    student.score = parseInt(result[i].score);
                    student.sname = result[i].sname;
                    student.detail = result[i].class_detail;
                    student.comment = result[i].comment;
                    student.replace_pro = parseInt(result[i].replace_pro);
                    var id = index[result[i].research_title];
                    projects.groups[id].participants.push(student);
                    
                    query.ShowStudentResearchInfo(student.student_id, function(error, res){
                        if(error){
                            throw error;
                            res.redirect('/');
                        }
                        if(!res){
                            res.redirect('/');
                        }
                        res = JSON.parse(res);
                        if(res[0].status == "1"){
                            cs_number++;
                        }
                        else{
                            other_number++;
                        }
                    });
                }       
                setTimeout(function(){
                   projects.cs_number = cs_number;
                   projects.other_number = other_number;
                   var group_len = projects.groups.length;
                   query.ShowTeacherInfoResearchCnt(data, function(err, result) {
                        if (err){
                            throw err;
                            res.redirect('/');
                        }
                        if(!result){
                            res.redirect('/');
                        }
                        else {
                            result = JSON.parse(result);
                            tname = result[0].tname;
                            
                            var grade = sem.substring(0,3);
                            for(var j = 0; j < result[0].gradeCnt.length; j++){
                                if ( result[0].gradeCnt[j].grade == grade){
                                     projects.current_accept = result[0].gradeCnt[j].scount;
                                     break;
                                }
                            }
                            for (let i = 0; i < group_len; i++) {
                                var group = {
                                    research_title: projects.groups[i].research_title,
                                    participants: projects.groups[i].participants,
                                    year: projects.groups[i].year,
                                    first_second: projects.groups[i].first_second
                                };
                                group_list.push(group);
                            }
                            if(group_list.length === group_len){
                                projects.groups = group_list;
                                req.list = projects;
                                if(req.list)
                                    next();
                                else
                                    return;
                            }
                        }
                    });

                },1000);
            }
        });            
    } 
    else{
        res.redirect('/');
    }
}

table.researchSetReplace = function(req, res, next) {
    if (req.session.profile) {
        var info = req.body;
        var set_content = { student_id: info.student_id, research_title: info.research_title, semester: info.semester, replace_pro: 0 };
        var del_content = { student_id: info.student_id, first_second: info.first_second, semester: info.semester };
        var student_email = '';
        query.ShowUserInfo(info.student_id, function(err, result) {
            if (err) {
                throw err;
                res.redirect('/');
            } else {
                result = JSON.parse(result);
                student_email = result[0].email;
            }
        });
		setTimeout(function() {
			var transporter = nodemailer.createTransport({
    			service: 'Gmail',
    			auth: mail_info.auth
			});
			var options = {
    			//寄件者
    			from: 'nctucsca@gmail.com',
    			//收件者
    			to: student_email /*'joying62757@gmail.com'*/, 
    			//副本
    			cc: /*req.body.sender_email*/'',
    			//密件副本
    			bcc: '',
    			//主旨
    			subject: '[交大資工線上助理]專題申請狀態改變通知', // Subject line
    			//純文字
    			/*text: 'Hello world2',*/ // plaintext body
    			//嵌入 html 的內文
    			html: '<p>此信件由系統自動發送，請勿直接回信！若有任何疑問，請直接聯絡您的老師，謝謝。</p><br/><p>申請狀態已變更, 請進入交大資工線上助理確認申請表狀態：<a href = "https://dinodino.nctu.edu.tw"> 點此進入系統</a></p><br/><br/><p>Best Regards,</p><p>交大資工線上助理 NCTU CSCA</p>'
    			//附件檔案
    			/*attachments: [ {
        			filename: 'text01.txt',
        			content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
    			}]*/
			};
        	if (info.agree_replace) {
            	query.DeleteResearch(del_content, function(err, result) {
                	if (err) {
                    	throw err;
                    	res.redirect('/');
                	}
					options.subject = '[交大資工線上助理]同意教授更換申請郵件通知';
					transporter.sendMail(options, function(err, info) {
    					if (err)
        					console.log(err);
					});
                	result = JSON.parse(result);
                	req.reply = result;
                	if (req.reply)
                    	next();
                	else
                    	return;
            	});
        	} else {
            	query.SetResearchReplace(set_content, function(err, result) {
                	if (err) {
                    	throw err;
                    	res.redirect('/');
                	}
					options.subject = '[交大資工線上助理]不同意教授更換申請郵件通知';
					transporter.sendMail(options, function(err, info) {
    					if (err)
        					console.log(err);
					});
                	result = JSON.parse(result);
                	req.reply = result;
                	if (req.reply)
                    	next();
                	else
                    	return;
            	});
        	}
		}, 800);
    } else {
        res.redirect('/');
    }
}

table.researchApplySetAgree = function(req, res, next) {
    if (req.session.profile) {
        var info = req.body;
        if (info.agree =='1') {
            for (var i = 0; i < info.student.length; i++) {
                var req_member = { student_id : info.student[i].student_id, tname:info.tname, research_title:info.research_title, first_second:info.first_second, semester: info.year};
                query.CreateNewResearch(req_member, function(err) {
                    if (err) {
                        throw err;
                        res.redirect('/');
                    }
                });
                                
            }
            var formInfo = {research_title:info.research_title, tname : info.tname, first_second:info.first_second, semester:info.year};
            query.DeleteResearchApplyForm(formInfo);
            
            setTimeout(function(){
                var mailString= '';
                var nameString='';
                for(var j = 0; j< info.student.length; j++){
                    mailString = mailString + info.student[j].mail + ',';
                    nameString = nameString + info.student[j].student_id + ',';
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
                    cc: '',
                    //密件副本
                    bcc: '',
                    //主旨
                    subject: '[交大資工線上助理]專題申請狀態改變通知', // Subject line
                    
                    html: '<p>此信件由系統自動發送，請勿直接回信！若有任何疑問，請直接聯絡您的老師跟同學,謝謝。</p><br/><p>申請狀態已變更, 請進入交大資工線上助理確認申請表狀態：<a href = "https://dinodino.nctu.edu.tw"> 點此進入系統</a></p><br/><br/><p>Best Regards,</p><p>交大資工線上助理 NCTU CSCA</p>'
                    //附件檔案
                    
                };
                
                transporter.sendMail(options, function(error, info){
                    if(error){
                        console.log(error);
                    }
                });
                req.setAgree = {signal: 1};           
                if(req.setAgree)
                    next();
                else
                    return;
            },800);
                
        }
        else{
            var formInfo = {research_title : info.research_title, tname:info.tname, first_second:info.first_second, agree:info.agree, semester:info.year};
            query.SetResearchApplyFormStatus(formInfo);
            setTimeout(function(){
                var mailString= '';
                var nameString='';
                for(var j = 0; j< info.student.length; j++){
                    mailString = mailString + info.student[j].mail + ',';
                    nameString = nameString + info.student[j].student_id + ',';
                }
                var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: mail_info.auth
                });
                
                var options = {
                    //寄件者
                    from: 'nctucsca@gmail.com',
                    //收件者
                    to: mailString /*'joying62757@gmail.com'*/, 
                    //副本
                    cc: /*req.body.sender_email*/'',
                    //密件副本
                    bcc: '',
                    //主旨
                    subject: '[交大資工線上助理]專題申請狀態改變通知', // Subject line
                    //純文字
                    /*text: 'Hello world2',*/ // plaintext body
                    //嵌入 html 的內文
                    html: '<p>此信件由系統自動發送，請勿直接回信！若有任何疑問，請直接聯絡 老師：' + ',學生：' + mailString +'謝謝。</p><br/><p>申請狀態已變更, 請進入交大資工線上助理確認申請表狀態：<a href = "https://dinodino.nctu.edu.tw"> 點此進入系統</a></p><br/><br/><p>Best Regards,</p><p>交大資工線上助理 NCTU CSCA</p>'
                    //附件檔案
                    /*attachments: [ {
                        filename: 'text01.txt',
                        content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
                    }]*/
                };
                
                transporter.sendMail(options, function(error, info){
                    if(error){
                        console.log(error);
                    }
                });
                req.setAgree = {signal: 1};           
                if(req.setAgree)
                    next();
                else
                    return;
            },800);    
        }
    }
    else
        res.redirect('/');
}

table.researchApplyList = function(req, res, next){
    if(req.session.profile){
        var teacherId = res.locals.teacherId;  
        //console.log(teacherId);
        query.ShowTeacherResearchApplyFormList(teacherId, function(err,result){
            if(err) {
                throw err;     
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');

           
            else{
                result = JSON.parse(result);
                if(result.length == 0){
                    var groups = [];
                }
                var index = [];
                var groups = [];
                
                var count = 0;
                var checkNum = 0;
                for(var i = 0; i<result.length; i++){
                    if(index[result[i].research_title] == null){
                        var project = {
                            research_title: '',
                            first_second:'',
                            year: '',
                            status:'',
                            participants: []
                        }
                        project.research_title = result[i].research_title;
                        project.first_second = result[i].first_second;
                        project.year = result[i].semester;
                        project.status = result[i].agree;
                        if(result[i].agree != '3'){
                            groups.push(project);
                            index[result[i].research_title] = count;
                            count++;
                        }
                            
                    }  
                }
                for(var i = 0; i<result.length; i++){
                    var student = {
                        student_id: '',
                        sname: '',
                        email: '',
                        phone: '',
                        first_second:'',
                        student_status:''
                    }
                    student.student_id = result[i].student_id;
                    student.sname = result[i].sname;
                    student.email = result[i].email;
                    student.phone = result[i].phone;
                    student.first_second = result[i].first_second;
                    student.student_status = result[i].status;
                    if(result[i].agree != '3'){
                        var id = index[result[i].research_title];
                        groups[id].participants.push(student);
                        checkNum++;
                    }           
                }
            }
            if(checkNum == result.length){
                req.list = groups;       
                if(req.list)
                    next();
                else
                    return;
            }
        }); 
    }
    else
        res.redirect('/');
}
table.adviseeSemesterGradeList = function(req, res, next){
    if(req.session.profile){
        var input = req.body.student_id;                
        query.ShowSemesterScore(input, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            else{
                result = JSON.parse(result);
                var list = [];
                for(var i = 0; i < result.length; i++){
                    var grade = {
                        semester: result[i].semester,
                        failed: result[i].failed == 'false' ? false : true,
                        avg : parseInt(result[i].avg),
                        credit: parseInt(result[i].credit),
                        score: []
                    };
                    for(var j = 0; j < result[i].score.length; j++){
                        var scoreObj = {
                            cn: result[i].score[j].cn,
                            en: result[i].score[j].en,
                            score: (parseInt(result[i].score[j].score)> 0) ? parseInt(result[i].score[j].score) : null,
                            pass: result[i].score[j].pass == '通過' ? true :( (result[i].score[j].pass == 'W') ? 'W' : false)
                        }
                        grade.score.push(scoreObj);
                    }
                    if(grade.score.length == result[i].score.length)
                        list.push(grade);
                }
                if(list.length == result.length){
                    req.semesterGradeList = list;       
                    if(req.semesterGradeList)
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
table.adviseeList = function(req, res, next){
    if(req.session.profile){
        var teacherId = res.locals.teacherId;
        query.ShowTeacherMentors(teacherId, function(err, result){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!result)
                res.redirect('/');
            else{
                var info = [];
                result = JSON.parse(result);
                
                for(var i=0;i<result.length;i++){
                    query.ShowUserInfo(result[i].student_id, function(err,profile){
                        if(err){
                            throw err;
                            return;
                        }
                        if(!profile){
                            return;
                        }
                        else{
                            profile = JSON.parse(profile);
                            profile ={
                                student_id: profile[0].student_id,
                                sname: profile[0].sname,
                                program: profile[0].program,
                                graduate: profile[0].graduate,
                                graduate_submit: profile[0].graduate_submit,
                                email: profile[0].email,
                                recent_failed:(profile[0].recent_failed =="true")?true:false,
                                failed:(profile[0].failed =="failed")?true:false
                            }
                            info.push(profile);
                        }
                        if(info.length == result.length){
                            req.list = info;       
                            if(req.list)
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
table.adviseePersonalInfo = function(req, res, next){
    if(req.session.profile){
        query.ShowUserInfo(req.body.student_id, function(err,profile){
            if(err){
                throw err;
                res.redirect('/');
            }
            if(!profile){
                res.redirect('/');
            }
            else{
                profile = JSON.parse(profile);
                profile ={
                    sname: profile[0].sname,
                    program: profile[0].program,
                    graduate: profile[0].graduate,
                    graduate_submit: profile[0].graduate_submit,
                    email: profile[0].email
                }
                req.personalInfo = profile;       
                if(req.personalInfo)
                    next();
                else
                    return;
            }
                
        });
        
    }
    else
        res.redirect('/');
}
exports.table = table;
