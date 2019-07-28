import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import { scoreHandleChange } from '../../../../Redux/Assistants/Actions/Project/Score'


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

class ScoreControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render () {
    const { classes, Score } = this.props;
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
              (event) => this.props.scoreHandleChange({
                input: event.target.value
              })
            }
            value={Score.input}
          />
        </FormControl>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Score: state.Assistant.Project.Score,
})

const mapDispatchToProps = (dispatch) => ({
  scoreHandleChange: (payload) => dispatch(scoreHandleChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScoreControl))