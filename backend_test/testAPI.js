var express = require('express');
var router = express.Router();
var query = require('../../db/msql');
var nodemailer = require('nodemailer');
var mail_info = require('../auth/nctu/mail_info');

//var getTeacherId = require('../../course/getTeacherId');


//var TeacherId = getTeacherId.getTeacherId.teacherId;
router.get('/testAPI', function(req, res){

        //if(req.session.profile){
                
            //var teacherId = res.locals.teacherId;
            var data1 = {student_id: '0516005'};
            var data2 = {all_student: true};
            //console.log(data1);
            var data3 = {
                student_id: '0516007',
                cos_cname_old: "",
                cos_code_old: ""
            };
            var info = {id:'0416235',graduate_submit:1,submit_type:1, net_media:0}
            //query.ShowStudentResearchInfo(/*{tname:'吳毅成', research_title:'Surakarta遊戲之研究與設計', first_second:1, semester:'107-1', new_title:'Surakarta遊戲AI之研究與設計', new_link:'', new_intro:''}*/'0516007', function(err,result){
            //query.DeleteOffsetApplyForm(data3, function(err,result){
            var data_createOffset = {
                student_id: '0616005',
                phone: '1',
                class: '資工A',
                apply_year: '107',
                apply_semester: '2',
                cos_dep_old: '12學系',
                cos_tname_old: 'abc',
                cos_cname_old: 'abc',
                cos_code_old: 'DCP123',
                cos_cname: 'aaa',
                cos_code: '123',
                cos_type: null,
                credit: 3,
                reason: 'no',
                credit_old: 3,
                file: 'https://firebasestorage.googleapis.com/v0/b/nctu-csca.appspot.com/o/credit%2F0316036%2F2019119193934_1072_1082.pdf?alt=media&token=59a17f7e-0681-4b56-8f97-6b2bef40afcd',
                school_old: null,           
                dep_old: null,              
                graduation_credit_old: null,
                cos_year_old: 107,         
                cos_semester_old: 2,     
                score_old: null,
                offset_type: 0,
                reason_type: '被當',
                state: 0,
                timestamp:'2019-02-19 19:39:36'
            };
            var tid = {teacher_id:'T9229'};
            var data_1 = {
                student_id: '0516003',
                apply_year: '107',
                apply_semester: '1',
                cos_code_old: 'YOOOOOOO',
                cos_cname_old:'YAAAAAAA',
                cos_code: 'DCP1200',
                cos_cname: '生涯規劃及導師時間',
                credit: 0,
                cos_type: '必修'
            };
            var data_2 = {
                student_id: '0613316',
                cos_cname_old: '計算機組織',
                cos_cname: '計算機組織'
            };
            var data_4 = {
                timestamp: '2019-02-25 17:08:52',
                student_id: '0516005',
                state: 3 ,// 0 申請中，1 等候主管同意，2 同意抵免，3 抵免失敗(助理不同意)，4 抵免失敗(教授不同意)，5 等候老師同意，6 退回等學生修改
                reject_reason: "no",
                transferto: "who"
            };
            var data_3 = {
timestamp: '2019-02-19 19:39:36',
                student_id: '0316036',
                class: '資工B'
            };
            var data_5 = {id:'0122333', graduate_submit: 0, submit_type: 3, net_media: 2};
            //query.ShowResearchScoreComment({semester: '106-2', first_second: 2},function(err,result){
            //query.ModifyOffsetApplyForm(data_modify,function(err,result){
            //query.ShowUserOffsetApplyForm(data2,function(err,result){
            //query.SetGraduateSubmitStatus(data_5, function(err, result){
            //query.ShowMailRcdList('0616005', function(err, result){
            //query.ShowResearchTitleNumber({tname:'吳毅成', research_title:'test', semester:'107-2'}, function(err, result){
            //query.ShowStudentResearchList({first_second:1, semester:'107-1'}, function(err, result){
            var tid = {teacher_id: ''};
            //query.ShowStudentResearchApplyForm('0516012', function(err,result){
            //query.ShowTeacherResearchApplyFormList('T0525', function(err, result){
            //query.ShowTeacherIdList(function(err,result){
                /*if(err){
                    throw err;
                    res.redirect('/');
                }
                if(!result)
                    res.redirect('/');
                else{
                    result = JSON.parse(result);
                
                    res.send(result); 
                }
            });*/
            var req_member = { student_id : '0616005', tname:'張永儒', research_title:'test', first_second:3, semester: '107-2'};
            /*query.CreateNewResearch(req_member, function(err){
        	    if (err) {
            	    throw err;
            	    res.redirect('/');
        	    }
            });*/
        var info = { 
        	student_id: '0616005', 
        	research_title: 'test', 
        	semester: '107-2', 
        	first_second: '3',
        	add_status: 0
    	};
        var content1 = {
            student_id: '0411306',
            tname: '王協源',
            research_title: '尚未決定',
            first_second: 2,
            semester: '107-2',
            new_score: 85,
            new_comment: ''
        };
        //query.ShowStudentResearchInfo('0411081', function(err, result){
        //query.ShowStudentFirstSecond('0411081', function(err, result){
        //query.SetResearchScoreComment(content1);
        //query.ShowTeacherInfoResearchCnt({teacher_id:'T9926'}, function(err, result){
        //query.ShowApplyPeriod({semester: '109-2'}, function(err, result){
        //query.CreateApplyPeriod({semester: '109-2', type:'graduation', begin:'2019/9/1, 8:00AM', end: '2019/10/1, 10:00AM'}, function(err, result){
        var pack = [];
        query.ShowUserOffsetApplyForm({all_student: true}, function(err, result){
        /*query.SetResearchScoreComment(content1, function(err, result) {
            if (err) 
                 throw err;
            console.log("HI?");
            res.send(JSON.parse(result));
         });*/
    	//query.SetFirstSecond({student_id: '0616005'}, function(err, result) {
        //query.ShowUserInfo("E9604",function(err, result){
        //query.CreateOffsetApplyForm(data_createOffset,function(err,result){
        //query.DeleteCosMotion('0616069', function(err, result){
            if(err)
                throw err;
            result = JSON.parse(result);
            for(var i = 0; i<result.length; i++){
                var one = {
                    studentId: '',
                    timestamp: '',
                    file: ''
                };
                one.studentId = result[i].student_id;
                one.timestamp = result[i].timestamp;
                one.file = result[i].file.substr(74);
                pack.push(one);
            }
            if(pack.length == result.length) res.send(result);
        });
        
        //query.DeleteResearchApplyForm({research_title:'test', tname:'張永儒', first_second:3, semester:'107-2'});
        //}
        //else
          //  res.redirect('/');
        //var mailContent = {sender_id : 'T9604' , title :"test3", receiver_id:'0616005', content:"test3_content"};
        //query.CreateMail(mailContent);var mailString= '';
                var mailString='';
                var nameString='';
                
                mailString = mailString + 'hungwei123.cs06@g2.nctu.edu.tw,curlhairedude.cs05@nctu.edu.tw,qweiltwer.cs05@nctu.edu.tw,861110michael@gmail.com,leathere.cs05@nctu.edu.tw,leo10230.cs05@nctu.edu.tw';
                nameString = nameString + '0616005,0516043,0516085,0516020,0516329,0516066';
                
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
                
                /*transporter.sendMail(options, function(error, info){
                    if(error){
                        console.log(error);
                    }
                });*/

});

module.exports = router;
