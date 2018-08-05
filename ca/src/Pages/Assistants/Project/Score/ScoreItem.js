import React from 'react'
import { connect } from 'react-redux'

import {
  setSemestor,
  setAcademicYear,
  setFirstSecond,
  downloadCsv,
  fetchScore
} from '../../../../Redux/Assistants/Actions/Project/Score/index'

import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

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
}

class ScoreItem extends React.Component {

  render() {

    const {
      semestor,
      academic_year,
      first_second,
      set_semestor,
      set_academic_year,
      set_first_second,
      download_csv,
      fetch_score
    } = this.props

    return (
      <div style = { styles.wrapper }>
        <div className='row' style={{marginBottom: '50px', marginTop: '20px'}}>
          <div className='col-md-9 col-lg-9 hidden-xs' >
            <Paper style = { styles.paper } zDepth={3}>
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
                onChange = { (event, index, value) => { set_academic_year(value); fetch_score({semestor: `${value}-${semestor}`, first_second }); } }
                style = { styles.dropDownMenu }
                autoWidth = { false }
              >
                <MenuItem value = { 106 } primaryText = "106" />
                <MenuItem value = { 107 } primaryText = "107" />
                <MenuItem value = { 108 } primaryText = "108" />
              </DropDownMenu>
              <DropDownMenu
                value = { semestor }
                onChange = { (event, index, value) => {
                  set_semestor(value)
                  fetch_score({
                    semestor: `${academic_year}-${value}`,
                    first_second
                  })
                }}
                style = { styles.dropDownMenu }
                autoWidth = { false }
              >
                <MenuItem value = { 1 } primaryText = "上學期" />
                <MenuItem value = { 2 } primaryText = "下學期" />
              </DropDownMenu>
              <hr />
              <h3>資工專題</h3>
              <br />
              <RadioButtonGroup
                defaultSelected = { first_second }
                onChange = { (event, value) => {
                  set_first_second(value)
                  fetch_score({
                    semestor:  `${academic_year}-${semestor}`,
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
                icon = {<FontIcon className="material-icons" >cloud_download</FontIcon>}
                onClick = { () => download_csv({semestor: `${academic_year}-${semestor}`, first_second }) }
              />
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  semestor: state.Assistant.Project.Score.semestor,
  academic_year: state.Assistant.Project.Score.academic_year,
  first_second: state.Assistant.Project.Score.first_second
})

const mapDispatchToProps = (dispatch) => ({
  set_semestor: (value) => dispatch(setSemestor(value)),
  set_academic_year: (value) => dispatch(setAcademicYear(value)),
  set_first_second: (value) => dispatch(setFirstSecond(value)),
  download_csv: (post_item) => dispatch(downloadCsv(post_item)),
  fetch_score: (post_item) => dispatch(fetchScore(post_item))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScoreItem)
