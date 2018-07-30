import React from 'react'
import FilterInput from './FilterInput'
import ProfessorList from './ProfessorList'
import FilterSelect from './FilterSelect'
import FilterButton from './FilterButtonSelect'
import { connect } from 'react-redux'
import { fetchProfessors, changepage } from '../../../Redux/Students/Actions/Professor/index'

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
          <div className='col-md-9 col-lg-9' style={{marginBottom: '100px'}}>
            <ProfessorList studentIdcard={this.props.studentIdcard} />
            <div className='btn-group' role='group' aria-label='Basic example'>
              <button type='button' className='btn btn-secondary' onClick={()=>this.props.change_page(1)}>1</button>
              <button type='button' className='btn btn-secondary' onClick={()=>this.props.change_page(2)}>2</button>
              <button type='button' className='btn btn-secondary' onClick={()=>this.props.change_page(3)}>3</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProfessors()),
  change_page: (page) => dispatch(changepage(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
