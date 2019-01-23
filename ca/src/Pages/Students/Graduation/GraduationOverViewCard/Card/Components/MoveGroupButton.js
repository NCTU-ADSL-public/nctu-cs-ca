import React from 'react'
import axios from 'axios'
// MUI
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

// REDUX
import { connect } from 'react-redux'
import { changeCourse, fetchGraduationCourse } from '../../../../../../Redux/Students/Actions/Graduation'

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
      targets: []
    }
    this.fetchTarget()
  }

  fetchTarget () {
    axios.post('/students/graduate/legalTargetGroup', {
      cn: this.props.item.cn, // 中文課名
      code: this.props.item.code, // 課號
      type: this.props.item.type,
      studentId: this.props.assis ? this.props.idCard.id : this.props.studentIdcard.student_id
    }).then(res => {
      this.setState({targets: res.data})
    }).catch(err => {
      console.log('============ MoveGroupButton ==============')
      console.log(err)
      console.log('===========================================')
    })
  }

  handleClick (event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose () {
    this.setState({
      anchorEl: null
    })
  }

  handleItemSelected (target) {
    let cn = this.props.item.cn
    let studentIdcard = this.props.studentIdcard
    let title = this.props.title
    this.setState({
      anchorEl: null
    })
    console.log('============ MoveGroupButton switchCourse ==============')
    console.log('target: ' + target)
    console.log('this.props.title: ' + title)
    console.log(studentIdcard)

    axios.post('/students/graduate/switchCourse', {
      cn: cn, // 中文課名
      student_id: this.props.assis ? this.props.idCard.id : studentIdcard.student_id,
      origin_group: title,
      target_group: target
    }).then(res => {
      console.log('┌---- RESPONSE ----')
      console.log(res)
      console.log('└------------------')
      let inter = 250
      // Magic update
      while (inter < 100000) {
        setTimeout(
          () => {
            console.log('----- fetchGraduationCourse! ----')
            this.props.fetchGraduationCourse()
          }, inter)
        inter *= 2
      }
      setTimeout(
        () => {
          console.log('----- POST students/graduate/graduateChange/graduateList ----')
          this.extraPostGradChange()
        }, 10000)
    }).catch(err => {
      console.log(err)
    })
    console.log('===========================================')
  }

  extraPostGradChange () {
    let studentIdcard = this.props.studentIdcard
    axios.post('/students/graduate/graduateChange/graduateList', {
      student_id: this.props.assis ? this.props.idCard.id : studentIdcard.student_id
    })
  }

  render () {
    const { label, classes, englishCheck } = this.props
    const { anchorEl, targets } = this.state
    const shouldBeDisabled = ((englishCheck === '0' || englishCheck === null) && this.props.item.cn.search('進階英文') !== -1) || this.props.item.complete === false || this.props.item.reason === 'english' || this.state.targets.length === 0

    return (
      <div style={style.Popover}>

        <Button
          variant='outlined'
          onClick={this.handleClick}
          className={classes.root}
          // 由前端所擋掉的移動
          disabled={shouldBeDisabled}
          // style={{ display: shouldBeDisabled ? 'none' : '' }}
        >
          {shouldBeDisabled ? '不能移動此課程' : label}
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
              onClick={() => this.handleItemSelected(item.title)}
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
  studentIdcard: state.Student.User.studentIdcard,
  idCard: state.Student.Graduation.idCardForassistans,
  assis: state.Student.Graduation.assis
})

const mapDispatchToProps = (dispatch) => ({
  fetchGraduationCourse: () => dispatch(fetchGraduationCourse()),
  changeCourse: (from, end, course) => dispatch(changeCourse(from, end, course))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MoveGroupButton))
