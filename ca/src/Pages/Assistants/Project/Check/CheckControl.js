import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import { 
  fetchCheck,
  checkHandleChange
} from '../../../../Redux/Assistants/Actions/Project/Check'
import { getSemester } from '../../../../Utilities'

const styles = theme => ({
  container: {
    width: '80%',
    margin: '0 auto',
    marginTop: '20px'
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
class CheckControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        
    }
    this.props.fetch_check({
      year: getSemester().substr(0, 3),
      semester: getSemester().substr(4, 5)
    })
  }

  render () {
    const { classes, Check } = this.props;
    const {  } = this.state;

    return (
      <div className={classes.container}>
        <FormControl style={{ width: '100%', marginBottom: '10px', flex: 1 }}>
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
              (event) => this.props.checkHandleChange({
                input: event.target.value[event.target.value.length - 1] === "\\" ? 
                  event.target.value.substr(0, event.target.value.length - 1) :
                  event.target.value
              })
            }
            value={Check.input}
          />
        </FormControl>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  Check: state.Assistant.Project.Check,
})

const mapDispatchToProps = (dispatch) => ({
  fetch_check: (payload) => dispatch(fetchCheck(payload)),
  checkHandleChange: (payload) => dispatch(checkHandleChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CheckControl))