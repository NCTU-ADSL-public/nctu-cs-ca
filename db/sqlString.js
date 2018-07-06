exports.findStudent = "\
    select s.student_id,s.sname,s.program,s.grade,s.email,s.graduate,s.graduate_submit,\
    s.gmail,s.fb_id,s.github_id,e.pass_code as en_certificate\
    from student as s,en_certificate as e\
    where s.student_id=:id and e.student_id=:id\
    union\
    select s.student_id,s.sname,s.program,s.grade,s.email,s.graduate,s.graduate_submit,\
    s.gmail,s.fb_id,s.github_id,NULL as en_certificate\
    from student as s\
    where s.student_id=:id and s.student_id not in\
    (select student_id from en_certificate)";

exports.findCrossStudent = "\
    select * from student \
    where student_id = :id and \
    program != \'資工A\' and \
    program != \'資工B\' and \
    program != \'資電\' and \
    program != \'網多\'";

exports.findProfessor = "\
    select teacher_id,tname from teacher\
    where teacher_id=:id";

exports.findTeacher="\
    select teacher_id,tname from teacher_cos_relation;"

exports.findAssistant = "\
    select assistant_id,aname from assistant\
    where assistant_id=:id";

exports.addEmail = "\
    update student set email=:email \
    where student_id=:id";

exports.showCosMap = "\
    select a.cos_cname, a.grade, a.semester, b.pre_cos_cname as suggest, c.pre_cos_cname as pre \
    from (\
        select c.cos_cname,c.grade,c.semester \
        from cos_require as c, student as s \
        where s.student_id=:id and c.school_year=:year and s.program like concat(c.program,\'%\') \
        order by grade, semester\
        ) as a \
    left outer join \
        (\
        select pre_cos_cname, after_cos_cname \
        from cos_suggest as c, student as s \
        where s.student_id=:id and s.program like concat(c.program,\'%\') and c.school_year=:year\
        ) as b \
    on a.cos_cname=b.after_cos_cname \
    left outer join \
        (\
        select pre_cos_cname, after_cos_cname \
        from cos_pre as c, student as s \
        where s.student_id=:id and s.program like concat(c.program,\'%\') and c.school_year=:year\
        ) as c \
    on a.cos_cname=c.after_cos_cname \
    order by a.grade,a.semester,a.cos_cname;";

exports.showCosMapPass = "\
    select distinct c.cos_cname\
    from\
    (\
        select cos_code,concat(cos_year,\'-\',semester,\'-\',cos_id) as unique_id\
        from cos_score where student_id=:id and pass_fail=\'通過\'\
    ) as cs left outer join cos_name as c\
    on cs.unique_id=c.unique_id\
    where c.cos_code like \'DCP%\' or c.cos_code like \'IOE%\'\
    or cos_cname like \'微積分甲%\' or cos_cname like \'物理%\'\
    or cos_cname like \'化學%\' or cos_cname like \'生物%\'\
    or cos_cname like \'微積分Ｂ%\' or cos_cname like \'微積分Ａ%\';"

exports.a_uploadGrade = "\
    load data local infile\
    :pt\
    into table cos_score\
    fields terminated by \',\'\
    enclosed by \'\"\'\
    lines terminated by \'\n\'\
    ignore 1 lines;";

exports.totalCredit = "\
    select sum(t.cos_credit) as total\
    from\
    (\
        select distinct d.cos_code,d.cos_credit\
        from\
        (\
            select cos_code\
            from cos_score where student_id=:id and pass_fail=\'通過\'\
        ) as s,cos_data as d\
        where s.cos_code=d.cos_code\
    ) as t";

