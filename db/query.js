var query = require('./msql.js');

query.Group('0312512', function(err, result){
    console.log(result);
});
