import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import GraduationList from './GraduationList'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FilterList from '@material-ui/icons/FilterList'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Done from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'
import QueryBuilder from '@material-ui/icons/QueryBuilder'
import FormControl from '@material-ui/core/FormControl'
import grey from '@material-ui/core/colors/grey'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import FirstPage from '@material-ui/icons/FirstPage'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import LastPage from '@material-ui/icons/LastPage'
import { fetchStudent, triggerUpdateData } from '../../../Redux/Assistants/Actions/Graduation_v2/index'
import Button from '@material-ui/core/Button'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import { CSVLink, CSVDownload } from "react-csv"

const styles = theme => ({
  container: {
    width: '90%',
    margin: '0 auto',
    marginBottom: '30px'
  },
  button: {
    fontSize: '10px',
  },
  cssLabel: {
    fontSize: 20,
    '&$cssFocused': {
      color: '#68BB66'
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#68BB66'
    },
  },
  chip: {
    margin: '10px',
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '20px',
    padding: '20px'
  },
  icon: {
    fontSize: '40px',
    display: 'inline-flex',
    verticalAlign: 'middle',
    color: grey[600],
    '&:hover': {
      color: grey[900],
      transition: 'color 0.5s'
    },
    transition: 'color 0.3s',
    marginRight: '10px',
    marginLeft: '10px'
  },
  filter: {
    minWidth: '400px',
    padding: '10px'
  }
})

const mapStateToProps = (state) => ({
  students: state.Assistant.Graduation.students,
  students_csv_data: state.Assistant.Graduation.students_csv_data,
  status: state.Assistant.Graduation.status,
})

const mapDispatchToProps = (dispatch) => ({
  fetch_students: (grade) => dispatch(fetchStudent(grade)),
  trigger_update_data: () => dispatch(triggerUpdateData())
})

