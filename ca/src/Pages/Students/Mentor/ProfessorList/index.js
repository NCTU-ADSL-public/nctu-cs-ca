import React from 'react'
import ProfessorOverviewCard from './ProfessorOverviewCard'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

class ProfessorsList extends React.Component {
  render () {
    let id = 0
    if (this.props.done) {
      return (
        <div>
          {this.props.professors.map(profile =>
            <ProfessorOverviewCard profile={profile} key={id++} studentIdcard={this.props.studentIdcard} />
        )}
        </div>
      )
    }
    return (
      <CircularProgress />
    )
  }
}

const getVisibleProfessors = (data, mentor, filterInput, page) => {
  if (data.length === 0) return []
  // filter
  let updatedList = data.filter((item) => {
    return (
      (item.tname.toLowerCase().search(
        filterInput.toLowerCase()) !== -1)
    )
  })

  const onePage = 7
  let idx = page - 1

  // search mentor
  let index = updatedList.findIndex((a) => {
    return a.tname === mentor
  })
  if (index === -1) {
    // handle page
    updatedList.slice(idx * onePage, (idx + 1) * onePage)
    return updatedList
  }
  let object = {...updatedList[index]}
  updatedList[index] = {...updatedList[0]}
  updatedList[0] = {...object}

  // handle page
  updatedList.slice(idx * onePage, (idx + 1) * onePage)

  return updatedList
}

const mapStateToProps = (state) => {
  return {
    professors: getVisibleProfessors(state.Student.Professor.data, state.Student.Professor.mentor, state.Student.Professor.filter_string, state.Student.Professor.page),
    done: state.Student.Professor.status === 'DONE'
  }
}

export default connect(mapStateToProps)(ProfessorsList)
