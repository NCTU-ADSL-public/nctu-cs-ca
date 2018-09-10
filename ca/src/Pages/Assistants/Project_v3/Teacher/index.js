import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Accepted from './Accepted'
import Pending from './Pending'

import { fetchTeachers } from '../../../../Redux/Assistants/Actions/Project_v3/Teacher'


const styles = theme => ({
  root: {
    width: '60%',
    margin: '0 auto'
  },
  tabsIndicator: {
    backgroundColor: 'rgb(0, 188, 212)'
  },
  tabRoot: {
    minWidth: '27.5%',
    minHeight: '10px'
  },
  tabLabel: {
    fontSize: 18
  },
  tabSelected: {
    color: 'rgb(0, 188, 212)',
    transition: 'color 0.3s'
  }
})

class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      grade: "04",
    }
    props.fetch_teachers({ grade: this.state.grade })
  }

  render() {

    const { classes, teachers } = this.props
    const { tabIndex } = this.state

    return (
      <div className = { classes.root } >
        <Tabs
          value = { tabIndex }
          onChange = { (event, value) => this.setState({ tabIndex: value }) }
          centered
          classes = {{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
        >
          <Tab
            label = "接受列表"
            classes = {{
              root: classes.tabRoot,
              label: classes.tabLabel,
              selected: classes.tabSelected
            }}
          />
          <Tab
            label = "審核列表"
            classes = {{
              root: classes.tabRoot,
              label: classes.tabLabel,
              selected: classes.tabSelected
            }}
          />
        </Tabs>
        <SwipeableViews
          index = { tabIndex }
        >
          <div><Accepted teachers = { teachers } /></div>
          <div><Pending teachers = { teachers } /></div>
        </SwipeableViews>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  teachers: state.Assistant.Project.Teacher.teachers
})

const mapDispatchToProps = (dispatch) => ({
  fetch_teachers: (post_item) => dispatch(fetchTeachers(post_item))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
