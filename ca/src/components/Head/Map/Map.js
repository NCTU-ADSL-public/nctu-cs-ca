import React from 'react';
import './Map.css';
import Radiobuttom from './Radiobuttom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Map extends React.Component{
    constructor(props) {
        super(props);
        console.log(props.data.name);
    }
    render() {
        return (
            <div >
                <div className="Map-title-text">
                    <div id="lessons-title">課程地圖 - 資工組</div>
                </div>

                <div className="Row">
                    <div className="grades">
                        <div className="grade" id="grade-1">
                            <div className="grade-num"><h3>大一(104)</h3></div>
                            <div className="course"><div className="course-btn btn-default">微積分 (一)</div></div>
                            <div className="course"><div className="course-btn btn-green">物理</div></div>
                            <div className="course"><div className="course-btn btn-orange">化學</div></div>
                            <div className="course"><div className="course-btn btn-red">生物</div></div>
                            <div className="course"><div className="course-btn">計算機概論與程式設計</div></div>
                        </div>


                        <div className="grade" id="grade-2">
                            <div className="grade-num"><h3>大二(105)</h3></div>
                            <div className="course"><div className="course-btn">微積分 (一)</div></div>
                            <div className="course"><div className="course-btn">物理</div></div>
                            <div className="course"><div className="course-btn">化學</div></div>
                            <div className="course"><div className="course-btn">生物</div></div>
                            <div className="course"><div className="course-btn">計算機概論與程式設計</div></div>
                        </div>


                        <div className="grade" id="grade-3">
                            <div className="grade-num"><h3>大三(106)</h3></div>
                            <div className="course"><div className="course-btn">微積分 (一)</div></div>
                            <div className="course"><div className="course-btn">物理</div></div>
                            <div className="course"><div className="course-btn">化學</div></div>
                            <div className="course"><div className="course-btn">生物</div></div>
                            <div className="course"><div className="course-btn">計算機概論與程式設計</div></div>
                        </div>


                        <div className="grade" id="grade-4">
                            <div className="grade-num"><h3>大四(107)</h3></div>
                            <div className="course"><div className="course-btn">微積分 (一)</div></div>
                            <div className="course"><div className="course-btn">物理</div></div>
                            <div className="course"><div className="course-btn">化學</div></div>
                            <div className="course"><div className="course-btn">生物</div></div>
                            <div className="course"><div className="course-btn">計算機概論與程式設計</div></div>
                        </div>

                    </div>

                    <div className="mods">
                        <MuiThemeProvider>
                            <Radiobuttom/>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        );
    }

}


export default Map;