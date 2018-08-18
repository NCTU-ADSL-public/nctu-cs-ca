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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';


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
  },
  textField: {
    width: '100%',
    margin: '0 auto'
  },
  //style for font size
  resize:{
    fontSize:25
  },
  button: {
    width: '90%',
    height: '58px',
    margin: '0 auto',
    borderRadius: '30px'
  },
  chip: {
    margin: '10px',
    fontSize: '20px',
  },
});

class index extends React.Component {
  constructor(props) {
    super(props)
    props.fetch_teachers();
    this.state = {
      academic_year: 106,
      semester: 2,
      first_second: 1,
      page: 1,
      input: ''
    }
  }

  filter = (teachers) => {
    const { input } = this.state
    return (
      teachers.filter( (teacher) => (
         input === '' || teacher.professor_name.toLowerCase().search(input.toLowerCase()) !== -1
      ))
    )
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
  handleInput = (event) => {
    this.setState({ input: event.target.value, page: 1 })
  }
  classifyStudents = (statusObject) => {
    let classifiedStudents = [[], [], [], [], []]
    const { academic_year } = this.state;
    if (statusObject) {
      statusObject.projects.map( (project) => {
        project.students.map(student => {
          if (1 <= ((academic_year - 106 + 6 - parseInt(student.id[1])) % 9 + 1 ) && (academic_year - 106 + 6 - parseInt(student.id[1])) % 9 + 1 <= 4)
            classifiedStudents[(academic_year - 106 + 6 - parseInt(student.id[1])) % 9 + 1].push(student)
          else
            classifiedStudents[0].push(student)
        })
      })
    }
    return classifiedStudents
  }
  idToStr = (index) => {
    const { academic_year } = this.state
    switch (index) {
      case 1:
        return "大一"
        break;
      case 2:
        return "大二"
        break;
      case 3:
        return "大三"
        break;
      case 4:
        return "大四"
      default:
        return "其他"
    }
  }

  render() {

    const { classes, teachers } = this.props
    const { academic_year, semester, first_second, page, input } = this.state
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
                  <MenuItem value={106} style = {{ fontSize: '20px' }}>106</MenuItem>
                  <MenuItem value={107} style = {{ fontSize: '20px' }}>107</MenuItem>
                  <MenuItem value={108} style = {{ fontSize: '20px' }}>108</MenuItem>
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
                  <MenuItem value={1} style = {{ fontSize: '20px' }}>上學期</MenuItem>
                  <MenuItem value={2} style = {{ fontSize: '20px' }}>下學期</MenuItem>
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
                  <MenuItem value={1} style = {{ fontSize: '20px' }}>專題一</MenuItem>
                  <MenuItem value={2} style = {{ fontSize: '20px' }}>專題二</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
        </div>
        <div className = 'row' style={{ marginBottom: '20px', marginTop: '20px' }}>
          <div className = 'col-md-8 col-lg-8 col-xs-12'>
            <TextField
              label          = "搜尋欄位(教授姓名)"
              InputProps={{
                classes: {
                  input: classes.resize,
                }
              }}
              InputLabelProps = {{
                classes: {
                  root: classes.resize
                }
              }}
              className={classes.textField}
              onChange          = { this.handleInput }
              value             = { input }
            />
          </div>
          <div className = 'col-md-4 col-lg-4 col-xs-12' >
            <Button variant="contained" className={classes.button}>
              <div style = {{ fontSize: '20px' }}>匯出成績</div>
            </Button>
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
            onClick = { () => page != 1 && this.setState({ page: page - 1 }) }
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
          }}>{ page } / { Math.max(Math.ceil(this.filter(teachers).length / 8), 1) }</span>
          <i
            className="material-icons"
            onClick = { () => page < Math.ceil(this.filter(teachers).length / 8) && this.setState({ page: page + 1 }) }
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
            onClick = { () => this.setState({ page: Math.ceil(this.filter(teachers).length / 8) }) }
            style = {{
              display: 'inline-flex',
              verticalAlign: 'middle',
              fontSize: '50px'
            }}
          >
            last_page
          </i>
        </div>
        <div style = {{ minHeight: '550px' }}>
          {this.filter(teachers)
          .slice((page - 1) * 8, (page) * 8)
          .map( (teacher, index) => (
            <ExpansionPanel key = { index } style = {{ margin: '10px auto'}}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="display2" className={classes.heading} style = {{ width: '100px' }} >{teacher.professor_name}</Typography>
                <LinearProgress variant="determinate"
                  value={teacher.accepted_number / Math.max(teacher.accepted_number, 7) * 100}
                  style = {{ flex: 0.6, margin: '10px auto' }}
                />
                <Typography variant="display1" style = {{ width: '100px', margin: '5px auto' }}>{teacher.accepted_number} / { Math.max(teacher.accepted_number, 7) }</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style = {{ display: 'block' }}>
                <Typography variant="display1" className={classes.heading}><span style = {{ color: 'green' }}>已接受</span> {teacher.accepted_number}人</Typography>
                {
                  this.classifyStudents(teacher.accepted).map( (students, index) => {
                    if (students.length !== 0) {
                      return (
                        <div key = {index} >
                          <h4>{ this.idToStr(index) } <span style = {{ fontSize: '20px' }}>{students.length}人</span></h4>
                          {
                            students.map( (student) => (
                              <Tooltip title="Add" placement="top">
                                <Chip label={ student.id + " " + student.name } className = { classes.chip } />
                              </Tooltip>
                            ))
                          }
                        </div>
                      )
                    }
                  })
                }
                <hr />
                <Typography variant="display1" className={classes.heading}><span style = {{ color: 'orange' }}>待審核</span> { teacher.pending_number }人</Typography>
                {
                  this.classifyStudents(teacher.pendding).map( (students, index) => {
                    if (students.length !== 0) {
                      return (
                        <div key = {index} >
                          <h4>{ this.idToStr(index) }</h4>
                          {
                            students.map( (student) => (
                              <Tooltip title="Add" placement="top">
                                <Chip label={ student.id + " " + student.name } className={classes.chip} />
                              </Tooltip>
                            ))
                          }
                        </div>
                      )
                    }
                  })
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
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
            onClick = { () => page != 1 && this.setState({ page: page - 1 }) }
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
          }}>{ page } / { Math.max(Math.ceil(this.filter(teachers).length / 8), 1) }</span>
          <i
            className="material-icons"
            onClick = { () => page < Math.ceil(this.filter(teachers).length / 8) && this.setState({ page: page + 1 }) }
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
            onClick = { () => this.setState({ page: Math.ceil(this.filter(teachers).length / 8) }) }
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
  teachers  : state.Assistant.Project.teachers,
})

const mapDispatchToProps = (dispatch) => ({
  // fetch_students: () => dispatch(fetchStudents()),
  fetch_teachers: () => dispatch(fetchTeachers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
