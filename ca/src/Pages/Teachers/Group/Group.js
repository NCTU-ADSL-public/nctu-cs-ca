import React from 'react'

import GroupList from './GroupList'
import GroupApply from './GroupApply'
import GroupVedio from './GroupVedio'

import {Tabs, Tab} from 'material-ui/Tabs';

// for tabs
// import 'rc-tabs/assets/index.css'
// import '../../../Components/ca-rc-tabs.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Show from './Show'
import SwipeableViews from 'react-swipeable-views'



class Group extends React.Component {
  constructor (props) {
    super(props)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.handleGroupClick = this.handleGroupClick.bind(this)
    this.state = {
      value: '1',
      item:
        { research_title: '５５５',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: '106'
        },
    }
  }
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };
  handleChangeIndex (index) {
    this.setState({
      index
    })
  }
  handleGroupClick (item) {
    this.setState({
      item: item,
      index: 1
    })
  }
  render () {
    return (
      <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex} >
        <MuiThemeProvider>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          inkBarStyle={{backgroundColor: '#bbebe2'}}
        >
          <Tab label={`專題列表`} value='1'
               style={{backgroundColor: '#9da4a5'}} >
            <GroupList idCard={this.props.idCard} handleGroupClick={this.handleGroupClick}/>
          </Tab>
          <Tab label={`專題申請`} value='2'
               style={{backgroundColor: '#9da4a5'}} >
            <GroupApply idCard={this.props.idCard} />
          </Tab>
          <Tab label={`各組專題影片`} value='3'
               style={{backgroundColor: '#9da4a5'}} >
            <GroupVedio idCard={this.props.idCard} />
          </Tab>
        </Tabs>
        </MuiThemeProvider>
        <div>
        <MuiThemeProvider>
            <Show
              onclick={this.handleChangeIndex}
              show={this.state.item}
              idCard={this.props.idCard}
            />
        </MuiThemeProvider>
        </div>
      </SwipeableViews>
    )
  }
}
export default Group
