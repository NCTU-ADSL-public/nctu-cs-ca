import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import People from 'material-ui/svg-icons/social/people'
import {Form,FormGroup, ControlLabel, FormControl, Well } from 'react-bootstrap'


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

const buttonStyle = {
  marginTop:'4',
  width:'140px',
  //float: 'right'
}


const contentStyle = {
  width:'80%',
  maxWidth: 'none',
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
    project_title:'',
    stud_num_0:this.props.studentIdcard.student_id,
    stud_email_0:'',
    stud_phone_0:'',
    stud_num_1:'',
    stud_email_1:'',
    stud_phone_1:'',
    stud_num_2:'',
    stud_email_2:'',
    stud_phone_2:'',
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange_stud_num_0 = (event) => {
    this.setState({
      stud_num_0: event.target.value,
    })
  }
  handleChange_stud_email_0 = (event) => {
    this.setState({
      stud_email_0: event.target.value,
    })
  }
  handleChange_stud_phone_0 = (event) => {
    this.setState({
      stud_phone_0: event.target.value,
    })
  }

  handleChange_stud_num_1 = (event) => {
    this.setState({
      stud_num_1: event.target.value,
    })
  }
  handleChange_stud_email_1 = (event) => {
    this.setState({
      stud_email_1: event.target.value,
    })
  }
  handleChange_stud_phone_1 = (event) => {
    this.setState({
      stud_phone_1: event.target.value,
    })
  }


  handleChange_stud_num_2 = (event) => {
    this.setState({
      stud_num_2: event.target.value,
    })
  }
  handleChange_stud_email_2 = (event) => {
    this.setState({
      stud_email_2: event.target.value,
    })
  }
  handleChange_stud_phone_2 = (event) => {
    this.setState({
      stud_phone_2: event.target.value,
    })
  }

  handleChange_project_title = (event) => {
    this.setState({
      project_title: event.target.value,
    });
  };

  handleSend = () => {
    let _this = this
    let num = 1
    let phones = []
    let emails = []
    let participants = []
    let flag = 1

    if(this.state.project_title === ''){
      alert('請填寫研究主題')
      flag = 0
    }

    if(this.state.stud_email_0 === '' || this.state.stud_phone_0 === ''){
      alert('請將自己的資訊填完')
      flag = 0
    }
    else{
      participants.push(this.state.stud_num_0)
      phones.push(this.state.stud_phone_0)
      emails.push(this.state.stud_email_0)
    }

    if(this.state.stud_num_1 !== '' || this.state.stud_phone_1 !== '' || this.state.stud_email_1 !== ''){
      if(this.state.stud_num_1 === '' && this.state.stud_phone_1 === '' && this.state.stud_email_1 === ''){
        alert('請將資訊填詳細')
        flag = 0
      }
      else{
        participants.push(this.state.stud_num_1)
        phones.push(this.state.stud_phone_1)
        emails.push(this.state.stud_email_1)
        num++
      }
    }

    if(this.state.stud_num_2 !== '' || this.state.stud_phone_2 !== '' || this.state.stud_email_2 !== ''){
      if(this.state.stud_num_2 === '' && this.state.stud_phone_2 === '' && this.state.stud_email_2 === ''){
        alert('請將資訊填詳細')
        flag = 0
      }
      else{
        participants.push(this.state.stud_num_2)
        phones.push(this.state.stud_phone_2)
        emails.push(this.state.stud_email_2)
        num++
      }
    }


    if(flag){
      for(let i=0;i<num;i++){
        axios.post('/students/applyValid', {
          id:participants[i]
        })
          .then(res => {
              if(!res.data.status){
                flag=0
                alert('因某些原因導致 ' + participants[i] + ' 同學 無法申請')
              }
          })
          .catch(err => {
            //window.location.replace("/logout ");
            console.log(err)
          })
      }
    }
    if(flag){
      let r = window.confirm('確定送出表單嗎?')
      if(r){
        axios.post('/students/project_apply', {
          student_num:num,
          tname:_this.props.name,
          research_title:_this.state.project_title,
          participants:participants,
          phones: phones,
          email: emails,
        })
          .then(res => {
              if(res.data.signal === 1){
                alert('申請成功，等候教授回覆')
                _this.handleClose()
              }
              else{
                alert('表單建立失敗，請重新送出')
              }
          })
          .catch(err => {
            //window.location.replace("/logout ");
            console.log(err)
          })
      }
    }
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
        <RaisedButton label="專題申請!" labelStyle={bodyStyle} style={buttonStyle} onClick={this.handleOpen} icon={<People/>}/>
        <Dialog
          title={'專題申請'}
          actions={actions}
          titleStyle={titleStyle}
          autoScrollBodyContent={true}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={contentStyle}
        >
          <div style={{margin:'6'}}>
            <Form inline>
              <FormGroup controlId="formInlineName">
                <ControlLabel>研究題目:</ControlLabel>{' '}
                <FormControl type="text" placeholder="AI 應用"  onChange={this.handleChange_project_title}/>
              </FormGroup>{' '}
            </Form>
          </div>
          <br/>
          <div style={{margin:'6'}}>
            <Form inline>
            <FormGroup controlId="formInlineName">
              <ControlLabel>學號:</ControlLabel>{' '}
              <FormControl type="text" placeholder="0416XXX"  onChange={this.handleChange_stud_num_0}/>
            </FormGroup>{' '}
            <FormGroup controlId="formInlineEmail">
              <ControlLabel>Email:</ControlLabel>{' '}
              <FormControl type="email" placeholder="jane.doe@example.com" onChange={this.handleChange_stud_email_0}/>
            </FormGroup>{' '}
            <FormGroup controlId="formInlinePhone">
              <ControlLabel>Phone:</ControlLabel>{' '}
              <FormControl type="phone" placeholder="09XXXXXXXX"  onChange={this.handleChange_stud_phone_0}/>
            </FormGroup>{' '}
          </Form>
          </div>
          <div style={{margin:'6'}}>
            <Form inline>
            <FormGroup controlId="formInlineName">
              <ControlLabel>學號:</ControlLabel>{' '}
              <FormControl type="text" placeholder="0416XXX"  onChange={this.handleChange_stud_num_1}/>
            </FormGroup>{' '}
            <FormGroup controlId="formInlineEmail">
              <ControlLabel>Email:</ControlLabel>{' '}
              <FormControl type="email" placeholder="jane.doe@example.com" onChange={this.handleChange_stud_email_1}/>
            </FormGroup>{' '}
            <FormGroup controlId="formInlinePhone">
              <ControlLabel>Phone:</ControlLabel>{' '}
              <FormControl type="phone" placeholder="09XXXXXXXX"  onChange={this.handleChange_stud_phone_1}/>
            </FormGroup>{' '}
          </Form>
          </div>
          <div style={{margin:'6'}}>
            <Form inline>
              <FormGroup controlId="formInlineName">
                <ControlLabel>學號:</ControlLabel>{' '}
                <FormControl type="text" placeholder="0416XXX"  onChange={this.handleChange_stud_num_2}/>
              </FormGroup>{' '}
              <FormGroup controlId="formInlineEmail">
                <ControlLabel>Email:</ControlLabel>{' '}
                <FormControl type="email" placeholder="jane.doe@example.com" onChange={this.handleChange_stud_email_2}/>
              </FormGroup>{' '}
              <FormGroup controlId="formInlinePhone">
                <ControlLabel>Phone:</ControlLabel>{' '}
                <FormControl type="phone" placeholder="09XXXXXXXX"  onChange={this.handleChange_stud_phone_2}/>
              </FormGroup>{' '}
            </Form>
          </div>
        </Dialog>
      </div>
    );
  }
}