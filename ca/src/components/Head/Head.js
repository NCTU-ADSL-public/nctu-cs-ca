import React, { Component } from 'react';
import './Head.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import ReactDOM from 'react-dom';

import Home from 'material-ui/svg-icons/content/flag';
import Map from 'material-ui/svg-icons/maps/map';
import Graduation from 'material-ui/svg-icons/social/school';
import Check from 'material-ui/svg-icons/av/featured-play-list';

import HomeItem from './Home/Home.js';
import MapItem from './Map/Map.js';
import GraduationItem from './Graduation/Graduation.js';
import CreditItem from './Credit/Credit.js';

import FadeIn from 'react-fade-in';
import gimshi from './gimshi.jpg';


const homeIcon = <Home />;
const mapIcon = <Map />;
const graduationIcon = <Graduation />;
const checkIcon = <Check />;

var data = {
    'name': "陳景熙",
	'group': "資電大三",
};

var users = {
    'Active User': {
        'config': {
            'status': 'active',
        }
    },
    'Paused User': {
        'config': {
            'status': 'paused',
        }
    }
};

var usersWithName = Object.keys(users).map(function(key) {
    var user = users[key];
    user.name = key;
    return user;
});

class Head extends Component {

        state = {
            selectedIndex: 0,
            styleButton: {
                fontFamily: 'Noto Sans CJK TC',
                background: '#EEEEEE',
            },
            styleindex: {
                display : 'inline',
            },


        };

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
						<MapItem
							data = {data}/>
					</FadeIn>
				</div>,
				document.getElementById('page'));
        }
        else if(index===2){
            ReactDOM.render(
            	<p>
					<FadeIn>
						<GraduationItem />
					</FadeIn>
				</p>,
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
						<div id="rectangle1"></div>
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
						<div>

						</div>
					</div>
					<div id="idcard">
						<div id="idcard-data">
							<div id="idcard-top">
                                {data.name}
							</div>
							<div id="idcard-button">
                                {data.group}
							</div>
						</div>
						<div id="idcard-photo">
							<img src={gimshi} width="3%" />
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
