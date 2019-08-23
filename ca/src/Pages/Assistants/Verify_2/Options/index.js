import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { styles } from './../styles'

import { Tooltip, IconButton } from '@material-ui/core'
import { 
  verifyHandleChange 
} from '../../../../Redux/Assistants/Actions/Verify'

import Check from '@material-ui/icons/CheckBox'
import CheckNone from '@material-ui/icons/CheckBoxOutlineBlank'
import { type } from '../macro'
import RightSideIcon from './RightSideIcon'
import OptionToolIcon from './OptionToolIcon'

class index extends React.Component {
  selectAll = () => {
    const { Verify } = this.props;
    let updatedArray = Verify.select;
    if (!Verify.selectAll) {
      updatedArray = Verify.formList.filter(e => (type[Verify.index].includes(e.status) && Verify.type.includes(e.type))).map(e => e.id)
      this.props.verifyHandleChange({select: updatedArray, selectAll: true})
    } else {
      this.props.verifyHandleChange({select: [], selectAll: false, trnasferTo: ''})
    }
  }
  render() {
    const { classes, Verify } = this.props;
    return (
      <div className={ classes.options }>
        <Tooltip 
          title={Verify.selectAll ? '取消全選' : '全選'} 
          placement='top'
          classes={{
            tooltip: classes.tooltip
          }}
        >
          <IconButton 
            className={classes.sideIcon}
            onClick={this.selectAll}
          >
            {Verify.selectAll ? <Check /> : <CheckNone /> }
          </IconButton>
        </Tooltip>
        {(Verify.select.length !== 0 || Verify.selectAll === true) && (<OptionToolIcon index={Verify.index}/>)}
        <RightSideIcon />
      </div>
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