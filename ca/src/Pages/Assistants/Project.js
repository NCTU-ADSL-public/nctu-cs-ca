import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import Table from '../../Components/Table'

class Project extends React.Component {
  render () {
    return (
      <Grid>
        <h1>學生專題助理端</h1>
        <Row>
          <Col xs={12} sm={6}>
            <Table>
              <thead>
                <tr>
                  <th>教授</th>
                  <th>已收學生人數</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              </tbody>
            </Table>
          </Col>
          <Col xs={12} sm={6}>
            <h2>看看要放什麼</h2>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Project
