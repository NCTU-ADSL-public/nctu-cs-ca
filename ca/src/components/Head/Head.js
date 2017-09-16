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

class Head extends Component {

    constructor(props) {
        super(props);
        this.getdata();
    }

    state = {
       selectedIndex: 0,
       styleButton: {
       fontFamily: 'Noto Sans CJK TC',
       background: '#EEEEEE',
       },
       styleindex: {
            display : 'inline',
       },
		studentIdcard:{
       		name:'流川楓',
			prog:'資工',
			grad:'大三',
		},
    };

    getdata(){
    	var _this = this;
        axios.get('/students/profile').then(studentData => {
            console.log(studentData.data.sname);
            _this.setState({
                studentIdcard: {
                    name: studentData.data.sname,
                    prog: studentData.data.program ,
                    grad: "大" + studentData.data.grade,
                }
            })
        }).catch(err => {
            console.log(err);
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

  	select(index){
  		this.setState({styleindex:
			{display : 'none',
			}
        });
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
						<MapItem studentPasdata={StudentCosPas} data={MapCourseData} studentId={this.state.studentIdcard.prog}/>
					</FadeIn>
				</div>,
				document.getElementById('page'));
        }
        else if(index===2){
            ReactDOM.render(
					<FadeIn>
						<GraduationItem />
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

				<div id="page"></div>
				<div style={this.state.styleindex}>
					<FadeIn>
						<HomeItem/>
					</FadeIn>
				</div>
				<footer>Copyright @2017 NCTUCS 交通大學資訊工程學系</footer>
	  		</div>
	    );
	  }
}

export default Head;
