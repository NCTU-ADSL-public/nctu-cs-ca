exports.findStudent = "\
    select * from student \
    where student_id=:id";

exports.findProfessor = "\
    select teacher_id,tname from teacher\
    where teacher_id=:id";

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
        where s.student_id=:id and c.school_year=:year and c.program=s.program \
        order by grade, semester\
        ) as a \
    left outer join \
        (\
        select pre_cos_cname, after_cos_cname \
        from cos_suggest as c, student as s \
        where s.student_id=:id and s.program=c.program and c.school_year=:year\
        ) as b \
    on a.cos_cname=b.after_cos_cname \
    left outer join \
        (\
        select pre_cos_cname, after_cos_cname \
        from cos_pre as c, student as s \
        where s.student_id=:id and s.program=c.program and c.school_year=:year\
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
    or cos_cname like \'化學%\' or cos_cname like \'生物%\';"

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
    select DISTINCT a.cos_code, a.cos_cname,a.cos_ename,a.pass_fail,a.score,a.score_level, a.cos_type,a.cos_typeext,b.type,a.brief,a.brief_new, a.cos_credit,a.year,a.semester\
    from\
    (\
        select DISTINCT s.pass_fail,s.score,s.score_level,d.cos_code, n.cos_cname,n.cos_ename, d.cos_type,d.cos_typeext,d.brief,d.brief_new, d.cos_credit,s.year,s.semester\
        from cos_data as d,\
        (\
            select cos_year as year,semester,cos_id as code,cos_code,pass_fail,score,score_level,concat(cos_year,\'-\',semester,\'-\',cos_id) as unique_id\
            from cos_score where student_id=:id\
        ) as s,\
        cos_name as n\
        where\
        d.unique_id = concat(s.year,\'-\',s.semester,\'-\',s.code)\
        and d.cos_code = n.cos_code\
        and n.unique_id=d.unique_id\
    ) as a left outer join\
    (\
        select DISTINCT s.pass_fail,s.score,s.score_level,d.cos_code, n.cos_cname, d.cos_type,d.cos_typeext,t.type,d.brief,d.brief_new, d.cos_credit,s.year,s.semester\
        from cos_data as d,\
        (\
            select cos_year as year,semester,cos_id as code,cos_code,pass_fail,score,score_level,concat(cos_year,\'-\',semester,\'-\',cos_id) as unique_id\
            from cos_score where student_id=:id\
        ) as s,\
        cos_name as n,cos_type as t,student as sd\
        where sd.student_id=:id\
        and d.unique_id = concat(s.year,\'-\',s.semester,\'-\',s.code)\
        and n.unique_id=d.unique_id\
        and n.cos_cname like concat(t.cos_cname,\'%\')\
        and t.school_year=:year\
        and t.program=sd.program\
    ) as b\
    on b.cos_code=a.cos_code and b.cos_cname=a.cos_cname and b.year=a.year and b.semester=a.semester\
    order by a.year,a.semester asc";;

exports.Group = '\
    select p.cos_cname,p.cos_ename,p.cos_codes,IFNULL(a.type,\'必修\') as type\
    from cos_group as p\
    left outer join\
    (\
        select t.cos_cname,t.type,t.school_year\
        from student as s,cos_type as t\
        where s.student_id=:id and s.program=t.program\
        and t.school_year=:year\
    ) as a\
    on p.cos_cname=a.cos_cname and a.school_year=:year\
    where a.type is not null or p.cos_cname in\
    (\
        select cos_cname from cos_require as r,student as s\
        where s.student_id=:id and r.school_year=:year\
        and r.program=s.program\
        union\
        select \'物化生三選一(一)\'\
        union\
        select \'物化生三選一(二)\'\
    );';

exports.graduateRule = '\
    select r.require_credit,r.pro_credit,r.free_credit,r.core_credit,r.sub_core_credit,r.foreign_credit\
    from graduate_rule as r,student as s\
    where s.student_id=:id and s.program=r.program and r.school_year=:year;';

exports.studentGraduateList = '\
    select student_id,sname,program,graduate_submit,graduate\
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