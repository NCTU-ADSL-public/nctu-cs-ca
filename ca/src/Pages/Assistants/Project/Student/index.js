import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import FilterList from '@material-ui/icons/FilterList';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FirstPage from '@material-ui/icons/FirstPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import LastPage from '@material-ui/icons/LastPage';

import StudentList from './StudentList'

const styles = theme => ({
  root: {
    width: '80%',
    margin: '0 auto',
    marginTop: '20px',
    marginBottom: '60px'
  },
  row: {
    marginTop: '30px',
    marginBottom: '20px'
  },
  col: {
    display: 'flex',
    marginBottom: '20px'
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
  chip: {
    margin: '10px',
    fontSize: '15px',
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
    }
  }
})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

const FILTER_STATUS_COLOR = [green[300], blue[300], orange[300], red[400]]

class index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open_filter: false,
      filter_status: [...Array(4)].map( _ => false ),
      page: 0,
      input: '',
      grade: '04',
      number_per_page: 5,
      students: []
    }
  }

  toggleFilter = target => {
    const { filter_status } = this.state
    this.setState({
      filter_status: filter_status.map( (value, _) => (
        target === _ ? !value : value )
      ),
      page: 0
    })
  }

  filter = (students) => {
    const { input, filter_status } = this.state
    return (
      students.filter( (student) =>
        (    input === ''
          || student.student.name.toLowerCase().search(input.toLowerCase()) !== -1
          || student.student.id.search(input) !== -1
        )
        &&
        (
             !filter_status.reduce( (haveTrue, value) => haveTrue || value, false)
          || filter_status[student.project.status]
        )
      )
    )
  }

  render() {

    const {
      classes,
    } = this.props

    const {
      open_filter,
      filter_status,
      input,
      grade,
      page,
      students,
      number_per_page
    } = this.state

    return (
      <div className = { classes.root } >
        <div
          className = 'row'
          style = { styles.row }
        >
          <div
            className = 'col-md-6 col-lg-6 col-xs-12'
            style = {{ display: 'flex', marginBottom: '20px' }}
          >
            <FilterList
              className = { classes.icon }
              onClick = {
                () => this.setState({
                  open_filter: true
                })
              }
            />
            <Dialog
              onClose = {
                () => this.setState({
                  open_filter: false
                })
              }
              open = { open_filter }
            >
              <DialogTitle><div style = {{ fontSize: '25px' }} >專題申請狀況</div></DialogTitle>
              <div style = {{ display: 'flex' }}>
              {
                ['已申請專題(新)', '已申請專題(舊)', '專題審核中', '未申請專題'].map( (title, index) => (
                  <Chip
                    key = { index }
                    label = { title }
                    className = { classes.chip }
                    onClick = {
                      () => this.toggleFilter(index)
                    }
                    style = {{
                      background: filter_status[index] ? FILTER_STATUS_COLOR[index] : null
                    }}
                  />
                ))
              }
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
          <div className = 'col-md-6 col-lg-6 col-xs-12' >
            <FormControl style = {{ width: '100%' }}>
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                系級
              </InputLabel>
              <Select
                input = {
                  <Input
                    classes = {{
                      underline: classes.cssUnderline,
                    }}
                  />
                }
                value = { grade }
                onChange = {
                  (event) => {
                    this.setState({ grade: event.target.value })
                  }
                }
                style = {{ fontSize: '15px' }}
              >
                {[...Array(9)].map((x, i) => <MenuItem value = { "0" + (i + 1) } style = {{ fontSize: '20px' }} >{"0" + (i + 1)}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>
        <StudentList students = { this.filter(students).slice(number_per_page * page, number_per_page * (page + 1) ) } />
        <div style = {{ textAlign: 'center', marginTop: '10px', marginBottom: '50px' }} >
          <FirstPage className = { classes.icon } onClick = { () => this.setState({ page: 0 }) } />
          <ChevronLeft className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, page - 1) }) } />
          <span style = {{
            display: 'inline-flex',
            verticalAlign: 'middle',
            fontSize: '20px',
            marginRight: '20px',
            marginLeft: '20px'
          }}>{page + 1} / { Math.max(1, Math.ceil(this.filter(students).length / number_per_page)) }</span>
          <ChevronRight className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.min(Math.ceil(this.filter(students).length / number_per_page) - 1, page + 1)) }) } />
          <LastPage className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.ceil(this.filter(students).length / number_per_page) - 1) }) } />
        </div>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
