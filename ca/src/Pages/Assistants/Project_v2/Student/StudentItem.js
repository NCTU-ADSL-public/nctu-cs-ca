import React from 'react'
import './index.css'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import StudentTable from './StudentTable'

class StudentItem extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className = 'wrapper'>
        <div className='row'>
          <div className='col-md-9 col-lg-9 hidden-xs' >
            <Paper
              style = {{
                height: document.body.clientHeight * 0.78,
                marginTop: '30px',
                marginBottom: '30px',
                padding: '30px'
              }}
              elevation = { 3 }
            >
            <TextField
              style = {{ width: '100%' }}
              label = "搜尋"
              placeholder = "學號 / 姓名"
            />
            <StudentTable />
            </Paper>
          </div>
          <div className='col-md-3 col-lg-3 hidden-xs' >
            <Paper
              style = {{
                height: document.body.clientHeight * 0.78,
                marginTop: '30px',
                marginBottom: '30px',
                padding: '30px'
              }}
              elevation = { 3 }
            >
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentItem
