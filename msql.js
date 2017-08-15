var Client = require('mariasql');

var c = new Client({
    host: 'localhost',
    user: 'root',
    password: '',
    db: 'ca',
    charset: 'utf8'
});

var sql_findStudent = c.prepare('select sname,program from student where student_id=:id');
var sql_addEmail = c.prepare('update student set email=:email where student_id=:id');

module.exports = {

    findStudent: function(id, callback) {
        c.query(sql_findStudent({ id: id }), function(err, result) {
            if (err)
                throw err;
            callback(null, JSON.stringify(result));
        })
        c.end();
    },
    addEmail: function(id, email) {
        c.query(sql_addEmail({ id: id, email: email }), function(err) {
            if (err)
                throw err;
        })
        c.end();
    },
};
