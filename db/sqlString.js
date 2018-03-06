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

exports.showCowMap = "\
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
    select distinct cos_cname from student_cos_relation as sc,cos_name as c \
    where sc.student_id=:id and sc.cos_code=c.cos_code and \
    (sc.cos_code like \'DCP%\' or sc.cos_code like \'IOE%\' or cos_cname like \'微積分甲%\' or cos_cname like \'物理%\' or cos_cname like \'化學%\' )";

exports.p_uploadGrade = "\
    insert into cos_result \
    values(:unique_id,:id,:score) \
    on duplicate key update \
    unique_id=:unique_id,student_id=:id,score=:score;";

exports.a_uploadGrade = "\
    insert into cos_result \
    values(:unique_id,:id,:score,:grade,:GP) \
    on duplicate key update \
    unique_id=:unique_id,student_id=:id,score=:score,grade_score=:grade,GP=:GP";

exports.updateStudentCosPass = "\
    insert into student_cos_relation \
    value(:id,:cos_code,:year,:semester,:code) \
    on duplicate key update \
    student_id=:id,cos_code=:cos_code,year=:year,semester=:semester,code=:code";

exports.totalCredit = "\
    select sum(t.cos_credit) as total\
    from\
    (\
        select distinct d.cos_code,d.cos_credit\
        from student_cos_relation as s,cos_data as d\
        where s.student_id=:id\
        and s.cos_code=d.cos_code\
    ) as t";

exports.totalRequiredCredit = "\
    SELECT SUM(t.cos_credit) as totalRequire\
    FROM \
    (   \
        SELECT DISTINCT a.cos_code, d.cos_credit\
        FROM (\
            SELECT s.cos_code\
            FROM student_cos_relation as s\
            WHERE s.student_id = :id\
            AND s.cos_code IN \
            (\
                SELECT n.cos_code\
                FROM cos_require as r, cos_name as n\
                WHERE r.program IN ( SELECT program FROM student WHERE student_id=:id )\
                AND r.school_year LIKE :year\
                AND n.cos_cname LIKE CONCAT(r.cos_cname,\'%\')\
                AND (n.cos_code like \'DCP%\' or n.cos_code like \'IOE%\' or n.cos_cname like \'微積分甲%\' or n.cos_cname like \'物理%\' or n.cos_cname like \'化學%\' )\
            )\
        ) as a\
        JOIN\
        cos_data as d\
        WHERE d.cos_code = a.cos_code\
    )as t";

exports.Pass = "\
    select DISTINCT a.cos_code, a.cos_cname,a.cos_ename, a.cos_type,a.cos_typeext,b.type,a.brief,a.brief_new, a.cos_credit,a.year,a.semester\
    from\
    (\
        select DISTINCT d.cos_code, n.cos_cname,n.cos_ename, d.cos_type,d.cos_typeext,d.brief,d.brief_new, d.cos_credit,s.year,s.semester\
        from cos_data as d, student_cos_relation as s, cos_name as n\
        where s.student_id = :id\
        and d.unique_id = concat(s.year,\'-\',s.semester,\'-\',s.code)\
        and d.cos_code = n.cos_code\
    ) as a left outer join\
    (\
        select DISTINCT d.cos_code, n.cos_cname, d.cos_type,d.cos_typeext,t.type,d.brief,d.brief_new, d.cos_credit,s.year,s.semester\
        from cos_data as d, student_cos_relation as s, cos_name as n,cos_type as t,student as sd\
        where s.student_id = :id\
        and sd.student_id=:id\
        and d.unique_id = concat(s.year,\'-\',s.semester,\'-\',s.code)\
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
    select student_id,sname,program,graduate\
    from student\
    where student_id like concat(:sem,\'%\');';

exports.setStudentGraduate='\
    update student set graduate=:graduate where student_id=:id';