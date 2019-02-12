import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import CompulsoryCoursePanel from './CreditPanel/compulsoryCoursePanel'
import EnglishCoursePanel from './CreditPanel/englishCoursePanel'
import WaiveCoursePanel from './CreditPanel/waiveCoursePanel'
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
  text: {
    color: '#7B7B7B',
    float: 'left',
    opacity: '0.8',
    fontFamily: 'Noto Sans CJK TC',
    marginTop: '10px'
  }
})

class Index extends React.Component {
  componentDidMount () {
    this.props.getCreditInfo()
    this.props.resetCourse()
  }

  render () {
    const { classes } = this.props
    const compulsoryCourse = this.props.creditInfo.compulsory_course
    const englishCourse = this.props.creditInfo.english_course
    const waiveCourse = this.props.creditInfo.waive_course
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
            </div>
            <Link to='/students/credit/apply' className='pull-right'>
              <Button className={classes.btn} variant='contained' color='primary'>抵免申請</Button>
            </Link>
          </div>
          {/* For mobile screen */}
          <div className='hidden-sm hidden-md hidden-lg' style={{ margin: '20px 20px 5px 20px ', width: 150}}>
            <Link to='/students/credit/apply'>
              <Button className={classes.btn} variant='contained' color='primary' style={{ margin: 'auto', width: '80%'}}>抵免申請</Button>
            </Link>
          </div>
          {/* For PC screen */}
          <div className='col-md-12 hidden-xs' style={{ marginTop: '20px' }}>
            {
              compulsoryCourse &&
              compulsoryCourse.map((data, index) => (
                <CompulsoryCoursePanel key={index} data={{ ...data }} />
              ))
            }
            {
              englishCourse &&
              englishCourse.map((data, index) => (
                <EnglishCoursePanel key={index} data={{ ...data }} />
              ))
            }
            {
              waiveCourse &&
              waiveCourse.map((data, index) => (
                <WaiveCoursePanel key={index} data={{ ...data }} />
              ))
            }
            {
              compulsoryCourse && !compulsoryCourse.length &&
              englishCourse && !englishCourse.length &&
              waiveCourse && !waiveCourse.length &&
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
              compulsoryCourse &&
              compulsoryCourse.map((data, index) => (
                <CompulsoryCoursePanel key={index} data={{ ...data }} mobile />
              ))
            }
            {
              englishCourse &&
              englishCourse.map((data, index) => (
                <EnglishCoursePanel key={index} data={{ ...data }} mobile />
              ))
            }
            {
              waiveCourse &&
              waiveCourse.map((data, index) => (
                <WaiveCoursePanel key={index} data={{ ...data }} mobile />
              ))
            }
            {
              compulsoryCourse && !compulsoryCourse.length &&
              englishCourse && !englishCourse.length &&
              waiveCourse && !waiveCourse.length &&
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
  creditInfo: state.Student.Credit.creditInfo
})

const mapDispatchToProps = (dispatch) => ({
  getCreditInfo: () => dispatch(getCreditInfo()),
  resetCourse: () => dispatch(resetCourse())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
