var Client = require('mariasql');
var lineReader = require('line-reader');

var c = new Client({
    host: 'localhost',
    user: 'root',
    password: '',
    db: 'ca',
    charset: 'utf8'
});

c.query(('SELECT sname,program,grade FROM student WHERE student_id="033212345"'), function(err, result){
  console.log(result);
});

