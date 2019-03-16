
import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../../../../Redux/Students/Actions/Professor/index'
import './style.css'

const Filter = props => (
  <div className='professor-list-filter-list'>
    <input type='text'
      placeholder='搜尋 教授姓名'
      value={props.name}
      onChange={(event) => props.onChange(event.target.value)}
    />
  </div>
)

const mapStateToProps = (state) => ({
  name: state.Student.Professor.filter.name
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(updateFilter({ name: value }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
