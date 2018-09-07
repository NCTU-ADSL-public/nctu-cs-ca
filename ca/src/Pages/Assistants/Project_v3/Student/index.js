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

import { fetchStudents } from '../../../../Redux/Assistants/Actions/Project_v3/Student'

const styles = theme => ({
  root: {
    width: '80%',
    margin: '0 auto',
    marginTop: '10px'
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
})

class index extends React.Component {

  constructor() {
    super();
    this.state = {
      grade: 4,
      input: "",
      page: 0,
      number_per_page: 10
    }
  }

  compomentDidMount() {
    this.props.fetch_students({ grade: this.state.grade })
  }

  render() {

    const { classes, fetch_students, students } = this.props
    const { input, page, number_per_page, grade } = this.state

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
                搜尋學生名字
              </InputLabel>
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
                onChange = { (event) => this.setState({ input: event.target.value }) }
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
                    this.setState({ grade: event.target.value })
                    fetch_students({ grade })
                  }
                }
              >
                {[...Array(9)].map((x, i) => <MenuItem value = { i + 1 } style = {{ fontSize: '20px' }} >{"0" + (i + 1)}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>
        <StudentList students = { students.slice(number_per_page * page, number_per_page * (page + 1) ) } />
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
