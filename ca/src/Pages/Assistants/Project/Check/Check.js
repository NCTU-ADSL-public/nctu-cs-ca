import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'


const styles = theme => ({
  container: {
    width: '80%',
    margin: '0 auto'
  }
})

class Check extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        
    }
  }

  render () {
    const { classes } = this.props;
    const {  } = this.state;

    return (
      <div className={classes.container}>
      {
        this.props.Check.checks.map( check => (
          <div>
            {check.id}
          </div>
        ))
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Check: state.Assistant.Project.Check,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Check))