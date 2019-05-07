
import React from 'react'
import { connect } from 'react-redux'
import OverViewSummary from './OverViewSummary'
import OverViewCard from './OverViewCard'
import PrintForm from './OverViewSummary/RwdIconButton/Print/PrintForm'
import { fetchGraduationCourse } from '../../../Redux/Students/Actions/Graduation'
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
  printData: state.Student.Graduation.data,
  studentIdcard: state.Student.User.studentIdcard,
  englishCheck: state.Student.Graduation.englishCheck,
  idCard: state.Student.Graduation.idCardForassistans,
  assis: state.Student.Graduation.assis,
  reviewCheck: state.Student.Graduation.check,
  generalCourseSelect: state.Student.Graduation.generalCourseSelect
})

const mapDispatchToProps = (dispatch) => ({
  fetchGraduationCourse: () => dispatch(fetchGraduationCourse())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
