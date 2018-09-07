import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({

})
const PROJECT_STATUS = ['已申請專題', '專題審核中', '未申請專題']
const PROJECT_STATUS_COLOR = ['green', 'orange', 'red']

class StudentList extends React.Component {

  constructor() {
    super()
    this.state = {

    }
  }

  render() {

    const { students, classes } = this.props

    return (
      students.map( ( student ) => {
        return (
          <div style = {{ margin: '15px auto', fontFamily: 'Noto Sans CJK TC' }}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div style = {{ width: '100%', display: 'flex' }}>
                  <div style = {{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} variant="display1" >{ student.student.id }</div>
                  <div style = {{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} variant="display1" >{ student.student.name }</div>
                  <div style = {{ fontSize: 20, flex: 0.3, textAlign: 'center', color: 'black' }} variant="display1" >{ student.student.program }</div>
                  <div style = {{ fontSize: 20, flex: 0.3, textAlign: 'center', color: PROJECT_STATUS_COLOR[student.project.status] }} variant="subheading" >{ PROJECT_STATUS[student.project.status] }</div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {
                  student.project.status != 2 ?
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
