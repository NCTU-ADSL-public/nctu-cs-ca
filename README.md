# Nctu-CS-CA

```
nginx 1.10.3 
Oldest compatible clients: Firefox 1, Chrome 1, IE 7, Opera 5, Safari 1, Windows XP IE8, Android 2.3, Java 7
```
### Installation

```
Configure Nginx +  Mariadb
$ git clone https://github.com/NCTU-ADSL-public/nctu-cs-ca.git
$ cd nctu-cs-ca
$ sudo npm run dev
```
Deploy with Docker, instead of sudo npm run dev do the following
```
$ docker build -t $imageName .
$ docker run -d -p 1111:1111 --name $name --net=host $imageName
```

### API

| Method | Path | Description |
|------- | --------- | ------ |
| get | auth/Nctu | Redirect to oAuth Nctu|
| get | auth/Nctu/callback | Callback Page from oAuth Nctu|
| get | students/profile | Return student information |
| get | students/courseMap | Return course map |
| get | students/coursePass | Return course passed |
| get | user/state| Return the status of the person(0:CS student 1: not CS student 2: not login) |
| post | students/score | post the .csv score file here |

### Static Page

| Path | Description |
| --------- | ------ |
| /students/Head | The page for students |
| /assistants/Head | The page for assistants |
| /professors/Head | The page for professors |
| / | Login Page |


# DB
### please npm install the following packages before using it
1. [mariasql](https://github.com/mscdex/node-mariasql)
2. [line-reader](https://github.com/nickewing/line-reader)
3. [generic-pool](https://github.com/coopernurse/node-pool)

## Introduction

### Personal Information of Student
* findPerson(student_id,cb) 回傳學生資料
* addEmail(student_id,email) 更新學生email

### Course Map
* showCosMap(student_id,cb) 課程地圖要顯示的項目以及建議先修課與擋修課程
* showCosMapPass(student_id,cb) 課程地圖上有通過的課

### Course Pass and Grade
* a_uploadGrade(file_path) 助理上傳成績
* totalCredit(student_id,cb) 計算某學生必選修學分數  ((目前仍有bug
* oldGeneralCredit(student_id,cb) 計算某學生舊版通識學分數 ((目前仍有bug
* Pass(student_id,cb) 列出此學生通過的課
