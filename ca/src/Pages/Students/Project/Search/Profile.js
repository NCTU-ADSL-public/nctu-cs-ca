import React from 'react'

import FadeIn from 'react-fade-in'
import { Grid, Row, Glyphicon, Image } from 'react-bootstrap'
import pic from '../../../../Resources/defalt.jpg'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ProfileSendmail from './ProdileExtend/ProfileSendmail'
import ProfileSendProjectAgree from './ProdileExtend/ProfileSendProjectAgree'

const fontStyle = {
  verticalAlign: "default",
  fontSize: "1em",
  fontWeight: "300",
  letterSpacing: "1px",
  fontFamily: 'Noto Sans CJK TC',
}

const styles = {
  row: {
    textAlign: 'center',
    marginTop: '2vh',
    color: '#5f6f75',
    width: '45vw',
    height: '74vh',
    backgroundColor: '#F5F5F5'
  },
  pic: {
    width: 250,
    marginRight: '-135',
    padding: 5
  },
  name: {
    fontSize: '3em',
    padding: 5
  },
  item: {
    fontSize: '1.2em',
    padding: 2,
    fontWeight: 300
  }
}

class Profile extends React.Component {
  constructor (props) {
    super(props)
  }

  fetchData () {
    console.log(this.props.name)
  }

  async componentDidMount () {
    await this.fetchData()
  }

  async componentWillReceiveProps (nextProps) {
    if (this.props.name !== nextProps.name) {
      await this.fetchData()
    }
  }

  render () {
    return (
          <MuiThemeProvider>
            <Card style={styles.row}>
              <CardText>
                <FadeIn>
                  <div style={fontStyle}>
                    <div style={{float: 'right'}}>
                      <ProfileSendmail name={this.props.profile.name} studentIdcard={this.props.studentIdcard} />
                      <ProfileSendProjectAgree name={this.props.profile.name} studentIdcard={this.props.studentIdcard} />
                    </div>
                    <Image style={styles.pic} src={ 1 === 1 ? pic : this.props.profile.pic } circle />
                    <div style={styles.name}> {this.props.profile.name} </div>
                    <div style={styles.item}><Glyphicon glyph='earphone' /> #{this.props.profile.phone} </div>
                    <div style={styles.item}> {this.props.profile.email} </div>
                    <div style={styles.item}> {this.props.profile.expertise} </div>
                    <div style={styles.item}> {this.props.profile.info} </div>
                  </div>
                </FadeIn>
              </CardText>
            </Card>
          </MuiThemeProvider>
      // <Grid>
      // <Row style={styles.row}>
      //   </Row>
      // </Grid>
    )
  }
}

export default Profile
