import React from 'react'
import './Graduation.css'
import CircularProgressbar from 'react-circular-progressbar';
import LinearProgressExampleDeterminate from './OverviewProgress'
import IndividualProgress from './IndividualProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Course from './Course';


class Grad extends React.Component {
    state={
        percent:0,
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
                        <div id="little-title">
                            <IndividualProgress/>
                            <div id="little-title-title">
                                <div id="little-title-number"><font size={6} color='#338d68'>39</font>/58</div>
                                <div id="little-title-text">資工系共同必修</div>
                            </div>

                        </div>
                        <div id="course-button">
                            <div className="OneRow">
                                <Course cosCame="物化生三合一(一)" completed={false}/>
                                <Course cosCame="物化生三合一(二)" completed={true}/>
                                <Course cosCame="微積分(一)" completed={true}/>
                                <Course cosCame="微積分(二)" completed={true}/>
                            </div>
                            <div className="OneRow">
                                <Course cosCame="線性代數(一)" completed={true}/>
                                <Course cosCame="線性代數(二)" completed={true}/>
                                <Course cosCame="物件導向程式設計" completed={true}/>
                                <Course cosCame="離散數學" completed={true}/>
                                <Course cosCame="資料結構" completed={true}/>
                            </div>
                            <div className="OneRow">
                                <Course cosCame="資訊工程專題(一)" completed={true}/>
                                <Course cosCame="資訊工程專題(二)" completed={true}/>
                                <Course cosCame="數位電路設計" completed={false}/>
                                <Course cosCame="數位電路實驗" completed={true}/>
                                <Course cosCame="機率" completed={true}/>
                                <Course cosCame="演算法概論" completed={false}/>
                            </div>
                            <div className="OneRow">
                                <Course cosCame="作業系統概論" completed={true}/>
                                <Course cosCame="正規語言概論" completed={true}/>
                                <Course cosCame="計算機組織" completed={false}/>
                                <Course cosCame="微處理機系統實驗" completed={true}/>
                            </div>
                            <div className="OneRow">
                                <Course cosCame="導師時間" completed={true}/>
                                <Course cosCame="基礎程式設計" completed={false}/>
                            </div>
                        </div>
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
                            <div className="OneRow">
                                <Course cosCame="軟體工程概論" completed={true} selection={true}/>
                                <Course cosCame="密碼學概論" completed={true} selection={true}/>
                                <Course cosCame="微分方程" completed={false} selection={true}/>
                                <Course cosCame="電腦安全概論" completed={false} selection={true}/>
                                <Course cosCame="嵌入式系統設計概論與實作" completed={false} selection={true}/>
                            </div>
                            <div className="OneRow">
                                <Course cosCame="電子與電路學(一)" completed={true} selection={true}/>
                                <Course cosCame="電子與電路學(二)" completed={true} selection={true}/>
                                <Course cosCame="訊號與系統" completed={false} selection={true}/>
                                <Course cosCame="軟硬協同設計概論與實作" completed={false} selection={true}/>
                            </div>
                            <div className="OneRow">
                                <Course cosCame="軟體工程概論" completed={true} selection={true}/>
                                <Course cosCame="網路程式設計概論" completed={false} selection={true}/>
                                <Course cosCame="網路通訊原理" completed={false} selection={true}/>
                                <Course cosCame="計算機圖學概論" completed={false} selection={true}/>
                                <Course cosCame="影像處理概論" completed={false} selection={true}/>
                            </div>

                        </div>
                    </div>

                    <div id="little-form">
                        <div id="little-title">
                            <IndividualProgress/>
                            <div id="little-title-title">
                                <div id="little-title-number"><font size={6} color='#338d68'>9</font>/15</div>
                                <div id="little-title-text"><font size={5}>資工組副核心(至少3學分)+其他組核心=(至少9學分)</font></div>
                            </div>

                        </div>
                        <div id="course-button">
                            <div className="OneRow">
                                <Course cosCame="編譯器設計概論" completed={true}/>
                                <Course cosCame="資料庫系統概論" completed={true}/>
                                <Course cosCame="人工智慧概論" completed={true}/>
                            </div>
                        </div>
                    </div>

                    <div id="little-form">
                        <div id="little-title">
                            <IndividualProgress/>
                            <div id="little-title-title">
                                <div id="little-title-number"><font size={6} color='#338d68'>20</font>/20</div>
                                <div id="little-title-text">通識</div>
                            </div>

                        </div>
                        <div id="course-button">
                            <div className="OneRow">
                                <Course cosCame="當代" completed={true}/>
                                <Course cosCame="文化" completed={true}/>
                                <Course cosCame="歷史" completed={true}/>
                                <Course cosCame="公民" completed={true}/>
                                <Course cosCame="群己" completed={true}/>
                                <Course cosCame="自然" completed={true}/>
                            </div>
                        </div>
                    </div>

                    <div id="little-form">
                        <div id="little-title">
                            <IndividualProgress/>
                            <div id="little-title-title">
                                <div id="little-title-number"><font size={6} color='#338d68'>8</font>/8</div>
                                <div id="little-title-text">外文</div>
                            </div>

                        </div>
                        <div id="course-button">
                            <div className="OneRow">
                                <Course cosCame="基礎課程" completed={true}/>
                                <Course cosCame="基礎課程" completed={true}/>
                                <Course cosCame="進階課程" completed={true}/>
                                <Course cosCame="進階課程" completed={true}/>
                                <Course cosCame="英文檢定/英文進程課程" completed={false}/>
                            </div>

                        </div>
                    </div>

                </div>
                </div>








            </div>
        )
    }
}

export default Grad