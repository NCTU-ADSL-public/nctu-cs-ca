import React from 'react'
import axios from 'axios'
// MUI
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

// REDUX
import { connect } from 'react-redux'
import { changeCourse } from '../../../../../../Redux/Students/Actions/Graduation'

import '../../../../../../../node_modules/animate.css/animate.css'
import PropTypes from 'prop-types'

const style = {
  Button: {
    transition: 'background .2s linear',
    width: '200px',
    paddingRight: 0,
    overflow: 'visible',
    borderRadius: 2
  },
  ButtonLabel: {
    padding: '5px',
    height: '45px',
    verticalAlign: 'default',
    color: '#fcfcfc',
    fontSize: '1em',
    fontWeight: '300',
    letterSpacing: '1px',
    fontFamily: 'Noto Sans CJK TC'
  },
  ButtonBox: {
    margin: '0 1px 6px 1px',
    float: 'left',
    height: 32
  },
  Popover: {
    zIndex: 1000
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  typography: {
    margin: theme.spacing.unit * 2,
    width: '300px'
  },
  root: {
    fontFamily: 'Noto Sans CJK TC',
    letterSpacing: 1
  }
})

class MoveGroupButton extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      isOpened: false,
      anchorEl: null,
      targets: [{title: '...'}]
    }
    this.fetchTarget()
  }

  fetchTarget () {
    console.log('============ MoveGroupButton ==============')
    console.log(this.props.item)
    console.log(this.props.studentIdcard)
    console.log('===========================================')

    axios.post('/students/graduate/legalTargetGroup', {
      cn: this.props.item.cn, // 中文課名
      code: this.props.item.code, // 課號
      type: this.props.item.type,
      studentId: this.props.studentIdcard.student_id,
    }).then(res => {
      this.setState({targets: res.data})
    }).catch(err => {
      console.log(err)
    })
  }

  handleClick (event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose (target) {
    this.setState({
      anchorEl: null
    })
    console.log('============ MoveGroupButton switchCourse ==============')
    console.log('target: ' + target)
    console.log('this.props.title: ' + this.props.title)
    console.log('origin_title: ' + this.props.item.origin_title)
    console.log('new_title: ' + this.props.item.new_title)
    console.log(this.props.studentIdcard)

    axios.post('/students/graduate/switchCourse', {
      cn: this.props.item.cn, // 中文課名
      student_id: this.props.studentIdcard.student_id,
      origin_group: this.props.title,
      target_group: target
    }).then(res => {
      console.log('┌---- RESPONSE ----')
      console.log(res)
      console.log('└------------------')
    }).catch(err => {
      console.log(err)
    })
    console.log('===========================================')
  }

  render () {
    const { label, classes } = this.props
    const { anchorEl, targets } = this.state

    return (
      <div style={style.Popover}>

        <Button
          variant='outlined'
          onClick={this.handleClick}
          className={classes.root}
        >
          {label}
        </Button>

        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className={classes.root}
        >
          {targets.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => this.handleClose(item.title)}
              className={classes.root}
            >
              {item.title}
            </MenuItem>
          ))}

        </Menu>

      </div>
    )
  }
}

MoveGroupButton.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.overview,
  studentIdcard: state.Student.User.studentIdcard
})

const mapDispatchToProps = (dispatch) => ({
  changeCourse: (from, end, course) => dispatch(changeCourse(from, end, course))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MoveGroupButton))
