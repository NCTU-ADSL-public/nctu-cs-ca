import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BottomNavigation} from 'material-ui/BottomNavigation';
import RaisedButton from 'material-ui/RaisedButton';
import HomeIcon from 'material-ui/svg-icons/content/flag';
import MapIcon from 'material-ui/svg-icons/maps/map';
import GraduationIcon from 'material-ui/svg-icons/social/school';
import CheckIcon from 'material-ui/svg-icons/av/featured-play-list';
import EqualizerIcon from 'material-ui/svg-icons/av/equalizer';
import GroupIcon from 'material-ui/svg-icons/social/group';
import FreeBreakfastIcon from 'material-ui/svg-icons/places/free-breakfast';

import NavItem from './NavItem'

import './Navbar.css'
import defalt from '../Resources/defalt.jpg';

const checkIcon = <CheckIcon/>;

class Navbar extends React.Component {

    render() {
        const {onTouchTaps} = this.props
        const navItems = {
            'student': [
                <NavItem key={0} label='首頁' icon={<HomeIcon/>} onTouchTap={onTouchTaps[0]}/>,
                <NavItem key={1} label='畢業預審' icon={<GraduationIcon/>} onTouchTap={onTouchTaps[1]}/>,
                <NavItem key={2} label='課程地圖' icon={<MapIcon/>} onTouchTap={onTouchTaps[2]}/>,
            ],
            'assistant': [
                <NavItem key={0} label='首頁' icon={<HomeIcon/>} onTouchTap={onTouchTaps[0]}/>,
                <NavItem key={1} label='畢業預審' icon={<GraduationIcon/>} onTouchTap={onTouchTaps[1]}/>,
            ],
            'teacher': [
                <NavItem key={0} label='首頁' icon={<HomeIcon/>} onTouchTap={onTouchTaps[0]}/>,
                <NavItem key={1} label='教授課程' icon={<EqualizerIcon/>} onTouchTap={onTouchTaps[1]}/>,
                <NavItem key={2} label='專題' icon={<GroupIcon/>} onTouchTap={onTouchTaps[2]}/>,
                <NavItem key={3} label='導生' icon={<FreeBreakfastIcon/>} onTouchTap={onTouchTaps[3]}/>,
            ]
        }
        return (
            <div id="ontopDiv">
                <div className="Head-header" >
                    <div id="rectangle1"> </div>
                    <div className="h1">交大資工線上助理</div>
                    <div className="h2">NCTU Curriculum Assistant</div>
                    <div className="adjust">
                        <MuiThemeProvider zDepth={1}>
                            <BottomNavigation selectedIndex={this.props.selectedIndex}>
                                {navItems[this.props.type]}
                            </BottomNavigation>
                        </MuiThemeProvider>
                    </div>
                    <div className="idcard">
                        <div id="idcard-data">
                            <div id="idcard-photo">
                                <img src={defalt} width="44px" alt=""/>
                            </div>
                            <div id="idcard-top">
                                {this.props.name}
                            </div>
                            <div id="idcard-buttom">
                                {this.props.subname}
                            </div>
                        </div>
                    </div>
                    <div id="logout-button">
                        <MuiThemeProvider>
                            <RaisedButton style={{
                                width: '13%',
                                fontFamily: 'Noto Sans CJK TC',
                            }}  backgroundColor = "#DDDDDD" label="Logout" onClick={()=>{
                                let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                                if(keys) {
                                    for(let i = keys.length; i--;)
                                        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
                                }
                            }} href="/logout"/>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar