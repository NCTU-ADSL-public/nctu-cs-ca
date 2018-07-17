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

const getVisibleProfessors = (data, filterInput) => {
  if (data.length === 0) return []
  let updatedList = data
  updatedList = updatedList.filter((item) => {
    return (
      (item.tname.toLowerCase().search(
        filterInput.toLowerCase()) !== -1)
    )
  })
  return updatedList
}

const mapStateToProps = (state) => ({
  professors: getVisibleProfessors(state.all.data, state.all.filter_string),
  done: state.all.status === 'DONE'
})

export default connect(mapStateToProps)(ProfessorsList)
