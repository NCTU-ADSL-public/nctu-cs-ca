import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const customContentStyle = {
  fontSize: '1em',
  fontWeight: '500',
  letterSpacing: '1px',
  fontFamily: 'Noto Sans CJK TC'
}

const bodyStyle = {
  fontFamily: 'Noto Sans CJK TC',
  fontSize: '1em',
  fontWeight: '500',
  letterSpacing: '1px',
  color: '#454545'
}
const titleStyle = {
  fontFamily: 'Noto Sans CJK TC',
  fontSize: '2em',
  fontWeight: '500',
  letterSpacing: '1px',
  color: '#565656'
}

const fontStyle = {
  verticalAlign: 'default',
  fontSize: '1em',
  fontWeight: '500',
  letterSpacing: '1px',
  fontFamily: 'Noto Sans CJK TC'
}

export default class MailReader extends React.Component {
  render () {
    const actions = [
      <FlatButton
        label='關閉'
        primary
        labelStyle={fontStyle}
        onClick={this.props.handleClose}
      />
    ]

    return (
      <div>
        <Dialog
          title={`主旨:  ${this.props.data.title}`}
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          contentStyle={customContentStyle}
          titleStyle={titleStyle}
          bodyStyle={bodyStyle}
        >
          <section dangerouslySetInnerHTML={{__html: this.props.data.content}} />
          <br />
          <br />
          <br />
          <br />
          寄件者:&nbsp;&nbsp;&nbsp;{this.props.data.sender}
        </Dialog>
      </div>
    )
  }
}
