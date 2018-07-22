import React from 'react'

import axios from 'axios'
import List from './Search/List'

import FakeData from '../../../Resources/FakeData'

import {Card,CardHeader,CardText,Avatar,Table,TableBody,TableHeader,TableRow,TableRowColumn} from 'material-ui'
import { MuiThemeProvider } from 'material-ui/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import DialogButton from '../../../Components/mail/DialogButton'

const styles = {
  content: {
    width: '50%',
    display: 'inline-block',
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
      color: '#7a7a7a',
    },
    box: {
      margin: '0 auto',
      padding: 20,
      width: 400,
    },
    score: {
      margin: '0 auto',
      padding: 10,
      textAlign: 'center',
      width: 600,
      height: 200,
    },
    scoreItem: {
      margin: '0 auto',
      float: 'left',
      padding: 10,
      width: 186,
    }
  },
  score: {
    fontSize: 32,
    fontWeight: 500,
    padding: '3px 0 0 0px',
  }
}
const InfoCard = (props)=>(
  <MuiThemeProvider>
      <Card style={props.selected.failed && {backgroundColor:'#FFEEEE',border:'2px solid #FF7D7D'}}>
        <CardHeader
          avatar={
            <Avatar>
            {props.selected.sname[0]}
            </Avatar>
          }
          title={props.selected.sname}
          subtitle={`${props.selected.program} / ${props.selected.student_id}`}
        >
        <span style={{position:'absolute',right:20}}>
          <DialogButton
            sender={1} receiver={1} sender_email={1} receiver_email={1}
          />
        </span>
        </CardHeader>
        <CardText>
        <div className='text-center h5 mb-2'>各學年度平均總成績</div>
        <LineChart width={500} height={300} data={props.selected.avg}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="semester"/>
          <YAxis domain={[0, 100]}/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Line type="monotone" dataKey="avg" stroke="#8884d8" activeDot={{r: 8}}/>
        </LineChart>
        </CardText>         
        <CardText>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableRowColumn>科目</TableRowColumn>
                <TableRowColumn>成績</TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} >
              {props.selected.score && props.selected.score.map((v,i)=>(
                <TableRow key={i}>
                  <TableRowColumn>{v.cn}</TableRowColumn>
                  <TableRowColumn>{v.score}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    </MuiThemeProvider>
)

export default class index extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      //for passing Course id selected by List
      item: {
        id: '',
        sem: '',
        cos_cname: '(無資料)',
        unique_id: '',
        avg: '-',
        Pavg: '-',
      },

      scoreDetail: {
        avg: '-',
        Pavg: '-',
        member: '-',
        passed: '-',
        max: '-',
      },

      scoreChartDetail: {
        passed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        failed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },

      initItem: FakeData.StudentList,
      chooseInfo: 0
    }
  }

  fetchData(){
    axios.get('/professors/students/list', {
      id: this.props.tid,
    }).then(res => {
      this.setState({initItem: res.data})
    }).catch(err => {
      console.log(err)
    })
  }

  componentWillMount(){
    this.fetchData();
  }

  componentWillReceiveProps(nextProps){
    if(this.props.tid !== nextProps.tid){
      this.fetchData();
    }
  }

  searchCallback = (item) => {
    this.setState({item})

    axios.post('/professors/courseInfo/score', {
      cos_code: item.cos_code,
      unique_id: item.unique_id,
    }).then(res => {
      this.setState({scoreDetail: res.data[0]})
    }).catch(err => {
      console.log(err)
    })

    axios.post('/professors/courseInfo/scoreInterval', {
      cos_code: item.cos_code,
      unique_id: item.unique_id,
    }).then(res => {
      this.ChartData(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  ChartData = (data) => {
    let scoreChartDetail = {
      passed: [0, 0, 0, 0, 0, 0, data[7], data[8], data[9], data[10]],
      failed: [data[1], data[2], data[3], data[4], data[5], data[6], 0, 0, 0, 0],
    }
    this.setState({ scoreChartDetail });
  }

  render () {
    // const showCourse = (
    //   <div style={styles.course.main}>
    //     <div style={styles.course.title}>[{this.state.item.unique_id}] {this.state.item.sem}
    //       - {this.state.item.cos_cname}</div>
    //     <div style={styles.course.score}>
    //       <div style={styles.course.scoreItem}><ShowScore title={'平均成績'} score={this.state.scoreDetail.avg}/></div>
    //       <div style={styles.course.scoreItem}><ShowScore title={'及格平均成績'} score={this.state.scoreDetail.Pavg}/></div>
    //       <div style={styles.course.scoreItem}><ShowScore title={'修課人數'} score={this.state.scoreDetail.member}/></div>
    //       <div style={styles.course.scoreItem}><ShowScore title={'及格人數'} score={this.state.scoreDetail.passed}/></div>
    //       <div style={styles.course.scoreItem}><ShowScore title={'不及格人數'}
    //                                                       score={ this.state.scoreDetail.member === '-'
    //                                                         ? '-'
    //                                                         : this.state.scoreDetail.member - this.state.scoreDetail.passed}/>
    //       </div>
    //       <div style={styles.course.scoreItem}><ShowScore title={'最高分'} score={this.state.scoreDetail.max}/></div>
    //     </div>
    //     <div style={styles.course.box}><GaugeChart member={this.state.scoreDetail.member}
    //                                                passed={this.state.scoreDetail.passed}/></div>
    //     <div style={styles.course.box}><ScoreChart detail={this.state.scoreChartDetail}/></div>
    //   </div>
    // );

    const showDefault = (
      <div style={styles.course.main}>
        <div style={styles.course.title}>(此功能尚在測試階段)</div>
      </div>
    )

    return (
        <div>
          <div style={styles.content}>
            <List items={this.state.initItem} parentFunction={this.searchCallback} choose={(v)=>{this.setState({chooseInfo:v})}}/>
          </div>
          {/*{ this.state.item.unique_id ? showCourse : showDefault }*/}
          <div style={styles.content}>
            <InfoCard selected={this.state.initItem[this.state.chooseInfo]}/>
          </div>
        </div>
    )
  }
}

const ShowScore = (props) => (
  <div>
    <div>{props.title}</div>
    <div style={styles.score}>{props.score}</div>
  </div>
)

