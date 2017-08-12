import React, { Component } from 'react';
import './Head.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import index from './index+.png';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import Home from 'material-ui/svg-icons/content/flag';
import Map from 'material-ui/svg-icons/maps/map';
import Graduation from 'material-ui/svg-icons/social/school';
import Check from 'material-ui/svg-icons/av/featured-play-list';

import FadeIn from 'react-fade-in';


const homeIcon = <Home />;
const mapIcon = <Map />;
const graduationIcon = <Graduation />;
const checkIcon = <Check />;



class Head extends Component {
  	state = {
    	selectedIndex: 0,
    	style: {
  			fontFamily: 'Noto Sans CJK TC',
  			background: '#FCFCFC',
    	},
    	displayindex0 : 'none',
    	displayindex1 : 'none',
    	displayindex2 : 'none',
    	displayindex3 : 'none',
    	displayindex4 : 'none',

  	};

  	

  	select(index){  	
  		// if(index==1){
  		// alert('11');
  		// }
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
							style={this.state.style}
							onTouchTap={() => this.select(0)}
						  />
						  <BottomNavigationItem
							label="課程地圖"
							icon={mapIcon}
							style={this.state.style}
							onTouchTap={() => this.select(1)}
						  />
						  <BottomNavigationItem
							label="畢業預審"
							icon={graduationIcon}
							style={this.state.style}
							onTouchTap={() => this.select(2)}
						  />
						  <BottomNavigationItem
							label="抵免"
							icon={checkIcon}
							style={this.state.style}
							onTouchTap={() => this.select(3)}
						  />
						</BottomNavigation>
					</MuiThemeProvider>
					</div>
				</div>
            <FadeIn>
            	<div >
	    			<img src={index} width="100%" display={this.state.displayindex0}/>
            	</div>
            </FadeIn>

	  		</div>
	    );
	  }
}

export default Head;
