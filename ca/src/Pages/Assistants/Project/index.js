import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Check from './Check/Check';
import CheckControl from './Check/CheckControl';
import Status from './Status/Status';
import StatusControl from './Status/StatusControl';
import Score from './Score/Score';
import ScoreControl from './Score/ScoreControl';


const styles = theme => ({
  root: {
    width: '100%',
  },
  drawer: {
    position: 'fixed',
    overflow: 'hidden',
    zIndex: 1,
    flexGrow: 1,
    display: 'flex',
    height: '100vh',
  },
  button: {
    fontSize: '20px',
  },
  drawerPaper: {
    position: 'relative',
    width: '30vh',
    background: '#EBEBEB',
    color: '#3B3B3B'
  },
  warningText: {
    fontSize: '30px',
    flex: 1,
    textAlign: 'center',
    color: '#6f6f6f'
  },

  cssLabel: {
    fontSize: 20,
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

class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'UNCHOOSE',
    }
    
  }

  render () {
    const { classes } = this.props;
    const { type } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.drawer}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Button 
              className={classes.button}
              style = {{
                color: (type === 'CHECK' ? '#68BB66' : '#6f6f6f')
              }}
              onClick = { () => this.setState({
                type: 'CHECK'
              })}
            >
              專題審核
            </Button>
            <Button 
              className={classes.button}
              style = {{
                color: (type === 'STATUS' ? '#68BB66' : '#6f6f6f'),
              }}
              onClick = { () => this.setState({
                type: 'STATUS'
              })}
            >
              專題狀況
            </Button>
            <Button 
              className={classes.button} 
              style = {{
                color: (type === 'SCORE' ? '#68BB66' : '#6f6f6f')
              }}
              onClick = { () => this.setState({
                type: 'SCORE'
              })}
            >
              專題評分
            </Button>
            <Divider />
            {
              type === 'UNCHOOSE' ? (
                ''
              ) : type === 'CHECK' ? (
                <CheckControl />
              ) : type === 'STATUS' ? (
                <StatusControl />
              ) : type === 'SCORE' ? (
                <ScoreControl />
              ) : ''
            }
          </Drawer>
        </div>
        <div style = {{ marginLeft: '30vh' }}>
        {
          type === 'UNCHOOSE' ? (
            <div style = {{ display: 'flex', width: '100%' }}>
              <div style = {{ flex: 0.1 }}/>
              <div className={classes.warningText}>
                請選取左方的選項
              </div>
              <div style = {{ flex: 0.1 }} />
            </div>
          ) : type === 'CHECK' ? (
            <Check />
          ) : type === 'STATUS' ? (
            <Status />
          ) : type === 'SCORE' ? (
            <Score />
          ) : ''
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Status: state.Assistant.Project.Status,
  Check: state.Assistant.Project.Check,
  Score: state.Assistant.Project.Score
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))