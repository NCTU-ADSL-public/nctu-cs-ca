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
        <div className='row'>
          <div className='col-md-3 col-lg-3' >
            <div className=''>
              <GraduationOverViewButton />
            </div>
          </div>
          <div className='col-md-3 col-lg-3 visible-xs visible-sm'>
          </div>
          <div className='col-md-3 col-lg-3' />
          <div className='col-md-9 col-lg-9'>
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
