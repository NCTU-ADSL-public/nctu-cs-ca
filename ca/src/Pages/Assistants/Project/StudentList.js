import React from 'react'
import {Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import Table from '../../../Components/Table'
import Badge from '../../../Components/Badge'
import FakeData from '../../../Resources/FakeData/index'

class TeacherList extends React.Component {
  render () {
    const studentsProject = FakeData.StudentProject
    return (
      <Grid>
        <Col sm={12} xsHidden style={{height: 30}} />
        <Row>
          <Col xs={12} sm={7}>
            <Table>
              <thead>
              <tr>
                <th>學號</th>
                <th>學生姓名</th>
                <th>組別</th>
                <th>專題指導教授</th>
              </tr>
              </thead>
              <tbody>
              {studentsProject.map((student) => {
                const foundProjectTeacher = (student.project_tname != null)
                return (
                  <tr>
                    <td>{student.student_id}</td>
                    <td>{student.sname}</td>
                    <td>{student.program}</td>
                    <td style={{color: foundProjectTeacher ? '#418166' : '#c61234'}}>{foundProjectTeacher ? student.project_tname : '尚未找到專題教授'}</td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </Col>
          <Col xs={12} sm={4}>
            <Form >
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>學生畢業學年度</ControlLabel>
                <FormControl componentClass='select' placeholder='請選擇畢業學年度'>
                  <option value='107' selected>107</option>
                  <option value='108'>108</option>
                  <option value='109'>109</option>
                </FormControl>
              </FormGroup>
            </Form>
            <Badge bgColor='#cc3333'>未找專題</Badge>
            <Badge bgColor='#64b5f6'>資工A班</Badge>
            <Badge bgColor='#64b5f6'>資工B班</Badge>
            <Badge bgColor='#64b5f6'>資電組</Badge>
            <Badge bgColor='#64b5f6'>網多組</Badge>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default TeacherList
