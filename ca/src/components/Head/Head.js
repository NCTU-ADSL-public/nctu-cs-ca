import React, { Component } from 'react';
import './Head.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import Home from 'material-ui/svg-icons/content/flag';
import Map from 'material-ui/svg-icons/maps/map';
import Graduation from 'material-ui/svg-icons/social/school';
import Check from 'material-ui/svg-icons/av/featured-play-list';

import HomeItem from './Home.js';
import MapItem from './Map.js';
import GraduationItem from './Graduation.js';
import CreditItem from './Credit.js';

import FadeIn from 'react-fade-in';


const homeIcon = <Home />;
const mapIcon = <Map />;
const graduationIcon = <Graduation />;
const checkIcon = <Check />;



class Head extends Component {
  	state = {
    	selectedIndex: 0,
    	styleButton: {
  			fontFamily: 'Noto Sans CJK TC',
  			background: '#EEEEEE',
    	},
		styleindex0: {
            display : 'inline',
			margin :"60px 0 0 0",
		},
        styleindex1: {
            display : 'none',
            margin :"60px 0 0 0",
        },
        styleindex2: {
            display : 'none',
            top : '60px',
        },
        styleindex3: {
            display : 'none',
            top : '60px',
        },


  	};
  	

  	select(index){
  		if(index==0){
            this.setState({ styleindex0: {
                display : 'inline',
            	},
                styleindex1: {
                    display : 'none',
                },
                styleindex2: {
                    display : 'none',
                },
                styleindex3: {
                    display : 'none',
                },
			});
		}
        else if(index==1){
            this.setState({ styleindex0: {
                display : 'none',
            },
                styleindex1: {
                    display : 'inline',
                },
                styleindex2: {
                    display : 'none',
                },
                styleindex3: {
                    display : 'none',
                },
            });
        }
        else if(index==2){
            this.setState({ styleindex0: {
                display : 'none',
            },
                styleindex1: {
                    display : 'none',
                },
                styleindex2: {
                    display : 'inline',
                },
                styleindex3: {
                    display : 'none',
                },
            });
        }
        else if(index==3){
            this.setState({ styleindex0: {
                display : 'none',
            },
                styleindex1: {
                    display : 'none',
                },
                styleindex2: {
                    display : 'none',
                },
                styleindex3: {
                    display : 'inline',
                },
            });
        }

  		console.log(index);
  		this.setState({selectedIndex: index});
  	} 

  	getInitialState (){
      return {
      }

    }
    
	render() {
	    return (
		    <div id="Head">
				<div id="ontopDiv">
					<div className="Head-header" >
						<div id="rectangle1"></div>
						<div id="h1">交大資工線上助理</div>
						<div id="h2">NCTU Curriculum Assistant</div>
					</div>
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
				</div>
				<div id="topRec">

				</div>
            <FadeIn>
				<div style = {this.state.styleindex0}>
					<HomeItem />
				</div>

				<div style = {this.state.styleindex1}>
					<MapItem />
				</div>
				<div style = {this.state.styleindex2}>
					<GraduationItem />
				</div>
				<div style = {this.state.styleindex3}>
					<CreditItem />
				</div>
            </FadeIn>

	  		</div>
	    );
	  }
}

export default Head;
