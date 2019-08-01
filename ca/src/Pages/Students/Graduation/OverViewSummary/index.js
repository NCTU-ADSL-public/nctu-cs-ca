
import React from 'react'
import { connect } from 'react-redux'
import CircularProgressbar from 'react-circular-progressbar'
import Divider from '@material-ui/core/Divider'
import RwdIconButton from './RwdIconButton'
import DetailProgressBar from './DetailProgressBar'

const reviewStatus = {
  '0': '未送審',
  '1': '審核中',
  '2': '審核通過',
  '3': '審核不通過'
}
const englishStatus = {
  '0': '未考過英檢',
  '1': '通過外語榮譽學分（可免修外語）',
  '2': '已通過英檢免試申請',
  '3': '已考過英檢',
  '4': '已考過英檢'
}

class Index extends React.Component {
  render () {
    const { check, englishCheck, overview } = this.props

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
                  是否已考過英檢：{ englishStatus[englishCheck] }
                </div>
                <div>
                  畢業預審是否已送交助理審核：
                  <span style={{ color: '#FF0000' }}>{ reviewStatus[check] }</span>
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
  overview: state.Student.Graduation.detail.overview,
  englishCheck: state.Student.Graduation.english.check,
  check: state.Student.Graduation.getReview.check,
  idCard: state.Student.Graduation.assistant.idCard,
  assis: state.Student.Graduation.assistant.using
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