exports.Pass = "\
    select DISTINCT\
    if(ISNULL(c.cos_code),a.cos_code,c.cos_code) as cos_code,\
    if(ISNULL(c.cos_cname),a.cos_cname,c.cos_cname) as cos_cname,\
    c.cos_code_old,cos_cname_old,a.cos_ename,a.pass_fail,a.cos_type,\
    if(a.score_type=\'通過不通過\',NULL,a.score) as score,\
    if(a.score_type=\'通過不通過\',NULL,a.score_level) as score_level,\
    if((a.cos_typeext=\'\'&&a.brief like \'體育%\'),\'體育\',a.cos_typeext) as cos_typeext,\
    b.type,a.brief,a.brief_new, a.cos_credit,a.year,a.semester,c.offset_type,tcr.tname\
    from\
    (\
        select DISTINCT d.teacher_id,s.score_type,s.pass_fail,s.score,s.score_level,d.cos_code, n.cos_cname,n.cos_ename, s.cos_type,d.cos_typeext,d.brief,d.brief_new, d.cos_credit,s.year,s.semester\
        from cos_data as d,\
        (\
            select score_type,cos_type,cos_year as year,semester,cos_id as code,cos_code,pass_fail,score,score_level,concat(cos_year,\'-\',semester,\'-\',cos_id) as unique_id\
            from cos_score where student_id=:id\
        ) as s,\
        cos_name as n\
        where\
        d.unique_id = concat(s.year,\'-\',s.semester,\'-\',s.code)\
        and d.cos_code = n.cos_code\
        and n.unique_id=d.unique_id\
    ) as a left outer join\
    (\
        select DISTINCT s.score_type,s.pass_fail,s.score,s.score_level,d.cos_code, n.cos_cname, s.cos_type,d.cos_typeext,t.type,d.brief,d.brief_new, d.cos_credit,s.year,s.semester\
        from cos_data as d,\
        (\
            select score_type,cos_type,cos_year as year,semester,cos_id as code,cos_code,pass_fail,score,score_level,concat(cos_year,\'-\',semester,\'-\',cos_id) as unique_id\
            from cos_score where student_id=:id\
        ) as s,\
        cos_name as n,cos_type as t,student as sd\
        where sd.student_id=:id\
        and d.unique_id = concat(s.year,\'-\',s.semester,\'-\',s.code)\
        and n.unique_id=d.unique_id\
        and n.cos_cname like concat(t.cos_cname,\'%\')\
        and t.school_year=:year\
        and sd.program like concat(t.program,\'%\')\
    ) as b\
    on b.cos_code=a.cos_code and b.cos_cname=a.cos_cname and b.year=a.year and b.semester=a.semester\
    left outer join\
    (\
        select offset_type,cos_code_old,cos_cname_old,cos_code,cos_cname from offset where student_id=:id\
    ) as c\
    on a.cos_code=c.cos_code_old and a.cos_cname=c.cos_cname_old\
    left outer join teacher_cos_relation as tcr\
    on a.teacher_id=tcr.teacher_id\
    order by a.year,a.semester asc;";

