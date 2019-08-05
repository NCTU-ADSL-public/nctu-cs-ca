import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import {
  statusHandleChange,
  fetchStatus
} from '../../../../Redux/Assistants/Actions/Graduation/Status'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import FirstPage from '@material-ui/icons/FirstPage'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import LastPage from '@material-ui/icons/LastPage'

import grey from '@material-ui/core/colors/grey'

const styles = theme => ({
  container: {
    width: '80%',
    margin: '0 auto',
    marginTop: '20px',
    minHeight: '77%'
  },
  warningText: {
    fontSize: '30px',
    flex: 1,
    textAlign: 'center',
    color: '#6f6f6f'
  },
  cssLabel: {
    fontSize: 15,
    '&$cssFocused': {
      color: '#68BB66'
    },
    fontWeight: 'normal'
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#68BB66'
    },
  },
  icon: {
    fontSize: '25px',
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

class StatusControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  input_filter = (students, target) => {
    return students.filter( student => {
      return (
        target === '' || 
        student.student_id.search(target) !== -1 ||
        student.sname.search(target) !== -1
      )
    })
  }

  render() {
    const { classes, Status } = this.props

    return (
      <div className={classes.container} style={{display: 'flex', flexDirection: 'column'}}>
        <FormControl style={{ width: '100%' }}>
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
            搜尋
          </InputLabel>
          <Input
            classes={{
              underline: classes.cssUnderline,
            }}
            onChange={
              (event) => this.props.statusHandleChange({
                input: event.target.value[event.target.value.length - 1] === "\\" ? 
                  event.target.value.substr(0, event.target.value.length - 1) :
                  event.target.value,
                page: 0
              })
            }
            value={Status.input}
          />
        </FormControl>

        <FormControl style={{ width: '100%', marginTop: '10px' }} >
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
            年級
          </InputLabel>
          <Select
            input={
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
              />
            }
            value={Status.grade}
            style={{ fontSize: '15px' }}
            onChange={
              (event) => {
                this.props.statusHandleChange({ 
                  grade: event.target.value,
                  page: 0
                }),
                this.props.fetch_status({grade: event.target.value})
              }

            }
          >
            <MenuItem value={"一"} style={{ fontSize: '20px' }} >一年級</MenuItem>
            <MenuItem value={"二"} style={{ fontSize: '20px' }} >二年級</MenuItem>
            <MenuItem value={"三"} style={{ fontSize: '20px' }} >三年級</MenuItem>
            <MenuItem value={"四"} style={{ fontSize: '20px' }} >四年級</MenuItem>
          </Select>
        </FormControl>
        <div style={{flex: 1}} />
        <div style = {{ textAlign: 'center' }} >
          <FirstPage 
            className = { classes.icon } 
            onClick = { () => 
              this.props.statusHandleChange({ 
                page: 0
              }) 
            } 
          />
          <ChevronLeft 
            className = { classes.icon } 
            onClick = { () => 
              this.props.statusHandleChange({ 
                page: Math.max(0, Status.page - 1)
              }) 
            } 
          />
          <span style={{
            display: 'inline-flex',
            verticalAlign: 'middle',
            fontSize: '15px',
          }}>
            {Status.page + 1} / {Math.max(1, Math.ceil(this.input_filter(Status.students, Status.input).length / Status.dataPerPage))}
          </span>
          <ChevronRight 
            className = { classes.icon } 
            onClick = { () => 
              this.props.statusHandleChange({ 
                page: Math.max(0, Math.min(Math.ceil(this.input_filter(Status.students, Status.input).length / Status.dataPerPage) - 1, Status.page + 1))
              })  
            } 
          />
          <LastPage 
            className = { classes.icon } 
            onClick = { () => 
              this.props.statusHandleChange({ 
                page: Math.max(0, Math.ceil(this.input_filter(Status.students, Status.input).length / Status.dataPerPage) - 1)
              })
            } 
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  Status: state.Assistant.Graduation.Status,
})

const mapDispatchToProps = dispatch => ({
  statusHandleChange: (payload) => dispatch(statusHandleChange(payload)),
  fetch_status: (payload) => dispatch(fetchStatus(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StatusControl))