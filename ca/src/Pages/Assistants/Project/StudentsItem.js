import React from 'react'
import Paper from 'material-ui/Paper';
import StudentsTable from './StudentsTable'
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

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
  }
}

const filterData = {
  projectStatus: [
    {
      title: '已申請教授',
      color: green300
    },
    {
      title: '待教授審核',
      color: yellow300

    },
    {
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
      program_filter: [true, true, true, true, true, true]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/students').then( res => {
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
    const { project_status_filter, program_filter } = this.state
    const filtered_students = students.filter( (student) => (
      project_status_filter[student.project.status] &&
      program_filter[this.mapProgramStringToNumber(student.student.program)]
    ))
    return filtered_students
  }

  render() {
    const { students, project_status_filter, program_filter } = this.state
    return (
      <div style = { styles.wrapper }>
        <div className='row' style={{marginBottom: '50px', marginTop: '20px'}}>
          <div className='col-md-9 col-lg-9 hidden-xs' >
            <Paper style = { styles.paper } zDepth={3}>
              <TextField
                hintText          = "學號/姓名/組別"
                floatingLabelText = "搜尋欄位"
                style             = { styles.searchTextField }
              />
              <StudentsTable students = { this.filter(students) }/>
            </Paper>
          </div>
          <div className='col-md-3 col-lg-3 hidden-xs' >
            <Paper style = { styles.paper } zDepth={3}>
              <hr />
              <h3>專題狀況</h3>
              <hr />
              {filterData.projectStatus.map((item, index) => (
                <div>
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
                  <div>
                    <div className = 'row'>
                      {
                        [0, 1].map( (diffNumber) => (
                          <div className='col-md-6 col-lg-6 hidden-xs' >
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
