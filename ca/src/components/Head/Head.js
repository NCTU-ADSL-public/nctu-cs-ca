import React, { Component } from 'react';
import './Head.css';
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

const studentCos = [{"cos_cname":"化學(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"微積分甲(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"普通生物(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"物理(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"線性代數","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"計算機概論與程式設計","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"化學(二)","grade":"1","semester":"2","suggest":"化學(一)","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"微積分甲(一) ","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"線性代數","pre":null},{"cos_cname":"數位電路設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"普通生物(二)","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"物件導向程式設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"物理(二)","grade":"1","semester":"2","suggest":"物理(一)","pre":null},{"cos_cname":"離散數學","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"數位電路實驗","grade":"2","semester":"1","suggest":"數位電路設計","pre":null},{"cos_cname":"機率","grade":"2","semester":"1","suggest":"微積分甲(二)","pre":null},{"cos_cname":"計算機網路概論","grade":"2","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資料結構","grade":"2","semester":"1","suggest":"離散數學","pre":"物件導向程式設計"},{"cos_cname":"基礎程式設計(檢定考試)","grade":"2","semester":"2","suggest":"資料結構","pre":null},{"cos_cname":"正規語言概論","grade":"2","semester":"2","suggest":"離散數學","pre":null},{"cos_cname":"演算法概論","grade":"2","semester":"2","suggest":null,"pre":"資料結構"},{"cos_cname":"計算機組織","grade":"2","semester":"2","suggest":"數位電路實驗","pre":null},{"cos_cname":"作業系統概論","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"微處理機系統實驗","grade":"3","semester":"1","suggest":"計算機組織","pre":null},{"cos_cname":"編譯器設計概論","grade":"3","semester":"1","suggest":"正規語言概論","pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程研討","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資訊工程專題(一)","grade":"3","semester":"2","suggest":null,"pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程專題(二)","grade":"4","semester":"1","suggest":null,"pre":"資訊工程專題(一)"}]
const studentPas = [{"cos_cname":"普通生物(一)(英文授課)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"物理(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"線性代數","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"計算機概論與程式設計","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"化學(二)","grade":"1","semester":"2","suggest":"化學(一)","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"微積分甲(一) ","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"線性代數","pre":null},{"cos_cname":"數位電路設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"普通生物(二)","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"物件導向程式設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"物理(二)","grade":"1","semester":"2","suggest":"物理(一)","pre":null},{"cos_cname":"離散數學","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"數位電路實驗","grade":"2","semester":"1","suggest":"數位電路設計","pre":null},{"cos_cname":"機率","grade":"2","semester":"1","suggest":"微積分甲(二)","pre":null},{"cos_cname":"計算機網路概論","grade":"2","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資料結構","grade":"2","semester":"1","suggest":"離散數學","pre":"物件導向程式設計"},{"cos_cname":"基礎程式設計(檢定考試)","grade":"2","semester":"2","suggest":"資料結構","pre":null},{"cos_cname":"正規語言概論","grade":"2","semester":"2","suggest":"離散數學","pre":null},{"cos_cname":"演算法概論","grade":"2","semester":"2","suggest":null,"pre":"資料結構"},{"cos_cname":"計算機組織","grade":"2","semester":"2","suggest":"數位電路實驗","pre":null},{"cos_cname":"作業系統概論","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"微處理機系統實驗","grade":"3","semester":"1","suggest":"計算機組織","pre":null},{"cos_cname":"編譯器設計概論","grade":"3","semester":"1","suggest":"正規語言概論","pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程研討","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資訊工程專題(一)","grade":"3","semester":"2","suggest":null,"pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程專題(二)","grade":"4","semester":"1","suggest":null,"pre":"資訊工程專題(一)"}]


class Head extends Component {

    constructor(props) {
        super(props);
    }

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
    };


    componentWillMount(){
    	let _this = this;

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
	}

  	select(index){
            if(index===0){
                ReactDOM.render(
					<font>
						<FadeIn>
							<GraduationItem
								studentId={this.state.studentIdcard.prog}/>
						</FadeIn>
					</font>,
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
					<FadeIn>
						<HomeItem />
					</FadeIn>,
                    document.getElementById('page'));
            }
            else if(index===3){
                ReactDOM.render(
					<a>
						<FadeIn>
							<CreditItem />
						</FadeIn>
					</a>,
                    document.getElementById('page'));
            }

  		this.setState({selectedIndex: index});
  	}
    
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
								label="課程地圖"
								icon={mapIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(1)}
							  />
							  <BottomNavigationItem
								label="畢業預審"
								icon={graduationIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(2)}
							  />
							  <BottomNavigationItem
								label="抵免"
								icon={checkIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(3)}
							  />
							</BottomNavigation>
						</MuiThemeProvider>
						</div>
						<div className="idcard">
							<div id="idcard-data">
								<div id="idcard-photo">
									<img src={defalt} width="44px" />
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
