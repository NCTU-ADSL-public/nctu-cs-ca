import React from 'react'
import FilterInput from './FilterInput'
import ProfessorList from './ProfessorList'
import FilterSelect from './FilterSelect'
import FilterButton from './FilterButtonSelect'
import { connect } from 'react-redux'
import { fetchProfessors } from './Actions'

class Index extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-3 col-lg-3' style={{position: 'fixed'}}>
            <div className='hidden-xs hidden-sm'>
              <FilterInput filterinput={this.filterinput} />
              <FilterSelect />
            </div>
          </div>
          <div className='col-md-3 col-lg-3 visible-xs visible-sm'>
            <FilterInput filterinput={this.filterinput} />
            <FilterButton />
          </div>
          <div className='col-md-3 col-lg-3' />
          <div className='col-md-9 col-lg-9'>
            <ProfessorList studentIdcard={this.props.studentIdcard} />
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
