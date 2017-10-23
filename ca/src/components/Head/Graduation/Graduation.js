import React from 'react'
import './Graduation.css'
import LinearProgressExampleDeterminate from './OverviewProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';
import GraduationForm from './GraduationForm'

let items=[
    { title: '必修課程',
        credit: '80',
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
    { title: '英文',
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
        complete: 'True' },

];
class Grad extends React.Component {
    componentWillMount(){
        console.log(items);
        axios.get('/students/graduate').then(studentData => {
            items = studentData.data;
        }).catch(err => {
            console.log(err);
        });
        //items = [{"title":"共同必修","credit":21,"require":"58","course":[{"cn":"作業系統概論","en":"Introduction to Operating Systems","complete":"True"},{"cn":"基礎程式設計","en":"Basic Programming","complete":"True"},{"cn":"微積分(一)","en":"Calculus (I)","complete":"True"},{"cn":"微積分(二)","en":"Calculus (II)","complete":"True"},{"cn":"微處理機系統實驗","en":"Microprocessor System Lab.","complete":"True"},{"cn":"數位電路實驗","en":"Digital Circuit Lab.","complete":"True"},{"cn":"數位電路設計","en":"Digital Circuit Design","complete":"True"},{"cn":"機率","en":"Probability","complete":"True"},{"cn":"正規語言概論","en":"Introduction to Formal Language","complete":"True"},{"cn":"演算法概論","en":"Introduction to Algorithms","complete":"True"},{"cn":"物件導向程式設計","en":"Object-Oriented Programming","complete":"True"},{"cn":"物化生三合一(一)","en":"","complete":"True"},{"cn":"物化生三合一(二)","en":"","complete":"True"},{"cn":"線性代數","en":"Linear Algebra","complete":"True"},{"cn":"計算機概論與程式設計","en":"Introduction to Computers and Programming","complete":"True"},{"cn":"計算機組織","en":"Computer Organization","complete":"True"},{"cn":"計算機網路概論","en":"Intro. to Computer Networks","complete":"True"},{"cn":"資料結構","en":"Data Structures","complete":"True"},{"cn":"資訊工程專題(一)","en":"Computer Science and Engineering Projects (I)","complete":"True"},{"cn":"資訊工程專題(二)","en":"Computer Science and Engineering Projects (II)","complete":"True"},{"cn":"離散數學","en":"Discrete Mathematics","complete":"True"}]},{"title":"專業選修","credit":3,"require":"12","course":[{"cn":"科技創業與營運(英文授課)","en":"","complete":"True"},{"cn":"密碼學概論","en":"","complete":"True"},{"cn":"作業系統(英文授課)","en":"","complete":"True"}]},{"title":"核心","credit":3,"require":9,"course":[{"cn":"影像處理概論","en":"Introduction to Image Processing","complete":"False"},{"cn":"網路程式設計概論","en":"Intro. to Network Programming","complete":"True"},{"cn":"網路通訊原理","en":"Principles of communications networks","complete":"True"},{"cn":"計算機圖學概論","en":"Introduction to Computer Graphics","complete":"True"}]},{"title":"副核心與他組合心","credit":2,"require":"12","course":[{"cn":"人工智慧概論","en":"Intro. to Artificial Intelligence","complete":"True"},{"cn":"編譯器設計概論","en":"Intro. to Compiler Design","complete":"False"},{"cn":"資料庫系統概論","en":"Introduction to Database Systems","complete":"True"},{"cn":"軟硬體協同設計概論與實作","en":"Introduction to Hardware-Software Codesign and Imp","complete":"False"},{"cn":"電路與電子學(一)","en":"Electrical Circuits and Electronics (I)","complete":"False"},{"cn":"電路與電子學(二)","en":"Electrical Circuits and Electronics (II)","complete":"False"}]}];
    }
    render(){
        return (
            <div>
                <div id="font_adjust">
                    <div id="Grad-title-adjust">
                        <div className="Grad-title-text">
                            <div id="lessons-title">畢業預審</div><div id="lessons-little-title-grad">-資工系{this.props.studentId}</div>
                        </div>
                        <div id="schedule-bar">
                            <div className="circle-progress">
                                <div id="circle-in">畢業96/128</div>
                                <MuiThemeProvider>
                                    <CircularProgress
                                        mode="determinate"
                                        value={80}
                                        size={80}
                                        thickness={5}
                                    />
                                </MuiThemeProvider>
                            </div>
                            <div id="overview-course">
                                體&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;育&nbsp;&nbsp;<font size={5} color='#338d68'>5</font>/6門<br/><LinearProgressExampleDeterminate/>
                                服務學習&nbsp;&nbsp;<font size={5} color='#338d68'>2</font>/2門<br/><LinearProgressExampleDeterminate/>
                            </div>
                            <div id="overview-course">
                                    專業選修&nbsp;&nbsp;<font size={5} color='#338d68'>12</font>/12<br/><LinearProgressExampleDeterminate/>
                                    其他選修&nbsp;&nbsp;<font size={5} color='#338d68'>11</font>/12<br/><LinearProgressExampleDeterminate/>
                            </div>
                        </div>
                    </div>

                    <div className="Grad-Row">
                        <GraduationForm items={items}/>
                    </div>
                    <div id="graduate-footer"> </div>
                </div>
            </div>
        )
    }
}
//
// <div id="little-form">
//     <IndividualCourse pass={items[0].credit} total={items[0].total} name={items[0].title}/>
//     <CourseList items={items[0].pass} />
// </div>
//
// <div id="little-form">
//     <div id="little-title">
//         <IndividualProgress/>
//         <div id="little-title-title">
//             <div id="little-title-number"><font size={6} color='#338d68'>9</font>/9</div>
//             <div id="little-title-text">資工組核心必修(必修)</div>
//         </div>
//
//     </div>
//     <div id="course-button">
//         <Course cosCame="軟體工程概論" completed={true} selection={true} goard={3}/>
//         <Course cosCame="密碼學概論" completed={true} selection={true} goard={3}/>
//         <Course cosCame="微分方程" completed={false} selection={true} goard={3}/>
//         <Course cosCame="電腦安全概論" completed={false} selection={true} goard={3}/>
//         <Course cosCame="嵌入式系統設計概論與實作" completed={false} selection={true} goard={3}/>
//         <Course cosCame="電子與電路學(一)" completed={true} selection={true} goard={3}/>
//         <Course cosCame="電子與電路學(二)" completed={true} selection={true} goard={3}/>
//         <Course cosCame="訊號與系統" completed={false} selection={true} goard={3}/>
//         <Course cosCame="軟硬協同設計概論與實作" completed={false} selection={true} goard={3}/>
//         <Course cosCame="軟體工程概論" completed={true} selection={true} goard={3}/>
//         <Course cosCame="網路程式設計概論" completed={false} selection={true} goard={3}/>
//         <Course cosCame="網路通訊原理" completed={false} selection={true} goard={3}/>
//         <Course cosCame="計算機圖學概論" completed={false} selection={true} goard={3}/>
//         <Course cosCame="影像處理概論" completed={false} selection goard={3}/>
//
//     </div>
// </div>
export default Grad