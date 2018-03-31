import React from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import pic from '../../../Resources/BeautifalGalaxy.jpg'
import defaultPic from '../../../Resources/defalt.jpg'

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
    margin: '0 0 60px 0',
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
  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <div style={styles.mainTitle}> 學生專題列表 </div>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <div style={styles.subTitle}> 本年度已登記組數: 6 </div>
          </Col>
        </Row>
        <Row style={styles.groups}>
          <GroupButton title={'公文認證與交換自由軟體平台實作'} />
          <GroupButton title={'深度生成模型在facebook相簿上之應用'} />
          <GroupButton title={'透過人工智慧的演化競賽用以淬煉惡意程式偵測模型(Hardening Malware Detection Model through the Evolutionary Arms Race of AI)'} />
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
        <div style={styles.groupYear}>106年度</div>
        <div style={styles.groupTitle}>{props.title}</div>
        <div>
          <MuiThemeProvider>
            <div style={styles.chipWrapper}>
              <Chip style={styles.chip}>
                <Avatar src={defaultPic} /> 陳罐頭
              </Chip>
              <Chip style={styles.chip}>
                <Avatar src={defaultPic} /> 胡瑄瑄
              </Chip>
              <Chip style={styles.chip}>
                <Avatar src={defaultPic} /> 劉抹茶
              </Chip>
            </div>
          </MuiThemeProvider>
        </div>
        <div style={styles.groupIntro}>
          這是一組專題的簡介，它的確是一個簡介，而且可能只有一行，也很有可能有一卡車的字，需要做換行。
          這是一組專題的簡介，它的確是一個簡介，而且可能只有一行，也很有可能有一卡車的字，需要做換行。
          這是一組專題的簡介，它的確是一個簡介，而且可能只有一行，也很有可能有一卡車的字，需要做換行。
      </div>
      </Col>
    </Row>
  </Grid>

)
