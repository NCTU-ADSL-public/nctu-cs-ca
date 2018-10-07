import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

import Student from './Student'

const styles = theme => ({
  tabRoot: {
    minWidth: '33%',
    minHeight: '60px'
  },
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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

class index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tab_index: 0
    }
  }

  render() {

    const { classes } = this.props
    const { tab_index } = this.state

    return (
      <div>
        <Tabs
          value = { tab_index }
          onChange = {
            (event, value) => this.setState({ tab_index: value })
          }
          centered
          classes = {{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
        >
          {["學生狀況", "教授狀況", "成績查詢"].map( (title, _) =>
            <Tab
              key = { _ }
              label = { title }
              classes = {{
                root: classes.tabRoot,
                label: classes.tabLabel,
                selected: classes.tabSelected
              }}
            />
          )}
        </Tabs>
        <SwipeableViews
          index = { tab_index }
        >
          <div><Student /></div>
          <div>Hello23</div>
          <div>Hello123</div>
        </SwipeableViews>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
