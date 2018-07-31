import React from 'react'
import Paper from 'material-ui/Paper';
import StudentsTable from './StudentsTable'
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { blue300, yellow300, red300, green300 } from 'material-ui/styles/colors';

import axios from 'axios'

const styles = {
  wrapper: {
    width: '80%',
    margin: 'auto'
  },
  paper: {
    background: '#FFFFFF',
    padding: '20px',
    height: '80vh'
  },
  searchTextField: {
    width: '90%',
    marginLeft: '30px',
    fontSize: '20px',
    marginButton: '20px'
  },
  chip: {
    width: '100%',
    margin: '0 auto',
  },
  chipText: {
    margin: '0 auto',
  },
  dropDownMenu: {
    width: '50%'
  }
}

const filterData = {
  projectStatus: [{
      title: '已申請教授',
      color: green300
    },{
      title: '待教授審核',
      color: yellow300
    },{
      title: '未申請教授',
      color: red300
    }
  ],
  program: ['資工A', '資工B', '網多', '資電', '電資學士班', '其他']
}

class StudentsItem extends React.Component {

  constructor() {
    super();
    this.state = {
      students: [],
      project_status_filter: [true, true, true],
      program_filter: [true, true, true, true, true, true],
      input: '',
      academic_year: 106,
      semestor: 1
    }
  }

  componentDidMount() {
    axios.get('/assistants/project/StudentResearchList').then( res => {
      this.setState({
        students: res.data
      })
    })
  }

  toggleProjectStatusFilter = (index) => {
    const new_project_status_filter = this.state.project_status_filter.slice()
    new_project_status_filter[index] = !this.state.project_status_filter[index]
    this.setState({
      project_status_filter: new_project_status_filter
    })
  }

  toggleProgramFilter = (index) => {
    const new_program_filter = this.state.program_filter.slice()
    new_program_filter[index] = !this.state.program_filter[index]
    this.setState({
      program_filter: new_program_filter
    })
  }

  handleTextField = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  mapProgramStringToNumber = (program) => {
    switch (program) {
      case '資工A':
        return 0
      case '資工B':
        return 1
      case '網多':
        return 2
      case '資電':
        return 3
      case '電資學士班':
        return 4
      default:
        return 5
    }
  }

  filter = (students) => {
    const { project_status_filter, program_filter, input } = this.state
    const filtered_students = students.filter( (student) => (
      project_status_filter[student.project.status] &&
      program_filter[this.mapProgramStringToNumber(student.student.program)] &&
      (
        input === '' ||
        student.student.id.toLowerCase().search(input.toLowerCase()) !== -1 ||
        student.student.name.toLowerCase().search(input.toLowerCase()) !== -1
      )
    ))
    return filtered_students
  }
  handleSemestor = (event, index, value) => {
    this.setState({
      semestor: value
    })
  }
  handleAcademicYear = (event, index, value) => {
    this.setState({
      academic_year: value
    })
  }

  render() {
    const { students, project_status_filter, program_filter } = this.state
    return (
      <div style = { styles.wrapper }>
        <div className='row' style={{marginBottom: '50px', marginTop: '20px'}}>
          <div className='col-md-9 col-lg-9 hidden-xs' >
            <Paper style = { styles.paper } zDepth={3}>
              <TextField
                hintText          = "學號 / 姓名"
                floatingLabelText = "搜尋欄位"
                style             = { styles.searchTextField }
                onChange          = { this.handleTextField }
              />
              <StudentsTable students = { this.filter(students) }/>
            </Paper>
          </div>
          <div className='col-md-3 col-lg-3 hidden-xs' >
            <Paper style = { styles.paper } zDepth={3}>
              <h3>學期</h3>
              <hr />
              <DropDownMenu
                value={this.state.academic_year}
                onChange={this.handleAcademicYear}
                style={styles.dropDownMenu}
                autoWidth={false}
              >
                <MenuItem value = { 106 } primaryText = "106" />
                <MenuItem value = { 107 } primaryText = "107" />
                <MenuItem value = { 108 } primaryText = "108" />
              </DropDownMenu>
              <DropDownMenu
                value={this.state.semestor }
                onChange={this.handleSemestor}
                style={styles.dropDownMenu}
                autoWidth={false}
              >
                <MenuItem value = { 1 } primaryText = "上學期" />
                <MenuItem value = { 2 } primaryText = "下學期" />
              </DropDownMenu>
              <hr />
              <h3>專題狀況</h3>
              <hr />
              {filterData.projectStatus.map((item, index) => (
                <div key = { index } >
                  <Chip
                    onClick         = { () => this.toggleProjectStatusFilter(index) }
                    backgroundColor = { project_status_filter[index] ? item.color : null }
                    style           = { styles.chip }
                    labelStyle      = { styles.chipText }
                  >
                    { item.title }
                  </Chip>
                  <br />
                </div>
              ))}
              <br />
              <hr />
              <h3>組別</h3>
              <hr />
              {
                [0, 2, 4].map( (beginNumber) => (
                  <div key = { beginNumber }>
                    <div className = 'row'>
                      {
                        [0, 1].map( (diffNumber) => (
                          <div key = { diffNumber } className='col-md-6 col-lg-6 hidden-xs' >
                            <Chip
                              onClick         = { () => this.toggleProgramFilter(beginNumber + diffNumber) }
                              backgroundColor = { program_filter[beginNumber + diffNumber] ? blue300 : null }
                              style           = { styles.chip }
                              labelStyle      = { styles.chipText }
                            >
                              { filterData.program[beginNumber + diffNumber] }
                            </Chip>
                          </div>
                      ))}
                    </div>
                    <br />
                  </div>
                ))
              }
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentsItem
