
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
// import Select from '@material-ui/core/Select'
// import MenuItem from '@material-ui/core/MenuItem'
import { updateFilter } from '../../../../Redux/Students/Actions/Professor'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    marginTop: '24px',
    fontSize: '20px',
    minWidth: '120px'
  },
  formControlLabel: {
    fontSize: '15px',
    color: '#616161'
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  label: {
    fontSize: '18px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '200px'
  }
})

class CheckboxesGroup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      人工智慧: false,
      網路: false,
      電腦視覺: false
    }
  }

  /* handleChange = item => event => {
    this.setState({ [item]: event.target.checked });
  }

  handleScountChange = event => {
    this.props.changeProjectNumber(event.target.value)
    this.setState({ scount: event.target.value });
  } */

  render () {
    const { classes } = this.props
    return (
      <div>
        <TextField
          label='專題已收名額(以下)'
          margin='normal'
          type='number'
          className={classes.textField}
          InputLabelProps={{
            classes: {
              root: classes.label
            },
            shrink: true
          }}
          inputProps={{ max: 7, min: 0 }}
          value={this.props.scount}
          onChange={(event) => this.props.onChange(event.target.value)}
        />
        {/* <FormControl className={classes.formControl}>
          <Select
            value={this.state.scount}
            onChange={(event) => this.setState({ scount: event.target.value })}
          >
            <MenuItem value={'-1'} style={{ height: '10px' }} disabled>專題剩餘名額(以上)</MenuItem>
            <MenuItem value={'0'} style={{ height: '10px' }}>0人</MenuItem>
            <MenuItem value={'1'} style={{ height: '10px' }}>1人</MenuItem>
            <MenuItem value={'2'} style={{ height: '10px' }}>2人</MenuItem>
            <MenuItem value={'3'} style={{ height: '10px' }}>3人</MenuItem>
            <MenuItem value={'4'} style={{ height: '10px' }}>4人</MenuItem>
            <MenuItem value={'5'} style={{ height: '10px' }}>5人</MenuItem>
            <MenuItem value={'6'} style={{ height: '10px' }}>6人</MenuItem>
            <MenuItem value={'7'} style={{ height: '10px' }}>7人</MenuItem>
          </Select>
        </FormControl> */}
      </div>
    )
  }
}

CheckboxesGroup.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  scount: state.Student.Professor.filter.scount
})
const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(updateFilter({ scount: value }))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CheckboxesGroup))
