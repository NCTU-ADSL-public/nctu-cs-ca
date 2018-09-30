import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({

})
const PROJECT_STATUS = ['已申請專題(新)', '已申請專題(舊)', '專題審核中', '未申請專題']
const PROJECT_STATUS_COLOR = ['green', 'blue', 'orange', 'red']

class StudentList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      panel_open: [...Array(10)].map( val => true)
    }
  }

  render() {

    const { students, classes } = this.props
    const { panel_open } = this.state

    return (
      students.map( ( student, index ) => {
        return (
          <div style = {{ margin: '5px auto', fontFamily: 'Noto Sans CJK TC' }}>
            <ExpansionPanel expanded = { panel_open[index] } onChange = { () => this.setState({ panel_open: panel_open.map( (val, i) => i === index ? !val : val) }) } >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div style = {{ width: '100%', display: 'flex' }}>
                  <div style = {{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{ student.student.id }</div>
                  <div style = {{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{ student.student.name }</div>
                  <div style = {{ fontSize: 20, flex: 0.3, textAlign: 'center', color: 'black' }} >{ student.student.program }</div>
                  <div style = {{ fontSize: 20, flex: 0.3, textAlign: 'center', color: PROJECT_STATUS_COLOR[student.project.status] }} variant="subheading" >{ PROJECT_STATUS[student.project.status] }</div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {
                  student.project.status != 3 ?
                  <div style = {{ width: '100%', display: 'flex' }} >
                    <div style = {{ fontSize: 17, flex: 0.5, textAlign: 'center' }} variant="display1" >{student.project.title}</div>
                    <div style = {{ fontSize: 17, flex: 0.5, textAlign: 'center' }} variant="display1" >{student.project.professor_name}</div>
                  </div>
                  :
                  <div style = {{ width: '100%', display: 'flex' }} >
                    <div style = {{ fontSize: 17, flex: 1, textAlign: 'center' }} variant="display1" >尚未申請專題</div>
                  </div>
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        )
      })
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentList))
