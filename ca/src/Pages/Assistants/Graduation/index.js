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

const styles = theme => ({
  root: {
    width: '100%'
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
})

class index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'UNCHOOSE'
    }
  }

  toolBarButton = (hightlight, type, label) => {
    return (
      <Button 
        className={this.props.classes.button}
        style = {{
          color: (hightlight ? '#68BB66' : '#6f6f6f')
        }}
        onClick = { () => {
          this.setState({
            type
          })
          type === 'CHECK' ? (
            ''
          ) : type === 'STATUS' ? (
            ''
          ) : type === 'SCORE' ? (
            ''
          ) : ''
        }}
      >
        {label}
      </Button>
    )
  }

  render() {

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
            {this.toolBarButton(type === 'CHECK', 'CHECK', '畢業預審審核')}
            {this.toolBarButton(type === 'STATUS', 'STATUS', '畢業預審總覽')}
            <Divider />
            {

              type === 'CHECK' ? (
                <CheckControl />
              ) : type === 'STATUS' ? (
                <StatusControl />
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
          ) : ''
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))