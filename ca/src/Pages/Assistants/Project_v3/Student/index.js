import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import purple from '@material-ui/core/colors/purple';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import StudentList from './StudentList'
import FirstPage from '@material-ui/icons/FirstPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import LastPage from '@material-ui/icons/LastPage';
import { fetchStudents } from '../../../../Redux/Assistants/Actions/Project_v3/Student'

const styles = theme => ({
  root: {
    width: '60%',
    margin: '0 auto',
    marginTop: '20px',
    marginBottom: '100px'
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
  icon: {
    fontSize: '40px',
    display: 'inline-flex',
    verticalAlign: 'middle',
  }
})

class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      grade: "04",
      input: "",
      page: 0,
      number_per_page: 10
    }
    props.fetch_students({ grade: this.state.grade })
  }

  filter = (students) => {
    const { input } = this.state
    return (
      students.filter( (student) => input === ''
                          || student.student.name.toLowerCase().search(input.toLowerCase()) !== -1
                          || student.student.id.search(input) !== -1
      )
    )
  }

  render() {

    const { classes, fetch_students, students } = this.props
    const { input, page, number_per_page, grade, max_page } = this.state

    return (
      <div className = { classes.root } >
        <div className = 'row' style = {{ marginTop: '30px' }}>
          <div className = 'col-md-6 col-lg-6 col-xs-12' >
            <FormControl style = {{ width: '100%' }}>
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
        <div style = {{ textAlign: 'center', marginTop: '10px' }} >
          <FirstPage className = { classes.icon } onClick = { () => this.setState({ page: 0 }) } />
          <ChevronLeft className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, page - 1) }) } />
          <span style = {{
            display: 'inline-flex',
            verticalAlign: 'middle',
            fontSize: '20px'
          }}>{page + 1} / { Math.max(1, Math.ceil(this.filter(students).length / number_per_page)) }</span>
          <ChevronRight className = { classes.icon } onClick = { () => this.setState({ page: Math.min(Math.ceil(this.filter(students).length / number_per_page) - 1, page + 1) }) } />
          <LastPage className = { classes.icon } onClick = { () => this.setState({ page: Math.ceil(this.filter(students).length / number_per_page) - 1 }) } />
        </div>
        <StudentList students = {
          this.filter(students).slice(number_per_page * page, number_per_page * (page + 1) )
        } />
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