exports.PassSpecify = "\
    select DISTINCT\
    if(ISNULL(c.cos_code),a.cos_code,c.cos_code) as cos_code,\
    if(ISNULL(c.cos_cname),a.cos_cname,c.cos_cname) as cos_cname,\
    c.cos_code_old,cos_cname_old,a.cos_ename,a.pass_fail,a.cos_type,\
    if(a.score_type=\'通過不通過\',NULL,a.score) as score,\
    if(a.score_type=\'通過不通過\',NULL,a.score_level) as score_level,\
    if((a.cos_typeext=\'\'&&a.brief like \'體育%\'),\'體育\',a.cos_typeext) as cos_typeext,\
    b.type,a.brief,a.brief_new, a.cos_credit,a.year,a.semester,c.offset_type\
    from\
    (\
        select DISTINCT s.score_type,s.pass_fail,s.score,s.score_level,d.cos_code, n.cos_cname,n.cos_ename, d.cos_type,d.cos_typeext,d.brief,d.brief_new, d.cos_credit,s.year,s.semester\
        from cos_data as d,\
        (\
            select score_type,cos_year as year,semester,cos_id as code,cos_code,pass_fail,score,score_level,concat(cos_year,\'-\',semester,\'-\',cos_id) as unique_id\
            from cos_score where student_id=:id\
        ) as s,\
        cos_name as n\
        where\
        d.unique_id = concat(s.year,\'-\',s.semester,\'-\',s.code)\
        and d.cos_code = n.cos_code\
        and n.unique_id=d.unique_id\
    ) as a left outer join\
    (\
        select DISTINCT s.score_type,s.pass_fail,s.score,s.score_level,d.cos_code, n.cos_cname, d.cos_type,d.cos_typeext,t.type,d.brief,d.brief_new, d.cos_credit,s.year,s.semester\
        from cos_data as d,\
        (\
            select score_type,cos_year as year,semester,cos_id as code,cos_code,pass_fail,score,score_level,concat(cos_year,\'-\',semester,\'-\',cos_id) as unique_id\
            from cos_score where student_id=:id\
        ) as s,\
        cos_name as n,cos_type as t,student as sd\
        where sd.student_id=:id\
        and d.unique_id = concat(s.year,\'-\',s.semester,\'-\',s.code)\
        and n.unique_id=d.unique_id\
        and n.cos_cname like concat(t.cos_cname,\'%\')\
        and t.school_year=:year\
        and sd.program like concat(t.program,\'%\')\
    ) as b\
    on b.cos_code=a.cos_code and b.cos_cname=a.cos_cname and b.year=a.year and b.semester=a.semester\
    left outer join\
    (\
        select offset_type,cos_code_old,cos_cname_old,cos_code,cos_cname from offset where student_id=:id\
    ) as c\
    on a.cos_code=c.cos_code_old and a.cos_cname=c.cos_cname_old\
    where a.pass_fail='通過' and a.cos_type=:category\
    order by a.year,a.semester asc;";

exports.Group = '\
    select p.cos_cname,p.cos_ename,p.cos_codes,IFNULL(a.type,\'必修\') as type\
    from cos_group as p\
    left outer join\
    (\
        select t.cos_cname,t.type,t.school_year\
        from student as s,cos_type as t\
        where s.student_id=:id and s.program like concat(t.program,\'%\')\
        and t.school_year=:year\
    ) as a\
    on p.cos_cname=a.cos_cname and a.school_year=:year\
    where a.type is not null or p.cos_cname in\
    (\
        select cos_cname from cos_require as r,student as s\
        where s.student_id=:id and r.school_year=:year\
        and s.program like concat(r.program,\'%\')\
        union\
        select \'物化生三選一(一)\'\
        union\
        select \'物化生三選一(二)\'\
        union\
        select \'導師時間\'\
    );';

exports.graduateRule = '\
    select r.require_credit,r.pro_credit,r.free_credit,r.core_credit,r.sub_core_credit,r.foreign_credit\
    from graduate_rule as r,student as s\
    where s.student_id=:id and s.program like concat(r.program,\'%\') and r.school_year=:year;';

exports.studentGraduateList_all = '\
    select student_id,sname,program,graduate_submit,graduate,email,en_certificate\
    from student;'

exports.studentGraduateList_single = '\
    select student_id,sname,program,graduate_submit,graduate,email,en_certificate\
    from student\
    where student_id like concat(:sem,\'%\');';

exports.setStudentGraduate='\
    update student set graduate=:graduate where student_id=:id';

exports.setStudentGraduateSubmit='\
    update student set graduate_submit=:graduate_submit where student_id=:id';

exports.setGmail='\
    update student set gmail=:gmail where student_id=:id';

exports.setFbId='\
    update student set fb_id=:fb_id where student_id=:id';

exports.setGithubId='\
    update student set github_id=:github_id where student_id=:id';

