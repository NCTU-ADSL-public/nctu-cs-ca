exports.findStudent = "\
    select sname,program,grade from student \
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
    select cos_cname from student_cos_relation as sc,cos_name as c \
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
    value(:id,:code,:year,:semester) \
    on duplicate key update \
    student_id=:id,cos_code=:code";

exports.totalCredit = "\
    SELECT SUM(t.cos_credit) as total\
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
                AND r.cos_cname = n.cos_cname\
                AND (n.cos_code like \'DCP%\' or n.cos_code like \'IOE%\' or n.cos_cname like \'微積分甲%\' or n.cos_cname like \'物理%\' or n.cos_cname like \'化學%\' )\
            )\
        ) as a\
        JOIN\
        cos_data as d\
        WHERE d.cos_code = a.cos_code\
    )as t"; //我有bug喔 QAQ

exports.oldGeneralCredit = '\
    SELECT "公民" as brief,SUM(t.cos_credit) as credit\
    FROM\
    (\
        SELECT DISTINCT d.cos_code, d.cos_credit\
        FROM student_cos_relation as s, cos_data as d  \
        WHERE student_id = :id\
        AND d.cos_code = s.cos_code\
        AND d.brief LIKE "公民%"\
    ) as t\
    union\
    SELECT "文化" as brief,SUM(t.cos_credit) as credit\
    FROM\
    (\
        SELECT DISTINCT d.cos_code, d.cos_credit\
        FROM student_cos_relation as s, cos_data as d  \
        WHERE student_id = :id\
        AND d.cos_code = s.cos_code\
        AND d.brief LIKE "文化%"\
    ) as t\
    union\
    SELECT "群己" as brief,SUM(t.cos_credit) as credit\
    FROM\
    (\
        SELECT DISTINCT d.cos_code, d.cos_credit\
        FROM student_cos_relation as s, cos_data as d  \
        WHERE student_id = :id\
        AND d.cos_code = s.cos_code\
        AND d.brief LIKE "群己%"\
    ) as t\
    union\
    SELECT "自然" as brief,SUM(t.cos_credit) as credit\
    FROM\
    (\
        SELECT DISTINCT d.cos_code, d.cos_credit\
        FROM student_cos_relation as s, cos_data as d  \
        WHERE student_id = :id\
        AND d.cos_code = s.cos_code\
        AND d.brief LIKE "自然%"\
    ) as t\
    union\
    SELECT "歷史" as brief,SUM(t.cos_credit) as credit\
    FROM\
    (\
        SELECT DISTINCT d.cos_code, d.cos_credit\
        FROM student_cos_relation as s, cos_data as d  \
        WHERE student_id = :id\
        AND d.cos_code = s.cos_code\
        AND d.brief LIKE "歷史%"\
    ) as t\
    union\
    SELECT "當代世界" as brief,SUM(t.cos_credit) as credit\
    FROM\
    (\
        SELECT DISTINCT d.cos_code, d.cos_credit\
        FROM student_cos_relation as s, cos_data as d  \
        WHERE student_id = :id\
        AND d.cos_code = s.cos_code\
        AND d.brief LIKE "通識%"\
    ) as t'; //我有bug喔 QAQ

exports.Pass = "\
    select DISTINCT d.cos_code, n.cos_cname, d.cos_type, d.cos_credit,s.year,s.semester\
    from cos_data as d, student_cos_relation as s, cos_name as n\
    where s.student_id = :id\
    and d.cos_code = s.cos_code\
    and d.cos_code = n.cos_code";