
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  label: {
    fontSize: '20px'
  },
  labelMb: {
    fontSize: '18px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  textFieldLong: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  input: {
    fontSize: '16px'
  },
  menu: {
    width: 150,
    fontSize: '20px'
  },
  menuMb: {
    width: 150,
    fontSize: '18px'
  }
})

const TextInput = withStyles(styles)((props) => (
  <TextField
    label={props.label}
    placeholder={props.placeholder}
    type={props.type}
    margin='normal'
    style={props.mobile && { width: 'calc( 100% - 24px )' }}
    className={props.classes.textField}
    InputLabelProps={{
      classes: {
        root: props.mobile ? props.classes.labelMb : props.classes.label
      },
      shrink: true
    }}
    value={props.value}
    onChange={(e) => props.handleChange(e.target.value)}
    error={props.error}
  />
))

const TextInputDefault = withStyles(styles)((props) => (
  <TextField
    label={props.label}
    margin='normal'
    style={props.mobile && { width: 'calc( 100% - 24px )' }}
    className={props.classes.textField}
    InputLabelProps={{
      classes: {
        root: props.mobile ? props.classes.labelMb : props.classes.label
      },
      shrink: true
    }}
    InputProps={{ readOnly: true }}
    defaultValue={props.value}
  />
))

const LongInput = withStyles(styles)((props) => (
  <TextField
    label={props.label}
    placeholder={props.placeholder}
    margin='normal'
    style={props.mobile && { width: 'calc( 100% - 24px )' }}
    className={props.classes.textFieldLong}
    InputLabelProps={{
      classes: {
        root: props.classes.label
      },
      shrink: true
    }}
    InputProps={{
      classes: {
        root: props.classes.input
      }
    }}
    multiline
    rowsMax='1'
    value={props.value}
    onChange={(e) => props.handleChange(e.target.value)}
    error={props.error}
    disabled={props.disabled}
  />
))

const LongInputDefault = withStyles(styles)((props) => (
  <TextField
    label={props.label}
    margin='normal'
    style={props.mobile && { width: 'calc( 100% - 24px )' }}
    className={props.classes.textField}
    InputLabelProps={{
      classes: {
        root: props.mobile ? props.classes.labelMb : props.classes.label
      },
      shrink: true
    }}
    InputProps={{
      classes: {
        root: props.classes.input
      },
      readOnly: true
    }}
    multiline
    rowsMax='1'
    defaultValue={props.value}
  />
))

const SelectInput = withStyles(styles)((props) => (
  <TextField
    select
    label={props.label}
    margin='normal'
    style={props.mobile && { width: 'calc( 100% - 24px )' }}
    className={props.classes.textField}
    SelectProps={{
      MenuProps: {
        className: props.mobile ? props.classes.menuMb : props.classes.menu
      }
    }}
    InputLabelProps={{
      classes: {
        root: props.mobile ? props.classes.labelMb : props.classes.label
      },
      shrink: true
    }}
    value={props.value}
    onChange={(e) => props.handleChange(e.target.value)}
    error={props.error}
  >
    { props.children }
  </TextField>
))

export {
  TextInput,
  TextInputDefault,
  LongInput,
  LongInputDefault,
  SelectInput
}
