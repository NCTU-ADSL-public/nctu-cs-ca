import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Student from './Student'

const styles = theme => ({

})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

class StudentList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {

    const { classes, students } = this.props

    return (
      <div style = {{ height: '650px' }}>
        {students.map( (student) => <Student student = { student } /> )}
      </div>
    )

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentList))
