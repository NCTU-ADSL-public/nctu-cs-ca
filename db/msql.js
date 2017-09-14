var Client = require('mariasql');
var lineReader = require('line-reader');

var c = new Client({
    host: 'localhost',
    user: 'root',
    password: '',
    db: 'ca',
    charset: 'utf8'
});

var sql_findStudent = c.prepare('\
    select sname,program,grade from student \
    where student_id=:id');

var sql_findProfessor = c.prepare('\
    select teacher_id,tname from teacher\
    where teacher_id=:id');

var sql_findAssistant = c.prepare('\
    select assistant_id,aname from assistant\
    where assistant_id=:id');

var sql_addEmail = c.prepare('\
    update student set email=:email \
    where student_id=:id');

var sql_showCowMap = c.prepare('\
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
    order by a.grade,a.semester,a.cos_cname;');

var sql_showCosMapPass = c.prepare('\
    select cos_cname from student_cos_relation as sc,cos_name as c \
    where sc.student_id=:id and sc.cos_code=c.cos_code and \
    (sc.cos_code like \'DCP%\' or sc.cos_code like \'IOE%\' or cos_cname like \'微積分甲%\' or cos_cname like \'物理%\' or cos_cname like \'化學%\' )');


var sql_PassCos = c.prepare('\
    select sc.cos_code,cos_cname \
    from student_cos_relation as sc \
    left outer join cos_name as c \
    on sc.cos_code=c.cos_code \
    where sc.student_id=:id;');

var sql_uploadGrade = c.prepare('\
    insert into cos_result \
    values(:unique_id,:id,:score) \
    on duplicate key update \
    unique_id=:unique_id,student_id=:id,score=:score;');

module.exports = {

    findPerson: function(id, callback) {
        if (id.match(/^[0-9].*/g)) {
            c.query(sql_findStudent({ id: id }), function(err, result) {
                if (err)
                    throw err;
                result[0]['status'] = 's';
                callback(null, JSON.stringify(result));
            });
        } else if (id.match(/^T.*/g)) {
            c.query(sql_findProfessor({ id: id }), function(err, result) {
                if (err)
                    throw err;
                result[0]['status'] = 'p';
                callback(null, JSON.stringify(result));
            });
        } else
        {
            c.query(sql_findAssistant({id:id}),function(err,result){
                if(err)
                    throw err;
                result[0]['status']='a';
                callback(null,JSON.stringify(result));
            });
        }
        c.end();
    },
    addEmail: function(id, email) {
        c.query(sql_addEmail({ id: id, email: email }), function(err) {
            if (err)
                throw err;
        });
        c.end();
    },
    showCosMap: function(id, callback) {
        var year = '1' + id[0] + id[1];
        c.query(sql_showCowMap({ id: id, year: year }), function(err, result) {
            if (err)
                throw err;
            callback(null, JSON.stringify(result));
        });
        c.end();
    },
    showCosMapPass: function(id, callback) {
        c.query(sql_showCosMapPass({ id: id }), function(err, result) {
            if (err)
                throw err;
            callback(null, JSON.stringify(result));
        });
        c.end();
    },
    PassCos: function(id, callback) {
        c.query(sql_PassCos({ id: id }), function(err, result) {
            if (err)
                throw err;
            callback(null, JSON.stringify(result));
        });
        c.end();
    },
    uploadGrade: function(pt) {
        var now = 0,
            num = "";
        lineReader.eachLine(pt, function(line, last) {
            if (now == 0) {
                var a = line.match(/[0-9]+/g);
                num = num + a[0] + "-" + a[1] + "-";
            } else if (now == 1) {
                var a = line.match(/[0-9]+/g);
                num = num + a[0];
            } else if (/[0-9+]/.test(line.split(',')[2])) {
                line = line.split(',');
                console.log(line[2], line[4]);
                c.query(sql_uploadGrade({ unique_id: num, id: line[2], score: line[4] }), function(err) {
                    if (err)
                        throw err;
                });
            }
            if (last) {
                c.end();
                return false;
            }
            now++;
        });
    }
};
