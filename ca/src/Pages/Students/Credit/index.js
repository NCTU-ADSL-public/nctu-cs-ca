import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import WaiveCoursePanel from './CreditPanel/waiveCoursePanel'
import ExemptCoursePanel from './CreditPanel/exemptCoursePanel'
import CompulsoryCoursePanel from './CreditPanel/compulsoryCoursePanel'
import EnglishCoursePanel from './CreditPanel/englishCoursePanel'
import { getCreditInfo, resetCourse } from '../../../Redux/Students/Actions/Credit'
import creditImg from '../../../Resources/credit_no_upload.png'

const styles = theme => ({
  img: {
    width: '100%',
    marginTop: '25px'
  },
  btn: {
    fontSize: '14px'
  },
  status0: {
    width: '10px',
    height: '10px',
    margin: '15px 7px 5px 7px',
    backgroundColor: '#f3864a',
    float: 'left'
  },
  status1: {
    width: '10px',
    height: '10px',
    margin: '15px 7px 5px 7px',
    backgroundColor: '#3aa276',
    float: 'left'
  },
  status2: {
    width: '10px',
    height: '10px',
    margin: '15px 7px 5px 7px',
    backgroundColor: '#d93a64',
    float: 'left'
  },
  status3: {
    width: '10px',
    height: '10px',
    margin: '15px 7px 5px 7px',
    backgroundColor: '#aaaaaa',
    float: 'left'
  },
  text: {
    color: '#7B7B7B',
    float: 'left',
    opacity: '0.8',
    fontFamily: 'Noto Sans CJK TC',
    marginTop: '10px'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: {
        type: -1, // 抵免種類
        status: -1 // 抵免狀態
      }
    }
  }

  componentDidMount () {
    this.props.getCreditInfo()
    this.props.resetCourse()
  }

  componentDidUpdate (prevProps) {
    if (this.props.deleteStatus !== prevProps.deleteStatus &&
        this.props.deleteStatus === 'success') {
      this.props.getCreditInfo()
    }
  }

  handleFilterChange (name, value) {
    this.setState({
      filter: {
        ...this.state.filter,
        [name]: value
      }
    })
  }

  checkFilter (type, status) {
    return (
      (this.state.filter.type === type || this.state.filter.type === -1) &&
      (this.state.filter.status === status || this.state.filter.status === -1)
    )
  }

  render () {
    const { classes } = this.props
    const waiveCourse = this.props.creditInfo.waive_course
    const exemptCourse = this.props.creditInfo.exempt_course
    const compulsoryCourse = this.props.creditInfo.compulsory_course
    const englishCourse = this.props.creditInfo.english_course
    return (
      <div className='container' style={{ marginBottom: '50px' }}>
        <div className='row'>
          {/* For PC screen */}
          <div className='col-md-12 hidden-xs' style={{ marginTop: '20px' }}>
            <div>
              <div className={classes.status0} />
              <div className={classes.text}>審核中</div>
              <div className={classes.status1} />
              <div className={classes.text}>審核通過</div>
              <div className={classes.status2} />
              <div className={classes.text}>審核不通過</div>
              <div className={classes.status3} />
              <div className={classes.text}>退件</div>
            </div>
            <div className='pull-right'>
              <FormControl className={classes.formControl}>
                <Select
                  value={this.state.filter.type}
                  onChange={(event) => this.handleFilterChange('type', event.target.value)}
                >
                  <MenuItem value={-1} style={{ height: '10px' }}>所有抵免種類</MenuItem>
                  <MenuItem value={0} style={{ height: '10px' }}>學分抵免</MenuItem>
                  <MenuItem value={1} style={{ height: '10px' }}>課程免修</MenuItem>
                  <MenuItem value={2} style={{ height: '10px' }}>本系必修課程抵免</MenuItem>
                  <MenuItem value={3} style={{ height: '10px' }}>英授專業課程抵免</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Select
                  value={this.state.filter.status}
                  onChange={(event) => this.handleFilterChange('status', event.target.value)}
                >
                  <MenuItem value={-1} style={{ height: '10px' }}>所有狀態</MenuItem>
                  <MenuItem value={0} style={{ height: '10px' }}>審核中</MenuItem>
                  <MenuItem value={1} style={{ height: '10px' }}>審核通過</MenuItem>
                  <MenuItem value={2} style={{ height: '10px' }}>審核不通過</MenuItem>
                  <MenuItem value={3} style={{ height: '10px' }}>退件</MenuItem>
                </Select>
              </FormControl>
              <Link to='/students/credit/apply'>
                <Button className={classes.btn} variant='contained' color='primary'>抵免申請</Button>
              </Link>
            </div>
          </div>

          {/* For mobile screen */}
          <div className='hidden-sm hidden-md hidden-lg' style={{ margin: '20px 20px 5px 20px' }}>
            <div style={{ width: '150px' }}>
              <Link to='/students/credit/apply'>
                <Button className={classes.btn} variant='contained' color='primary' style={{ margin: 'auto', width: '80%' }}>抵免申請</Button>
              </Link>
            </div>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.filter.type}
                onChange={(event) => this.handleFilterChange('type', event.target.value)}
              >
                <MenuItem value={-1} style={{ height: '10px' }}>所有抵免種類</MenuItem>
                <MenuItem value={0} style={{ height: '10px' }}>學分抵免</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>課程免修</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>本系必修課程抵免</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>英授專業課程抵免</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.filter.status}
                onChange={(event) => this.handleFilterChange('status', event.target.value)}
              >
                <MenuItem value={-1} style={{ height: '10px' }}>所有狀態</MenuItem>
                <MenuItem value={0} style={{ height: '10px' }}>審核中</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>審核通過</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>審核不通過</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>退件</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* For PC screen */}
          <div className='col-md-12 hidden-xs' style={{ marginTop: '20px' }}>
            {
              waiveCourse &&
              waiveCourse
                .filter((data) => this.checkFilter(0, data.status))
                .map((data, index) => (
                  <WaiveCoursePanel key={index} data={{ ...data }} />
                ))
            }
            {
              exemptCourse &&
              exemptCourse
                .filter((data) => this.checkFilter(1, data.status))
                .map((data, index) => (
                  <ExemptCoursePanel key={index} data={{ ...data }} />
                ))
            }
            {
              compulsoryCourse &&
              compulsoryCourse
                .filter((data) => this.checkFilter(2, data.status))
                .map((data, index) => (
                  <CompulsoryCoursePanel key={index} data={{ ...data }} />
                ))
            }
            {
              englishCourse &&
              englishCourse
                .filter((data) => this.checkFilter(3, data.status))
                .map((data, index) => (
                  <EnglishCoursePanel key={index} data={{ ...data }} />
                ))
            }
            {
              waiveCourse && !waiveCourse.length &&
              exemptCourse && !exemptCourse.length &&
              compulsoryCourse && !compulsoryCourse.length &&
              englishCourse && !englishCourse.length &&
              <div className='col-md-4 col-md-offset-4 col-xs-8 col-xs-offset-2' style={{ marginTop: '50px' }}>
                <h2 className='text-center'>尚無任何抵免申請</h2>
                <img className={classes.img} src={creditImg} alt='' />
              </div>
            }
          </div>

          {/* For mobile xs */}
          <div
            className='hidden-sm hidden-md hidden-lg'
            style={{
              marginTop: '15px',
              width: '100vw'

            }}>
            {
              waiveCourse &&
              waiveCourse
                .filter((data) => this.checkFilter(0, data.status))
                .map((data, index) => (
                  <WaiveCoursePanel key={index} data={{ ...data }} mobile />
                ))
            }
            {
              exemptCourse &&
              exemptCourse
                .filter((data) => this.checkFilter(1, data.status))
                .map((data, index) => (
                  <ExemptCoursePanel key={index} data={{ ...data }} mobile />
                ))
            }
            {
              compulsoryCourse &&
              compulsoryCourse
                .filter((data) => this.checkFilter(2, data.status))
                .map((data, index) => (
                  <CompulsoryCoursePanel key={index} data={{ ...data }} mobile />
                ))
            }
            {
              englishCourse &&
              englishCourse
                .filter((data) => this.checkFilter(3, data.status))
                .map((data, index) => (
                  <EnglishCoursePanel key={index} data={{ ...data }} mobile />
                ))
            }
            {
              waiveCourse && !waiveCourse.length &&
              exemptCourse && !exemptCourse.length &&
              compulsoryCourse && !compulsoryCourse.length &&
              englishCourse && !englishCourse.length &&
              <div className='col-md-4 col-md-offset-4 col-xs-8 col-xs-offset-2' style={{ marginTop: '50px' }}>
                <h3 className='text-center'>尚無任何抵免申請</h3>
                <img className={classes.img} src={creditImg} alt='' />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  creditInfo: state.Student.Credit.creditInfo,
  deleteStatus: state.Student.Credit.delete.status
})

const mapDispatchToProps = (dispatch) => ({
  getCreditInfo: () => dispatch(getCreditInfo()),
  resetCourse: () => dispatch(resetCourse())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
