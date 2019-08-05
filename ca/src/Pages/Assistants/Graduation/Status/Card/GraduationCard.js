import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Overview from './Overview'
import Detail from './Detail/Detail'


const styles = theme => ({
  card: {
    marginBottom: '10px',
    width: '95%',
    margin: '0 auto'
  },

})

class GraduationCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { classes, student } = this.props

    return (
      <Card className={classes.card} >
        <CardContent style={{ display: 'flex' }}>
          <Overview student={student} />
          <Detail student={student} />
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  Status: state.Assistant.Graduation.Status,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GraduationCard))