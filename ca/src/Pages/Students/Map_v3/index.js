import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import './index.css'
import img0 from '../../../Resources/courseMap_cscs.png'
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
      <div style={{ marginTop: 'calc( -7vh )' }}>
        <div className='hidden-xs hidden-sm'
          style={{
            padding: '0',
            background: '#313131',
            height: '100vh'
          }}>
          <img src={img0} className='image'
            style={{
              maxWidth: '80vw',
              width: 'auto',
              paddingTop: '51px'
            }} />
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
