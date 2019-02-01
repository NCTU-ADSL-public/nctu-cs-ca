import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import CompulsoryCoursePanel from './CreditPanel/compulsoryCoursePanel'
import EnglishCoursePanel from './CreditPanel/englishCoursePanel'
import WaiveCoursePanel from './CreditPanel/waiveCoursePanel'
import { getCreditInfo } from '../../../Redux/Students/Actions/Credit'
import creditImg from '../../../Resources/credit_no_upload.png'

const styles = theme => ({
  img: {
    width: '100%',
    marginTop: '25px'
  },
  btn: {
    fontSize: '14px'
  }
})

class Index extends React.Component {
  componentDidMount () {
    this.props.getCreditInfo()
  }

  render () {
    const { classes } = this.props
    const compulsoryCourse = this.props.creditInfo.compulsory_course
    const englishCourse = this.props.creditInfo.english_course
    const waiveCourse = this.props.creditInfo.waive_course
    return (
      <div className='container' style={{ marginBottom: '50px' }}>
        <div className='row'>
          <div className='col-md-12' style={{ marginTop: '20px' }}>
            <Link to='/students/credit/apply' className='pull-right'>
              <Button className={classes.btn} variant='contained' color='primary'>抵免申請</Button>
            </Link>
          </div>
          <div className='col-md-12' style={{ marginTop: '20px' }}>
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
  getCreditInfo: () => dispatch(getCreditInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
