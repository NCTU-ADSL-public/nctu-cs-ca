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
  warningTextSmall: {
    fontSize: '20px',
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

  warningText = (text, css) => {
    const { classes } = this.props
    return (
      <div style = {{ display: 'flex', width: '100%' }}>
        <div style = {{ flex: 0.1 }}/>
        <div className={css}>
          {text}
        </div>
        <div style = {{ flex: 0.1 }} />
      </div>
    )
  }

  input_filter = (teachers, target) => {
    return teachers.filter( teacher => {
      return (
        target === '' || 
        teacher.professor_name.search(target) !== -1 ||
        teacher.accepted.projects.reduce( (project_prev, project) =>
          project_prev |= project.students.reduce( (student_prev, student) =>
            student_prev |= student.id.search(target) !== -1 || student.name.search(target) !== -1
          ,0)
        ,false)
      )
    })
  }

  hightlight = (label, raw_input) => {
    if (raw_input === '')
      return label
    const target = new RegExp(raw_input,"gi");
    var result, indices = [];
    while ( (result = target.exec(label)) ) {
        indices.push(result.index);
    }
    indices.push(label.length)
    return indices.length ? (
      <span>
        <span>{label.substr(0, indices[0])}</span>
        {
          indices.map( (index, idx) =>
            <span key={idx}>
              <span style={{background: 'yellow'}}>{label.substr(index, raw_input.length)}</span>
              <span>{idx === indices.length - 1 ? '' : label.substr(index + raw_input.length, indices[idx + 1] - index - raw_input.length)}</span>
            </span>
          )
        }
      </span>
    ) : label
  }

  render () {
    const { classes, Status } = this.props;
    const {  } = this.state;

    return (
      Status.year === '' ? (
        this.warningText("請選取學年", classes.warningText)
      ) : Status.semester === '' ? (
        this.warningText("請選取學期", classes.warningText)
      ) : Status.first_second === '' ? (
        this.warningText("請選取專題", classes.warningText)
      ) : (
        <div className={classes.container} >
        {
          this.input_filter(Status.teachers, Status.input).length ? 
            this.input_filter(Status.teachers, Status.input).map( (teacher, idx) => 
              <div key={idx} style={{ width: '80%', margin: '0 auto', marginBottom: '20px', background: 'red' }}>
                <ExpansionPanel expanded>
                  <ExpansionPanelSummary>
                    <div style={{ width: '100%', display: 'flex' }} >
                      <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{this.hightlight(teacher.professor_name, Status.input)}</div>
                      <LinearProgress variant="determinate"
                        value={ teacher.gradeCnt / 7 * 100 }
                        style={{ flex: 0.6, margin: '10px auto' }}
                      />
                      <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{teacher.gradeCnt} 人</div>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div style={{ width: '100%' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '25px' }}>接受列表</div>
                      <hr style={{marginTop: '1px'}} />
                      {
                        teacher.accepted.projects.length !== 0 ? (
                          teacher.accepted.projects.map( (project, idx) => 
                            <div key={idx} style={{ paddingLeft: '10px'}}>
                              <div style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>
                                { this.hightlight(project.title, Status.input) }
                              </div>
                              {
                                project.students.map( (student, idx) => (
                                  <Chip
                                    label={this.hightlight(student.id + " " + student.name, Status.input)}
                                    className={classes.chip}
                                    style={{ background: ADD_STATUS_COLOR[parseInt(student.add_status, 10)] }}
                                    avatar={<Avatar style={{ fontSize: 20, background: STATUS_COLOR_L[parseInt(student.add_status, 10)] }}>{STUDENT_STATUS_CN[parseInt(student.status, 10)]}</Avatar>}
                                  />
                                ))
                              }
                              <br />
                              <br />
                              <br />
                            </div>
                          )
                        ) : this.warningText("無資料", classes.warningTextSmall)
                      }
                      <div style={{ fontWeight: 'bold', fontSize: '25px' }}>審核列表</div>
                      <hr style={{marginTop: '1px'}} />
                      {
                        teacher.pending.projects.length !== 0 ? (
                          teacher.pending.projects.map( (project, idx) => 
                            <div key={idx} style={{ paddingLeft: '10px'}}>
                              <div style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>
                                { project.title }
                              </div>
                              {
                                project.students.map( (student, idx) => (
                                  <Chip
                                    label={this.hightlight(student.id + " " + student.name, Status.input)}
                                    className={classes.chip}
                                    style={{ background: yellow[300] }}
                                    avatar={<Avatar style={{ fontSize: 20, background: yellow[200] }}>{STUDENT_STATUS_CN[parseInt(student.status, 10)]}</Avatar>}
                                  />
                                ))
                              }
                              <br />
                              <br />
                              <br />
                            </div>
                          )
                        ) : this.warningText("無資料", classes.warningTextSmall)
                      }
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            ) : this.warningText("找不到符合的資料，點此可以清掉所有搜尋條件", classes.warningText)
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
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Status))