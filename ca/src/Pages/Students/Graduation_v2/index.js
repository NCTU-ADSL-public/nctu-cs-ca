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
          <div className='col-md-3 col-lg-3' >
            <GraduationOverViewButton />
          </div>
          <div className='col-md-3 col-lg-3 visible-xs visible-sm'>
          </div>
          <div className='col-md-1 col-lg-1' />
          <div className='col-md-8 col-lg-8' style={{marginTop: '20px'}}>
            <GraduationOverViewCard studentIdcard={this.props.studentIdcard} />
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
