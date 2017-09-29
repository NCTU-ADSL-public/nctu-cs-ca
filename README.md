# Nctu-CS-CA

```
nginx 1.10.3 
Oldest compatible clients: Firefox 1, Chrome 1, IE 7, Opera 5, Safari 1, Windows XP IE8, Android 2.3, Java 7
```
### Installation

```
Configure Nginx +  Mariadb (see the section database below)
$ git clone https://github.com/NCTU-ADSL-public/nctu-cs-ca.git
$ cd nctu-cs-ca
$ sudo npm run dev
```

```
Deploy with Docker, instead of sudo npm run dev do the following
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


___

## DataBase
```
Please npm install the following packages before using
1. [mariasql](https://github.com/mscdex/node-mariasql)
2. [line-reader](https://github.com/nickewing/line-reader)
3. [generic-pool](https://github.com/coopernurse/node-pool)
```

### Introduction

### Personal Information of Student
| function | description |
| ------- | ----- |
| findPerson(id,cb) | return someone's profile |
| addEmail(student_id,email) | update student's e-mail |

### Course Map
| function | description |
| ------- | ----- |
| showCosMap(student_id,cb) | return the Course Map and suggest,required course relation |
| showCosMapPass(student_id,cb) | return the passing course in Course Map |

### Course Pass and Grade
| function | description |
| ------- | ----- |
| a_uploadGrade(file_path) | assistant upload grades |
| totalCredit(student_id,cb) | return someone's credits of 必選修  ((bug |
| oldGeneralCredit(student_id,cb) | return someone's credits of 舊版通識 ((bug |
| Pass(student_id,cb) | return all of someone's passing course |

