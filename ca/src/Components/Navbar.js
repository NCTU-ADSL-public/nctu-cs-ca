import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { Navbar, Nav, NavItem, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap'
import defalt from '../Resources/defalt.jpg'
import dinoIcon from '../Resources/dinoIcon_graduate.png'
import NavButton from './NavButton'
import { withStyles } from '@material-ui/core/styles'
import './Navbar.css'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { MenuItem as _MenuItem } from '@material-ui/core'

const style = {
  BrandBox: {
    height: 28,
    display: 'inline-block',
    marginTop: 12,
    marginLeft: 7,
    marginRight: 25,
    verticalAlign: 'top',
    transition: 'background-color 0.5s ease'
  },
  BrandName: {
    fontFamily: 'Noto Sans CJK TC',
    fontWeight: 400,
    fontSize: 20,
    marginLeft: 9
  },
  BrandSubName: {
    fontFamily: 'Noto Sans CJK TC',
    fontWeight: 'lighter',
    fontSize: 14,
    marginLeft: 10
  },
  LogoutButtonLabel: {
    fontFamily: 'Noto Sans CJK TC',
    fontSize: 14,
    color: '#7B7B7B'
  },
  cssLabel: {
    fontSize: 15,
    '&$cssFocused': {
      color: '#68BB66'
    },
    fontWeight: 'normal'
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#68BB66'
    },
  },
}

