import React from 'react'

import axios from 'axios'
import FadeIn from 'react-fade-in'
import { Grid, Row, Glyphicon, Image } from 'react-bootstrap'
import pic from './defalt.jpg'

const styles = {
  row: {
    textAlign: 'center',
    color: '#5f6f75'
  },
  pic: {
    width: 250,
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
    this.state = {
      profile: {
        name: '彭文志',
        phone: '48763',
        email: 'wcpeng@nctu.edu.tw',
        expertise: '資料庫、電腦視覺、深度學習',
        info: '我的經歷就是範例...'
      }
    }
  }

  fetchData () {
    axios.get('/professors/info', {
      name: this.props.name
    }).then(res => {
      this.setState({
        profile: {
          name: this.props.name,
          phone: res.data[0].phone,
          email: res.data[0].email,
          expertise: res.data[0].expertise,
          info: res.data[0].info
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    this.fetchData()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.idCard !== nextProps.idCard) {
      this.fetchData()
    }
  }

  render () {
    return (
      <Grid>
        <FadeIn>
          <Row>
            <div style={styles.row}>
              <Image style={styles.pic} src={this.props.profile.photo === '' ? pic : this.props.profile.photo} circle />
              <div style={styles.name}> {this.state.profile.name} </div>
              <div style={styles.item}><Glyphicon glyph='earphone' /> #{this.state.profile.phone} </div>
              <div style={styles.item}> {this.state.profile.email} </div>
              <div style={styles.item}> {this.state.profile.expertise} </div>
              <div style={styles.item}> {new Array(20).fill(0).map(() => ('我的經歷就是範例...'))} </div>
            </div>
          </Row>
        </FadeIn>
      </Grid>
    )
  }
}

export default Profile
