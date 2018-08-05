import React from 'react'

import {
  toggleProgramFilter,
  toggleProjectStatusFilter,
  setInput,
  setSemester,
  setAcademicYear
} from '../../../../Redux/Assistants/Actions/Project/Student/index'
import { connect } from 'react-redux'

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

  constructor(props) {
    super(props);
    this.state = {
      academic_year: 106,
      semester: 1
    }
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

  handleSemester = (event, index, value) => {
    this.setState({
      semester: value
    })
  }

  handleAcademicYear = (event, index, value) => {
    this.setState({
      academic_year: value
    })
  }

  render() {
    const {
      project_status_filter,
      program_filter,
      semester,
      academic_year,
      input,
      toggle_project_status_filter,
      toggle_program_filter,
      set_input,
      set_academic_year,
      set_semester
    } = this.props

    return (
      <div style = { styles.wrapper }>
        <div className = 'row' style={{ marginBottom: '50px', marginTop: '20px' }}>
          <div className = 'col-md-9 col-lg-9 hidden-xs' >
            <Paper style = { styles.paper } zDepth={3}>
              <TextField
                hintText          = "學號 / 姓名"
                floatingLabelText = "搜尋欄位"
                value             = { input }
                style             = { styles.searchTextField }
                onChange          = { (event) => set_input(event.target.value) }
              />
              <StudentsTable />
            </Paper>
          </div>
          <div className='col-md-3 col-lg-3 hidden-xs' >
            <Paper style = { styles.paper } zDepth={3}>
              <br />
              <h3>學期</h3>
              <DropDownMenu
                value     = { academic_year }
                onChange  = { (event, index, value) => set_academic_year(value) }
                style     = { styles.dropDownMenu }
                autoWidth = { false }
              >
                <MenuItem value = { 106 } primaryText = "106" />
                <MenuItem value = { 107 } primaryText = "107" />
                <MenuItem value = { 108 } primaryText = "108" />
              </DropDownMenu>
              <DropDownMenu
                value     = { semester }
                onChange  = { (event, index, value) => set_semester(value) }
                style     = { styles.dropDownMenu }
                autoWidth = { false }
              >
                <MenuItem value = { 1 } primaryText = "上學期" />
                <MenuItem value = { 2 } primaryText = "下學期" />
              </DropDownMenu>
              <hr />
              <h3>專題狀況</h3>
              <br />
              {filterData.projectStatus.map((item, index) => (
                <div key = { index } >
                  <Chip
                    onClick         = { () => toggle_project_status_filter(index) }
                    backgroundColor = { project_status_filter[index] ? item.color : null }
                    style           = { styles.chip }
                    labelStyle      = { styles.chipText }
                  >
                    { item.title }
                  </Chip>
                  <br />
                </div>
              ))}
              <hr />
              <h3>組別</h3>
              <br />
              {
                [0, 2, 4].map( (beginNumber) => (
                  <div key = { beginNumber }>
                    <div className = 'row'>
                      {
                        [0, 1].map( (diffNumber) => (
                          <div key = { diffNumber } className='col-md-6 col-lg-6 hidden-xs' >
                            <Chip
                              onClick         = { () => toggle_program_filter(beginNumber + diffNumber) }
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

const mapStateToProps = (state) => ({
  project_status_filter: state.Assistant.Project.Student.project_status_filter,
  program_filter       : state.Assistant.Project.Student.program_filter,
  semester             : state.Assistant.Project.Student.semester,
  academic_year        : state.Assistant.Project.Student.academic_year,
  input                : state.Assistant.Project.Student.input
})

const mapDispatchToProps = (dispatch) => ({
  toggle_project_status_filter: (index) => dispatch(toggleProjectStatusFilter(index)),
  toggle_program_filter       : (index) => dispatch(toggleProgramFilter(index)),
  set_input                   : (input) => dispatch(setInput(input)),
  set_academic_year           : (value) => dispatch(setAcademicYear(value)),
  set_semester                : (value) => dispatch(setSemester(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentsItem)
