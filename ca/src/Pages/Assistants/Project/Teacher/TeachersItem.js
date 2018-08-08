import React from 'react'
import {
  setInput,
  setSemester,
  setAcademicYear
} from '../../../../Redux/Assistants/Actions/Project/Teacher/index'
import { connect } from 'react-redux'


import Paper from 'material-ui/Paper';
import TeachersTable from './TeachersTable'
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
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
    width: '100%',
    marginLeft: '30px',
    fontSize: '20px',
    marginButton: '20px'
  },
  dropDownMenu: {
    width: '100%',
  }
}

class TeachersItem extends React.Component {

  render() {

    const {
      set_input,
      input,
      academic_year,
      semester,
      set_semester,
      set_academic_year
    } = this.props

    return (
      <div style = { styles.wrapper } >
        <div className = 'row' style={{marginBottom: '50px', marginTop: '20px'}}>
          <div className = 'col-md-12 col-lg-12 hidden-xs' >
            <Paper style = { styles.paper } zDepth = { 3 } >
              <div className = 'row'>
                <div className = 'col-md-8 col-lg-8 hidden-xs' >
                  <TextField
                    hintText          = "姓名"
                    floatingLabelText = "搜尋欄位"
                    style             = { styles.searchTextField }
                    onChange          = { (event) => set_input(event.target.value) }
                    value             = { input }
                  />
                </div>
                <div className = 'col-md-2 col-lg-2 hidden-xs' style = {{ marginTop: '17px' }} >
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
                </div>
                <div className = 'col-md-2 col-lg-2 hidden-xs' style = {{ marginTop: '17px'}} >
                  <DropDownMenu
                    value     = { semester }
                    onChange  = { (event, index, value) => set_semester(value) }
                    style     = { styles.dropDownMenu }
                    autoWidth = { false }
                  >
                    <MenuItem value = { 1 } primaryText = "上學期" />
                    <MenuItem value = { 2 } primaryText = "下學期" />
                  </DropDownMenu>
                </div>
              </div>
              <TeachersTable />
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  input         : state.Assistant.Project.Teacher.input,
  academic_year : state.Assistant.Project.Teacher.academic_year,
  semester      : state.Assistant.Project.Teacher.semester
})

const mapDispatchToProps = (dispatch) => ({
  set_input: (value) => dispatch(setInput(value)),
  set_semester: (value) => dispatch(setSemester(value)),
  set_academic_year: (value) => dispatch(setAcademicYear(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeachersItem)