exports.offset_single='\
    select os.student_id,os.apply_year,os.apply_semester,os.cos_code_old,\
    os.cos_cname_old,os.cos_code,os.cos_cname,os.credit,os.offset_type,os.brief,\
    os.cos_type,cg.score\
    from offset as os\
    left outer join\
    (\
        select student_id,cos_cname,cos_code,score from cos_score\
        where student_id =:id and pass_fail=\'通過\'\
    ) as cg\
    on cg.student_id=os.student_id and cg.cos_code=os.cos_code_old and cg.cos_cname=os.cos_cname_old\
    where os.student_id=:id;';

exports.offset_all='\
    select os.student_id,os.apply_year,os.apply_semester,os.cos_code_old,\
    os.cos_cname_old,os.cos_code,os.cos_cname,os.credit,os.offset_type,os.brief,\
    os.cos_type,cg.score\
    from offset as os\
    left outer join\
    (\
        select student_id,cos_cname,cos_code,score from cos_score\
        where student_id =:id and pass_fail=\'通過\'\
    ) as cg\
    on cg.student_id=os.student_id and cg.cos_code=os.cos_code_old\
    and cg.cos_cname=os.cos_cname_old;';

exports.on_cos_data='\
    select s.student_id,cd.cos_code,cn.cos_cname,cn.cos_ename,cd.cos_type,cd.cos_typeext,cd.brief,cd.brief_new,cd.cos_credit\
    from on_cos_data as o left outer join student as s\
    on o.student_id=s.student_id\
    left outer join cos_data as cd\
    on cd.unique_id=concat(o.year,\'-\',o.semester,\'-\',o.code)\
    left outer join cos_name as cn\
    on cn.unique_id=cd.unique_id\
    where s.student_id=:id;'

exports.general_cos_rule='\
    select cos_code,cos_cname,brief,brief_new\
    from general_cos_rule;'

exports.setEnCertificate='\
    update student set en_certificate=:check where student_id=:id';

exports.insertCosMotion='\
    insert into cos_motion (student_id,cos_cname,orig_pos,now_pos)\
    values (:id,:name,:orig,:now)\
    on duplicate key\
    update now_pos=:now';
exports.cosMotion='\
    select cos_cname,orig_pos,now_pos from cos_motion where student_id=:id';
exports.cosMotionDelete='\
    delete from cos_motion where student_id=:id';

exports.qaSearch='\
    select * from qa_record';
exports.qaInsert='\
    insert into qa_record (id,que,ans)\
    values (:id,:que,:ans)';
exports.qaMaxId='\
    select max(id) as maxID from qa_record'
exports.qaDelete='\
    delete from qa_record where id=:id';

exports.teacherCosNow ='\
    select *\
    from cos_name as n\
    where n.cos_code IN\
    (\
        select c.cos_code from cos_data as c where c.unique_id LIKE "106-1%" and c.teacher_id IN\
        (\
            select tc.teacher_id from teacher_cos_relation as tc where tc.tname IN\
            (\
                select t.tname from teacher as t where t.teacher_id = :id\
            )\
        )\
        order by cos_code\
    )';

exports.teacherCosAll ='\
    select *\
    from cos_name as n\
    where n.cos_code IN\
    (\
        select c.cos_code from cos_data as c where c.teacher_id IN\
        (\
            select tc.teacher_id from teacher_cos_relation as tc where tc.tname IN\
            (\
                select t.tname from teacher as t where t.teacher_id = :id\
            )\
        )\
        order by cos_code\
    )';

exports.teacherStudents ='\
    select s.student_id,s.sname,s.program \
    from student as s,mentor_list as m,teacher as t \
    where t.teacher_id=:id \
    and t.tname=m.tname \
    and m.student_id=s.student_id;'

