
import React from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import FilterInput from './FilterInput'
import FilterSelect from './FilterSelect'
import ProfessorCard from './ProfessorCard'
import { fetchProfessors } from '../../../Redux/Students/Actions/Professor'

class Index extends React.Component {
  // 在student head有fetch教授資料 這邊可能就不需要了
  // componentDidMount () {
  //   this.props.fetchData()
  // }

  render () {
    const { data, mentor, filter } = this.props.professors
    const professors = getFiltered(data, mentor, filter)
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='col-lg-5 col-lg-offset-1 col-md-6 col-xs-12'>
              <FilterInput filterinput={this.filterinput} />
            </div>
            <div className='col-lg-2 col-md-4 hidden-xs'>
              <FilterSelect />
            </div>
          </div>
          <div className='visible-xs' style={{ marginTop: '80px' }} />
          <div className='col-lg-10 col-lg-offset-1 col-md-12' style={{ marginBottom: '100px' }}>
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

const getFiltered = (data, mentor, filter) => {
  if (data.length === 0) return []

  let _data = [...data]

  // filter
  _data = _data.filter(t => (t.scount <= filter.scount))
  _data = _data.filter(item => (item.tname.search(filter.name) !== -1))

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
