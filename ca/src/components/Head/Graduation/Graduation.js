import React from 'react'
import './Graduation.css'
import LinearProgressExampleDeterminate from './OverviewProgress'
import IndividualProgress from './IndividualProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Course from './Course';
import IndividualCourse from './IndividualCourse'
import CourseList from './CourseList'

const items=[
    {cosCame:"物化生三合一(一)", completed:false},
    {cosCame:"物化生三合一(二)", completed:true},
    {cosCame:"微積分(一)", completed:true},
    {cosCame:"微積分(二)", completed:true},
    {cosCame:"線性代數(一)", completed:true},
    {cosCame:"線性代數(二)", completed:true},
    {cosCame:"物件導向程式設計", completed:true},
    {cosCame:"離散數學", completed:true},
    {cosCame:"資料結構", completed:true},
    {cosCame:"資訊工程專題(一)", completed:true},
    {cosCame:"資訊工程專題(二)", completed:true},
    {cosCame:"數位電路設計", completed:false},
    {cosCame:"數位電路實驗", completed:true},
    {cosCame:"機率", completed:true},
    {cosCame:"演算法概論", completed:false},
    {cosCame:"作業系統概論", completed:true},
    {cosCame:"正規語言概論", completed:true},
    {cosCame:"計算機組織", completed:false},
    {cosCame:"微處理機系統實驗", completed:true},
    {cosCame:"導師時間", completed:true},
    {cosCame:"基礎程式設計", completed:false}]
class Grad extends React.Component {
    state={

    };
    componentDidMount(){
        this.setState({
            percent:60
        })
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
                    <div id="little-form">
                        <IndividualCourse pass={58} total={96} name="資工系共同必修"/>
                        <CourseList items={items} />
                    </div>

                    <div id="little-form">
                        <div id="little-title">
                            <IndividualProgress/>
                            <div id="little-title-title">
                                <div id="little-title-number"><font size={6} color='#338d68'>9</font>/9</div>
                                <div id="little-title-text">資工組核心必修(必修)</div>
                            </div>

                        </div>
                        <div id="course-button">
                                <Course cosCame="軟體工程概論" completed={true} selection={true} goard={3}/>
                                <Course cosCame="密碼學概論" completed={true} selection={true} goard={3}/>
                                <Course cosCame="微分方程" completed={false} selection={true} goard={3}/>
                                <Course cosCame="電腦安全概論" completed={false} selection={true} goard={3}/>
                                <Course cosCame="嵌入式系統設計概論與實作" completed={false} selection={true} goard={3}/>
                                <Course cosCame="電子與電路學(一)" completed={true} selection={true} goard={3}/>
                                <Course cosCame="電子與電路學(二)" completed={true} selection={true} goard={3}/>
                                <Course cosCame="訊號與系統" completed={false} selection={true} goard={3}/>
                                <Course cosCame="軟硬協同設計概論與實作" completed={false} selection={true} goard={3}/>
                                <Course cosCame="軟體工程概論" completed={true} selection={true} goard={3}/>
                                <Course cosCame="網路程式設計概論" completed={false} selection={true} goard={3}/>
                                <Course cosCame="網路通訊原理" completed={false} selection={true} goard={3}/>
                                <Course cosCame="計算機圖學概論" completed={false} selection={true} goard={3}/>
                                <Course cosCame="影像處理概論" completed={false} selection={true} goard={3}/>

                        </div>
                    </div>

                    <div id="little-form">
                        <IndividualCourse pass={9} total={15} name="資工組副核心(至少3學分)+其他組核心=(至少9學分)" fontflag/>
                        <CourseList items={items} />
                    </div>

                    <div id="little-form">
                        <IndividualCourse pass={6} total={20} name="通識"/>
                        <CourseList items={items} />
                    </div>

                    <div id="little-form">
                        <IndividualCourse pass={8} total={8} name="外文"/>
                        <CourseList items={items} />
                    </div>

                </div>
                </div>








            </div>
        )
    }
}

export default Grad