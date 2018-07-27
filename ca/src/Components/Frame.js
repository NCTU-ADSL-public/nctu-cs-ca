import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import FadeIn from 'react-fade-in'
import { Grid, Row, Col } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Frame = (props)=>(
  <Grid fluid>
    <Row style={{background: '#F5F5F5'}}>
      <Col xsHidden smHidden>
        <div>
          <FadeIn>
            {props.children}
          </FadeIn>
        </div>
      </Col>
    </Row>
  </Grid>
)

export default Frame