exports.showCosMapIntro ='\
    select tcr.tname , a.cos_cname ,a.cos_code, a.num_limit, a.reg_num, a.cos_typeext as english, a.unique_id\
    from teacher_cos_relation as tcr\
    JOIN\
    (\
        select d.teacher_id, n.cos_code, d.num_limit, d.reg_num, d.cos_typeext, d.unique_id, n.cos_cname\
        from cos_name as n, cos_data as d \
        where n.unique_id = d.unique_id \
        AND n.cos_cname LIKE CONCAT("%", :cos_cname , "%")\
        AND d.cos_code LIKE "DCP%"\
    ) AS a\
    ON a.teacher_id LIKE CONCAT("%", tcr.teacher_id, "%")\
    order by a.unique_id DESC';

exports.showCosScoreDetail = "\
    select cos_code, AVG(score) as avg, AVG(case when score>=60 then score end) as Pavg, COUNT(*) as member, count(case when score>=60 then 1 end) as passed, MAX(score) as max\
    from cos_score \
    where cos_code = :cos_code\
    AND CONCAT(cos_year, '-' ,semester, '-', cos_id) = :unique_id";

// exports.showCosScoreInterval = "\
//     SELECT elt(INTERVAL(MAX(score),0,10,20,30,40,50,60,70,80,90), '<10','10-19','20-29','30-39','40-49','50-59','60-69','70-79','80-89','90-100') as score_level, count(cos_cname) as counts\
//     FROM cos_score\
//     WHERE cos_code = :cos_code\
//     AND CONCAT(cos_year, '-' ,semester, '-', cos_id) = :unique_id\
//     GROUP BY elt(INTERVAL(score,0,10,20,30,40,50,60,70,80,90), '<10','10-19','20-29','30-39','40-49','50-59','60-69','70-79','80-89','90-100')\
//     ORDER BY MAX(score) DESC";

exports.showCosScoreInterval = "\
    SELECT count(case when score is NULL then 1 end) as 'null'\
    ,count(case when score<10 then score end) as '<10'\
    ,count(case when score<20 and score>=10 then score end) as '10-19'\
    ,count(case when score<30 and score>=20 then score end) as '20-29'\
    ,count(case when score<40 and score>=30 then score end) as '30-39'\
    ,count(case when score<50 and score>=40 then score end) as '40-49'\
    ,count(case when score<60 and score>=50 then score end) as '50-59'\
    ,count(case when score<70 and score>=60 then score end) as '60-69'\
    ,count(case when score<80 and score>=70 then score end) as '70-79'\
    ,count(case when score<90 and score>=80 then score end) as '80-89'\
    ,count(case when score<100 and score>=90 then score end) as '90-100'\
    FROM cos_score\
    WHERE CONCAT(cos_year, '-' ,semester, '-', cos_id) = :unique_id";

exports.getRecommend="\
    select cos_name_list from rs where student_id=:id;"

exports.findCurrentCos="\
select distinct cd.unique_id,cn.cos_cname,cd.teacher_id,cd.cos_time,cd.cos_code from \
(select unique_id,teacher_id,cos_time,cos_code from cos_data where \
unique_id like :semester \
and (cos_code like 'DCP%' \
or cos_code like 'IOC%' \
or cos_code like 'IOE%' \
or cos_code like 'ILE%' \
or cos_code like 'IDS%' \
or cos_code like 'CCS%' \
or cos_code like 'ICP%')) as cd, \
(select unique_id,cos_cname from cos_name where unique_id like :semester) as cn \
where cd.unique_id=cn.unique_id";

exports.findTeacherInfo="\
    select * from \
    (\
        select a.teacher_id,t.phone,t.tname,t.email,t.expertise,t.info\
        from teacher_info as t,teacher as a\
        where t.tname=a.tname\
    )\ as t\
    where t.teacher_id = :teacher_id";

exports.findTeacherResearch="\
    select s.sname, r.student_id, r.class_detail, r.research_title, r.first_second, r.score, r.semester, r.comment\
    from \
    (\
        select t.teacher_id,r.student_id, r.class_detail, r.score, r.research_title, r.first_second, r.semester, r.comment\
        from research_student as r,teacher as t\
        where r.tname=t.tname\
    ) as r, student as s \
    where s.student_id = r.student_id \
    and r.teacher_id = :teacher_id \
    order by substring(s.student_id,1,2) desc";

