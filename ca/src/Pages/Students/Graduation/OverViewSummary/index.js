
import React from 'react'
import { connect } from 'react-redux'
import CircularProgressbar from 'react-circular-progressbar'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import RwdIconButton from './RwdIconButton'
import DetailProgressBar from './DetailProgressBar'
import './style.css'

const styles = theme => ({
  progress: {
    left: '30px',
    top: '30px',
    position: 'absolute'
  },
  progressRwd: {
    position: 'absolute',
    left: '18%'
  },
  button: {
    margin: '20px 0 20px 0',
    background: '#7c7c7c',
    color: '#ffffff'
  },
  icon: {
    marginRight: theme.spacing.unit
  },
  text: {
    fontSize: '40px',
    left: '100px',
    top: '90px',
    position: 'absolute',
    textAlign: 'center'
  }
})

class Index extends React.Component {
  render () {
    const { check, englishCheck, overview } = this.props
    let reviewStatus, englishStatus

    switch (parseInt(check)) {
      case 0:
        reviewStatus = '未送審'
        break
      case 1:
        reviewStatus = '審核中'
        break
      case 2:
        reviewStatus = '審核完畢'
        break
      default:
        reviewStatus = '錯誤'
    }
    switch (parseInt(englishCheck)) {
      case 0:
        englishStatus = '未考過英檢'
        break
      case 1:
        englishStatus = '通過外語榮譽學分（可免修英文）'
        break
      case 2:
        englishStatus = '已通過英檢免試申請'
        break
      case 3:
        englishStatus = '已考過英檢'
        break
      case 4:
        englishStatus = '已考過英檢'
        break
      default:
        englishStatus = '錯誤'
    }

    return (
      <div>
        <div style={{ marginTop: '10px' }}>
          {/* for PC screen */}
          <div className='hidden-xs'>
            <div className='col-md-12'>
              <div className='green' /><div className='text'>已通過</div>
              <div className='red' /><div className='text'>未通過</div>
              <div className='gray' /><div className='text'>未修課</div>
              <div className='yellow' /><div className='text'>未抵免課程</div>
              <div className='purple' /><div className='text'>免修或抵免課程</div>
              <div className='blue' /><div className='text'>當期課程</div>
            </div>
            <div className='col-sm-12 col-md-12 well' style={{ marginTop: '5px', clear: 'both', color: 'gray' }}>
              <div className='col-sm-11 col-md-11'>
                {
                  this.props.assis &&
                  <div style={{ color: '#6e0000' }}>
                    {this.props.idCard.sname}&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.props.idCard.program}&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.props.idCard.id}
                  </div>
                }
                <div>
                  是否已考過英檢：{englishStatus}
                </div>
                <div>
                  畢業預審是否已送交助理審核：
                  <span style={{ color: '#FF0000' }}>{reviewStatus}</span>
                </div>
              </div>
              <div className='pull-right col-sm-1 col-md-1'>
                <RwdIconButton />
              </div>
            </div>
          </div>

          <div className='col-xs-3 visible-xs' />
          <div className='col-xs-6 col-sm-3 col-md-2 col-lg-2'>
            <CircularProgressbar
              percentage={100 * overview.total / overview.total_require}
              text={`畢業 ${overview.total}/${overview.total_require}`}
              initialAnimation
              styles={{
                path: { stroke: '#34855e' },
                text: { fill: '#34855e', fontSize: '12px' }
              }}
            />
          </div>
          <div className='col-xs-3 visible-xs' />
          <div className='col-xs-3 visible-xs' >
            <RwdIconButton />
          </div>

          <div className='hidden-xs col-sm-9 col-md-10 col-lg-10'>
            <DetailProgressBar />
          </div>
        </div>

        {/* for mobile screen */}
        <div className='visible-xs'>
          <div className='col-xs-12' style={{ marginTop: '3px' }}>
            <div className='green' /><div className='text'>已通過</div>
            <div className='red' /><div className='text'>未通過</div>
            <div className='gray' /><div className='text'>未修課</div>
            <div className='yellow' /><div className='text'>未抵免課程</div>
          </div>
          <div className='col-xs-12'>
            <div className='purple' /><div className='text'>免修或抵免課程</div>
            <div className='blue' /><div className='text'>當期課程</div>
          </div>
          <Divider style={{ marginBottom: '20px', marginTop: '20px', clear: 'both' }} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.overview,
  englishCheck: state.Student.Graduation.englishCheck,
  check: state.Student.Graduation.check,
  idCard: state.Student.Graduation.idCardForassistans,
  assis: state.Student.Graduation.assis
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
