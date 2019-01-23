import React from 'react'

import GroupList from './GroupList'
import GroupApply from './GroupApply'
import './Group.css'

import {Tabs, Tab} from 'material-ui/Tabs';

// for tabs
// import 'rc-tabs/assets/index.css'
// import '../../../Components/ca-rc-tabs.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Show from './Show'
import SwipeableViews from 'react-swipeable-views'

const styles = {
  tabDefault: {fontFamily: 'Noto Sans CJK TC', fontWeight: 'lighter', backgroundColor: '#f5f5f5', color:'#666'},
  tabActive: {fontFamily: 'Noto Sans CJK TC', fontWeight: 'lighter', backgroundColor: '#f5f5f5', color:'#68bb66'}
}

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
      <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex} style={{marginTop: '-8px'}}>
        <MuiThemeProvider>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          inkBarStyle={{backgroundColor: '#68bb66'}}
        >
          <Tab label={`專題列表`} value='1' className='p-box-shadow'
               style={this.state.value === '1' ? styles.tabActive : styles.tabDefault} >
            <GroupList idCard={this.props.idCard} handleGroupClick={this.handleGroupClick}/>
          </Tab>
          <Tab label={`專題申請`} value='2' className='p-box-shadow'
               style={this.state.value === '2' ? styles.tabActive : styles.tabDefault} >
            <GroupApply idCard={this.props.idCard} />
          </Tab>
          {/*<Tab label={`各組專題影片`} value='3'*/}
               {/*style={{fontFamily: 'Noto Sans CJK TC', fontWeight: 'lighter', backgroundColor: '#9da4a5'}} >*/}
            {/*<GroupVedio idCard={this.props.idCard} />*/}
          {/*</Tab>*/}
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
