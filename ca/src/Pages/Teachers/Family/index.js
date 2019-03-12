import React from 'react'

import axios from 'axios'
import List from './Search/List'

import {Grid, Row, Col} from 'react-bootstrap'
import { Dialog, Card, CardHeader, CardText, Avatar, Table, TableBody, TableRow, TableRowColumn } from 'material-ui'
import { Tabs, Tab } from 'material-ui/Tabs'
import { MuiThemeProvider } from 'material-ui/styles'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import MailButton from '../../../Components/mail/MailButton'

const styles = {
  layout: {
    padding: '2%',
    marginBottom: '40px',
    verticalAlign: 'top'
  },
  course: {
    main: {
      width: '50%',
      padding: '40px 20px 0 0',
      display: 'inline-block',
      verticalAlign: 'top'
    },
    title: {
      padding: '10px 0 0 60px',
      height: 100,
      width: '100%',
      fontSize: 24,
      fontWeight: 500,
      color: '#7a7a7a'
    },
    box: {
      margin: '0 auto',
      padding: 20,
      width: 400
    },
    score: {
      margin: '0 auto',
      padding: 10,
      textAlign: 'center',
      width: 600,
      height: 200
    },
    scoreItem: {
      margin: '0 auto',
      float: 'left',
      padding: 10,
      width: 186
    }
  },
  score: {
    fontSize: 32,
    fontWeight: 500,
    padding: '3px 0 0 0px'
  }
}
const semester = ['', '上', '下', '暑']
const InfoCard = (props) => (
  <MuiThemeProvider>
    <Card style={props.selected.recent_failed ? {backgroundColor: '#fff', border: '2px solid #F50057'} : {}}>
      <CardHeader
        avatar={
          <Avatar style={props.selected.recent_failed ? {backgroundColor: '#F50057', color: '#fff'} : {backgroundColor: '#3949AB', color: '#fff'}}>
            {props.selected.sname[0]}
          </Avatar>
        }
        title={props.selected.sname}
        subtitle={`${props.selected.program} / ${props.selected.student_id}`}
      >
        <span style={{position: 'absolute', right: 20}}>
          <MailButton
            sender={props.tid}
            sender_email={props.tmail}
            receiver={props.selected.student_id}
            receiver_email={props.selected.email}
            failed={props.selected.recent_failed}
          />
        </span>
      </CardHeader>
      <CardText>
        <div className='text-center h5 mb-2'>各學年度平均總成績</div>
        <div>
          <ResponsiveContainer width={(window.innerWidth < 768) ? window.innerWidth * 0.6 : window.innerWidth * 0.4} aspect={2}>
            <LineChart data={props.selected.score}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey='semester' />
              <YAxis domain={[0, 100]} />
              <CartesianGrid strokeDasharray='3 3' />
              <Tooltip />
              <Line type='monotone' dataKey='avg' stroke={`${props.selected.recent_failed ? '#F50057' : '#8884d8'}`} activeDot={{r: 8}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardText>
      <CardText>
        <Tabs>
          {
            props.selected.score && props.selected.score.map(
              (v, i) => (
                <Tab key={i} label={`${v.semester.split('-')[0]}${semester[parseInt(v.semester.split('-')[1], 10)]}`} buttonStyle={v.failed ? {backgroundColor: '#fd93b5'} : {backgroundColor: '#87cdff'}}>
                  <Table>
                    {/* <TableHeader displaySelectAll={false}>
                        <TableRow>
                          <TableRowColumn>科目</TableRowColumn>
                          <TableRowColumn>成績</TableRowColumn>
                        </TableRow>
                      </TableHeader> */}
                    <TableBody displayRowCheckbox={false} >
                      {v.score.map((v, i) => (
                        <TableRow key={i} style={!v.pass ? {color: 'red'} : {}}>
                          <TableRowColumn>{v.cn}</TableRowColumn>
                          <TableRowColumn>{v.score === null ? (v.pass ? '通過' : '不通過') : v.score}</TableRowColumn>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Tab>
              )
            )
          }
        </Tabs>

      </CardText>
    </Card>
  </MuiThemeProvider>
)

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      initItem: [/* FakeData.StudentList.map((v,i)=>({...v,id:i})) */],
      chooseInfo: null,
      dialogOpen: false // for 行動版
    }
    this.fetchData = this.fetchData.bind(this)
    this.choose = this.choose.bind(this)
  }
  // handleChange(){
  //   this.setState
  // }
  choose (v) {
    if (!('score' in this.state.initItem[v])) {
      let tmp = this.state.initItem
      // tmp[v].score = FakeData.StudentScore
      // this.setState({
      //   chooseInfo:v,
      //   initItem: tmp,
      //   dialogOpen:(window.innerWidth<768)
      // })
      axios.post('/professors/advisee/semesterGradeList', {
        student_id: this.state.initItem[v].student_id
      }).then(res => {
        tmp[v].score = res.data
        this.setState({
          chooseInfo: v,
          initItem: tmp,
          dialogOpen: (window.innerWidth < 768) && res.data !== []
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      this.setState({
        chooseInfo: v,
        dialogOpen: (window.innerWidth < 768)
      })
    }
  }

  fetchData () {
    axios.get('/professors/advisee/list', {
      id: this.props.tid
    }).then(res => {
      this.setState({initItem: res.data.map((v, i) => ({...v, id: i}))})
    }).catch(err => {
      console.log(err)
    })
  }

  componentWillMount () {
    this.fetchData()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.tid !== nextProps.tid) {
      this.fetchData()
    }
  }

  render () {
    return (
      <Grid fluid>
        <Row>
          <Col lg={6} md={6} sm={6} style={styles.layout}>
            <List items={this.state.initItem} choose={this.choose} />
          </Col>
          {/* for smaller screen */}
          <MuiThemeProvider>
            <Dialog
              modal={false}
              open={this.state.dialogOpen}
              onRequestClose={() => this.setState({dialogOpen: false})}
              autoScrollBodyContent
              contentStyle={{maxWidth: 'none', width: '90%', position: 'absolute', top: 0, left: '5%'}}
            >
              <InfoCard
                selected={this.state.initItem[this.state.chooseInfo]}
                sender={this.props.tname}
                sender_email={this.props.tmail}
              />
            </Dialog>
          </MuiThemeProvider>
          {/* for larger screen */}
          <Col lg={6} md={6} sm={6} xsHidden style={styles.layout}>
            {this.state.chooseInfo !== null
              ? <InfoCard
                selected={this.state.initItem[this.state.chooseInfo]}
                sender={this.props.tname}
                sender_email={this.props.tmail}
              />
              : <MuiThemeProvider>
                <Card>
                  <CardText style={{textAlign: 'center', fontSize: '1.2em', minHeight: 500, color: 'rgb(144,144,144)'}}>請點選左方欄位以檢視學生成績</CardText>
                </Card>
              </MuiThemeProvider>
            }
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Index
