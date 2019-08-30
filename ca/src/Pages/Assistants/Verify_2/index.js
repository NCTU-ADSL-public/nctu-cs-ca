import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Snackbar } from '@material-ui/core'
import { connect } from 'react-redux'
import { styles } from './styles'

import Side from './Side';
import Options from './Options';
import Panels from './Panels';

import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { 
  verifyHandleChange,
  getTeacherList,
  getFormList
} from '../../../Redux/Assistants/Actions/Verify'

class index extends React.Component {
	componentDidMount() {
		this.props.getTeacherList();
		this.props.getFormList()
	}
  snackbarClose = () => {
    this.props.verifyHandleChange({open: false})
  }
  render() {
    const { classes, Verify } = this.props;
    return (
      <div className={ classes.root }>
        <Side />
        <Options />
        <Panels />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={Verify.open}
          autoHideDuration={5000}
          onClose={this.snackbarClose}
          message={<span className={classes.font2}>{['修改成功！', '傳送失敗，請再次嘗試'][Verify.message]}</span>}
          action={
            <IconButton
              color='inherit'
              onClick={this.snackbarClose}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Verify: state.Assistant.Verify

})

const mapDispatchToProps = (dispatch) => ({
  verifyHandleChange: (payload) => dispatch(verifyHandleChange(payload)),
  getTeacherList: () => dispatch(getTeacherList()),
  getFormList: () => dispatch(getFormList())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))