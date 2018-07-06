import React from 'react'
import axios from 'axios'
import {Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Email from 'material-ui/svg-icons/communication/email'
import CKEditor from 'react-ckeditor-component'

import Table from '../../../Components/Table'

const contentStyle = {
  width: '80%',
  maxWidth: 'none',
  height: '150vh'
}

const bodyStyle = {
  fontFamily: 'Noto Sans CJK TC',
  color:'#454545',
};

const titleStyle = {
  fontFamily: 'Noto Sans CJK TC',
  color: '#565656'
}

class TeacherList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      projectNum: [],
      showDialog: false,
      subject: '',
      ckeditorContent: ''
    }
  }

  componentWillMount () {
    axios.get('/students/projectNum').then((resp) => {
      this.setState({
        projectNum: resp.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  handleChangetitle = (event) => {
    this.setState({
      subject: event.target.value,
    });
  }

  onChange = (event) => {
    this.setState({
      ckeditorContent: event.editor.getData()
    })
  }

  handleOpen = () => {
    this.setState({showDialog: true});
  }

  handleClose = () => {
    this.setState({showDialog: false});
  }

  render () {
    let projectNum = this.state.projectNum
    const actions = [
      <FlatButton
        label='Cancel'
        labelStyle={bodyStyle}
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label='Send'
        labelStyle={bodyStyle}
        primary
        keyboardFocused
        onClick={this.handleSend}
      />,
    ];

    return (
      <Grid>
        <Col sm={12} xsHidden style={{height: 30}} />
        <Row>
          <Col xs={12} sm={7}>
            <Table>
              <thead>
                <tr>
                  <th>教授</th>
                  <th>已收學生人數</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {projectNum.map((teacher) => (
                <tr>
                  <td>{teacher.tname}</td>
                  <td>{teacher.scount}</td>
                  <td>
                    <MuiThemeProvider>
                      <RaisedButton label='Send Mail!' icon={<Email />}  onClick={this.handleOpen}/>
                    </MuiThemeProvider>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
          <Dialog
            title={
              <div>
                主旨: &nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                  hintText='主旨'
                  onChange={this.handleChangetitle}
                  fullWidth
                />
              </div>
            }
            actions={actions}
            titleStyle={titleStyle}
            autoScrollBodyContent
            modal={false}
            open={this.state.showDialog}
            onRequestClose={this.handleClose}
            contentStyle={contentStyle}
          >
            <CKEditor activeClass='p10' content={this.state.ckeditorContent} events={{'change': this.onChange}} />
          </Dialog>
          <Col xs={12} sm={4}>
            <Form >
              <FormGroup controlId='formControlsSelect'>
                <ControlLabel>學生畢業學年度</ControlLabel>
                <FormControl componentClass='select' placeholder='請選擇畢業學年度'>
                  <option value='107'>107</option>
                  <option value='108'>108</option>
                  <option value='109' selected>109</option>
                </FormControl>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default TeacherList
