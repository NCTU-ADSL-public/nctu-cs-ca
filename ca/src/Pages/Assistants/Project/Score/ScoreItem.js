import React from 'react'
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

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

  constructor() {
    super();
    this.state = {
      academic_year: 106,
      semestor: 1
    }
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
    return (
      <div style = { styles.wrapper }>
        <div className='row' style={{marginBottom: '50px', marginTop: '20px'}}>
          <div className='col-md-9 col-lg-9 hidden-xs' >
            <Paper style = { styles.paper } zDepth={3}>
            </Paper>
          </div>
          <div className='col-md-3 col-lg-3 hidden-xs' >
            <Paper style = { styles.paper } zDepth={3}>
              <hr />
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
              <h3>資工專題</h3>
              <hr />
              <Checkbox
                style = { styles.checkbox }
                label = "資工專題(一)"
              />
              <Checkbox
                style = { styles.checkbox }
                label = "資工專題(二)"
              />
              <RaisedButton
                backgroundColor = '#ccc'
                fullWidth = {true}
                icon = {<FontIcon className="material-icons" >cloud_download</FontIcon>}
              />
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default ScoreItem
