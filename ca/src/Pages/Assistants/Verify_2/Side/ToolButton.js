import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { styles } from './../styles'

import { 
  Tooltip,
  IconButton,
} from '@material-ui/core'

import {
  verifyHandleChange
} from '../../../../Redux/Assistants/Actions/Verify'

class ToolButton extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    const { classes, Verify } = this.props;
    return (
      <Tooltip 
        title={this.props.title} 
        placement='right'
        classes={{
          tooltip: classes.tooltip
        }}
      >
        <IconButton 
          className={this.props.style}
          onClick={ 
            () => this.props.verifyHandleChange({
              ...this.props.payload,
              select: [],
              selectAll: false,
              isRecord: false
            })
          }
          color={
            this.props.color === "toolIcon" ? 
            (Verify.index === this.props.payload.index) ? Verify.isOld ? 'secondary':'primary' : 'default'
            :
            (Verify.isOld) ? 'secondary' : 'default'
          }
        >
          {this.props.icon}
        </IconButton>
      </Tooltip>
    )
  }
}

const mapStateToProps = (state) => ({
  Verify: state.Assistant.Verify
})

const mapDispatchToProps = (dispatch) => ({
  verifyHandleChange: (payload) => dispatch(verifyHandleChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ToolButton))