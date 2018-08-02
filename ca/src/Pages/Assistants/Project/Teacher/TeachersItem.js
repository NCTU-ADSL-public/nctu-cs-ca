import React from 'react'
import Paper from 'material-ui/Paper';
import TeachersTable from './TeachersTable'
import TextField from 'material-ui/TextField';
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
}

class TeachersItem extends React.Component {

  constructor() {
    super()
    this.state = {
      teachers: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/professors ').then( (res) => {

      this.setState({
        teachers: res.data.map( (teacher) => {
          let accepted_number = 0
          let pending_number = 0
          teacher.accepted.projects.map( (project) => {
            accepted_number += project.students.length
          })
          teacher.pending.projects.map( (project) => {
            pending_number += project.students.length
          })
          return { ...teacher,
            accepted_number,
            pending_number
          }
        })
      })
    })
  }

  render() {
    const { teachers } = this.state
    return (
      <div style = { styles.wrapper } >
        <div className = 'row' style={{marginBottom: '50px', marginTop: '20px'}}>
          <div className = 'col-md-8 col-lg-8 hidden-xs' >
            <Paper style = { styles.paper } zDepth = { 3 } >
              <TextField
                hintText          = "學號 / 姓名"
                floatingLabelText = "搜尋欄位"
                style             = { styles.searchTextField }
                onChange          = { this.handleTextField }
              />
              <TeachersTable teachers = { teachers } />
            </Paper>
          </div>
          <div className = 'col-md-4 col-lg-4 hidden-xs' >
            <Paper style = { styles.paper } zDepth = { 3 } >
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default TeachersItem
