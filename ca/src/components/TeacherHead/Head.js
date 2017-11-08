import React, { Component } from 'react';
import './Head.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

import Home from 'material-ui/svg-icons/content/flag'
import Equalizer from 'material-ui/svg-icons/av/equalizer';
import Grouper from 'material-ui/svg-icons/social/group';
import FreeBreakfast from 'material-ui/svg-icons/places/free-breakfast';
import defalt from './defalt.jpg';

import HomeItem from './Home/Home.js';
import CourseItem from './Course/index.js';
import GroupItem from './Group/Group.js';
import FamilyItem from './Family/Family.js';

import FadeIn from 'react-fade-in';

const homeIcon = <Home />;
const equalizerIcon = <Equalizer />;
const groupIcon = <Grouper />;
const freeIcon = <FreeBreakfast />;


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
       		name:'彭文志',
			prog:'教授',
			grad:'',
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


    }

    componentDidMount(){
    	this.select(1);
	}

  	select(index){
            if(index===0){
                ReactDOM.render(
					<font>
						<FadeIn>
							<HomeItem />
						</FadeIn>
					</font>,
                    document.getElementById('page'));
            }
            else if(index===1){
                ReactDOM.render(
					<div>
						<FadeIn>
							<CourseItem />
						</FadeIn>
					</div>,
                    document.getElementById('page'));
            }
            else if(index===2){
                ReactDOM.render(
					<FadeIn>
						<GroupItem />
					</FadeIn>,
                    document.getElementById('page'));
            }
            else if(index===3){
                ReactDOM.render(
					<a>
						<FadeIn>
							<FamilyItem />
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
								label="教授課程"
								icon={equalizerIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(1)}
							  />
							  <BottomNavigationItem
								label="專題"
								icon={groupIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(2)}
							  />
							  <BottomNavigationItem
								label="導生"
								icon={freeIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(3)}
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
