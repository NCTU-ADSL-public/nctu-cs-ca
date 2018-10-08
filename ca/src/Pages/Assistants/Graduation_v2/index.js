import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

import GraduationList from './GraduationList'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FilterList from '@material-ui/icons/FilterList';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import QueryBuilder from '@material-ui/icons/QueryBuilder';
import FormControl from '@material-ui/core/FormControl';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  container: {
    width: '70%',
    margin: '0 auto',
    marginBottom: '30px'
  },
  cssLabel: {
    fontSize: 20,
    '&$cssFocused': {
      color: 'rgb(0, 188, 212)'
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: 'rgb(0, 188, 212)'
    },
  },
  chip: {
    margin: '10px',
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '20px',
    padding: '10px'
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
})

const mapStateToProps = (state) => ({
  students: state.Assistant.Graduation.students
})

const mapDispatchToProps = (dispatch) => ({

})

class index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      filter_status: [false, false, false],
      input: '',
      open_filter: false
    }
  }

  filter = (students) => {
    const { input, filter_status } = this.state
    return (
      students.filter( (student) =>
        (    input === ''
          || student.name.toLowerCase().search(input.toLowerCase()) !== -1
          || student.id.search(input) !== -1
        )
        &&
        (
             !filter_status.reduce( (haveTrue, value) => haveTrue || value, false)
          || filter_status[parseInt(student.status)]
        )
      )
    )
  }

  toggleFilter = target => {
    this.setState({ filter_status: this.state.filter_status.map((value, index) => target === index ? !value : value ), page: 0 })
  }

  render() {

    const { classes, students } = this.props
    const { filter_status, open_filter, input } = this.state



    return (
      <div className = { classes.container } >
        <div className = 'row' style = {{ marginTop: '30px', marginBottom: '20px' }}>
          <div className = 'col-md-6 col-lg-6 col-xs-12' style = {{ display: 'flex' }} >
            <FilterList className = { classes.icon } onClick = { () => this.setState({ open_filter: true }) } />
            <Dialog onClose = { () => this.setState({ open_filter: false })} open = { open_filter } >
              <DialogTitle><div style = {{ fontSize: '30px' }} >畢業預審狀況</div></DialogTitle>
              <div style = {{ display: 'flex' }}>
                <Chip
                  label = {
                    <span>
                      <Clear style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >未達標</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleFilter(0) }
                  style = {{ background: filter_status[0] ? red[300] : null }}
                />
                <Chip
                  label = {
                    <span>
                      <QueryBuilder style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >將達標</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleFilter(1) }
                  style = {{ background: filter_status[1] ? blue[300] : null }}
                />
                <Chip
                  label = {
                    <span>
                      <Done style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >已達標</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleFilter(2) }
                  style = {{ background: filter_status[2] ? green[300] : null }}
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
                onChange = { (event) => this.setState({ input: event.target.value, page: 0 }) }
                value = { input }
              />
            </FormControl>
          </div>
        </div>
        <GraduationList students = { this.filter(students) }/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
