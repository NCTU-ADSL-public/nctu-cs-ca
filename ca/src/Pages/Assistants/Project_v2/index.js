import React from 'react'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

import StudentItem from './Student/StudentItem'


class index extends React.Component {

  constructor() {
    super();
    this.state = {
      tabs_index: 0
    }
  }

  render() {

    const { classes } = this.props
    const { tabs_index } = this.state

    return (
      <div>
        <Tabs
          style = {{
            marginTop: '20px'
          }}
          onChange = { (event, value) => this.setState({ tabs_index: value }) }
          value = { tabs_index }
          centered fullWidth
        >
          <Tab label = { <span style = {{ fontSize: '20px', fontWeight: 'bold' }} >學生狀況</span> } />
          <Tab label = { <span style = {{ fontSize: '20px', fontWeight: 'bold' }} >教授狀況</span> } />
          <Tab label = { <span style = {{ fontSize: '20px', fontWeight: 'bold' }} >專題成積</span> } />
        </Tabs>
        <SwipeableViews
          index = { tabs_index }
          onChangeIndex = { index => this.setState({ tabs_index: index })}
        >
          <StudentItem />
          <h3>Teacher</h3>
          <h3>Score</h3>
        </SwipeableViews>
      </div>
    )
  }
}

export default index;
