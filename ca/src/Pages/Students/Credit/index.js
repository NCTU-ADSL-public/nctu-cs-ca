import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import WaiveCoursePanel from './Panel/waiveCoursePanel'
import ExemptCoursePanel from './Panel/exemptCoursePanel'
import CompulsoryCoursePanel from './Panel/compulsoryCoursePanel'
import EnglishCoursePanel from './Panel/englishCoursePanel'
import { getCreditInfo, resetCourse, senderrorSubmit } from '../../../Redux/Students/Actions/Credit'
import creditImg from '../../../Resources/credit_no_upload.png'
import WaiveCourse from './PrintForm/WaiveCourse'
import ExemptCourse from './PrintForm/ExemptCourse'

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
      },
      showPrintMenu: null,
      printFormNumber: 0,
      doPrinting: false
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.checkFilter = this.checkFilter.bind(this)
    this.handlePrintBtnClick = this.handlePrintBtnClick.bind(this)
    this.handlePrintMenuClose = this.handlePrintMenuClose.bind(this)
    this.printApplicationTable = this.printApplicationTable.bind(this)
  }

  componentDidMount () {
    this.props.getCreditInfo()
    this.props.resetCourse()
    this.props.senderrorSubmit(false)
  }

  componentDidUpdate (prevProps) {
    if (this.props.deleteStatus !== prevProps.deleteStatus &&
        this.props.deleteStatus === 'success') {
      this.props.getCreditInfo()
    }
    if (this.state.doPrinting) {
      this.setState({doPrinting: false})
      window.print()
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

  handlePrintBtnClick (event) {
    this.setState({ showPrintMenu: event.currentTarget })
  }

  handlePrintMenuClose () {
    this.setState({ showPrintMenu: null })
  }

  printApplicationTable (formNumber, fileName) {
    if (fileName !== null) { document.title = fileName }
    this.setState({ printFormNumber: formNumber, doPrinting: true })
    this.handlePrintMenuClose()
    return true
  }

  render () {
    const { classes } = this.props
    const waiveCourse = this.props.creditInfo.waive_course.filter((data) => this.checkFilter(0, data.status))
    const exemptCourse = this.props.creditInfo.exempt_course.filter((data) => this.checkFilter(1, data.status))
    const compulsoryCourse = this.props.creditInfo.compulsory_course.filter((data) => this.checkFilter(2, data.status))
    const englishCourse = this.props.creditInfo.english_course.filter((data) => this.checkFilter(3, data.status))
    const anchorElement = this.state.showPrintMenu
    const printFormNumber = this.state.printFormNumber

    return (
      <div className='container' style={{ marginBottom: '50px' }}>
        <div className='row showArea'>
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
                <Button
                  className={classes.btn}
                  variant='contained'
                  color='primary'
                  onClick={() => this.props.senderrorSubmit(false)}
                >
                  抵免申請
                </Button>
              </Link>
              <div style={{ display: 'inline', marginLeft: '5px' }}>
                <Button
                  className={classes.btn}
                  variant='contained'
                  color='primary'
                  aria-owns={anchorElement ? 'print-menu' : undefined}
                  aria-haspopup='true'
                  onClick={this.handlePrintBtnClick}
                  disabled
                >
                  列印申請表
                </Button>
                <Menu
                  id="print-menu"
                  anchorEl={anchorElement}
                  open={Boolean(anchorElement)}
                  onClose={this.handlePrintMenuClose}
                >
                  <MenuItem onClick={() => this.printApplicationTable(0, '抵免學分申請表')}>抵免學分申請表</MenuItem>
                  <MenuItem onClick={() => this.printApplicationTable(1, '課程免修申請表')}>課程免修申請表</MenuItem>
                </Menu>
              </div>
            </div>
          </div>

          {/* For mobile screen */}
          <div className='hidden-sm hidden-md hidden-lg' style={{ margin: '20px 20px 5px 20px' }}>
            <div style={{ width: '300px' }}>
              <Link to='/students/credit/apply'>
                <Button
                  className={classes.btn}
                  variant='contained'
                  color='primary'
                  style={{ margin: 'auto', width: '40%' }}
                  onClick={() => this.props.senderrorSubmit(false)}
                >
                  抵免申請
                </Button>
              </Link>
              <Button
                className={classes.btn}
                variant='contained'
                color='primary'
                aria-owns={anchorElement ? 'print-menu' : undefined}
                aria-haspopup='true'
                style={{ margin: 'auto', width: '40%', marginLeft: '5px' }}
                onClick={this.handlePrintBtnClick}
                disabled
              >
                列印申請表
              </Button>
              <Menu
                id="print-menu"
                anchorEl={anchorElement}
                open={Boolean(anchorElement)}
                onClose={this.handlePrintMenuClose}
              >
                <MenuItem onClick={() => this.printApplicationTable(0, '抵免學分申請表')}>抵免學分申請表</MenuItem>
                <MenuItem onClick={() => this.printApplicationTable(1, '課程免修申請表')}>課程免修申請表</MenuItem>
              </Menu>
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
        <div id='printArea'>
          {
            printFormNumber === 0 &&
            this.props.creditInfo.waive_course &&
            this.props.creditInfo.waive_course.length &&
            <WaiveCourse courses={ this.props.creditInfo.waive_course } />
          }
          {
            printFormNumber === 1 &&
            this.props.creditInfo.exempt_course &&
            this.props.creditInfo.exempt_course.length &&
            <ExemptCourse courses={ this.props.creditInfo.exempt_course } />
          }
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
  resetCourse: () => dispatch(resetCourse()),
  senderrorSubmit: (payload) => dispatch(senderrorSubmit(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
