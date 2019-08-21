var express = require('express');
var router = express.Router();
var query = require('../../db/msql');
//var getTeacherId = require('../../course/getTeacherId');


//var TeacherId = getTeacherId.getTeacherId.teacherId;
router.get('/testAPI2', function(req, res){

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
            var data_modify = {
                student_id: '0516110',
                phone: '0909401815',
                class: '資工B',
                apply_year: '107',
                apply_semester: '2',
                cos_dep_old: '清大資工',
                cos_tname_old: '高榮駿',
                cos_cname_old: '機率',
                cos_code_old: 'DCP3351',
                cos_cname: '機率',
                cos_code: '10720EECS3',
                cos_type: null,
                credit: 3,
                reason: '退選，本學期未開課',
                credit_old: 3,
                file: 'https://firebasestorage.googleapis.com/v0/b/nctu-csca.appspot.com/o/credit%2F0516110%2F2019119145438_%E6%B8%85%E5%A4%A7%E6%A9%9F%E7%8E%87.pdf?alt=media&token=0e3b2ab5-5cf3-4f6e-a07f-d2ff1163db03',
                school_old: null,           
                dep_old: null,              
                graduation_credit_old: null,
                cos_year_old: 107,         
                cos_semester_old: 2,     
                score_old: null,
                offset_type: 0,
                reason_type: '被當',
                state: 2,
                timestamp:'2019-02-19 14:54:39'
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
            //query.ShowTeacherResearchApplyFormList('E5025',function(err,result){
            
            query.CreateResearchApplyForm({phone:'0900', student_id:'0616220', research_title:'testttt_14', tname:'彭文志', first_second:1, email:'wawawa@crayonSinJang', semester:'107-2'},function(err,result){
            //query.SetGraduateSubmitStatus(data_5, function(err, result){
            //query.ShowMailRcdList('0616005', function(err, result){
            //query.ShowTeacherCosAll('T9229',function(err,result){
                if(err){
                    throw err;
                    res.redirect('/');
                }
                if(!result)
                    res.redirect('/');
                else{
                    result = JSON.parse(result);
                
                    res.send(result); 
                }
            });                     
        //}
        //else
          //  res.redirect('/');
        //var mailContent = {sender_id : 'T9604' , title :"test3", receiver_id:'0616005', content:"test3_content"};
        //query.CreateMail(mailContent);
});

module.exports = router;
