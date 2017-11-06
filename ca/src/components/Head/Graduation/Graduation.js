import React from 'react'

import './Graduation.css'
import GraduationForm from './GraduationForm'
import LinearProgressExampleDeterminate from './OverviewProgress'
import TopButton from './TopButton';
import CircularProgress from './CircularProgress'
import PrintForm from './GradTable/PrintForm'

import scrollToComponent from 'react-scroll-to-component';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let totalitems;
let items;
class Grad extends React.Component {
    state={
        scrollQuery:'',
    };
    componentWillMount(){
        console.log(items);
        totalitems=this.props.result;
        items=this.props.items;
    }
    handleClick(e){
        this.setState({
            scrollQuery:e,
        });
    }
    scrollTotop(){
        scrollToComponent(this.refs.my);
    }
    printGradTable() {
        window.print();

        return true;
    }
    render(){
        return (
            <div>
                <div id="font_adjust">
                    <div className="fixed" onClick={()=>this.scrollTotop()}>
                        <TopButton/>
                    </div>
                    <div className="Grad-title-adjust" ref="my">
                        <div className="Grad-title-text">
                            <div id="lessons-title">畢業預審</div><div id="lessons-little-title-grad">-資工系{this.props.studentId}</div>
                        </div>
                        <div id="print-button" style={{
                            height: '40px',
                            width: '65px',
                            padding: '5px 0 0 0',
                            float: 'right',
                            position: 'absolute',
                            right: '50px'
                        }}>
                            <MuiThemeProvider>
                                <RaisedButton style={{
                                    width: '13%',
                                    fontFamily: 'Noto Sans CJK TC',
                                }}  backgroundColor = "#DDDDDD" label="列印" onClick={() => this.printGradTable()}/>
                            </MuiThemeProvider>
                        </div>
                        <div className="schedule-bar">
                            <div className="circle-progress">
                                <div className="circle-in">畢業{totalitems.total}/{totalitems.total_require}</div>
                                <CircularProgress grad={totalitems.total/totalitems.total_require*100}/>
                            </div>
                                <div className="overview">
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('必修課程')}><span>必修課程&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.compulsory}</font>/{totalitems.compulse_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.compulsory/totalitems.compulse_require*100}/></span></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('核心課程')}>核心課程&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.core}</font>/{totalitems.core_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.core/totalitems.core_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('副核心課程')}>副核心課程&nbsp;<font size={5} color='#338d68'>{totalitems.vice}</font>/{totalitems.vice_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.vice/totalitems.vice_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('專業選修')}>專業選修&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.pro}</font>/{totalitems.pro}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.pro/totalitems.pro_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('英文測驗')}>英文測驗&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.english}</font>/{totalitems.english_require}&nbsp;次<br/><LinearProgressExampleDeterminate grad={totalitems.english/totalitems.english_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('其他選修')}>其他選修&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.other}</font>/{totalitems.other_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.other/totalitems.other_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('通識')}>通&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;識&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.general}</font>/{totalitems.general_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.general/totalitems.general_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('體育')}>體&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;育&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.pe}</font>/{totalitems.pe_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={totalitems.pe/totalitems.pe_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('外文')}>外&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.language}</font>/{totalitems.language_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.language/totalitems.language_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('藝文賞析')}>藝文賞析&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.art}</font>/{totalitems.art_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={totalitems.art/totalitems.art_require*100}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Grad-Row">
                        <GraduationForm items={items} scroll={this.state.scrollQuery}/>
                    </div>
                    <div id="graduate-footer"> </div>
                </div>
                <div id="printArea">
                    <PrintForm program={this.props.studentId}/>
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