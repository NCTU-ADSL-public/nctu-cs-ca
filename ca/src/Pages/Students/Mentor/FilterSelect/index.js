import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  formControlLabel: {
    fontSize: 20
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
})

class CheckboxesGroup extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      人工智慧: false,
      網路: false,
      電腦視覺: false,
      scount: '0人'
    }
  }

  handleChange = item => event => {
    this.setState({ [item]: event.target.checked });
  }

  handleScountChange = event => {
    this.setState({ scount: event.target.value });
  };

  render() {
    const { classes } = this.props
    return (
      <div>
        <div className='row'>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">
              <div  style={{marginTop: '30px'}}>
                研究領域
              </div>
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.人工智慧}
                    color='default'
                    onChange={this.handleChange('人工智慧')}
                    value="人工智慧"
                  />
                }
                label="人工智慧"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.網路}
                    color='default'
                    onChange={this.handleChange('網路')}
                    value="網路"
                  />
                }
                label="網路"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.電腦視覺}
                    color='default'
                    onChange={this.handleChange('電腦視覺')}
                    value="電腦視覺"
                  />
                }
                label="電腦視覺"
              />
            </FormGroup>
          </FormControl>
        </div>
        <div className='row'>
          <FormControl component="fieldset" required className={classes.formControl}>
            <FormLabel component="legend">專題已收人數（以上）</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              className={classes.group}
              value={this.state.scount}
              onChange={this.handleScountChange}
            >
              <FormControlLabel value="0人" control={<Radio />} label="0人" />
              <FormControlLabel value="3人" control={<Radio />} label="3人" />
              <FormControlLabel value="5人" control={<Radio />} label="5人" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    )
  }
}

CheckboxesGroup.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CheckboxesGroup)