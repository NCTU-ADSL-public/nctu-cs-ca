import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import {
  fetchStatus,
  statusHandleChange
} from '../../../../Redux/Assistants/Actions/Project/Status'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'


const styles = theme => ({
  container: {
    width: '80%',
    margin: '0 auto',
    marginTop: '20px',
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
})

class StatusControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        
    }
  }

  fetchStatus = (payload) => {
    if (
      payload.year !== "" &&
      payload.semester !== "" &&
      payload.first_second !== ""
    ) {
      this.props.fetch_status(payload)
    }
  }

  render () {
    const { classes, Status } = this.props;
    const {  } = this.state;

    return (
      <div className={classes.container}>
        <FormControl style={{ width: '100%', flex: 1 }}>
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
                input: event.target.value
              })
            }
            value={Status.input}
          />
        </FormControl>

        <FormControl style={{ width: '100%', marginTop: '10px' }} 
          error = {Status.year === ''}
        >
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
            學年
          </InputLabel>
          <Select
            input={
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
              />
            }
            value={Status.year}
            style={{ fontSize: '15px' }}
            onChange={
              (event) => {
                this.props.statusHandleChange({ 
                  year: event.target.value 
                })
                this.fetchStatus({
                  year: event.target.value,
                  semester: Status.semester,
                  first_second: Status.first_second
                })
              }
            }
          >
            <MenuItem value={"106"} style={{ fontSize: '20px' }} >106</MenuItem>
            <MenuItem value={"107"} style={{ fontSize: '20px' }} >107</MenuItem>
            <MenuItem value={"108"} style={{ fontSize: '20px' }} >108</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: '100%', marginTop: '10px' }}
          error = {Status.semester === '' && Status.year !== ''}
          disabled = {Status.year === ''}
        >
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
            學期
          </InputLabel>
          <Select
            input={
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
              />
            }
            value={Status.semester}
            style={{ fontSize: '15px' }}
            onChange={
              (event) => {
                this.props.statusHandleChange({ 
                  semester: event.target.value 
                })
                this.fetchStatus({
                  year: Status.year,
                  semester: event.target.value,
                  first_second: Status.first_second
                })
              }
            }
          >
            <MenuItem value={"1"} style={{ fontSize: '20px' }} >上學期</MenuItem>
            <MenuItem value={"2"} style={{ fontSize: '20px' }} >下學期</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: '100%', marginTop: '10px' }}
          error = {Status.first_second === '' && Status.semester !== ''}
          disabled = {Status.semester === ''}
        >
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
            專題
          </InputLabel>
          <Select
            input={
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
              />
            }
            value={Status.first_second}
            style={{ fontSize: '15px' }}
            onChange={
              (event) => {
                this.props.statusHandleChange({ 
                  first_second: event.target.value 
                })
                this.fetchStatus({
                  year: Status.year,
                  semester: Status.semester,
                  first_second: event.target.value
                })
              }
            }
          >
            <MenuItem value={"1"} style={{ fontSize: '20px' }} >專題一</MenuItem>
            <MenuItem value={"2"} style={{ fontSize: '20px' }} >專題二</MenuItem>
          </Select>
        </FormControl>
    	</div>
    )
  }
}

const mapStateToProps = (state) => ({
  Status: state.Assistant.Project.Status,
})

const mapDispatchToProps = (dispatch) => ({
  statusHandleChange: (payload) => dispatch(statusHandleChange(payload)),
  fetch_status: (payload) => dispatch(fetchStatus(payload))

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StatusControl))
