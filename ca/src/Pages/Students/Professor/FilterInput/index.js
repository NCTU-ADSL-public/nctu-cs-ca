import React from 'react'
import './index.css'
import { filterInput } from '../../../../Redux/Students/Actions/Professor/index'
import { connect } from 'react-redux'

const styles = {
  filter: {
    padding: '30px 0 0 0'
  }
}

const Filter = ({ onChange }) => (
  <div style={styles.filter}>
    <div className='professor-list-filter-list'>
      <input type='text'
        placeholder='搜尋 教授姓名'
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  </div>
)
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(filterInput(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
