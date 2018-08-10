import Button from '@material-ui/core/Button'
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { ShowCourseCondition } from '../../../../../Redux/Students/Actions/Map'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

class Index extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        {/*<Button variant='contained' fullWidth className={classes.button} onClick={() => this.props.ShowCourseCondition()}>*/}
          {/*修課狀況*/}
        {/*</Button>*/}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ShowCourseCondition: () => dispatch(ShowCourseCondition())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Index))
