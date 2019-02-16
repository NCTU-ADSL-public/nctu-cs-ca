import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import WaiveCoursePanel from './CreditPanel/waiveCoursePanel'
import ExemptCoursePanel from './CreditPanel/exemptCoursePanel'
import CompulsoryCoursePanel from './CreditPanel/compulsoryCoursePanel'
import EnglishCoursePanel from './CreditPanel/englishCoursePanel'
import { getCreditInfo, resetCourse } from '../../../Redux/Students/Actions/Credit'
import creditImg from '../../../Resources/credit_no_upload.png'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: 2*theme.spacing.unit,
    marginTop: 0,
    marginBottom: 0,
    width: 180
  },
  menu: {
    width: 150,
    fontSize: '20px'
  },
  menuMb: {
    width: 150,
    fontSize: '18px'
  }
})

class Index extends React.Component {
  componentDidMount () {
    this.props.getCreditInfo()
    this.props.resetCourse()
  }

  state={
    filterType: 0
  }

  handleFilter = (value) => {
    this.setState({
      filterType: value
    })
  }

  render () {
    const { classes } = this.props
    const waiveCourse = this.state.filterType===1 || this.state.filterType===0?this.props.creditInfo.waive_course:[]
    const exemptCourse = this.state.filterType===2 || this.state.filterType===0?this.props.creditInfo.exempt_course:[]
    const compulsoryCourse = this.state.filterType===3 || this.state.filterType===0?this.props.creditInfo.compulsory_course:[]
    const englishCourse = this.state.filterType===4 || this.state.filterType===0?this.props.creditInfo.english_course:[]
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
              <TextField
                select
                label='篩選'
                className={classes.textField}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                margin='normal'
                value={this.state.filterType}
                onChange={(event) => this.handleFilter(event.target.value)}
                variant="outlined"
            >
                <MenuItem value={0} style={{ height: '10px' }}>全部</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>學分抵免</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>課程免修</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>本系必修課程抵免</MenuItem>
                <MenuItem value={4} style={{ height: '10px' }}>英授專業課程抵免</MenuItem>
              </TextField>
              <Link to='/students/credit/apply'>
                <Button className={classes.btn} variant='contained' color='primary'>抵免申請</Button>
              </Link>
            </div>
          </div>
          {/* For mobile screen */}
          <div className='hidden-sm hidden-md hidden-lg row' style={{ margin: '20px 20px 5px 20px ', width: 150}}>

              <TextField
                select
                label='篩選'
                className={classes.textField}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                margin='normal'
                value={this.state.filterType}
                onChange={(event) => this.handleFilter(event.target.value)}
                variant="outlined"
              >
                <MenuItem value={0} style={{ height: '10px' }}>全部</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>學分抵免</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>課程免修</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>本系必修課程抵免</MenuItem>
                <MenuItem value={4} style={{ height: '10px' }}>英授專業課程抵免</MenuItem>
              </TextField>
              <Link to='/students/credit/apply'>
                <Button className={classes.btn} variant='contained' color='primary' style={{ margin: 'auto', width: '50%'}}>抵免申請</Button>
              </Link>
          </div>
          {/* For PC screen */}
          <div className='col-md-12 hidden-xs' style={{ marginTop: '20px' }}>
            {
              waiveCourse &&
              waiveCourse.map((data, index) => (
                <WaiveCoursePanel key={index} data={{ ...data }} />
              ))
            }
            {
              exemptCourse &&
              exemptCourse.map((data, index) => (
                <ExemptCoursePanel key={index} data={{ ...data }} />
              ))
            }
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
              waiveCourse.map((data, index) => (
                <WaiveCoursePanel key={index} data={{ ...data }} mobile />
              ))
            }
            {
              exemptCourse &&
              exemptCourse.map((data, index) => (
                <ExemptCoursePanel key={index} data={{ ...data }} mobile />
              ))
            }
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
  creditInfo: state.Student.Credit.creditInfo
})

const mapDispatchToProps = (dispatch) => ({
  getCreditInfo: () => dispatch(getCreditInfo()),
  resetCourse: () => dispatch(resetCourse())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
