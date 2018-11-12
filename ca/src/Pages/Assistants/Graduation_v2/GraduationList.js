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


  render() {

    const { students } = this.props
    return students.map( student => <ListCard student = { student } />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GraduationListPanel))
