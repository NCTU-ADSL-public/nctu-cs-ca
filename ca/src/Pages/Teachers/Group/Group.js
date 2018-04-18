import React from 'react'
import axios from 'axios'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import pic from '../../../Resources/BeautifalGalaxy.jpg'
import defaultPic from '../../../Resources/defalt.jpg'
// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  mainTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#666666',
    margin: '32px 0 0 50px',
    float: 'left'
  },
  subTitle: {
    fontSize: '1.6em',
    fontWeight: '4300',
    color: '#737373',
    margin: '45px 0 0 0',
    float: 'left'
  },
  groups: {
    margin: '0 0 60px 0'
  },
  groupBtn: {
    margin: 30,
    padding: 20,
    background: '#ececec',
    borderRadius: '10px',
    border: '1px #dfdfdf solid'
  },
  pic: {
    width: '100%'
  },
  groupYear: {
    fontSize: '1.5em',
    fontWeight: '200',
    color: '#575757'
  },
  groupTitle: {
    fontSize: '2.4em',
    fontWeight: '100',
    color: '#575757'
  },
  chip: {
    margin: 5
  },
  chipWrapper: {
    padding: 5,
    display: 'flex',
    flexWrap: 'wrap'
  },
  groupIntro: {
    padding: 5,
    color: '#9c9c9c',
    fontSize: '1.4em',
    fontWeight: 100
  }
}

class Group extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      groupList: [
        { research_title: '資料錯誤',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: ''
        }
      ]
    }
  }
  fetchData () {
    console.log(this.props.idCard.name)
    axios.post('/professors/students/projects', {
      name: '彭文志'
      // name: this.props.idCard.name
    }).then(res => {
      console.log(res)
      this.setState({
        groupList: res.data[0]
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
      console.log(nextProps)
      this.fetchData()
    }
  }
  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <div style={styles.mainTitle}> 學生專題列表 </div>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <div style={styles.subTitle}> 本年度已登記組數: ??? </div>
          </Col>
        </Row>
        <Row style={styles.groups}>
          {this.state.groupList.map((item) => (
            <GroupButton title={item.research_title} participants={item.participants} />
          ))}
        </Row>
      </Grid>
    )
  }
}
export default Group

const GroupButton = (props) => (
  <Grid style={styles.groupBtn}>
    <Row>
      <Col xs={3} md={3} lg={3}>
        <Image style={styles.pic} src={pic} circle />
      </Col>
      <Col xs={9} md={9} lg={9}>
        <div style={styles.groupYear}>???年度</div>
        <div style={styles.groupTitle}>{props.title}</div>
        <div>
          <MuiThemeProvider>
            <div style={styles.chipWrapper}>
              {props.participants.map((item) => (
                <Chip style={styles.chip}>
                  <Avatar src={defaultPic} /> {item.student_id} {item.sname}
                </Chip>
              ))}
            </div>
          </MuiThemeProvider>
        </div>
        <div style={styles.groupIntro}>
          這是專題的簡介。
      </div>
      </Col>
    </Row>
  </Grid>

)
