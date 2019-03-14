
import React from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import FilterInput from './FilterInput'
import FilterSelect from './FilterSelect'
import ProfessorCard from './ProfessorCard'
import { fetchProfessors } from '../../../Redux/Students/Actions/Professor'

class Index extends React.Component {
  componentDidMount () {
    this.props.fetchData()
  }

  render () {
    const { data, mentor, page } = this.props.professors
    const filterInput = this.props.professors.filter_string
    const projectNumber = this.props.professors.project_number
    const professors = filter(data, mentor, filterInput, page, projectNumber)

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
            {
              professors && professors.length
                ? professors.map((data, index) => (
                  <ProfessorCard data={data} key={index} studentIdcard={this.props.studentIdcard} />
                ))
                : <CircularProgress />
            }
          </div>
        </div>
      </div>
    )
  }
}

const filter = (data, mentor, filterInput, page, projectNumber) => {
  if (data.length === 0) return []
  
  let number = parseInt(projectNumber, 10)
  let _data = [...data]

  // filter
  _data = _data.filter(t => (Number(t.scount) >= number))
  _data = _data.filter(item => (item.tname.search(filterInput) !== -1))

  // search mentor
  let index = _data.findIndex(item => (item.tname === mentor))
  if (index === -1) return _data

  // swap mentor to first element
  let object = { ..._data[index] }
  _data[index] = { ..._data[0] }
  _data[0] = { ...object }

  return _data
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  professors: state.Student.Professor
})
const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchProfessors())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
