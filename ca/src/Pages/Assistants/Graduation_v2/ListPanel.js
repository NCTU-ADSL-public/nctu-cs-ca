import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({

})

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({

})

class ListPanel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: true
    }
  }

  render() {

    const { classes, student } = this.props
    const { expanded } = this.state

    console.log("Hello")
    console.log(student)

    return (
      <ExpansionPanel expanded = { expanded } onChange = { () => this.setState({ expanded: !expanded }) } >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style = {{ display: 'flex' }} >
        <div style = {{ fontSize: '30px' }}>{student.name}</div>
        <div style = {{ fontSize: '20px' }}>{student.id  }</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListPanel))