exports.findTeacherResearchCount="\
    select r.teacher_id,r.tname,substring(r.student_id,1,2) as 'grade',count(*) as 'scount'\
    from \
    (\
        select distinct r.student_id,r.tname,t.teacher_id \
        from research_student as r, teacher as t\
        where r.tname=t.tname\
    ) as r \
    where r.student_id in ( select student_id from student ) \
    group by substring(r.student_id,1,2),r.tname \
    order by r.tname,substring(r.student_id,1,2);";

exports.mailCreateSender="\
    insert into mail(mail_id,title,sender_id,receiver_id,content) \
    values(concat(:sender_id,\'-\',CURRENT_TIMESTAMP,\'-\',:receiver_id),\
    :title,:sender_id,:receiver_id,:content);";

exports.mailCreateReceiver="\
    insert into mail(mail_id,title,sender_id,receiver_id,content) \
    values(concat(:receiver_id,\'-\',CURRENT_TIMESTAMP,\'-\',:sender_id),\
    :title,:sender_id,:receiver_id,:content);";

exports.mailDelete="\
    delete from mail \
    where mail_id=:mail_id;"

exports.mailReadSet="\
    update mail set read_bit=:read_bit where mail_id=:mail_id";

exports.mailReturnSingle="\
    select * from mail where mail_id=:mail_id";

exports.mailReturnReceiveList="\
    select m.mail_id,m.title,m.sender_id,m.receiver_id,m.read_bit,m.send_time,m.sender,id.name as receiver\
    from\
    (\
        select m.mail_id,m.title,m.sender_id,m.receiver_id,m.read_bit,m.send_time,id.name as sender\
        from\
        (\
            select mail_id,title,sender_id,receiver_id,read_bit,send_time from mail where receiver_id=:receiver_id and mail_id like concat(:receiver_id,\'%\')\
        ) as m,\
        (\
            select student_id as id,sname as name from student\
            union\
            select teacher_id as id,tname as name from teacher\
        ) as id\
        where m.sender_id=id.id\
    ) as m,\
    (\
        select student_id as id,sname as name from student\
        union\
        select teacher_id as id,tname as name from teacher\
    ) as id\
    where m.receiver_id=id.id order by m.send_time desc;";

exports.mailReturnSendList="\
    select m.mail_id,m.title,m.sender_id,m.receiver_id,m.read_bit,m.send_time,m.sender,id.name as receiver\
    from\
    (\
        select m.mail_id,m.title,m.sender_id,m.receiver_id,m.read_bit,m.send_time,id.name as sender\
        from\
        (\
            select mail_id,title,sender_id,receiver_id,read_bit,send_time from mail where sender_id=:sender_id and mail_id like concat(:sender_id,\'%\')\
        ) as m,\
        (\
            select student_id as id,sname as name from student\
            union\
            select teacher_id as id,tname as name from teacher\
        ) as id\
        where m.sender_id=id.id\
    ) as m,\
    (\
        select student_id as id,sname as name from student\
        union\
        select teacher_id as id,tname as name from teacher\
    ) as id\
    where m.receiver_id=id.id order by m.send_time desc;";

exports.returnStudentIdList="\
    select student_id,sname from student;";

exports.returnTeacherIdList="\
    select teacher_id,tname from teacher;";

exports.addPhone="\
    update student set phone=:phone\
    where student_id=:student_id;"

exports.researchApplyFormCreate="\
    insert into research_apply_form\
    values(:student_id,:research_title,:tname,0,:first_second, :semester);"

exports.researchApplyFormSetAgree="\
    update research_apply_form set agree=:agree \
    where research_title=:research_title and tname=:tname \
    and first_second=:first_second and semester=:semester;"

