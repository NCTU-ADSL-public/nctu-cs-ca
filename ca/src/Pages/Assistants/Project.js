import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import Table from '../../Components/Table'

import FakeData from '../../Resources/FakeData'

class Project extends React.Component {
  render () {
    const projectNum = FakeData.ProjectNum
    return (
      <Grid>
        <Col sm={12} xsHidden style={{height: 30}}></Col>
        <Row>
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
          </Col>
          <Col xs={12} sm={7}>
            <Table>
              <thead>
                <tr>
                  <th>教授</th>
                  <th>已收學生人數</th>
                </tr>
              </thead>
              <tbody>
              {projectNum.map((teacher) => (

                <tr>
                  <td>{teacher.tname}</td>
                  <td>{teacher.scount}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Project
