import React from 'react'
import { connect } from 'react-redux'

import {
  setSemester,
  setAcademicYear,
  setFirstSecond,
  downloadCsv,
  fetchScore,
  setInput
} from '../../../../Redux/Assistants/Actions/Project/Score/index'

import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';


import ScoreTable from './ScoreTable'

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
  dropDownMenu: {
    width: '50%'
  },
  checkbox: {
    marginBottom: 16,
  },
  searchTextField: {
    width: '90%',
    marginLeft: '30px',
    fontSize: '20px',
    marginButton: '20px'
  }
}

class ScoreItem extends React.Component {

  render() {

    const {
      semester,
      academic_year,
      first_second,
      set_semester,
      set_academic_year,
      set_first_second,
      download_csv,
      fetch_score,
      input,
      set_input
    } = this.props

    return (
      <div style = { styles.wrapper }>
        <div className='row' style={{marginBottom: '50px', marginTop: '20px'}}>
          <div className='col-md-9 col-lg-9 hidden-xs' >
            <Paper style = { styles.paper } zDepth={3}>
              <TextField
                hintText          = "學號 / 學生姓名 / 教授姓名"
                floatingLabelText = "搜尋欄位"
                value             = { input }
                style             = { styles.searchTextField }
                onChange          = { (event) => set_input(event.target.value) }
              />
              <ScoreTable />
            </Paper>
          </div>
          <div className='col-md-3 col-lg-3 hidden-xs' >
            <Paper style = { styles.paper } zDepth={3}>
              <br />
              <h3>學期</h3>
              <hr />
              <DropDownMenu
                value = { academic_year }
                onChange = { (event, index, value) => {
                  set_academic_year(value);
                  fetch_score({
                    semester: `${value}-${semester}`,
                    first_second
                  });
                }}
                style = { styles.dropDownMenu }
                autoWidth = { false }
              >
                <MenuItem value = { 106 } primaryText = "106" />
                <MenuItem value = { 107 } primaryText = "107" />
                <MenuItem value = { 108 } primaryText = "108" />
              </DropDownMenu>
              <DropDownMenu
                value = { semester }
                onChange = { (event, index, value) => {
                  set_semester(value);
                  fetch_score({
                    semester: `${academic_year}-${value}`,
                    first_second
                  });
                }}
                style = { styles.dropDownMenu }
                autoWidth = { false }
              >
                <MenuItem value = { 1 } primaryText = "上學期" />
                <MenuItem value = { 2 } primaryText = "下學期" />
              </DropDownMenu>
              <br />
              <br />
              <br />
              <hr />
              <h3>資工專題</h3>
              <br />
              <RadioButtonGroup
                defaultSelected = { first_second }
                onChange = { (event, value) => {
                  set_first_second(value)
                  fetch_score({
                    semester:  `${academic_year}-${semester}`,
                    first_second: value
                  })
                }}
              >
                <RadioButton
                  value = {1}
                  label = "資工專題(一)"
                  style = {styles.radioButton}
                />
                <RadioButton
                  value = {2}
                  label = "資工專題(二)"
                  style = {styles.radioButton}
                />
              </RadioButtonGroup>
              <br />
              <RaisedButton
                backgroundColor = '#ccc'
                fullWidth = {true}
                icon = {<FontIcon className="material-icons" >cloud_download</FontIcon> }
                onClick = { () => download_csv({semester: `${academic_year}-${semester}`, first_second }) }
              />
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  semester: state.Assistant.Project.Score.semester,
  academic_year: state.Assistant.Project.Score.academic_year,
  first_second: state.Assistant.Project.Score.first_second,
  input: state.Assistant.Project.Score.input
})

const mapDispatchToProps = (dispatch) => ({
  set_semester: (value) => dispatch(setSemester(value)),
  set_academic_year: (value) => dispatch(setAcademicYear(value)),
  set_first_second: (value) => dispatch(setFirstSecond(value)),
  download_csv: (post_item) => dispatch(downloadCsv(post_item)),
  fetch_score: (post_item) => dispatch(fetchScore(post_item)),
  set_input: (value) => dispatch(setInput(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScoreItem)