exports.researchApplyFormDelete="\
    delete from research_apply_form \
    where research_title=:research_title and \
    tname=:tname and first_second=:first_second \
    and semester=:semester;"

exports.researchApplyFormTeaReturn="\
    select a.student_id,s.sname,a.research_title,a.tname,a.first_second,a.agree,s.phone,s.email,a.semester\
    from \
    (\
        select t.teacher_id,r.student_id,r.research_title,r.tname,r.agree,r.first_second, r.semester\
        from teacher as t,research_apply_form as r\
        where t.tname=r.tname\
    ) as a,\
    (\
        select sname,student_id,phone,email from student\
    ) as s\
    where s.student_id=a.student_id and a.teacher_id=:teacher_id\
    order by a.research_title;";

exports.researchApplyFormPersonalReturn="\
    select a.student_id,s.sname,a.research_title,a.tname,a.agree,a.first_second,s.phone,s.email,a.semester\
    from research_apply_form as a,\
    (\
        select sname,student_id,phone,email\
        from student\
        where student_id=:student_id\
    ) as s\
    where s.student_id=a.student_id;";

exports.showGivenGradeStudentResearch="\
    select distinct s1.student_id, s1.sname as name, s1.program, t.teacher_id, s1.tname\
    from teacher as t\
    right outer join\
    (\
        select s.student_id, s.sname, s.program, s.grade, rs.tname\
        from student as s,\
        (\
            select student_id, tname\
            from research_student\
            where student_id LIKE concat(:grade, '%')\
        ) as rs\
        where s.student_id = rs.student_id\
    ) as s1\
    on t.tname = s1.tname";

exports.showResearchPage="\
    select *\
    from research_student\
    where student_id = :student_id";

exports.findResearchGroup="\
    select student_id \
    from research_student\
    where research_title = :research_title\
    and tname = :tname\
    and first_second = :first_second\
    and semester = :semester";

exports.setResearchTitle="\
    update research_student set research_title = :new_title\
    where research_title = :research_title\
    and tname = :tname\
    and first_second = :first_second\
    and semester = :semester";

exports.setResearchLink="\
    update research_student set link = :new_link\
    where research_title = :research_title\
    and tname = :tname\
    and first_second = :first_second\
    and semester = :semester";

exports.setResearchIntro="\
    update research_student set intro = :new_intro\
    where research_title = :research_title\
    and tname = :tname\
    and first_second = :first_second\
    and semester = :semester";

exports.setResearchScore="\
    update research_student set score = :new_score\
    where research_title = :research_title\
    and tname = :tname\
    and first_second = :first_second\
    and student_id = :student_id\
    and semester = :semester";

exports.createNewResearch="\
    insert into research_student\
    (student_id, tname, research_title, first_second, semester)\
    values\
    (:student_id, :tname, :research_title, :first_second, :semester)";
    
exports.researchFileCreate="\
    insert into research_file \
    values(:research_title,:tname,:file_name,:first_second,:file_path,:file_type);"

exports.researchFileReturn="\
    select * from research_file where \
    research_title=:research_title \
    and tname=:tname \
    and first_second=:first_second;"

exports.showResearchInfo="\
    select intro\
    from research_student\
    where research_title=:research_title\
    and tname=:tname\
    and first_second = :first_second\
    and semester=:semester;"

exports.updateResearchTitle="\
    update research_student set research_title = :new_title\
    where research_title = :research_title\
    and tname = :tname\
    and first_second = :first_second\
    and semester = :semester"

exports.showResearchGradeComment="\
    select r.tname, r.student_id, r.score, s.sname, r.comment\
    from research_student as r,\
    (\
        select student_id,sname from student\
    ) as s\
    where s.student_id=r.student_id and\
    semester = :semester"

exports.setResearchComment="\
    update research_student set comment = :new_comment\
    where research_title = :research_title\
    and tname = :tname\
    and first_second = :first_second\
    and student_id = :student_id\
    and semester = :semester"