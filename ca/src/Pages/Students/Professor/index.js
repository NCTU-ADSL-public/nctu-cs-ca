import React from 'react'
import FilterInput from './FilterInput'
import ProfessorList from './ProfessorList'
import FilterSelect from './FilterSelect'
import { connect } from 'react-redux'
import { fetchProfessors, changepage } from '../../../Redux/Students/Actions/Professor/index'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.props.FetchProfessorInfo()
  }
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 col-lg-4' style={{ position: 'fixed' }}>
            <div className='hidden-xs hidden-sm'>
              <FilterInput filterinput={this.filterinput} />
              <FilterSelect />
            </div>
          </div>
          <div className='col-md-3 col-lg-3 visible-xs visible-sm'>
            <FilterInput filterinput={this.filterinput} />
            {/* <FilterButton /> */}
          </div>
          <div className='col-md-4 col-lg-4' />
          <div className='col-md-8 col-lg-8' style={{ marginBottom: '100px' }}>
            <ProfessorList studentIdcard={this.props.studentIdcard} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProfessors()),
  FetchProfessorInfo: () => dispatch(fetchProfessors()),
  change_page: (page) => dispatch(changepage(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
