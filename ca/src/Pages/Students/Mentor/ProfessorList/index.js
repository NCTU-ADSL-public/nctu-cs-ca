import React from 'react'
import ProfessorOverviewCard from './Components/ProfessorOverviewCard'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

class ProfessorsList extends React.Component {
  render () {
    if (this.props.done) {
      return (
        this.props.professors.map(profile =>
          <ProfessorOverviewCard profile={profile} key={profile.tname} studentIdcard={this.props.studentIdcard} />
        )
      )
    }
    return (
      <CircularProgress />
    )
  }
}

const getVisibleProfessors = (data, mentor, filterInput) => {
  if (data.length === 0) return []
  let updatedList = data.filter((item) => {
    return (
      (item.tname.toLowerCase().search(
        filterInput.toLowerCase()) !== -1)
    )
  })

  let index = updatedList.findIndex((a) => {
    return a.tname === mentor
  })
  if (index === -1) return updatedList
  let object = {...updatedList[index]}
  updatedList[index] = {...updatedList[0]}
  updatedList[0] = {...object}

  return updatedList
}

const mapStateToProps = (state) => {
  return {
    professors: getVisibleProfessors(state.all.data, state.all.mentor, state.all.filter_string),
    done: state.all.status === 'DONE'
  }
}

export default connect(mapStateToProps)(ProfessorsList)
