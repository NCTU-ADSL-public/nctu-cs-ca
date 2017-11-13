import React, { Component } from 'react';
import './Head.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

import Home from 'material-ui/svg-icons/content/flag'
import Graduation from 'material-ui/svg-icons/social/school';
import defalt from './defalt.jpg';

import HomeItem from './Home/Home.js';
import GraduationItem from './Graduation/index';

import FadeIn from 'react-fade-in';

const homeIcon = <Home />;
const graduationIcon = <Graduation />;


class Head extends Component {

    constructor(props) {
        super(props);

        axios.get('/assistants/profile').then(studentData => {
            this.setState({
                idCard: {
                    name: studentData.data[0].aname,
                    prog: studentData.data[0].assistant_id,
                    grad: studentData.data[0].status,
                }
            })
        }).catch(err => {
            console.log(err);
        });

        this.state = {
            selectedIndex: 0,
            styleButton: {
                fontFamily: 'Noto Sans CJK TC',
                background: '#EEEEEE',
                lineHeight: '15px',
                margin: '5px 0 0',
                fontSize: '11px',
                width: '10px',
            },
            idCard:{
                name:'小翠',
                prog:'助理',
                grad:'',
            },
        };
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
							<GraduationItem idCard={this.state.idCard}/>
						</FadeIn>
					</div>,
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
									label="畢業預審"
									icon={graduationIcon}
									style={this.state.styleButton}
									onTouchTap={() => this.select(1)}
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
                                    {this.state.idCard.name}
								</div>
								<div id="idcard-buttom">
                                    {this.state.idCard.prog}{this.state.idCard.grad}
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
