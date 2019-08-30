import React from 'react'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { styles, theme } from './../styles'

import ToolButton from './ToolButton'
import ApplyIcon from '@material-ui/icons/Assignment'
import WaitIcon from '@material-ui/icons/AccessTime'
import AlarmIcon from '@material-ui/icons/Alarm'
import OKIcon from '@material-ui/icons/Done'
import TrashIcon from '@material-ui/icons/Delete'
import ReturnIcon from '@material-ui/icons/Replay'
import HistoryIcon from '@material-ui/icons/History'


import { 
  verifyHandleChange 
} from '../../../../Redux/Assistants/Actions/Verify'

class index extends React.Component {
  render() {
    const { classes, Verify } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={ classes.side }>
          <ToolButton color="toolIcon" payload={{index: 0}} title={'申請中'} icon={<ApplyIcon />} style={classes.sideIcon}/>
          <ToolButton color="toolIcon" payload={{index: 1}} title={'等待主任同意'} icon={<WaitIcon />} style={classes.sideIcon}/>
          <ToolButton color="toolIcon" payload={{index: 2}} title={'等待授課老師同意'} icon={<AlarmIcon />} style={classes.sideIcon}/>
          <ToolButton color="toolIcon" payload={{index: 3}} title={'已同意'} icon={<OKIcon />} style={classes.sideIcon}/>
          <ToolButton color="toolIcon" payload={{index: 4}} title={'已退回'} icon={<ReturnIcon />} style={classes.sideIcon}/>
          <ToolButton color="toolIcon" payload={{index: 5}} title={'抵免失敗'} icon={<TrashIcon />} style={classes.sideIcon}/>
          <ToolButton color="history" payload={{isOld: !Verify.isOld}} title={'歷史資料'} icon={<HistoryIcon />} style={classes.sideIconBottom}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  Verify: state.Assistant.Verify
})

const mapDispatchToProps = (dispatch) => ({
  verifyHandleChange: (payload) => dispatch(verifyHandleChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))