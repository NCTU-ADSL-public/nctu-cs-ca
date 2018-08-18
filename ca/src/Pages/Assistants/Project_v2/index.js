import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress';

import { fetchTeachers } from '../../../Redux/Assistants/Actions/Project_v2/index'

const styles = theme => ({
  container: {
    width: '90%',
    margin: '0 auto'
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  }
});

class index extends React.Component {
  constructor(props) {
    super(props)
    props.fetch_teachers();
    this.state = {
      academic_year: 106,
      semester: 2,
      first_second: 1,
      page: 1
    };
  }


  handleAcademicYear = (event) => {
    this.setState({ academic_year: event.target.value })
  }
  handleSemester = (event) => {
    this.setState({ semester: event.target.value })
  }
  handleFirstSecond = (event) => {
    this.setState({ first_second: event.target.value })
  }

  render() {

    const { classes, teachers } = this.props
    const { academic_year, semester, first_second, page } = this.state

    return (
      <div style = {{
        width: '90%',
        margin: '0 auto'
      }}>
        <div className = 'row' style={{ marginBottom: '20px', marginTop: '20px' }}>
          <div className = 'col-md-4 col-lg-4 col-xs-12' >
            <form className={classes.root} autoComplete="off">
              <FormControl fullWidth>
                <InputLabel style = {{
                  fontSize: '20px'
                }}>學年度</InputLabel>
                <Select
                  value={academic_year}
                  onChange={this.handleAcademicYear}
                  style = {{
                    fontSize: '25px'
                  }}
                >
                  <MenuItem value={106}>106</MenuItem>
                  <MenuItem value={107}>107</MenuItem>
                  <MenuItem value={108}>108</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
          <div className = 'col-md-4 col-lg-4 col-xs-12' >
            <form className={classes.root} autoComplete="off">
              <FormControl fullWidth>
                <InputLabel style = {{
                  fontSize: '20px'
                }}>學期</InputLabel>
                <Select
                  value={semester}
                  onChange={this.handleSemester}
                  style = {{
                    fontSize: '25px'
                  }}
                >
                  <MenuItem value={1}>上學期</MenuItem>
                  <MenuItem value={2}>下學期</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
          <div className = 'col-md-4 col-lg-4 col-xs-12' >
            <form className={classes.root} autoComplete="off">
              <FormControl fullWidth classes = {{
                root: {
                  minHeight: '300px'
                }
              }}>
                <InputLabel style = {{
                  fontSize: '20px'
                }}>專題</InputLabel>
                <Select
                  value={first_second}
                  onChange={this.handleFirstSecond}
                  style = {{
                    fontSize: '25px'
                  }}
                >
                  <MenuItem value={1}>專題一</MenuItem>
                  <MenuItem value={2}>專題二</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
        </div>
        <div style = {{ margin: '20px', textAlign: 'center' }} >
          <i
            className="material-icons"
            onClick = { () => this.setState({ page: 1 }) }
            style = {{
              display: 'inline-flex',
              verticalAlign: 'middle',
              fontSize: '50px'
            }}
          >
            first_page
          </i>
          <i
            className="material-icons"
            onClick = { () => this.setState({ page: page - 1 }) }
            style = {{
              display: 'inline-flex',
              verticalAlign: 'middle',
              fontSize: '50px'
            }}
          >
            chevron_left
          </i>
          <span style = {{
            display: 'inline-flex',
            verticalAlign: 'middle',
            fontSize: '30px'
          }}>{ page }</span>
          <i
            className="material-icons"
            onClick = { () => this.setState({ page: page + 1 }) }
            style = {{
              display: 'inline-flex',
              verticalAlign: 'middle',
              fontSize: '50px'
            }}
          >
            chevron_right
          </i>
          <i
            className="material-icons"
            onClick = { () => this.setState({ page: page + 1 }) }
            style = {{
              display: 'inline-flex',
              verticalAlign: 'middle',
              fontSize: '50px'
            }}
          >
            last_page
          </i>
        </div>
        {teachers
        .slice((page - 1) * 8, (page) * 8)
        .map( (teacher, index) => (
          <ExpansionPanel key = { index } style = {{ margin: '10px auto'}}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="display2" className={classes.heading} style = {{ flex: 0.2, margin: '0 auto' }} >{teacher.professor_name}</Typography>
              <LinearProgress variant="buffer"
                value={teacher.accepted_number / Math.max(teacher.accepted_number + teacher.pending_number, 7) * 100}
                valueBuffer={teacher.pendding_number / Math.max(teacher.accepted_number + teacher.pending_number, 7) * 100}
                style = {{ flex: 0.6, margin: '10px auto' }}
              />
              <Typography variant="display1" style = {{ margin: '5px auto' }}>{teacher.accepted_number} / { Math.max(teacher.accepted_number, 7) }</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style = {{ display: 'block' }}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="display2" className={classes.heading}>已接受</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style = {{ display: 'block' }}>
                  {
                    teacher.accepted.projects.map( (project, index) => (
                      <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="display2" className={classes.heading}>{project.title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style = {{ display: 'block' }}>
                        {
                          project.students.map( (student, index) => (
                            <h1>{student.id + " " + student.name }</h1>
                          ))
                        }
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    ))
                  }
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="display2" className={classes.heading}>待審核</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style = {{ display: 'block' }}>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
        <div style = {{ margin: '20px', textAlign: 'center' }} >
          <i
            className="material-icons"
            onClick = { () => this.setState({ page: 1 }) }
            style = {{
              display: 'inline-flex',
              verticalAlign: 'middle',
              fontSize: '50px'
            }}
          >
            first_page
          </i>
          <i
            className="material-icons"
            onClick = { () => this.setState({ page: page - 1 }) }
            style = {{
              display: 'inline-flex',
              verticalAlign: 'middle',
              fontSize: '50px'
            }}
          >
            chevron_left
          </i>
          <span style = {{
            display: 'inline-flex',
            verticalAlign: 'middle',
            fontSize: '30px'
          }}>{ page }</span>
          <i
            className="material-icons"
            onClick = { () => this.setState({ page: page + 1 }) }
            style = {{
              display: 'inline-flex',
              verticalAlign: 'middle',
              fontSize: '50px'
            }}
          >
            chevron_right
          </i>
          <i
            className="material-icons"
            onClick = { () => this.setState({ page: page + 1 }) }
            style = {{
              display: 'inline-flex',
              verticalAlign: 'middle',
              fontSize: '50px'
            }}
          >
            last_page
          </i>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  // students              : state.Assistant.Project.Student.students,
  teachers : state.Assistant.Project.teachers
})

const mapDispatchToProps = (dispatch) => ({
  // fetch_students: () => dispatch(fetchStudents()),
  fetch_teachers: () => dispatch(fetchTeachers())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
