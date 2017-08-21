import React from 'react';
import './Map.css';
import RaiseButtom from './RaiseButtom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Map extends React.Component{
    constructor(props) {
        super(props);
        SavingCourseData();
    }

    SavingCourseData(){
        var _this = this;
        return axios.get('/students/info').then(studentMapData => {
            studentMapData.status // HTTP response code (e.g., 200, 401)
            studentMapData.data // object parsed from HTTP response body
            studentMapData.headers // HTTP presonse headers
            console.log(studentMapData);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div id="font_adjust">
                <div className="Map-title-text">
                    <div id="lessons-title">課程地圖</div><div id="lessons-little-title"> - 資工組</div>
                </div>

                <div className="Map-Row">
                    <div className="grades">
                        <div className="grade" id="grade-1">
                            <div className="grade-num"><h3>大一(104)</h3></div>
                            <div className="session">
                                <div className="up-session">
                                    <div className="course-group course-group-1">
                                        <div className="course"><div className="course-btn">微積分(一)</div></div>
                                        <div className="course"><div className="course-btn">線性代數</div></div>
                                    </div>
                                    <div className="course-group course-group-2">
                                        <div className="course"><div className="course-btn">計算機概論與程式設計</div></div>
                                    </div>
                                    <div className="course-group course-group-3">
                                        <div className="course"><div className="course-btn">物理(一)</div></div>
                                        <div className="course"><div className="course-btn">化學(一)</div></div>
                                        <div className="course"><div className="course-btn">普通生物(一)</div></div>
                                    </div>
                                </div>
                                <div className="down-session">
                                    <div className="course-group course-group-1">
                                        <div className="course"><div className="course-btn">微積分(二)</div></div>
                                        <div className="course"><div className="course-btn">離散數學</div></div>
                                    </div>
                                    <div className="course-group course-group-2">
                                        <div className="course"><div className="course-btn">物件導向程式設計</div></div>
                                        <div className="course"><div className="course-btn">數位電路設計</div></div>
                                    </div>
                                    <div className="course-group course-group-3">
                                        <div className="course"><div className="course-btn">物理(二)</div></div>
                                        <div className="course"><div className="course-btn">化學(二)</div></div>
                                        <div className="course"><div className="course-btn">普通生物(二)</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="grade" id="grade-2">
                            <div className="grade-num"><h3>大二(105)</h3></div>
                            <div className="session">
                                <div className="up-session">
                                    <div className="course-group course-group-1">
                                        <div className="course"><div className="course-btn">機率</div></div>
                                    </div>
                                    <div className="course-group course-group-2">
                                        <div className="course"><div className="course-btn">資料結構</div></div>
                                        <div className="course"><div className="course-btn">數位電路實驗</div></div>
                                        <div className="course"><div className="course-btn">計算機網路概論</div></div>
                                    </div>
                                    <div className="course-group course-group-3">
                                    </div>

                                </div>
                                <div className="down-session">
                                    <div className="course-group course-group-1">
                                    </div>
                                    <div className="course-group course-group-2">
                                        <div className="course"><div className="course-btn">正規語言概論</div></div>
                                        <div className="course"><div className="course-btn">演算法概論</div></div>
                                        <div className="course"><div className="course-btn">基礎程式設計</div></div>
                                        <div className="course"><div className="course-btn">計算機組織</div></div>
                                    </div>
                                    <div className="course-group course-group-3">
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="grade grade-cur" id="grade-3">
                            <div className="grade-num"><h3>大三(106)</h3></div>
                            <div className="session">
                                <div className="up-session session-cur">
                                    <div className="course-group course-group-1">
                                    </div>
                                    <div className="course-group course-group-2">
                                        <div className="course"><div className="course-btn">編譯器設計概論</div></div>
                                        <div className="course"><div className="course-btn">軟體工程概論</div></div>
                                        <div className="course"><div className="course-btn">作業系統概論</div></div>
                                        <div className="course"><div className="course-btn">微處理機系統實驗</div></div>
                                    </div>
                                    <div className="course-group course-group-3">
                                    </div>
                                </div>
                                <div className="down-session">
                                    <div className="course-group course-group-1">
                                    </div>
                                    <div className="course-group course-group-2">
                                        <div className="course"><div className="course-btn">資訊工程專題(一)</div></div>
                                    </div>
                                    <div className="course-group course-group-3">
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="grade" id="grade-4">
                            <div className="grade-num"><h3>大四(107)</h3></div>
                            <div className="session">
                                <div className="up-session">
                                    <div className="course-group course-group-1">
                                    </div>
                                    <div className="course-group course-group-2">
                                        <div className="course"><div className="course-btn">資訊工程專題(二)</div></div>
                                    </div>
                                    <div className="course-group course-group-3">
                                    </div>
                                </div>
                                <div className="down-session">
                                    <div className="course-group course-group-1">
                                    </div>
                                    <div className="course-group course-group-2">
                                    </div>
                                    <div className="course-group course-group-3">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mods">
                        <MuiThemeProvider>
                            <RaiseButtom ref="raiseBtn"/>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        );
    }

}


export default Map;