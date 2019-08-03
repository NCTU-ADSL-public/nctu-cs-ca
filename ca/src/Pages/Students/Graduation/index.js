
import React from 'react'
import { connect } from 'react-redux'
import OverViewSummary from './OverViewSummary'
import OverViewCard from './OverViewCard'
import PrintForm from './OverViewSummary/RwdIconButton/Print/PrintForm'
import './style.css'

class Index extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row showArea' style={{ marginBottom: '50px' }}>
          <div className='col-md-12 col-lg-12 hidden-xs' style={{ marginTop: '30px' }}>
            <OverViewSummary />
          </div>
          <div className='col-md-3 col-lg-3 hidden-xs' style={{ height: '100%' }} />
          <div className='col-xs-12 col-sm-12 visible-xs' >
            <OverViewSummary rwd />
          </div>
          <div className='col-md-1 col-lg-1' />
          <div className=' col-md-12 col-lg-12 pull-left hidden-xs' style={{ marginTop: '20px' }}>
            <OverViewCard studentIdcard={this.props.studentIdcard} />
          </div>
          <div className=' col-xs-12 visible-xs' style={{ marginTop: '20px' }}>
            <OverViewCard rwd studentIdcard={this.props.studentIdcard} />
          </div>
        </div>
        <div id='printArea'>
          <PrintForm
            profile={this.props.studentIdcard}
            idCard={this.props.idCard}
            assis={this.props.assis}
            graduationCheckEnglishTest={this.props.englishCheck}
            courseCategoryArray={this.props.printData}
            reviewCheck={this.props.reviewCheck}
            generalCourseSelect={this.props.generalCourseSelect}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  printData: state.Student.Graduation.detail.data,
  studentIdcard: state.Student.User.studentIdcard,
  englishCheck: state.Student.Graduation.english.check,
  idCard: state.Student.Graduation.assistant.idCard,
  assis: state.Student.Graduation.assistant.using,
  reviewCheck: state.Student.Graduation.getReview.check,
  generalCourseSelect: state.Student.Graduation.getReview.generalCourseSelect
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
