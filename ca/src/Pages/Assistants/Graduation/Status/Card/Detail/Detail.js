import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Compulsory from './Compulsory/Compulsory'
import OtherCourse from './OtherCourse'

const styles = theme => ({

})

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { classes, student } = this.props

    return (
      <div style={{ width: '85%', paddingLeft: '20px' }}>
        <Compulsory student={student} />
        <hr />
        <OtherCourse student={student} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  Status: state.Assistant.Graduation.Status,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Detail))