import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ListCard from './ListCard'

const styles = theme => ({

})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

class GraduationListPanel extends React.Component {
<<<<<<< HEAD
  render () {
    const { students } = this.props
    return students.map(student => <ListCard student={student} />)
=======


  render() {

    const { students } = this.props
    return students.map( student => <ListCard student = { student } />)
>>>>>>> 7be29eae045461c853189fefa4a8b14a2c3e132b
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GraduationListPanel))
