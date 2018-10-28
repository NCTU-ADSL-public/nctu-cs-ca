import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

import Student from './Student'
import Teacher from './Teacher'
import Score from './Score'

const styles = theme => ({
  tabsIndicator: {
    backgroundColor: '#68BB66'
  },
  tabRoot: {
    minWidth: '33%',
    minHeight: '60px'
  },
  tabLabel: {
    fontSize: 25
  },
  tabSelected: {
    color: '#68BB66',
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
            label = "學生狀況"
            classes = {{
              root: classes.tabRoot,
              label: classes.tabLabel,
              selected: classes.tabSelected
            }}
          />
          <Tab
            label = "教授狀況"
            classes = {{
              root: classes.tabRoot,
              label: classes.tabLabel,
              selected: classes.tabSelected
            }}
          />
          <Tab
            label = "成績查詢"
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
          <div><Teacher /></div>
          <div><Score /></div>
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
