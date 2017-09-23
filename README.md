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
Deploy with Docker, Instead of sudo npm run dev do the following
```
$ docker build -t $name
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
| /students/Head | The page for student |
| /assistants/Head | The page for assistants |
| /professors/Head | The page for professors |
| / | Login Page |

