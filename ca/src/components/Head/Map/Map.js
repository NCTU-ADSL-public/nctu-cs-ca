import React from 'react';
import './Map.css';
import Radiobuttom from './Radiobuttom';
import RaiseButtom from './RaiseButtom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Map extends React.Component{
    constructor(props) {
        super(props);
        console.log(props.data);
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
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">微積分(一)</div></div>
                                        <div className="course"><div className="course-btn">線性代數</div></div>
                                    </div>
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">計算機概論與程式設計</div></div>
                                    </div>
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">物理(一)</div></div>
                                        <div className="course"><div className="course-btn">化學(一)</div></div>
                                        <div className="course"><div className="course-btn">普通生物(一)</div></div>
                                    </div>
                                </div>
                                <div className="down-session">
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">微積分(二)</div></div>
                                        <div className="course"><div className="course-btn">離散數學</div></div>
                                    </div>
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">物件導向程式設計</div></div>
                                        <div className="course"><div className="course-btn">數位電路設計</div></div>
                                    </div>
                                    <div className="course-group">
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
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">微分方程</div></div>
                                        <div className="course"><div className="course-btn">機率</div></div>
                                    </div>
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">資料結構</div></div>
                                        <div className="course"><div className="course-btn">數位電路實驗</div></div>
                                        <div className="course"><div className="course-btn">計算機網路概論</div></div>
                                    </div>
                                    <div className="course-group">
                                    </div>

                                </div>
                                <div className="down-session">
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">密碼學概論</div></div>
                                    </div>
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">正規語言概論</div></div>
                                        <div className="course"><div className="course-btn">演算法概論</div></div>
                                        <div className="course"><div className="course-btn">資料庫系統概論</div></div>
                                        <div className="course"><div className="course-btn">計算機組織</div></div>
                                    </div>
                                    <div className="course-group">
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="grade" id="grade-3">
                            <div className="grade-num"><h3>大三(106)</h3></div>
                            <div className="session">
                                <div className="up-session">
                                    <div className="course-group">
                                    </div>
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">編譯器設計概論</div></div>
                                        <div className="course"><div className="course-btn">軟體工程概論</div></div>
                                        <div className="course"><div className="course-btn">作業系統概論</div></div>
                                        <div className="course"><div className="course-btn">微處理機系統實驗</div></div>
                                    </div>
                                    <div className="course-group">
                                    </div>
                                </div>
                                <div className="down-session">
                                    <div className="course-group">
                                    </div>
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">人工智慧概論</div></div>
                                        <div className="course"><div className="course-btn">資訊工程專題(一)</div></div>
                                        <div className="course"><div className="course-btn">嵌入式系統設計概論與實作</div></div>
                                        <div className="course"><div className="course-btn">電腦安全概論</div></div>
                                    </div>
                                    <div className="course-group">
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="grade" id="grade-4">
                            <div className="grade-num"><h3>大四(107)</h3></div>
                            <div className="session">
                                <div className="up-session">
                                    <div className="course-group">
                                    </div>
                                    <div className="course-group">
                                        <div className="course"><div className="course-btn">資訊工程專題(二)</div></div>
                                    </div>
                                    <div className="course-group">
                                    </div>
                                </div>
                                <div className="down-session">
                                    <div className="course-group">
                                    </div>
                                    <div className="course-group">
                                    </div>
                                    <div className="course-group">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mods">
                        <MuiThemeProvider>
                            <RaiseButtom/>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        );
    }

}


export default Map;