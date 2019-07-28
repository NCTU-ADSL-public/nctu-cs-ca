import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import LinearProgress from '@material-ui/core/LinearProgress'

import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'
import yellow from '@material-ui/core/colors/yellow'
import green from '@material-ui/core/colors/green'

import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

import {
  fetchStatus
} from '../../../../Redux/Assistants/Actions/Project/Status'

const ADD_STATUS_COLOR = [red['A100'], green[300]]
const STATUS_COLOR_L = [red[100], green[200]]
const FILTER_STATUS_COLOR = [red['A100'], yellow[300]]
const STUDENT_STATUS_CN = ['外', '本']
const PROJECT_FIRST_SECOND_CN = ['', '專題一', '專題二', '需確認是否過基礎程式設計']

const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '50px'
  },
  warningText: {
    fontSize: '30px',
    flex: 1,
    textAlign: 'center',
    color: '#6f6f6f'
  },
  chip: {
    margin: '10px',
    fontSize: '15px',
  },
})

class Status extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.Status.year !== "" &&
      nextProps.Status.semester !== "" &&
      nextProps.Status.first_second !== ""
    ) {
      
      nextProps.fetch_status({
        year: nextProps.Status.year,
        semester: nextProps.Status.semester,
        first_second: nextProps.Status.first_second
      })
    }
  }

  render () {
    const { classes, Status } = this.props;
    const {  } = this.state;

    return (
      Status.year === '' ? (
        <div style = {{ display: 'flex', width: '100%' }}>
          <div style = {{ flex: 0.1 }}/>
          <div className={classes.warningText}>
            請選取學年
          </div>
          <div style = {{ flex: 0.1 }} />
        </div>
      ) : Status.semester === '' ? (
        <div style = {{ display: 'flex', width: '100%' }}>
          <div style = {{ flex: 0.1 }}/>
          <div className={classes.warningText}>
            請選取學期
          </div>
          <div style = {{ flex: 0.1 }} />
        </div>
      ) : Status.first_second === '' ? (
        <div style = {{ display: 'flex', width: '100%' }}>
          <div style = {{ flex: 0.1 }}/>
          <div className={classes.warningText}>
            請選取專題
          </div>
          <div style = {{ flex: 0.1 }} />
        </div>
      ) : (
        <div className={classes.container} >
        {
          Status.teachers.map( (teacher, idx) => 
            <div key={idx} style={{ width: '80%', margin: '0 auto', marginBottom: '20px' }}>
              <ExpansionPanel expanded>
                <ExpansionPanelSummary>
                  <div style={{ width: '100%', display: 'flex' }} >
                    <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{teacher.professor_name}</div>
                    <LinearProgress variant="determinate"
                      value={ teacher.gradeCnt / 7 * 100 }
                      style={{ flex: 0.6, margin: '10px auto' }}
                    />
                    <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{teacher.gradeCnt} 人</div>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div style = {{ width: '100%' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '30px' }}>接受列表</div>
                    {
                      teacher.accepted.projects.length !== 0 ? (
                        <div style={{ display: 'block' }}>
                        <hr />
                        {
                          teacher.accepted.projects.map( (project, idx) => (
                            <div key={idx}>
                              <div style={{ fontSize: '20px', color: 'black', fontWeight: 'bold'}}>
                                { project.title }
                              </div>
                              <br />
                              {
                                project.students.map( (student, idx) => (
                                  <Chip
                                    label={student.id + " " + student.name}
                                    className={classes.chip}
                                    style={{ background: ADD_STATUS_COLOR[parseInt(student.add_status, 10)] }}
                                    avatar={<Avatar style={{ fontSize: 20, background: STATUS_COLOR_L[parseInt(student.add_status, 10)] }}>{STUDENT_STATUS_CN[parseInt(student.status, 10)]}</Avatar>}
                                  />
                                ))
                              }
                              <hr />
                            </div>
                          ))
                        }
                        </div>
                      ) : (
                        <div style={{ width: '100%', display: 'flex', justifyContent: "center" }}>
                          <div style={{ fontSize: 18, color: grey[500] }} >尚未有接受的專題</div>
                        </div>
                      )
                    }
                    <div style={{ fontWeight: 'bold', fontSize: '30px' }}>審核列表</div>
                    {
                      teacher.pending.projects.length !== 0 ? (
                        ''
                      ) : (
                        <div style={{ width: '100%', display: 'flex', justifyContent: "center" }}>
                          <div style={{ fontSize: 18, color: grey[500] }} >尚未有申請的專題</div>
                        </div>
                      )
                    }
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          )
        }
        </div>
      )
    )
  }
}

const mapStateToProps = (state) => ({
  Status: state.Assistant.Project.Status,
})

const mapDispatchToProps = (dispatch) => ({
  fetch_status: (payload) => dispatch(fetchStatus(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Status))