import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'
import People from 'material-ui/svg-icons/social/people'
import {Form,FormGroup, ControlLabel, FormControl, Well } from 'react-bootstrap'

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
                alert('因某些原因導致 ' + participants[i] + ' 同學 無法申請，如該學生如有審核中的專題或當學年已有專題將不能申請。')
              }
          })
          .catch(err => {
            //window.location.replace("/logout ");
            window.location.reload('/logout')
            console.log(err)
          })
      }
      if(_this.refs.event_type.value === ''){
        alert('請填寫專題一或二')
        flag = 0
      }
    }
    if(flag){
      let r = window.confirm('確定送出表單嗎?')
      let Today = new Date();
      let semester = ((Today.getFullYear()-1912)+ Number(((Today.getMonth()+1)>=8?1:0))) + '-' + ((Today.getMonth()+1)>=8?'1':'2')
      if(r){
        axios.post('/students/project_apply', {
          semester:semester,
          student_num:num,
          tname:_this.props.name,
          first_second :_this.refs.event_type.value,
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
                alert('申請失敗，請重新送出，如有審核中的專題將不能申請。')
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
            <div className='input-group '>
              <div className='input-group-prepend'>
                <select ref='event_type'  className="form-control">
                  <option value=''>專題一或二?</option>
                  <option value='1'>一</option>
                  <option value='2'>二</option>
                </select>
              </div>
            </div>
          <br/>
          <div style={{margin:'6'}}>
            <Form inline>
            <FormGroup controlId="formInlineName">
              <ControlLabel>學號:</ControlLabel>{' '}
              <FormControl disabled value={this.props.value} type="text" placeholder="0416XXX"  onChange={this.handleChange_stud_num_0} />
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
              <FormControl  type="text" placeholder="0416XXX"  onChange={this.handleChange_stud_num_1}/>
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