var Client = require('mariasql');
var lineReader = require('line-reader');
var s = require('./sqlString.js');
var psw = require('./dbpsw');


var pool = psw.dbpsw();


function padLeft(str, len) {
    str = '' + str;
    if (str.length >= len) {
        return str;
    } else {
        return padLeft("0" + str, len);
    }
}


module.exports = {

    findPerson: function(id, callback) {
        if (id.match(/^[0-9].*/g)) {
            const resource = pool.acquire();
            resource.then(function(c) {
                var sql_findStudent = c.prepare(s.findStudent);
                c.query(sql_findStudent({ id: id }), function(err, result) {
                    if (err)
                        throw err;
                    if (result.info.numRows != 0)
                        result[0]['status'] = 's';
                    callback(null, JSON.stringify(result));
                    pool.release(c);
                })
            });
        } else if (id.match(/^T.*/g)) {
            const resource = pool.acquire();
            resource.then(function(c) {
                var sql_findProfessor = c.prepare(s.findProfessor);
                c.query(sql_findProfessor({ id: id }), function(err, result) {
                    if (err)
                        throw err;
                    if (result.info.numRows != 0)
                        result[0]['status'] = 'p';
                    callback(null, JSON.stringify(result));
                    pool.release(c);
                });
            })
        } else {
            const resource = pool.acquire();
            resource.then(function(c) {
                var sql_findAssistant = c.prepare(s.findAssistant);
                c.query(sql_findAssistant({ id: id }), function(err, result) {
                    if (err)
                        throw err;
                    if (result.info.numRows != 0)
                        result[0]['status'] = 'a';
                    callback(null, JSON.stringify(result));
                    pool.release(c);
                });
            })
        }
    },
    addEmail: function(id, email) {
        const resource = pool.acquire();
        resource.then(function(c) {
            var sql_addEmail = c.prepare(s.addEmail);
            c.query(sql_addEmail({ id: id, email: email }), function(err) {
                if (err)
                    throw err;
                pool.release(c);
            });
        })
    },
    showCosMap: function(id, callback) {
        const resource = pool.acquire();
        resource.then(function(c) {
            var sql_showCowMap = c.prepare(s.showCowMap);
            var year = '1' + id[0] + id[1];
            c.query(sql_showCowMap({ id: id, year: year }), function(err, result) {
                if (err)
                    throw err;
                callback(null, JSON.stringify(result));
                pool.release(c);
            });
        })
    },
    showCosMapPass: function(id, callback) {
        const resource = pool.acquire();
        resource.then(function(c) {
            var sql_showCosMapPass = c.prepare(s.showCosMapPass);
            c.query(sql_showCosMapPass({ id: id }), function(err, result) {
                if (err)
                    throw err;
                callback(null, JSON.stringify(result));
                pool.release(c);
            });
        })
    },
    p_uploadGrade: function(pt) {
        const resource = pool.acquire();
        resource.then(function(c) {
            var sql_p_uploadGrade = c.prepare(s.p_uploadGrade);
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
                    c.query(sql_p_uploadGrade({ unique_id: num, id: line[2], score: line[4] }), function(err) {
                        if (err)
                            throw err;
                    });
                }
                if (last) {
                    pool.release(c);
                    return false;
                }
                now++;
            });
        })
    },
    a_uploadGrade: function(pt) {
        const resource = pool.acquire();
        resource.then(function(c) {
            var sql_a_uploadGrade = c.prepare(s.a_uploadGrade);
            var sql_updateStudentCosPass = c.prepare(s.updateStudentCosPass);
            var num = "",
                now = 0;
            lineReader.eachLine(pt, function(line, last) {
                if (now != 0) {
                    line = line.split(',');
                    num = line[4] + '-' + line[5] + '-' + padLeft(line[6], 4);
                    c.query(sql_a_uploadGrade({ unique_id: num, id: line[0], score: line[15], grade: line[16], GP: line[17] }), function(err) {
                        if (err)
                            throw err;
                    });
                    if (line[14] == '通過')
                        c.query(sql_updateStudentCosPass({ id: line[0], cos_code: line[9], year: line[4], semester: line[5] ,code:line[6]}), function(err) {
                            if (err)
                                throw err;
                        });
                }
                if (last) {
                    pool.release(c);
                    return false;
                }
                now++;
            });
        })
    },
    totalCredit: function(id, callback) {
        const resource = pool.acquire();
        resource.then(function(c) {
            var sql_totalCredit = c.prepare(s.totalCredit);
            c.query(sql_totalCredit({ id: id }), function(err, result) {
                if (err)
                    throw err;
                callback(null, JSON.stringify(result));
                pool.release(c);
            })
        })
    },
    totalRequiredCredit: function(id, callback) {
        const resource = pool.acquire();
        resource.then(function(c) {
            var sql_totalRequiredCredit = c.prepare(s.totalRequiredCredit);
            var str = id.split("");
            str = '%' + id[0] + id[1];
            c.query(sql_totalRequiredCredit({ id: id, year: str }), function(err, result) {
                if (err)
                    throw err;
                callback(null, JSON.stringify(result));
                pool.release(c);
            })
        })
    },
    Pass: function(id, callback) {
        const resource = pool.acquire();
        resource.then(function(c) {
            var sql_Pass = c.prepare(s.Pass);
            var year = '1' + id[0] + id[1];
            c.query(sql_Pass({ id: id ,year:year}), function(err, result) {
                if (err)
                    throw err;
                callback(null, JSON.stringify(result));
                pool.release(c);
            })
        })
    },
    Group: function(id,callback){
        const resource = pool.acquire();
        resource.then(function(c){
            var sql_Group=c.prepare(s.Group);
            var year='1'+id[0]+id[1];
            c.query(sql_Group({id:id,year:year}),function(err,result){
                if(err)
                    throw err;
                callback(null,JSON.stringify(result).replace(/\"\[/g,"\[").replace(/\]\"/g,"\]").replace(/\\\"/g,"\""));
                pool.release(c);
            })
        })
    },
    graduateRule: function(id,callback){
        const resource = pool.acquire();
        resource.then(function(c){
            var sql_graduateRule=c.prepare(s.graduateRule);
            var year='1'+id[0]+id[1];
            c.query(sql_graduateRule({id:id,year:year}),function(err,result){
                if(err)
                    throw err;
                callback(null,JSON.stringify(result));
                pool.release(c);
            })
        })
    },
    Drain:function(){
        pool.drain().then(function() {
            pool.clear();
        });
    }
};