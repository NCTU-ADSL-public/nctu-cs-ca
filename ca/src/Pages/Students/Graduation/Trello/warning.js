import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

const customContentStyle = {
  maxWidth: 'none',
  maxHeight: 'none'
}

const bodyStyle = {
  fontFamily: 'Noto Sans CJK TC'
}

const titleStyle = {
  fontFamily: 'Noto Sans CJK TC',
  color: '#565656'
}

const styles = {
  toggle: {
    marginBottom: 0,
    maxWidth: 200,
    width: '400px',
    float: 'left',
    margin: '15px 10px 0 20px'
  },
  button: {
    margin: '9px 10px 0 0px',
    width: '200px',
    float: 'left',
    zIndex: '-1'
  },
  button1: {
    margin: '9px 10px 0 0px',
    width: '200px',
    float: 'left',
    zIndex: '1000'
  },
  buttonDia: {
    margin: '0 10px 0 10px',
    width: '100px'
  },
  buttonEn: {
    margin: '9px 10px 0 0px',
    width: '250px',
    float: 'left',
    zIndex: '-1'
  },
  labelStyle: {
    fontFamily: 'Noto Sans CJK TC',
    color: '#7B7B7B'
  },
  medium: {
    color: '#7B7B7B'
  },
  pop: {
    width: 'auto',
    height: 'auto'
  }
}

export default class DialogWaring extends React.Component {
  constructor (props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      open: false
    }
  }

  handleOpen () {
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  render () {
    const actions = [
      <FlatButton
        label='取消'
        labelStyle={styles.labelStyle}
        onClick={this.handleClose}
      />,
      <FlatButton
        label='儲存'
        labelStyle={styles.labelStyle}
        keyboardFocused
        onClick={this.props.onClick}
      />
    ]

    return (
      <div style={{ float: 'right' }}>
        <FlatButton label='確認'
          labelStyle={styles.labelStyle}
          keyboardFocused
          onClick={this.handleOpen} />
        <Dialog
          title='注意'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          bodyStyle={bodyStyle}
          titleStyle={titleStyle}
        >
          您即將送出手動修改的課程，此資料將會覆蓋系統幫您自動排序的資料。<font color='#8b0000'>雙點擊儲存 </font>以送出。
        </Dialog>
      </div>
    )
  }
}
