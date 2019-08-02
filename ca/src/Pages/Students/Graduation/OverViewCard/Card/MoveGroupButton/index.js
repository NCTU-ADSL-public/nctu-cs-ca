
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import actions from '../../../../../../Redux/Students/Actions/Graduation'
import {
  getGraduationInfo,
  getMoveTargets,
  moveCourse
} from '../../../../../../Redux/Students/Actions/Graduation'
import '../../../../../../../node_modules/animate.css/animate.css'

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

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleItemSelect = this.handleItemSelect.bind(this)
    this.state = {
      isOpened: false,
      anchorEl: null,
      targets: []
    }
  }

  componentDidMount () {
    this.props.getMoveTargets({
      cn: this.props.course.cn, // 中文課名
      code: this.props.course.code, // 課號
      type: this.props.course.type,
      studentId: this.props.assis ? this.props.idCard.id : this.props.studentIdcard.student_id
    })
  }

  componentDidUpdate () {
    // 移動成功後，重新拿課程資料並重置移動狀態
    if (this.props.success) {
      this.props.getGraduationInfo()
      this.props.resetMove()
    }
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

  handleItemSelect (target) {
    let studentIdcard = this.props.studentIdcard

    this.props.moveCourse({
      cn: this.props.course.cn, // 中文課名
      student_id: this.props.assis ? this.props.idCard.id : studentIdcard.student_id,
      origin_group: this.props.title,
      target_group: target
    })

    this.setState({
      anchorEl: null
    })
  }

  render () {
    const { classes, englishCheck, course, targets } = this.props
    const shouldBeDisabled = (
      (
        (englishCheck === '0' || englishCheck === null) &&
        course.cn.search('進階英文') !== -1
      ) ||
      course.reason === 'english'
    )

    return (
      <div style={style.Popover}>
        <Button
          variant='outlined'
          onClick={this.handleClick}
          className={classes.root}
          // 由前端所擋掉的移動
          disabled={shouldBeDisabled}
        >
          { shouldBeDisabled ? '不能移動此課程' : '移動課程' }
        </Button>

        <Menu
          id='simple-menu'
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          className={classes.root}
        >
          {
            targets &&
            targets.map((target, index) => (
              <MenuItem
                key={index}
                onClick={() => this.handleItemSelect(target.title)}
                className={classes.root}
              >
                { target.title }
              </MenuItem>
            ))
          }
        </Menu>

      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.detail.overview,
  studentIdcard: state.Student.User.studentIdcard,
  idCard: state.Student.Graduation.assistant.idCard,
  assis: state.Student.Graduation.assistant.using,
  targets: state.Student.Graduation.moveCourse.targets,
  success: state.Student.Graduation.moveCourse.success
})

const mapDispatchToProps = (dispatch) => ({
  getGraduationInfo: () => dispatch(getGraduationInfo()),
  getMoveTargets: (payload) => dispatch(getMoveTargets(payload)),
  moveCourse: (payload) => dispatch(moveCourse(payload)),
  resetMove: () => dispatch(actions.graduation.moveCourse.setSuccess(false))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
