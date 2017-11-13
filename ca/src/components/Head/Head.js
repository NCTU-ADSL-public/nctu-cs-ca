import React, { Component } from 'react';
import './StudentsHead.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

import Home from 'material-ui/svg-icons/content/flag';
import Map from 'material-ui/svg-icons/maps/map';
import Graduation from 'material-ui/svg-icons/social/school';
import Check from 'material-ui/svg-icons/av/featured-play-list';
import defalt from './defalt.jpg';

import HomeItem from './Home/Home.js';
import MapItem from './Map/MapComponents/Map.js';
import GraduationItem from './Graduation/Graduation.js';
import CreditItem from './Credit/Credit.js';

import FadeIn from 'react-fade-in';

const homeIcon = <Home />;
const mapIcon = <Map />;
const graduationIcon = <Graduation />;
const checkIcon = <Check />;

let MapCourseData;
let StudentCosPas;

let Graduationitems=[
    { title: '必修課程',
        credit: '80',
        require: '60',
        selection: true,
        course:
            [ {"cn":"資料庫系統概論","en":"Introduction to Database Systems","code":"DCP1187","score":-1,"complete":"false","english":false,"grade":"0","year":4,"semester":1,"reason":"CS"},{ cn: '作業系統概論', en: 'Introduction to Operating Systems',"score":60 ,complete:true, grade:'0'},
                { cn: '基礎程式設計', en: 'Basic Programming',"score":60  ,complete:true, grade:'C'},
                { cn: '微積分(一)', en: 'Calculus (I)' ,"score":60 ,complete:true, grade:'B',reason:'now'},
                { cn: '微積分(二)', en: 'Calculus (II)',"score":60  ,complete:true, grade:'A'},
                { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.',"score":60  ,complete:true, reason:'notCS', grade:'0'},
                { cn: '數位電路設計', en: 'Digital Circuit Design',"score":60  ,complete:false, reason:'now'},
                { cn: '機率', en: 'Probability' ,"score":60 ,complete:true, reason:'free1'},
                { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true,"score":60 , reason:'free2'},
                { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:false,"score":60 },
                { cn: '物化生三合一(一)', en: '' ,complete:true,"score":60 },
                { cn: '物化生三合一(二)', en: '' ,complete:true,"score":60 },
                { cn: '線性代數', en: 'Linear Algebra' ,complete:true},
                { cn: '編譯器設計概論', en: 'Intro. to Compiler Design' ,complete:true},
                { cn: '計算機概論與程式設計',
                    en: 'Introduction to Computers and Programming' ,complete:true},
                { cn: '計算機組織', en: 'Computer Organization' ,complete:true},
                { cn: '計算機網路概論', en: 'Intro. to Computer Networks' ,complete:true},
                { cn: '資料結構與物件導向程式設計',
                    en: 'Data Structures and Object-oriented Programming' ,complete:true},
                { cn: '資訊工程專題(一)',
                    en: 'Computer Science and Engineering Projects (I)' ,complete:true},
                { cn: '資訊工程專題(二)',
                    en: 'Computer Science and Engineering Projects (II)' ,complete:true},
                { cn: '資訊工程研討', en: 'Computer Science Seminars' ,complete:true},
                { cn: '離散數學', en: 'Discrete Mathematics' ,complete:true} ],
        notPas: [],
        complete: 'True' },
    { title: '通識',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true,"score":60 },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true,"score":60 },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true ,reason:'now'},
                { cn: '霸權興衰史:從十五世紀至當代', en: '', dimension: '歷史', complete: true ,"score":60,reason:'free2'},
                { cn: '紀錄片製作概論', en: '', dimension: '歷史', complete: true ,"score":60},
                { cn: '台灣史', en: '', dimension: '歷史', complete: true ,"score":60},
                { cn: '當代中國：全球化下的兩岸關係', en: '', dimension: '歷史', complete: true ,"score":60} ] },
    { title: '副核心課程與他組核心',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '核心課程',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '體育',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '外文',
        credit: '20',
        require: '60',
        course:
            [ { cn: '作業系統概論', en: 'Introduction to Operating Systems' ,complete:true},
                { cn: '基礎程式設計', en: 'Basic Programming' ,complete:true},
                { cn: '微積分(一)', en: 'Calculus (I)' ,complete:true},
                { cn: '微積分(二)', en: 'Calculus (II)' ,complete:true},
                { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.' ,complete:true},
                { cn: '數位電路設計', en: 'Digital Circuit Design' ,complete:true},
                { cn: '機率', en: 'Probability' },
                { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true},
                { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:true},
                { cn: '物化生三合一(一)', en: '' ,complete:true},
                { cn: '物化生三合一(二)', en: '' ,complete:true},
                { cn: '線性代數', en: 'Linear Algebra' ,complete:true},
                { cn: '編譯器設計概論', en: 'Intro. to Compiler Design' ,complete:true},
                { cn: '計算機概論與程式設計',
                    en: 'Introduction to Computers and Programming' ,complete:true},
                { cn: '計算機組織', en: 'Computer Organization' ,complete:true},
                { cn: '計算機網路概論', en: 'Intro. to Computer Networks' ,complete:true},
                { cn: '資料結構與物件導向程式設計',
                    en: 'Data Structures and Object-oriented Programming' ,complete:true},
                { cn: '資訊工程專題(一)',
                    en: 'Computer Science and Engineering Projects (I)' ,complete:true},
                { cn: '資訊工程專題(二)',
                    en: 'Computer Science and Engineering Projects (II)' ,complete:true},
                { cn: '資訊工程研討', en: 'Computer Science Seminars' ,complete:true},
                { cn: '離散數學', en: 'Discrete Mathematics' ,complete:true} ],
        notPas: [],
        complete: 'True' },{},{},{},{},{"total":113,"total_require":128,"compulsory":55,"compulse_require":58,"core":9,"core_require":"9","vice":9,"vice_require":"9","pro":9,"pro_require":"12","english":0,"english_require":1,"other":0,"other_require":"12","general":20,"general_require":20,"pe":6,"pe_require":6,"language":10,"language_require":8,"service":2,"service_require":2,"art":2,"art_require":2}

];
let revise=[
    { title: '必修程',
        credit: '80',
        require: '60',
        selection: true,
        course:
            [
                { cn: '基礎程式設計', en: 'Basic Programming',"score":60  ,complete:true},
                { cn: '微積分(一)', en: 'Calculus (I)' ,"score":60 ,complete:true},
                { cn: '微積分(二)', en: 'Calculus (II)',"score":60  ,complete:true},
                { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.',"score":60  ,complete:true, reason:'notCS'},
                { cn: '數位電路設計', en: 'Digital Circuit Design',"score":60  ,complete:true},
                { cn: '機率', en: 'Probability' ,"score":60 },
                { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true,"score":60 },
                { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:true,"score":60 },
                { cn: '物化生三合一(一)', en: '' ,complete:true,"score":60 },
                { cn: '物化生三合一(二)', en: '' ,complete:true,"score":60 },
                { cn: '線性代數', en: 'Linear Algebra' ,complete:true},
                { cn: '編譯器設計概論', en: 'Intro. to Compiler Design' ,complete:true},
                { cn: '計算機概論與程式設計',
                    en: 'Introduction to Computers and Programming' ,complete:true},
                { cn: '計算機組織', en: 'Computer Organization' ,complete:true},
                { cn: '計算機網路概論', en: 'Intro. to Computer Networks' ,complete:true},
                { cn: '資料結構與物件導向程式設計',
                    en: 'Data Structures and Object-oriented Programming' ,complete:true},
                { cn: '資訊工程專題(一)',
                    en: 'Computer Science and Engineering Projects (I)' ,complete:true},
                { cn: '資訊工程專題(二)',
                    en: 'Computer Science and Engineering Projects (II)' ,complete:true},
                { cn: '資訊工程研討', en: 'Computer Science Seminars' ,complete:true},
                { cn: '離散數學', en: 'Discrete Mathematics' ,complete:true} ],
        notPas: [],
        complete: 'True' },
    { title: '通識',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true },
                { cn: '霸權興衰史:從十五世紀至當代', en: '', dimension: '歷史', complete: true },
                { cn: '紀錄片製作概論', en: '', dimension: '歷史', complete: true },
                { cn: '台灣史', en: '', dimension: '歷史', complete: true },
                { cn: '當代中國：全球化下的兩岸關係', en: '', dimension: '歷史', complete: true } ] },
    { title: '副核心課程',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '核心課程',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '專業選修',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '外文',
        credit: '20',
        require: '60',
        course:
            [ { cn: '作業系統概論', en: 'Introduction to Operating Systems' ,complete:true},
                { cn: '基礎程式設計', en: 'Basic Programming' ,complete:true},
                { cn: '微積分(一)', en: 'Calculus (I)' ,complete:true},
                { cn: '微積分(二)', en: 'Calculus (II)' ,complete:true},
                { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.' ,complete:true},
                { cn: '數位電路設計', en: 'Digital Circuit Design' ,complete:true},
                { cn: '機率', en: 'Probability' },
                { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true},
                { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:true},
                { cn: '物化生三合一(一)', en: '' ,complete:true},
                { cn: '物化生三合一(二)', en: '' ,complete:true},
                { cn: '線性代數', en: 'Linear Algebra' ,complete:true},
                { cn: '編譯器設計概論', en: 'Intro. to Compiler Design' ,complete:true},
                { cn: '計算機概論與程式設計',
                    en: 'Introduction to Computers and Programming' ,complete:true},
                { cn: '計算機組織', en: 'Computer Organization' ,complete:true},
                { cn: '計算機網路概論', en: 'Intro. to Computer Networks' ,complete:true},
                { cn: '資料結構與物件導向程式設計',
                    en: 'Data Structures and Object-oriented Programming' ,complete:true},
                { cn: '資訊工程專題(一)',
                    en: 'Computer Science and Engineering Projects (I)' ,complete:true},
                { cn: '資訊工程專題(二)',
                    en: 'Computer Science and Engineering Projects (II)' ,complete:true},
                { cn: '資訊工程研討', en: 'Computer Science Seminars' ,complete:true},
                { cn: '離散數學', en: 'Discrete Mathematics' ,complete:true} ],
        notPas: [],
        complete: 'True' },{},{},{},{},{"total":115,"total_require":156,"compulsory":55,"compulse_require":58,"core":1,"core_require":"15","vice":15,"vice_require":15,"pro":9,"pro_require":"12","english":0,"english_require":1,"other":0,"other_require":"12","general":20,"general_require":20,"pe":6,"pe_require":6,"language":10,"language_require":8,"service":2,"service_require":2,"art":2,"art_require":2}

];
const studentCos = [{"cos_cname":"化學(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"微積分甲(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"普通生物(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"物理(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"線性代數","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"計算機概論與程式設計","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"化學(二)","grade":"1","semester":"2","suggest":"化學(一)","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"微積分甲(一) ","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"線性代數","pre":null},{"cos_cname":"數位電路設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"普通生物(二)","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"物件導向程式設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"物理(二)","grade":"1","semester":"2","suggest":"物理(一)","pre":null},{"cos_cname":"離散數學","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"數位電路實驗","grade":"2","semester":"1","suggest":"數位電路設計","pre":null},{"cos_cname":"機率","grade":"2","semester":"1","suggest":"微積分甲(二)","pre":null},{"cos_cname":"計算機網路概論","grade":"2","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資料結構","grade":"2","semester":"1","suggest":"離散數學","pre":"物件導向程式設計"},{"cos_cname":"基礎程式設計(檢定考試)","grade":"2","semester":"2","suggest":"資料結構","pre":null},{"cos_cname":"正規語言概論","grade":"2","semester":"2","suggest":"離散數學","pre":null},{"cos_cname":"演算法概論","grade":"2","semester":"2","suggest":null,"pre":"資料結構"},{"cos_cname":"計算機組織","grade":"2","semester":"2","suggest":"數位電路實驗","pre":null},{"cos_cname":"作業系統概論","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"微處理機系統實驗","grade":"3","semester":"1","suggest":"計算機組織","pre":null},{"cos_cname":"編譯器設計概論","grade":"3","semester":"1","suggest":"正規語言概論","pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程研討","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資訊工程專題(一)","grade":"3","semester":"2","suggest":null,"pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程專題(二)","grade":"4","semester":"1","suggest":null,"pre":"資訊工程專題(一)"}]
const studentPas = [{"cos_cname":"普通生物(一)(英文授課)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"物理(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"線性代數","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"計算機概論與程式設計","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"化學(二)","grade":"1","semester":"2","suggest":"化學(一)","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"微積分甲(一) ","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"線性代數","pre":null},{"cos_cname":"數位電路設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"普通生物(二)","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"物件導向程式設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"物理(二)","grade":"1","semester":"2","suggest":"物理(一)","pre":null},{"cos_cname":"離散數學","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"數位電路實驗","grade":"2","semester":"1","suggest":"數位電路設計","pre":null},{"cos_cname":"機率","grade":"2","semester":"1","suggest":"微積分甲(二)","pre":null},{"cos_cname":"計算機網路概論","grade":"2","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資料結構","grade":"2","semester":"1","suggest":"離散數學","pre":"物件導向程式設計"},{"cos_cname":"基礎程式設計(檢定考試)","grade":"2","semester":"2","suggest":"資料結構","pre":null},{"cos_cname":"正規語言概論","grade":"2","semester":"2","suggest":"離散數學","pre":null},{"cos_cname":"演算法概論","grade":"2","semester":"2","suggest":null,"pre":"資料結構"},{"cos_cname":"計算機組織","grade":"2","semester":"2","suggest":"數位電路實驗","pre":null},{"cos_cname":"作業系統概論","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"微處理機系統實驗","grade":"3","semester":"1","suggest":"計算機組織","pre":null},{"cos_cname":"編譯器設計概論","grade":"3","semester":"1","suggest":"正規語言概論","pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程研討","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資訊工程專題(一)","grade":"3","semester":"2","suggest":null,"pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程專題(二)","grade":"4","semester":"1","suggest":null,"pre":"資訊工程專題(一)"}]
const printData = [{"title":"共同必修","credit":58,"require":58,"course":[{"cn":"化學(一)","en":"","score":-1,"reason":"free1","complete":true,"grade":"0","year":1,"semester":1},{"cn":"導師時間","en":"Mentor's Hours","score":null,"reason":"CS","complete":true,"grade":null,"realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":1,"move":false},{"cn":"導師時間","en":"Mentor's Hours","score":null,"reason":"CS","complete":true,"grade":null,"realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":2,"move":false},{"cn":"作業系統概論","en":"Introduction to Operating Systems","score":70,"code":"DCP4334","realCredit":3,"originalCredit":3,"complete":true,"grade":"B-","english":false,"year":2,"semester":1,"reason":"CS","move":false},{"cn":"基礎程式設計","en":"Basic Programming","score":71,"code":"DCP2106","realCredit":0,"originalCredit":0,"complete":true,"grade":"B-","english":false,"year":2,"semester":2,"reason":"CS","move":false},{"cn":"微積分(一)","en":"Calculus (I)","score":76,"code":"DAM1345","realCredit":4,"originalCredit":4,"complete":true,"grade":"B","english":false,"year":1,"semester":1,"reason":"CS","move":false},{"cn":"微積分(二)","en":"Calculus (II)","score":64,"code":"DAM1346","realCredit":4,"originalCredit":4,"complete":true,"grade":"C","english":false,"year":1,"semester":2,"reason":"CS","move":false},{"cn":"微處理機系統實驗","en":"Microprocessor System Lab.","score":85,"code":"DCP1155","realCredit":2,"originalCredit":2,"complete":true,"grade":"A","english":false,"year":3,"semester":1,"reason":"CS","move":false},{"cn":"數位電路實驗","en":"Digital Circuit Lab.","score":81,"code":"DCP2110","realCredit":2,"originalCredit":2,"complete":true,"grade":"A-","english":false,"year":2,"semester":1,"reason":"CS","move":false},{"cn":"數位電路設計","en":"Digital Circuit Design","score":86,"code":"DCP1157","realCredit":3,"originalCredit":3,"complete":true,"grade":"A","english":false,"year":1,"semester":2,"reason":"CS","move":false},{"cn":"機率","en":"Probability","score":98,"code":"DCP3351","realCredit":3,"originalCredit":3,"complete":true,"grade":"A+","english":false,"year":2,"semester":1,"reason":"CS","move":false},{"cn":"正規語言概論","en":"Introduction to Formal Language","score":96,"code":"DCP3321","realCredit":3,"originalCredit":3,"complete":true,"grade":"A+","english":false,"year":2,"semester":2,"reason":"CS","move":false},{"cn":"演算法概論","en":"Introduction to Algorithms","score":82,"code":"DCP1208","realCredit":3,"originalCredit":3,"complete":true,"grade":"A-","english":true,"year":2,"semester":2,"reason":"CS","move":false},{"cn":"物件導向程式設計","en":"Object-Oriented Programming","score":79,"code":"DCP1159","realCredit":3,"originalCredit":3,"complete":true,"grade":"B+","english":false,"year":1,"semester":2,"reason":"CS","move":false},{"cn":"線性代數","en":"Linear Algebra","score":81,"code":"DCP2354","realCredit":3,"originalCredit":3,"complete":true,"grade":"A-","english":false,"year":1,"semester":1,"reason":"CS","move":false},{"cn":"計算機概論與程式設計","en":"Introduction to Computers and Programming","score":88,"code":"DCP1204","realCredit":3,"originalCredit":3,"complete":true,"grade":"A","english":true,"year":1,"semester":1,"reason":"CS","move":false},{"cn":"計算機組織","en":"Computer Organization","score":90,"code":"DCP2108","realCredit":3,"originalCredit":3,"complete":true,"grade":"A+","english":true,"year":2,"semester":2,"reason":"CS","move":false},{"cn":"計算機網路概論","en":"Intro. to Computer Networks","score":92,"code":"DCP4513","realCredit":3,"originalCredit":3,"complete":true,"grade":"A+","english":false,"year":2,"semester":1,"reason":"CS","move":false},{"cn":"資料結構","en":"Data Structures","score":77,"code":"DCP1205","realCredit":3,"originalCredit":3,"complete":true,"grade":"B+","english":true,"year":2,"semester":1,"reason":"CS","move":false},{"cn":"資訊工程專題(一)","en":"Computer Science and Engineering Projects (I)","score":89,"code":"DCP3103","realCredit":2,"originalCredit":2,"complete":true,"grade":"A","english":false,"year":3,"semester":1,"reason":"CS","move":false},{"cn":"資訊工程專題(二)","en":"Computer Science and Engineering Projects (II)","score":89,"code":"DCP4121","realCredit":2,"originalCredit":2,"complete":true,"grade":"A","english":false,"year":3,"semester":2,"reason":"CS","move":false},{"cn":"離散數學","en":"Discrete Mathematics","score":75,"code":"DCP2353","realCredit":3,"originalCredit":3,"complete":true,"grade":"B","english":false,"year":1,"semester":2,"reason":"CS","move":false},{"cn":"化學(二)","en":"Chemistry (II)","score":"99","grade":"A+","realCredit":3,"originalCredit":3,"complete":true,"english":false,"year":1,"semester":1,"reason":"CS","move":false}]},{"title":"核心課程","credit":9,"require":9,"selection":true,"course":[{"cn":"影像處理概論","en":"Introduction to Image Processing","score":86,"code":"DCP4585","grade":"A","complete":true,"realCredit":3,"originalCredit":3,"english":false,"reason":"CS","year":3,"semester":2,"move":false},{"cn":"網路程式設計概論","en":"Intro. to Network Programming","score":null,"code":"DCP2368","grade":null,"complete":false,"realCredit":3,"originalCredit":3,"english":false,"reason":"CS","year":3,"semester":1,"move":false},{"cn":"網路通訊原理","en":"Principles of communications networks","score":95,"code":"DCP1228","grade":"A+","complete":true,"realCredit":3,"originalCredit":3,"english":false,"reason":"CS","year":2,"semester":2,"move":false},{"cn":"計算機圖學概論","en":"Introduction to Computer Graphics","score":97,"code":"DCP4516","grade":"A+","complete":true,"realCredit":3,"originalCredit":3,"english":false,"reason":"CS","year":3,"semester":1,"move":false}]},{"title":"副核心與他組核心","credit":9,"require":9,"selection":true,"course":[{"cn":"人工智慧概論","en":"Intro. to Artificial Intelligence","code":"DCP3510","english":false,"score":93,"grade":"A+","complete":true,"realCredit":3,"originalCredit":3,"reason":"CS","year":3,"semester":2,"move":false},{"cn":"編譯器設計概論","en":"Intro. to Compiler Design","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"資料庫系統概論","en":"Introduction to Database Systems","code":"DCP1187","english":false,"score":91,"grade":"A+","complete":true,"realCredit":3,"originalCredit":3,"reason":"CS","year":2,"semester":2,"move":false},{"cn":"軟硬體協同設計概論與實作","en":"Introduction to Hardware-Software Codesign and Imp","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"電路與電子學(一)","en":"Electrical Circuits and Electronics (I)","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"電路與電子學(二)","en":"Electrical Circuits and Electronics (II)","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"微分方程","en":"Differential Equation","code":"DCP2202","english":false,"score":null,"grade":null,"complete":false,"realCredit":3,"originalCredit":3,"reason":"CS","year":2,"semester":1,"move":false},{"cn":"數值方法","en":"Numerical Methods","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"無線網路","en":"Wireless Networks","code":"IOE5016","english":false,"score":94,"grade":"A+","complete":true,"realCredit":3,"originalCredit":3,"reason":"CS","year":2,"semester":2,"move":false},{"cn":"訊號與系統","en":"Signals and Systems","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"電腦安全概論","en":"Introduction to Computer Security","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false}]},{"title":"專業選修","credit":9,"require":12,"course":[{"cn":"教學實務","en":"Teaching Technique Practice","score":"100","reason":"CS","complete":true,"grade":"","realCredit":0,"originalCredit":0,"english":false,"year":3,"semester":1,"move":false},{"cn":"創業實務(英文授課)","en":"Entrepreneurship Realization","score":"95","reason":"CS","complete":true,"grade":"A+","realCredit":3,"originalCredit":3,"english":true,"year":3,"semester":1,"move":false},{"cn":"密碼學概論","en":"Introduction to Cryptography","score":"93","reason":"CS","complete":true,"grade":"A+","realCredit":3,"originalCredit":3,"english":false,"year":3,"semester":2,"move":false},{"cn":"無線網路概論","en":"Introduction to Wireless Networks","score":"96","reason":"CS","complete":true,"grade":"A+","realCredit":3,"originalCredit":3,"english":false,"year":3,"semester":2,"move":false}]},{"title":"其他選修","credit":10,"require":12,"course":[{"cn":"","en":"","score":"84","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":1,"semester":1,"move":true},{"cn":"","en":"","score":"85","reason":"CS","complete":true,"grade":"A","realCredit":2,"originalCredit":2,"english":false,"year":1,"semester":2,"move":true},{"cn":"","en":"","score":"89","reason":"CS","complete":true,"grade":"A","realCredit":2,"originalCredit":2,"english":false,"year":2,"semester":2,"move":true},{"cn":"","en":"","score":"86","reason":"CS","complete":true,"grade":"A","realCredit":2,"originalCredit":2,"english":false,"year":3,"semester":1,"move":true},{"cn":"","en":"","score":"82","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":3,"semester":2,"move":true}]},{"title":"外語","credit":8,"require":8,"course":[{"cn":"外語榮譽學分","en":"","score":-1,"reason":"free1","complete":true,"grade":"0","year":1,"semester":1}]},{"title":"通識","credit":20,"require":20,"course":[{"cn":"當代世界:認同與文化","en":"Contemporary World: Identities and Cultures","score":"82","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":1,"semester":1,"move":false,"dimension":"通識"},{"cn":"心理學概論","en":"Int to Psychology","score":"85","reason":"CS","complete":true,"grade":"A","realCredit":2,"originalCredit":2,"english":false,"year":1,"semester":1,"move":false,"dimension":"群己"},{"cn":"台灣史","en":"The Taiwan History","score":"81","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":1,"semester":2,"move":false,"dimension":"歷史"},{"cn":"西洋歌劇史","en":"A History of Western Opera","score":"76","reason":"CS","complete":true,"grade":"B","realCredit":2,"originalCredit":2,"english":false,"year":1,"semester":2,"move":false,"dimension":"文化"},{"cn":"海洋環境與生態保育-MOOCs","en":"The Marine Environment and Ecological Conservation","score":"83","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":2,"semester":1,"move":false,"dimension":"自然"},{"cn":"文學經典:小說名著選","en":"The  Paradigms of Novels","score":"83","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":2,"semester":2,"move":false,"dimension":"文化"},{"cn":"性別與社會","en":"Gender and Society","score":"83","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":2,"semester":2,"move":false,"dimension":"群己"},{"cn":"文藝鑑賞:探索生命","en":"Appreciation and Analysis of Literatures and Arts","score":"87","reason":"CS","complete":true,"grade":"A","realCredit":2,"originalCredit":2,"english":false,"year":3,"semester":1,"move":false,"dimension":"文化"},{"cn":"國際政治經濟學","en":"International Political Economy","score":"81","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":3,"semester":1,"move":false,"dimension":"公民"},{"cn":"管理學概論","en":"The Concept of Management","score":"92","reason":"CS","complete":true,"grade":"A+","realCredit":2,"originalCredit":2,"english":false,"year":3,"semester":1,"move":false,"dimension":"公民"}]},{"title":"體育","credit":0,"require":6,"course":[{"cn":"大一體育","en":"Physical Education","score":"80","reason":"CS","complete":true,"grade":"A-","realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":1,"move":false},{"cn":"大一體育","en":"Physical Education","score":"79","reason":"CS","complete":true,"grade":"B+","realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":2,"move":false},{"cn":"體育－網球甲Ａ","en":"Physical Education","score":"80","reason":"CS","complete":true,"grade":"A-","realCredit":0,"originalCredit":0,"english":false,"year":2,"semester":1,"move":false},{"cn":"體育－羽球甲A","en":"Physcial Education","score":"76","reason":"CS","complete":true,"grade":"B","realCredit":0,"originalCredit":0,"english":false,"year":2,"semester":2,"move":false},{"cn":"體育－健康體適能","en":"Physical Education","score":"83","reason":"CS","complete":true,"grade":"A-","realCredit":0,"originalCredit":0,"english":false,"year":3,"semester":1,"move":false},{"cn":"體育－健康體適能","en":"Physical Education","score":"72","reason":"CS","complete":true,"grade":"B-","realCredit":0,"originalCredit":0,"english":false,"year":3,"semester":2,"move":false}]},{"title":"服務學習","credit":1,"require":2,"course":[{"cn":"服務學習(一)","en":"Service Learning I","score":null,"reason":"CS","complete":true,"grade":null,"realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":2,"move":false},{"cn":"動物與我-服務學習二","en":"Service Learning II","score":"92","reason":"CS","complete":true,"grade":"A+","realCredit":1,"originalCredit":1,"english":false,"year":2,"semester":1,"move":false}]},{"title":"藝文賞析","credit":0,"require":2,"course":[{"cn":"藝文賞析教育","en":"Arts Appreciation Education","score":null,"reason":"CS","complete":true,"grade":null,"realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":1,"move":false},{"cn":"藝文賞析教育","en":"Arts Appreciation Education","score":null,"reason":"CS","complete":true,"grade":null,"realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":2,"move":false}]}];

class Head extends Component {


    state = {
        selectedIndex: 0,
        styleButton: {
            fontFamily: 'Noto Sans CJK TC',
            background: '#EEEEEE',
            lineHeight: '15px',
            margin: '5px 0 0',
            fontSize: '11px',
            width: '10px',
        },
		studentIdcard:{
       		name:'流川楓',
			prog:'網多',
			grad:'大一',
		},
        print_courseCategoryArray:printData

    };


    componentWillMount(){
    	let _this = this;

        axios.get('/students/graduate/original').then(studentData => {
            Graduationitems = studentData.data;
        }).catch(err => {
            console.log(err);
        });
        axios.get('/students/graduate/revised').then(studentData => {
            revise = studentData.data;
        }).catch(err => {
            console.log(err);
        });

        axios.get('/students/profile').then(studentData => {
            _this.setState({
                studentIdcard: {
                    name: studentData.data[0].sname,
                    prog: studentData.data[0].program ,
                    grad: "大" + studentData.data[0].grade,
                }
            })
        }).catch(err => {
            console.log(err);
        });
        MapCourseData = Object.keys(studentCos).map(function(key) {
            let user = studentCos[key];
            user.id = key;
            return user;
        });
        StudentCosPas = Object.keys(studentPas).map(function(key) {
            let user = studentPas[key];
            user.id = key;
            return user;
        });
        axios.get('/students/courseMap').then(studentData => {
                MapCourseData = Object.keys(studentData.data).map(function(key) {
                    let user = studentData.data[key];
                    user.id = key;
                    return user;
                });
        }).catch(err => {
            console.log(err);
        });
        axios.get('/students/coursePass').then(studentData => {
            // studentData.status HTTP response code (e.g., 200, 401)
            // studentData.data object parsed from HTTP response body
            // studentData.headers  HTTP presonse headers

            StudentCosPas = Object.keys(studentData.data).map(function(key) {
                let user = studentData.data[key];
                user.id = key;
                return user;
            });

        }).catch(err => {
            console.log(err);
        });


    }

    componentDidMount(){
    	this.select(0);

        axios.get('/students/graduate/print').then(function(resp){
            this.setState({
                print_courseCategoryArray: resp.data
            });
        }.bind(this)).catch(err => {
            console.log(err);
        });

    }

  	select(index){
            if(index===0){
                ReactDOM.render(
                    <FadeIn>
                        <HomeItem />
                    </FadeIn>,
                    document.getElementById('page'));
            }
            else if(index===1){
                ReactDOM.render(
					<div>
						<FadeIn>
							<MapItem
								studentPasdata={StudentCosPas}
								data={MapCourseData}
								studentId={this.state.studentIdcard.prog}
								studentsGrad={this.state.studentIdcard.grad}/>
						</FadeIn>
					</div>,
                    document.getElementById('page'));
            }
            else if(index===2){
                ReactDOM.render(
                    <font>
                        <FadeIn>
                            <GraduationItem
                                studentId={this.state.studentIdcard.prog}
                                items={Graduationitems}
                                result={Graduationitems[10]}
                                revise={revise}
                                reviseresult={revise[10]}
                                courseCategoryArray={this.state.print_courseCategoryArray}/>
                        </FadeIn>
                    </font>,
                    document.getElementById('page'));
            }
            else if(index===3){
                ReactDOM.render(
					<a>
						<FadeIn>
							<MapItem />
						</FadeIn>
					</a>,
                    document.getElementById('page'));
            }

  		this.setState({selectedIndex: index});
  	}
//
// <BottomNavigationItem
// label="課程地圖"
// icon={mapIcon}
// style={this.state.styleButton}
// onTouchTap={() => this.select(1)}
// />
// <BottomNavigationItem
//     label="抵免"
//     icon={checkIcon}
//     style={this.state.styleButton}
// onTouchTap={() => this.select(3)}
// />
	render() {
	    return (
		    <div id="Head">
				<div id="ontopDiv">
					<div className="Head-header" >
							<div id="rectangle1"> </div>
							<div id="h1">交大資工線上助理</div>
							<div id="h2">NCTU Curriculum Assistant</div>
						<div id="adjust">
						<MuiThemeProvider zDepth={1}>
							<BottomNavigation selectedIndex={this.state.selectedIndex}>
							  <BottomNavigationItem
								label="首頁"
								icon={homeIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(0)}
							  />
							  <BottomNavigationItem
								label="畢業預審"
								icon={graduationIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(2)}
							  />
							</BottomNavigation>
						</MuiThemeProvider>
						</div>
						<div className="idcard">
							<div id="idcard-data">
								<div id="idcard-photo">
									<img src={defalt} width="44px" alt=""/>
								</div>
								<div id="idcard-top">
                                    {this.state.studentIdcard.name}
								</div>
								<div id="idcard-buttom">
                                    {this.state.studentIdcard.prog}{this.state.studentIdcard.grad}
								</div>
							</div>
						</div>
						<div id="logout-button">
							<MuiThemeProvider>
								<RaisedButton style={{
                                    width: '13%',
                                    fontFamily: 'Noto Sans CJK TC',
                                }}  backgroundColor = "#DDDDDD" label="Logout" href="/logout"/>
							</MuiThemeProvider>
						</div>
					</div>
				</div>
				<div id="topRec">
				</div>

				<div id="page" > </div>
				<footer>Copyright @2017 NCTUCS 交通大學資訊工程學系</footer>
	  		</div>
	    );
	  }
}

export default Head;
