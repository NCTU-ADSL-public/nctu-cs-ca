import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import './index.css'
import Course from './Course'
import { connect } from 'react-redux'

function TabContainer ({ children, dir }) {
  return (
    <Typography component='div' dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
})

class index extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.state = {
      value: 0
    }
  }

  handleChange (event, value) {
    this.setState({ value })
  }

  handleChangeIndex (index) {
    this.setState({ value: index })
  }

  render () {
    return (
      <div>
        <div className='hidden-xs hidden-sm' style={{ padding: '4% 5% 0 5%' }}>
          <div className='red' style={{ backgroundColor: '#616161' }} />
          <div className='text'>已通過</div>
          <div className='red' style={{ backgroundColor: '#a42926' }} />
          <div className='text'>未通過</div>
        </div>
        <div className='Map-Row'>
          {/* <div className='visible-xs visible-sm' style={{width: '100%'}}> */}
          {/* <div className="green" style={{backgroundColor: '#616161'}}/> */}
          {/* <div className="text">已通過</div> */}
          {/* <div className="red" style={{backgroundColor: '#a42926'}}/> */}
          {/* <div className="text">未通過</div> */}
          {/* </div> */}
          <Course
            studentPasdata={this.props.CoursePass}
            data={this.props.CourseMap}
            studentsGrad={this.props.studentIdcard.grade}
          />
        </div>
      </div>
    )
  }
}

index.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  CoursePass: state.Student.Map.CoursePass,
  CourseMap: state.Student.Map.CourseMap
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(index))

// <div className={classes.root}>
// <AppBar position="static" color="default">
//   <Tabs
// value={this.state.value}
// onChange={this.handleChange}
// indicatorColor="primary"
// textColor="primary"
// fullWidth
// centered
// >
// <Tab label="課程" />
//   <Tab label="地圖" />
//   </Tabs>
// </AppBar>
// <SwipeableViews
// axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
// index={this.state.value}
// onChangeIndex={this.handleChangeIndex}
// >
// <TabContainer dir={theme.direction}>Item Two</TabContainer>
// </SwipeableViews>
// </div>