class _Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedButtonIndex: 0,
      onClicks: props.onTouchTaps.map((callback, index) => this.wrapCallback(callback, index)),
      assistant_type: 'assistant'
    }
    this.wrapCallback = this.wrapCallback.bind(this)
    this.onToggleCollapse = this.onToggleCollapse.bind(this)
    this.dropButton = this.dropButton.bind(this)
  }

  wrapCallback (callback, index) {
    return () => {
      this.setState({
        ...this.state,
        selectedButtonIndex: index,
        expanded: false
      })
      callback()
    }
  }

  onToggleCollapse (expanded) {
    this.setState({
      ...this.state,
      expanded: expanded
    })
  }

  dropButton () {
    const { onClicks } = this.state
    return (
      <DropdownButton
        bsStyle={{ background: '#EEEEEE' }}
        bsSize='xsmall'
        noCaret
        title={
          <div className='idcard' /* onClick={onClicks[4]} */>
            <img id='idcard-photo' src={defalt} alt='' />
            <div style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              marginLeft: 9
            }}>
              <div id='idcard-top'>{this.props.name}</div>
              <div id='idcard-buttom'>{this.props.subname}</div>
            </div>
          </div>
        }
      >
        <MenuItem eventKey='1' onClick={onClicks[4]}>郵件</MenuItem>
        <MenuItem divider />
        {
          this.props.type === 'teacher'
            ? <MenuItem eventKey='4' onClick={onClicks[5]}>個人頁面</MenuItem>
            : <MenuItem eventKey='4' disabled>個人頁面</MenuItem>
        }
      </DropdownButton>
    )
  }

  render () {
    const { onClicks } = this.state
    const { classes } = this.props
    const navItems = {
      'student': [
        <NavButton key={0} label='首頁' icon='fa fa-flag' onClick={onClicks[0]} selected={this.props.router && this.props.location.pathname.match(this.props.router[0]) !== null} />,
        <NavButton key={1} label='畢業預審' icon='fa fa-graduation-cap' onClick={onClicks[1]} selected={this.props.router && this.props.location.pathname.match(this.props.router[1]) !== null} />,
        <NavButton key={2} label='課程地圖' icon='fa fa-map' onClick={onClicks[2]} selected={this.props.router && this.props.location.pathname.match(this.props.router[2]) !== null} />,
        <NavButton key={3} label='推薦課程' icon='fa fa-users' onClick={onClicks[3]} selected={this.props.router && this.props.location.pathname.match(this.props.router[3]) !== null} />,
        <NavButton key={4} label='教授' icon='fa fa-coffee' onClick={onClicks[4]} selected={this.props.router && this.props.location.pathname.match(this.props.router[4]) !== null} />,
        <NavButton key={5} label='專題' icon='glyphicon glyphicon-file' onClick={onClicks[5]} selected={this.props.router && this.props.location.pathname.match(this.props.router[5]) !== null} />,
        <NavButton key={6} label='課程抵免' icon='fa fa-list-alt' onClick={onClicks[6]} selected={this.props.router && this.props.location.pathname.match(this.props.router[6]) !== null} />
      ],
      'assistant': [
        <NavButton key={0} label='首頁' icon='fa fa-flag' onClick={onClicks[0]} selected={this.props.router && this.props.location.pathname.match(this.props.router[0]) !== null} />,
        <NavButton key={1} label='畢業預審' icon='fa fa-graduation-cap' onClick={onClicks[1]} selected={this.props.router && this.props.location.pathname.match(this.props.router[1]) !== null} />,
        <NavButton key={2} label='學生專題' icon='fa fa-users' onClick={onClicks[2]} selected={this.props.router && this.props.location.pathname.match(this.props.router[2]) !== null} />,
        <NavButton key={3} label='導生' icon='fa fa-coffee' onClick={onClicks[3]} selected={this.props.router && this.props.location.pathname.match(this.props.router[3]) !== null} />,
        <NavButton key={4} label='抵免審核' icon='fa fa-list-alt' onClick={onClicks[4]} selected={this.props.router && this.props.location.pathname.match(this.props.router[4]) !== null} />
      ],
      'teacher': [
        <NavButton key={0} label='首頁' icon='fa fa-flag' onClick={onClicks[0]} selected={this.props.router && this.props.location.pathname.match(this.props.router[0]) !== null} />,
        <NavButton key={1} label='專題' icon='fa fa-users' onClick={onClicks[1]} selected={this.props.router && this.props.location.pathname.match(this.props.router[1]) !== null} />,
        <NavButton key={2} label='課程' icon='fa fa-list-alt' onClick={onClicks[2]} selected={this.props.router && this.props.location.pathname.match(this.props.router[2]) !== null} />,
        <NavButton key={3} label='導生' icon='fa fa-coffee' onClick={onClicks[3]} selected={this.props.router && this.props.location.pathname.match(this.props.router[3]) !== null} />,
        <NavButton key={4} label='抵免審核' icon='fa fa-list-alt' onClick={onClicks[4]} selected={this.props.router && this.props.location.pathname.match(this.props.router[4]) !== null} />
      ]
    }
    // <NavButton key={1} label='教授課程' icon='fa fa-pie-chart' onClick={onClicks[1]} selected={selectedButtonIndex === 1}/>,
    // <NavButton key={3} label='導生' icon='fa fa-coffee' onClick={onClicks[3]} selected={selectedButtonIndex === 3}/>,
    return <Navbar staticTop fixedTop fluid expanded={this.state.expanded} onToggle={this.onToggleCollapse}>
      <Navbar.Header>
        {/* <div style={{...style.BrandBox, borderLeft: `6px solid ${this.props.color}`}}> */}
        <div style={{ ...style.BrandBox }}>
          <img src={dinoIcon} style={{ height: 35 }} alt='' />
          {/* <span style={style.BrandName}>交大資工線上助理</span> */}
          {/* <span style={style.BrandSubName} className='hidden-xs hidden-sm'>NCTU Curriculum Assistant</span> */}
        </div>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>{navItems[this.props.type]}</Nav>
        <Nav pullRight>
          <NavItem className='logout-box'>
            <ButtonToolbar>
              {/* {this.dropButton()} */}
              <div className='idcard' /* onClick={onClicks[4]} */>
                {/* <MuiThemeProvider> */}
                {/* <Notifications color = {'#c40000'} className='red-spot animated swing' style={{animationDuration:'2s', animationIterationCount:10000,}}/> */}
                {/* </MuiThemeProvider> */}
                <img id='idcard-photo' src={defalt} alt='' />
                <div style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  marginLeft: 9
                }}>
                  <div id='idcard-top'>{this.props.name}</div>
                  <div id='idcard-buttom'>{this.props.subname}</div>
                </div>
              </div>
              <MuiThemeProvider>
                <RaisedButton
                  backgroundColor='#DDDDDD'
                  style={{ marginLeft: '12px' }}
                  labelStyle={style.LogoutButtonLabel}
                  label='登出'
                  onClick={() => { window.location = '/logout' }}
                />
              </MuiThemeProvider>
            </ButtonToolbar>
          </NavItem>
        </Nav>
        <Nav pullRight>{
          (process.env.REACT_APP_ASSISTANT_SUPER_mode && this.props.type === 'assistant') ? 
            <FormControl style={{ width: '150px', marginRight: '20px' }} >
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                切換角色
              </InputLabel>
              <Select
                input={
                  <Input
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                }
                value={this.state.assistant_type}
                style={{ fontSize: '15px' }}
                onChange={
                  (event) => {
                    this.setState({ assistant_type: event.target.value })
                  }
                }
              >
                <_MenuItem value={"assistant"} style={{ fontSize: '20px' }} >助理</_MenuItem>
                <_MenuItem value={"teacher"} style={{ fontSize: '20px' }} >教授</_MenuItem>
                <_MenuItem value={"student"} style={{ fontSize: '20px' }} >學生</_MenuItem>
              </Select>
            </FormControl> : ''
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  }
}

const mapState = (state) => ({
  color: state.Student.User.FooterColor
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(withRouter(withStyles(style)(_Navbar)))
