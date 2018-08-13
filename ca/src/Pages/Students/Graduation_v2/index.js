import React from 'react'
import GraduationOverViewButton from './GraduationOverViewButton'
import GraduationOverViewCard from './GraduationOverViewCard'
import { connect } from 'react-redux'
import PrintForm from './GraduationOverViewButton/Component/PrintBtn/PrintForm'
import './index.css'

class Index extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row showArea' style={{marginBottom: '50px'}}>
          <div className='col-md-3 col-lg-3 hidden-xs hidden-sm fixed' style={{left: '40px', top: '80px'}}>
            <GraduationOverViewButton />
          </div>
          <div className='col-md-3 col-lg-3 hidden-xs' style={{height: '100%'}} />
          <div className='col-xs-12 col-sm-12 visible-xs' >
            <GraduationOverViewButton rwd />
          </div>
          <div className='col-md-1 col-lg-1' />
          <div className=' col-md-8 col-lg-8 pull-left hidden-xs' style={{marginTop: '20px'}}>
            <GraduationOverViewCard studentIdcard={this.props.studentIdcard} />
          </div>
          <div className=' col-xs-12 visible-xs' style={{marginTop: '20px'}}>
            <GraduationOverViewCard rwd studentIdcard={this.props.studentIdcard} />
          </div>
        </div>
        <div id='printArea'>
          <PrintForm profile={this.props.studentIdcard} graduationCheckEnglishTest={this.props.englishCheck} courseCategoryArray={this.props.printdata} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  printdata: state.Student.Graduation.printdata,
  studentIdcard: state.Student.User.studentIdcard,
  englishCheck: state.Student.Graduation.englishCheck,
  done: state.Student.Graduation.status === 'DONE'
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
