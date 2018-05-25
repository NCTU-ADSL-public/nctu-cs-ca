import React from 'react'
import axios from 'axios'
import {Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Email from 'material-ui/svg-icons/communication/email'

import Table from '../../../Components/Table'

class TeacherList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      projectNum: []
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

  render () {
    let projectNum = this.state.projectNum
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
                      <RaisedButton label='Send Mail!' icon={<Email />} />
                    </MuiThemeProvider>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
          <Col xs={12} sm={4}>
            <Form >
              <FormGroup controlId="formControlsSelect">
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
