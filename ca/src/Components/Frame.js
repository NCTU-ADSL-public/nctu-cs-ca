import React from 'react'
import FadeIn from 'react-fade-in'
import { Grid, Row, Col } from 'react-bootstrap'

const Frame = (props)=>(
   <Grid fluid={true}>
    <Row style={{background: '#F5F5F5',marginTop: 70}}>
      <Col>
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