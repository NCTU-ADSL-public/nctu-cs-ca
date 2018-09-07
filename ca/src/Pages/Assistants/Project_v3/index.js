import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

import Student from './Student'

const styles = theme => ({
  tabsIndicator: {
    backgroundColor: 'rgb(0, 188, 212)'
  },
  tabRoot: {
    minWidth: '33%',
    minHeight: '60px'
  },
  tabLabel: {
    fontSize: 25
  },
  tabSelected: {
    color: 'rgb(0, 188, 212)',
    transition: 'color 0.3s'
  }
})

class index extends React.Component {

  constructor() {
    super()
    this.state = {
      tabIndex: 0
    }
  }

  render() {

    const { classes } = this.props

    return (
      <div>
        <Tabs
          value = { this.state.tabIndex }
          onChange = { (event, value) => this.setState({ tabIndex: value }) }
          centered
          classes = {{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
        >
          <Tab
            label = "學生申請狀況"
            classes = {{
              root: classes.tabRoot,
              label: classes.tabLabel,
              selected: classes.tabSelected
            }}
          />
          <Tab
            label = "教授收額狀況"
            classes = {{
              root: classes.tabRoot,
              label: classes.tabLabel,
              selected: classes.tabSelected
            }}
          />
          <Tab
            label = "專題成績查詢"
            classes = {{
              root: classes.tabRoot,
              label: classes.tabLabel,
              selected: classes.tabSelected
            }}
          />
        </Tabs>
        <SwipeableViews
          index = { this.state.tabIndex }
        >
          <div><Student /></div>
          <div>Item Two</div>
          <div>Item Three</div>
        </SwipeableViews>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
