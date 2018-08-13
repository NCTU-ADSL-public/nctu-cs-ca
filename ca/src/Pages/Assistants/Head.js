import React from 'react'
import axios from 'axios'
import {Grid, Row, Col} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import {connect} from 'react-redux'
import {UpdateUserInfo} from '../../Redux/Assistants/Actions/User'

class Head extends React.Component {
  constructor (props) {
    super(props)
    axios.get('/assistants/profile').then(studentData => {
      this.props.UpdateUserInfo({
        name: studentData.data[0].aname,
        prog: studentData.data[0].assistant_id,
        grad: studentData.data[0].status
      })
    }).catch(err => {
      console.log(err)
    })
    this.state = {
      index: 0
    }
  }
  render () {
    const router = [
      '/assistants/head',
      '/assistants/grad',
      '/assistants/project',
      '/assistants/family',
      '/assistants/mail'
    ]
    const onTouchTaps = [
      () => this.props.history.push(router[0]),
      () => this.props.history.push(router[1]),
      () => this.props.history.push(router[2]),
      () => this.props.history.push(router[3]),
      () => this.props.history.push(router[4])
    ]
    return (
      <Grid fluid>
        <Row>
          <Col>
            <Navbar type='assistant'
              name={this.props.idCard.name}
              subname={this.props.idCard.prog + this.props.idCard.grad}
              onTouchTaps={onTouchTaps}
              selectedIndex={this.state.index}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapState = (state) => ({
  idCard: state.Assistant.User.idCard
})

const mapDispatch = (dispatch) => ({
  UpdateUserInfo: (payload) => dispatch(UpdateUserInfo(payload))
})

export default connect(mapState, mapDispatch)(withRouter(Head))
