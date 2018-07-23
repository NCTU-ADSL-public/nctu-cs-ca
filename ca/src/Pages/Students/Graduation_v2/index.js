import React from 'react'
import GraduationOverViewButton from './GraduationOverViewButton'
import GraduationOverViewCard from './GraduationOverViewCard'
import { connect } from 'react-redux'
import { fetchProfessors } from '../Mentor/Actions'

class Index extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className='container'>
        <div className='row' style={{marginBottom: '50px'}}>
          <div className='col-md-3 col-lg-3 hidden-xs' >
            <GraduationOverViewButton />
          </div>
          <div className='col-xs-12 col-sm-12 visible-xs' >
            <GraduationOverViewButton rwd />
          </div>
          <div className='col-md-1 col-lg-1' />
          <div className=' col-md-8 col-lg-8 hidden-xs' style={{marginTop: '20px'}}>
            <GraduationOverViewCard studentIdcard={this.props.studentIdcard} />
          </div>
          <div className=' col-xs-12 col-lg-12 visible-xs' style={{marginTop: '20px'}}>
            <GraduationOverViewCard rwd studentIdcard={this.props.studentIdcard} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  done: state.all.status === 'DONE'
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProfessors())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
