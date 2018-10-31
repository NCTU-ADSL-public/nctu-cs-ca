import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListCard from './ListCard'

const styles = theme => ({

})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

class GraduationListPanel extends React.Component {


  render() {

    const { students, classes } = this.props
    return students.map( student => <ListCard student = { student } />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GraduationListPanel))
