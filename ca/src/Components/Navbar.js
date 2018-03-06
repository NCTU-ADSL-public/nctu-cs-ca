import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import HomeIcon from 'material-ui/svg-icons/content/flag';
import MapIcon from 'material-ui/svg-icons/maps/map';
import GraduationIcon from 'material-ui/svg-icons/social/school';
import EqualizerIcon from 'material-ui/svg-icons/av/equalizer';
import GroupIcon from 'material-ui/svg-icons/social/group';
import FreeBreakfastIcon from 'material-ui/svg-icons/places/free-breakfast';

import {Navbar,Nav,NavItem} from 'react-bootstrap'

import './Navbar.css'
import defalt from '../Resources/defalt.jpg';
import NavButton from './NavButton'

const style = {
  BrandBox: {
    borderLeft: '6px solid #00AEAE',
    height: 28,
    display: 'inline-block',
    marginTop: 12,
    verticalAlign: 'top',
  },
  BrandName: {
    fontFamily: 'Noto Sans CJK TC',
    fontWeight:  400,
    fontSize: 20,
    marginLeft: 10,
  },
  BrandSubName: {
    fontFamily: 'Noto Sans CJK TC',
    fontWeight:  'lighter',
    fontSize: 14,
    marginLeft: 10,
  }
}

class _Navbar extends React.Component {
  wrapCallback = (callback, index) => {
    return () => {
      this.setState({
        ...this.state,
        selectedButtonIndex: index
      })
      callback()
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedButtonIndex: null,
      onClicks: props.onTouchTaps.map((callback,index) => this.wrapCallback(callback,index))
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const {onClicks,selectedButtonIndex} = this.state
    const navItems = {
      'student': [
        <NavButton key={0} label='首頁' icon={<HomeIcon/>} onClick={onClicks[0]} selected={selectedButtonIndex === 0}/>,
        <NavButton key={1} label='畢業預審' icon={<GraduationIcon/>} onClick={onClicks[1]} selected={selectedButtonIndex === 1}/>,
        <NavButton key={2} label='課程地圖' icon={<MapIcon/>} onClick={onClicks[2]} selected={selectedButtonIndex === 2}/>,
      ],
      'studentonlyformap': [
        <NavButton key={0} label='首頁' icon={<HomeIcon/>} onClick={onClicks[0]} selected={selectedButtonIndex === 0}/>,
        <NavButton key={1} label='課程地圖' icon={<MapIcon/>} onClick={onClicks[2]} selected={selectedButtonIndex === 2}/>,
      ],
      'assistant': [
        <NavButton key={0} label='首頁' icon={<HomeIcon/>} onClick={onClicks[0]} selected={selectedButtonIndex === 0}/>,
        <NavButton key={1} label='畢業預審' icon={<GraduationIcon/>} onClick={onClicks[1]} selected={selectedButtonIndex === 1}/>,
      ],
      'teacher': [
        <NavButton key={0} label='首頁' icon={<HomeIcon/>} onClick={onClicks[0]} selected={selectedButtonIndex === 0}/>,
        <NavButton key={1} label='教授課程' icon={<EqualizerIcon/>} onClick={onClicks[1]} selected={selectedButtonIndex === 1}/>,
        <NavButton key={2} label='專題' icon={<GroupIcon/>} onClick={onClicks[2]} selected={selectedButtonIndex === 2}/>,
        <NavButton key={3} label='導生' icon={<FreeBreakfastIcon/>} onClick={onClicks[3]} selected={selectedButtonIndex === 3}/>,
      ]
    }
    return (
      <Navbar staticTop fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">交大資工線上助理</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {navItems[this.props.type]}
          </Nav>

          <Nav pullRight>
            <NavItem>
              <div className="idcard">
                <img id="idcard-photo" src={defalt} alt=""/>
                <div style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  marginLeft: 9,
                }}>
                  <div id="idcard-top">
                    {this.props.name}
                  </div>
                  <div id="idcard-buttom">
                    {this.props.subname}
                  </div>
                </div>
              </div>
              <MuiThemeProvider>
                <RaisedButton backgroundColor = "#DDDDDD"
                              label="登出"
                              href="/logout"
                />
              </MuiThemeProvider>
            </NavItem>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default _Navbar