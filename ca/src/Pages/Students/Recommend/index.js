import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
  Badge,
  Table,
  TableHead,
  TableBody, 
  TableCell, 
  TableRow, 
  Tooltip,
  Paper,
  AppBar,
  Tabs,
  Tab,
  IconButton
} from '@material-ui/core'
import axios from 'axios'
import classNames from 'classnames'
import SwipeableViews from 'react-swipeable-views'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info'

//import FakeData from '../../../Resources/FakeData'

const styles = ()=>({
  root0:{
    marginTop: 10,
    marginBottom: 40
  },
  root: {
    width: '90%',
    margin: '0 auto',
    marginTop: 40,
    marginBottom: 40,
    overflowX: 'auto'
  },
  tab:{
  },
  head: {
    background: 'rgb(104, 187, 102)',
    color: '#fff'
  },
  row:{
    '&:nth-of-type(even)': {
      backgroundColor: '#efefef',
    },
  },
  font1:{
    color: '#fff',
    fontSize:15,
    textAlign: 'center'
  },
  font2:{
    fontSize:14,
    fontWeight:400,
    textAlign: 'center'
  },
  rating:{
    display: 'flex',
    flexDirection:'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  star: {
    fontSize: '1.4em',
    color: '#ccc',
    '&:hover ~ &,&:hover':{
      color:'#ffc831'
    }
  },
  padding:{
    padding: '0 10px',
  },
  header:{
    fontSize: 15,

  },
  descript:{
    position: 'fixed',
    bottom: 40,
    left: 0,
    zIndex: 1080
  }
})

class Recommend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // for testing
      // data: FakeData.RecommendCos.map(e=>({...e,rating:false})),
      // data2: FakeData.RecommendHot,
      data: [],
      data2:[],
      value: 0
    }
    this.rating = this.rating.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
  }

  componentWillMount () {
    axios.get('/students/courses/recommend').then(res => {
      this.setState({
        data: res.data.map(e=>({...e,rating:false}))
      })
    }).catch(err => {
      console.log(err)
    })
    axios.get('/students/ShowStudentHotCos',{
      student_id: this.props.id
    }).then(res=>{
      this.setState({
        data2: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }
  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }
  rating(e,i){
    let rating = e.target.getAttribute('value')
    if(rating !== null){
      axios.post('/students/SetRecommendCosStar',{
        student_id: this.props.id,
        unique_id: this.state.data[i]['unique_id'],
        star_level: rating
      })
      let update = this.state.data
      update[i].rating = true
      this.setState({data:update}) 
    }
  }

  render () {
    const {classes,theme} = this.props
    return (
      <MuiThemeProvider theme={createMuiTheme({
        palette: {
          primary: {
            main: 'rgb(104, 187, 102)',
          }
        }})}>
      <div  className={classes.root0}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label={<span className={classes.header}>推薦課程</span>} />
            <Tab label={<Badge className={classNames(classes.padding,classes.header)} color="secondary" badgeContent={'新'}>發燒選課</Badge>} />
          </Tabs>
        </AppBar>
        <Tooltip  title={this.state.value === 0 ? "根據你的修課紀錄推薦這學期的課程":"根據先前學長姐的修課紀錄排序熱門課程"} placement="right">
        <IconButton className={classes.descript}>
        <InfoIcon />
        </IconButton>
        </Tooltip>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
        <div dir={theme.direction}>
        <Paper  className={classes.root}>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <Tooltip title="按推薦優先順序排列課程" placement="top">
                  <TableCell className={classes.font1}>順序</TableCell>
                </Tooltip>
                <Tooltip title="課程名稱" placement="top">
                  <TableCell className={classes.font1}>課程</TableCell>
                </Tooltip>
                <Tooltip title="開課老師" placement="top">
                  <TableCell className={classes.font1}>開課老師</TableCell>
                </Tooltip>
                <Tooltip title="同一門課不同老師授課時段可能不一樣" placement="top">
                <TableCell className={classes.font1}>時段</TableCell>
                </Tooltip>
                <Tooltip title="便於您查詢課程" placement="top">
                <TableCell className={classes.font1}>課號</TableCell>
                </Tooltip>
                <Tooltip title="此推薦是否對你有幫助" placement="top">
                <TableCell className={classes.font1}>此推薦是否對你有幫助</TableCell>
                </Tooltip>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row, index) => (
                <TableRow key={index} className={classes.row}>
                  <TableCell className={classes.font2}>{index + 1}</TableCell>
                  <TableCell className={classes.font2}><a href={row.url}>{row.cos_cname}</a></TableCell>
                  <TableCell className={classes.font2}>{row.teacher}</TableCell>
                  <TableCell className={classes.font2}>{row.cos_time}</TableCell>
                  <TableCell className={classes.font2}>{row.cos_code}</TableCell>
                  <TableCell className={classes.font2} onClick={e => this.rating(e,index)}>
                    {!row.rating ?
                      (
                        <span className={classNames(classes.rating)} >
                          <i className={classNames("fa fa-star",classes.star)} value={5}/>
                          <i className={classNames("fa fa-star",classes.star)} value={4}/>
                          <i className={classNames("fa fa-star",classes.star)} value={3}/>
                          <i className={classNames("fa fa-star",classes.star)} value={2}/>
                          <i className={classNames("fa fa-star",classes.star)} value={1}/>
                        </span> 
                      ):
                      <span  className={classes.font2} >感謝您的回饋 &gt; &lt;</span>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </Paper>
        </div>
        <div dir={theme.direction}>
        <Paper  className={classes.root}>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <Tooltip title="按先前學長姐的修課紀錄排列課程的熱門程度" placement="top">
                  <TableCell className={classes.font1}>順序</TableCell>
                </Tooltip>
                <Tooltip title="課程名稱" placement="top">
                  <TableCell className={classes.font1}>課程</TableCell>
                </Tooltip>
                <Tooltip title="開課老師" placement="top">
                  <TableCell className={classes.font1}>開課老師</TableCell>
                </Tooltip>
                <Tooltip title="同一門課不同老師授課時段可能不一樣" placement="top">
                <TableCell className={classes.font1}>時段</TableCell>
                </Tooltip>
                <Tooltip title="學分數" placement="top">
                  <TableCell className={classes.font1}>學分</TableCell>
                </Tooltip>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data2.map((row, index) => (
                <TableRow key={index} className={classes.row}>
                  <TableCell className={classes.font2}>{index + 1}</TableCell>
                  <TableCell className={classes.font2}><a href={row.url} target="_blank">{row.cos_cname}</a></TableCell>
                  <TableCell className={classes.font2}>{row.tname}</TableCell>
                  <TableCell className={classes.font2}>{row.cos_time.split('-')[0]}</TableCell>
                  <TableCell className={classes.font2}>{row.cos_credit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </Paper>
        </div>
        </SwipeableViews>
        
      </div>
      </MuiThemeProvider>
    )
  }
}


const mapState = (state)=>({
  id: state.Student.User.studentIdcard.student_id
})

export default connect(mapState)(withStyles(styles, { withTheme: true })(Recommend))