import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import Email from 'material-ui/svg-icons/communication/email'
import CKEditor from 'react-ckeditor-component'

const buttonStyle = {
  marginTop:'4',
  width:'140px',
  //float: 'right'
}


const contentStyle = {
  width:'80%',
  maxWidth: 'none',
  height: '150vh'
}

const bodyStyle = {
  fontFamily: 'Noto Sans CJK TC',
  color:'#454545',
};

const titleStyle = {
  fontFamily: 'Noto Sans CJK TC',
  color:'#565656'
};


export default class DialogButton extends React.Component {
  state = {
    open: false,
    value: 'Property Value',
    titlevalue: 'Property Value',
    ckeditorContent:''
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleChangetitle = (event) => {
    this.setState({
      titlevalue: event.target.value,
    });
  };

  handleSend = () => {
    let _this = this
    let dt = new Date();
    let time = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate() + '  ' + dt.getHours() + ':' + dt.getMinutes()
    axios.post('/students/mail/sendtoteacher', {
      title:_this.state.titlevalue,
      content:_this.state.ckeditorContent,
      time:time,
      sender_email:_this.props.studentIdcard.email,
      receiver_email:_this.props.profile.email,
      teacher:_this.props.profile.name,
      name: _this.props.studentIdcard.sname,
      id: _this.props.studentIdcard.student_id,
    })
      .then(res => {

      })
      .catch(err => {
        //window.location.replace("/logout ");
        console.log(err)
      })
    this.handleClose()
  }

  onChange = (event) => {
    this.setState({
      ckeditorContent: event.editor.getData()
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        labelStyle={bodyStyle}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Send"
        labelStyle={bodyStyle}
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSend}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Send Mail!" style={buttonStyle} labelStyle={bodyStyle} onClick={this.handleOpen} icon={<Email/>}/>
        <Dialog
          title={
            <div>
              主旨: &nbsp;&nbsp;&nbsp;&nbsp;
              <TextField
                hintText="主旨"
                onChange={this.handleChangetitle}
                fullWidth={true}
                //style={{width:'40vw'}}
              />
            </div>
          }
          actions={actions}
          titleStyle={titleStyle}
          autoScrollBodyContent={true}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={contentStyle}
        >
          <CKEditor activeClass='p10' content={this.state.ckeditorContent} events={{'change': this.onChange}} />
        </Dialog>
      </div>
    );
  }
}