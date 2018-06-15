import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Navbar,Nav,NavItem,DropdownButton,MenuItem,ButtonToolbar } from 'react-bootstrap'

import './Navbar.css'
import defalt from '../Resources/defalt.jpg';
import NavButton from './NavButton'
import axios from 'axios'
import Notifications from 'material-ui/svg-icons/social/notifications'

const style = {
  BrandBox: {
    borderLeft: '6px solid #00AEAE',
    height: 28,
    display: 'inline-block',
    marginTop: 12,
    marginLeft: 7,
    verticalAlign: 'top',
  },
  BrandName: {
    fontFamily: 'Noto Sans CJK TC',
    fontWeight:  400,
    fontSize: 20,
    marginLeft: 9,
  },
  BrandSubName: {
    fontFamily: 'Noto Sans CJK TC',
    fontWeight:  'lighter',
    fontSize: 14,
    marginLeft: 10,
  },
  LogoutButtonLabel: {
    fontFamily: 'Noto Sans CJK TC',
    fontSize: 14,
    color:'#7B7B7B'
  }
}

class _Navbar extends React.Component {
  wrapCallback = (callback, index) => {
    return () => {
      this.setState({
        ...this.state,
        selectedButtonIndex: index,
        expanded: false
      })
      callback()
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedButtonIndex: null,
      onClicks: props.onTouchTaps.map((callback,index) => this.wrapCallback(callback,index)),
    }
  }

  componentWillMount () {
  }

  onToggleCollapse = (expanded) => {
    this.setState({
      ...this.state,
      expanded: expanded
    })
  }

  dropButton = () => {
    const {onClicks,selectedButtonIndex} = this.state
    let id = 10
    return(
      <DropdownButton
        bsStyle={{
          background: '#EEEEEE'}}
        bsSize="xsmall"
        noCaret

        title={
          <div className="idcard" /*onClick={onClicks[4]}*/>
            {/*<MuiThemeProvider>*/}
              {/*<Notifications color = {'#c40000'} className='red-spot animated swing' style={{animationDuration:'2s', animationIterationCount:10000,}}/>*/}
            {/*</MuiThemeProvider>*/}
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
        }
      >
        <MenuItem eventKey="1" onClick={onClicks[4]}>郵件</MenuItem>
        <MenuItem divider />
        {this.props.type === 'teacher'
          ? <MenuItem eventKey="4" onClick={onClicks[5]}>個人頁面</MenuItem>
          : <MenuItem eventKey="4" disabled>個人頁面</MenuItem>
        }
      </DropdownButton>
    )
  }

  getstr (agree) {
    switch (agree){
      case '1':
        return ''
      case '2':
        return '(審核中)'
      case '3':
        return '(已被拒絕，點按以刪除資料)'
      case '0':
        return '(教授尚未查看，點按以刪除資料)'
    }
  }

  render() {
    const {onClicks,selectedButtonIndex} = this.state
    const navItems = {
      'student': [
        <NavButton key={0} label='首頁' icon='fa fa-flag' onClick={onClicks[0]} selected={selectedButtonIndex === 0}/>,
        <NavButton key={1} label='畢業預審' icon='fa fa-graduation-cap' onClick={onClicks[1]} selected={selectedButtonIndex === 1}/>,
        <NavButton key={2} label='課程地圖' icon='fa fa-map' onClick={onClicks[2]} selected={selectedButtonIndex === 2}/>,
        //<NavButton key={3} label='課程抵免' icon='fa fa-users' onClick={onClicks[3]} selected={selectedButtonIndex === 3}/>,
        <NavButton key={3} label='教授' icon='fa fa-coffee' onClick={onClicks[3]} selected={selectedButtonIndex === 3}/>,
        <NavButton key={5} label='專題' icon='glyphicon glyphicon-file' onClick={onClicks[5]} selected={selectedButtonIndex === 5}/>,
      ],
      'assistant': [
        <NavButton key={0} label='首頁' icon='fa fa-flag' onClick={onClicks[0]} selected={selectedButtonIndex === 0}/>,
        <NavButton key={1} label='畢業預審' icon='fa fa-graduation-cap' onClick={onClicks[1]} selected={selectedButtonIndex === 1}/>,
        <NavButton key={2} label='學生專題' icon='fa fa-users' onClick={onClicks[2]} selected={selectedButtonIndex === 2}/>,
      ],
      'teacher': [
        <NavButton key={0} label='首頁' icon='fa fa-flag' onClick={onClicks[0]} selected={selectedButtonIndex === 0}/>,
        <NavButton key={1} label='教授課程' icon='fa fa-pie-chart' onClick={onClicks[1]} selected={selectedButtonIndex === 1}/>,
        <NavButton key={2} label='專題' icon='fa fa-users' onClick={onClicks[2]} selected={selectedButtonIndex === 2}/>,
        <NavButton key={3} label='導生' icon='fa fa-coffee' onClick={onClicks[3]} selected={selectedButtonIndex === 3}/>,
      ]
    }
    return (
      <Navbar staticTop fixedTop fluid expanded={this.state.expanded} onToggle={this.onToggleCollapse}>
        <Navbar.Header>
            <div style={style.BrandBox}>
              <span style={style.BrandName}>交大資工線上助理</span>
              <span style={style.BrandSubName} className='hidden-xs hidden-sm'>NCTU Curriculum Assistant</span>
            </div>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {navItems[this.props.type]}
          </Nav>

          <Nav pullRight>
            <NavItem className='logout-box'>
              <ButtonToolbar>
                {this.dropButton()}
                <MuiThemeProvider>
                  <RaisedButton backgroundColor = "#DDDDDD"
                                style={{marginLeft:'12px'}}
                                labelStyle={style.LogoutButtonLabel}
                                label="登出"
                                onClick={() => {window.location = '/logout'}}
                  />
                </MuiThemeProvider>
              </ButtonToolbar>
            </NavItem>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default _Navbar