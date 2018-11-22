import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import StudentList from './StudentList'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import LastPage from '@material-ui/icons/LastPage'
import { fetchStudents } from '../../../../Redux/Assistants/Actions/Project_v3/Student'
import grey from '@material-ui/core/colors/grey'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'
import orange from '@material-ui/core/colors/orange'
import red from '@material-ui/core/colors/red'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  root: {
    width: '60%',
    margin: '0 auto',
    marginTop: '20px',
    marginBottom: '60px'
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
  }
})

const FILTER_STATUS_COLOR = [green[300], blue[300], orange[300], red[400]]

class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      grade: "04",
      input: "",
      page: 0,
      number_per_page: 10,
      open_filter: false,
      filter_status: [false, false, false, false],
      panel_open: [...Array(10)].map( (x) => true)
    }
    props.fetch_students({ grade: this.state.grade })
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

  toggleFilter = target => {
    this.setState({ filter_status: this.state.filter_status.map((value, index) => target === index ? !value : value ), page: 0 })
  }

  render() {

    const { classes, fetch_students, students } = this.props
    const { input, page, number_per_page, open_filter, filter_status } = this.state

    return (
      <div className = { classes.root } >
        <div className = 'row' style = {{ marginTop: '30px', marginBottom: '20px' }}>
          <div className = 'col-md-6 col-lg-6 col-xs-12' style = {{ display: 'flex' }} >
            <FilterList className = { classes.icon } onClick = { () => this.setState({ open_filter: true }) } />
            <Dialog onClose = { () => this.setState({ open_filter: false })} open = { open_filter } >
              <DialogTitle><div style = {{ fontSize: '25px' }} >專題申請狀況</div></DialogTitle>
              <div style = {{ display: 'flex' }}>
              {
                ['已申請專題(新)', '已申請專題(舊)', '專題審核中', '未申請專題'].map( (title, index) => (
                  <Chip label = { title } className = { classes.chip } onClick = { () => this.toggleFilter(index) } style = {{ background: filter_status[index] ? FILTER_STATUS_COLOR[index] : null }} />
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
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                }
                value = { this.state.grade }
                style = {{ fontSize: '15px' }}
                onChange={
                  (event) => {
                    fetch_students({ grade: event.target.value })
                    this.setState({ grade: event.target.value, page: 0 })
                    console.log("Students Data")
                    console.log(students)
                    console.log("POST_Item")
                    console.log({ grade: event.target.value })
                  }
                }
              >
                {[...Array(9)].map((x, i) => <MenuItem value = { "0" + (i + 1) } style = {{ fontSize: '20px' }} >{"0" + (i + 1)}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>
        <div style = {{ minHeight: '570px' }} >
          <StudentList
            students = {
              this.filter(students).slice(number_per_page * page, number_per_page * (page + 1) )
            }
          />
        </div>
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

const mapStateToProps = (state) => ({
  students: state.Assistant.Project.Student.students
})

const mapDispatchToProps = (dispatch) => ({
  fetch_students: (post_item) => dispatch(fetchStudents(post_item))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
