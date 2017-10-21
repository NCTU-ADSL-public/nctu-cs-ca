// 使用前請先
// npm install mariasql
// npm install line-reader
// npm install generic-pool

var m = require('./msql.js');


m.findPerson('0516003', function(err, result) {
    if (err)
        throw err;
    console.log(JSON.parse(result));
}); // findPerson 回傳學生資料


m.addEmail('0516003', 'ddddt@test');
// addEmail(學號,email) 更新此學號學生之email

m.showCosMap('0516003', function(err, result) {
    if (err)
        throw err;
    console.log(JSON.parse(result));
}); // showCosMap 課程地圖要顯示的項目以及建議先修課與擋修課程

m.showCosMapPass('0516003', function(err, result) {
    if (err)
        throw err;
    console.log(JSON.parse(result));
}); // showCosMapPass 某學生在課程地圖上有通過的課

m.a_uploadGrade('./123.csv'); // a_uploadGrade 助理上傳成績

m.totalCredit('0516003', function(err, result) {
    if (err)
        throw err;
    console.log(JSON.parse(result));
}); // totalCredit 回傳某學生總學分數

m.totalRequiredCredit('0516003', function(err, result) {
    if (err)
        throw err;
    console.log(JSON.parse(result));
}); // totalRequiredCredit 計算某學生必選修學分數

m.Pass('0516003', function(err, result) {
    if (err)
        throw err;
    console.log(JSON.parse(result));
}); // Pass 列出此學生通過的課

m.Group('0516003',function(err,result){
	if(err)
		throw err;
	console.log(JSON.parse(result));
}); // Group 列出此學生畢業預審表上 必修、核心、副核心等課程分類

m.Drain(); // 關閉 connection pool