class index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      grad_filter_status: [false, false, false],
      veri_filter_status: [false, false, false, false],
      program_filter_status: [false, false, false, false, false],
      input: '',
      open_filter: false,
      page: 0,
      studentsPerPage: 4,
      grade: '四'
    }
    props.fetch_students( this.state.grade )
  }

  PROGRAM_MAP_INDEX = (program) => {
    let ret = -1;
    switch(program) {
      case '網多':
        ret = 0;
        break;
      case '資電':
        ret = 1;
        break;
      case '資工A':
        ret = 3;
        break;
      case '資工B':
        ret = 4;
        break;
      default:
        console.log("program_filter_status switch error")
    }
    return ret;
  }

  DownLoadBtn = () => {
    const { classes, students_csv_data, status } = this.props
    if(status === 'start' || students_csv_data.length<1)
      return ''
    return(
      <CSVLink
        filename={this.state.grade + "年級畢業預審總表.csv"}
        data={students_csv_data}>
        <Button variant="contained" className={classes.button} >
          <CloudDownloadIcon style = {{ fontSize: '20px' }}/>
          下載
        </Button>
      </CSVLink>
    )
  }

  filter = (students) => {
    const { input, grad_filter_status, veri_filter_status, program_filter_status } = this.state
    return (
      students.filter( (student) =>
        (    input === ''
          || student.sname.toLowerCase().search(input.toLowerCase()) !== -1
          || student.student_id.search(input) !== -1
        )
        &&
        (
             !grad_filter_status.reduce( (haveTrue, value) => haveTrue || value, false)
          || grad_filter_status[parseInt(student.graduate_status, 10)]
        )
        &&
        (
             !veri_filter_status.reduce( (haveTrue, value) => haveTrue || value, false)
          || veri_filter_status[parseInt(student.submit_status, 10)]
        )
        &&
        (
             !program_filter_status.reduce( (haveTrue, value) => haveTrue || value, false)
          || program_filter_status[this.PROGRAM_MAP_INDEX(student.program)]
        )
      )
    )
  }

  toggleGradFilter = target => {
    this.setState({ grad_filter_status: this.state.grad_filter_status.map((value, index) => target === index ? !value : value ), page: 0 })
  }

  toggleVeriFilter = target => {
    this.setState({ veri_filter_status: this.state.veri_filter_status.map((value, index) => target === index ? !value : value), page: 0 })
  }

  toggleProgramFilter = target => {
    let new_program_filter_status = this.state.program_filter_status
    switch(target) {
    case 0:
    case 1:
    case 3:
    case 4:
      new_program_filter_status[target] = !new_program_filter_status[target]
      break;
    case 2:
      new_program_filter_status[2] = !new_program_filter_status[2]
      new_program_filter_status[3] = new_program_filter_status[2]
      new_program_filter_status[4] = new_program_filter_status[2]
      break;
    default:
      console.log("program_filter_status switch error")
    }
    let xor = new_program_filter_status[3] ^ new_program_filter_status[4]
    let and = new_program_filter_status[3] && new_program_filter_status[4]
    if (xor) new_program_filter_status[2] = false
    else if (and) new_program_filter_status[2] = true
    else new_program_filter_status[2] = false
    this.setState({ program_filter_status: new_program_filter_status, page: 0 })
  }

  render() {

    const { classes, students, fetch_students, trigger_update_data } = this.props
    const { grad_filter_status, open_filter, input, page, studentsPerPage, grade, veri_filter_status, program_filter_status } = this.state


    return (
      <div className = { classes.container } >
        <div className = 'row' style = {{ marginTop: '30px', marginBottom: '20px' }}>
          <div className = 'col-md-1 col-lg-1'>
          {
            <Button variant="contained" className = { classes.button } onClick = { () => trigger_update_data() }>
              更新db資料
            </Button>
          }
          </div>
          <div className = 'col-md-1 col-lg-1'>
            {this.DownLoadBtn()}
          </div>
          <div className = 'col-md-6 col-lg-6 col-xs-12' style = {{ display: 'flex' }} >
            <FilterList className = { classes.icon } onClick = { () => this.setState({ open_filter: true }) } />
            <Dialog
              onClose = { () => this.setState({ open_filter: false })}
              open = { open_filter }
              classes = {{
                paper: classes.filter
              }}
            >
              <DialogTitle><div style = {{ fontSize: '30px' }} >組別</div></DialogTitle>
              <div><hr style = {{ margin: 3 }}/></div>
              <div style = {{ display: 'flex', marginTop: '10px' }}>
                <Chip
                  label = {
                    <span>
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >資工</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleProgramFilter(2) }
                  style = {{ background: program_filter_status[2] ? blue[300] : null, flex: 1, marginTop: '3px', marginBottom: '3px' }}
                />
              </div>
              <div style = {{ display: 'flex' }}>
                {['資A', '資B'].map( (title, index) => (
                    <Chip
                      label = {
                        <span>
                          <div style = {{ display: 'inline', verticalAlign: 'middle' }} >{title}</div>
                        </span>
                      }
                      className = { classes.chip }
                      onClick = { () => this.toggleProgramFilter(index + 3) }
                      style = {{ background: program_filter_status[index + 3] ? blue[300] : null, flex: 0.5, marginTop: '3px', marginBottom: '3px' }}
                    />
                  ))
                }
              </div>
              <div style = {{ display: 'flex' }}>
                {['網多', '資電'].map( (title, index) => (
                  <Chip
                    label = {
                      <span>
                        <div style = {{ display: 'inline', verticalAlign: 'middle' }} >{title}</div>
                      </span>
                    }
                    className = { classes.chip }
                    onClick = { () => this.toggleProgramFilter(index) }
                    style = {{ background: program_filter_status[index] ? blue[300] : null, flex: 0.5, marginTop: '6px', marginBottom: '6px' }}
                  />
                  ))
                }
              </div>
              <DialogTitle><div style = {{ fontSize: '30px' }} >畢業狀態</div></DialogTitle>
              <div><hr style = {{ margin: 3 }}/></div>
              <div style = {{ display: 'flex' }}>
                <Chip
                  label = {
                    <span>
                      <Clear style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >未達標</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleGradFilter(0) }
                  style = {{ background: grad_filter_status[0] ? red[300] : null, flex: 0.33, marginTop: '6px', marginBottom: '6px' }}
                />
                <Chip
                  label = {
                    <span>
                      <QueryBuilder style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >將達標</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleGradFilter(1) }
                  style = {{ background: grad_filter_status[1] ? blue[300] : null, flex: 0.33, marginTop: '6px', marginBottom: '6px' }}
                />
                <Chip
                  label = {
                    <span>
                      <Done style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >已達標</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleGradFilter(2) }
                  style = {{ background: grad_filter_status[2] ? green[300] : null, flex: 0.33, marginTop: '6px', marginBottom: '6px' }}
                />
              </div>
              <DialogTitle><div style = {{ fontSize: '30px' }} >預審狀態</div></DialogTitle>
              <div><hr style = {{ margin: 3 }}/></div>
              <div style = {{ display: 'flex' }}>
                <Chip
                  label = {
                    <span>
                      <Clear style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >未審核</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleVeriFilter(0) }
                  style = {{ background: veri_filter_status[0] ? red[300] : null, flex: 0.5, marginTop: '6px', marginBottom: '6px' }}
                />
                <Chip
                  label = {
                    <span>
                      <QueryBuilder style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >審核中</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleVeriFilter(1) }
                  style = {{ background: veri_filter_status[1] ? blue[300] : null, flex: 0.5, marginTop: '6px', marginBottom: '6px' }}
                />
              </div>
              <div style = {{ display: 'flex' }}>
                <Chip
                  label = {
                    <span>
                      <Done style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >已通過</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleVeriFilter(2) }
                  style = {{ background: veri_filter_status[2] ? green[300] : null, flex: 0.5, marginTop: '6px', marginBottom: '6px' }}
                />
                <Chip
                  label = {
                    <span>
                      <Clear style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >未通過</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleVeriFilter(3) }
                  style = {{ background: veri_filter_status[3] ? red[300] : null, flex: 0.5, marginTop: '6px', marginBottom: '6px' }}
                />
              </div>
            </Dialog>
            <FormControl style = {{ width: '100%', flex: 1 }} >
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                搜尋學生 姓名 / 學號
              </InputLabel>
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
                onChange = {
                  (event) => {
                    this.setState({ input: event.target.value, page: 0 })
                    console.log(students)
                  }
                }
                value = { input }
              />
            </FormControl>
          </div>
          <div className = 'col-md-3 col-lg-3 col-xs-12' style = {{ display: 'flex' }} >
            <FormControl style = {{ width: '100%' }}>
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                學期
              </InputLabel>
              <Select
                input = {
                  <Input
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                }
                value = { grade }
                style = {{ fontSize: '15px' }}
                onChange={
                  (event) => {
                    fetch_students( event.target.value )
                    this.setState({ grade: event.target.value, page: 0 })
                  }
                }
              >
                <MenuItem value = { '一' } style = {{ fontSize: '20px' }} >一年級</MenuItem>
                <MenuItem value = { '二' } style = {{ fontSize: '20px' }} >二年級</MenuItem>
                <MenuItem value = { '三' } style = {{ fontSize: '20px' }} >三年級</MenuItem>
                <MenuItem value = { '四' } style = {{ fontSize: '20px' }} >四年級</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {
          <GraduationList students = {
            this.filter(students).sort( (a, b) => a.student_id - b.student_id )
                .slice(page * studentsPerPage, page * studentsPerPage + studentsPerPage)
              }
           />
        }
        <div style = {{ textAlign: 'center', marginTop: '10px', marginBottom: '50px' }} >
          <FirstPage className = { classes.icon } onClick = { () => this.setState({ page: 0 }) } />
          <ChevronLeft className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, page - 1) }) } />
          <span style = {{
            display: 'inline-flex',
            verticalAlign: 'middle',
            fontSize: '20px',
            marginRight: '20px',
            marginLeft: '20px'
          }}>{page + 1} / { Math.max(1, Math.ceil(this.filter(students).length / studentsPerPage)) }</span>
          <ChevronRight className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.min(Math.ceil(this.filter(students).length / studentsPerPage) - 1, page + 1)) }) } />
          <LastPage className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.ceil(this.filter(students).length / studentsPerPage) - 1) }) } />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
