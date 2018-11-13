import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  Slide,
  Button
} from '@material-ui/core'
import NavigationIcon from '@material-ui/icons/Navigation'
import Frame from '../../../Components/Frame'
import { Link } from 'react-router-dom'
import InfoCard from './InfoCard'
// import FakeData from '../../../Resources/FakeData'
import axios from 'axios'
import {connect} from 'react-redux'

const styles = () => ({
  container:{
    width: '80%',
    margin: '35px auto'
  },
  table:{
    cursor: 'pointer'
  },
  dialog:{
    width:'90%'
  },
  icon:{
    fontSize: 16,
    color: '#f50057',
    marginRight: 4
  },
  NavBtn:{
    top:10,
    left:10,
    fontSize:15,
    fontWeight: 300,
  },
  font:{
    fontSize:16,
    fontWeight:400,
  },
  header:{
    fontSize:16
  }
})

const Transition = (props) =>(
  <Slide direction="up" {...props} />
)

class StudentList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      studentList: [/*FakeData.StudentList*/],
      chooseInfo: null,
      cardShow: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount(){
    axios.post('/assistants/advisee/StudentList', {
      teacher_id: `T${this.props.match.params.tid}`
    }).then(res=>{
      this.setState({
        studentList:res.data.sort((a,b)=>{
          if(a.recent_failed){
            if(b.recent_failed){
              return a.student_id.localeCompare(b.student_id, 'zh-Hant-TW')
            }
            else{
              return -1
            }
          }
          else{
            if(b.recent_failed){
              return 1
            }
            else{
              return a.student_id.localeCompare(b.student_id, 'zh-Hant-TW')
            }
          }
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }
  handleOpen(r){
    if(! ('score' in this.state.studentList[r])){
      let tmp = this.state.studentList
        // tmp[r].score = FakeData.StudentScore
        // this.setState({
        //   chooseInfo:r,
        //   studentList: tmp,
        //   cardShow: true
        // })
      axios.post('/StudentGradeList', {
        student_id: this.state.studentList[r].student_id
      }).then(res => {
        tmp[r].score = res.data
        this.setState({
          chooseInfo:r,
          studentList: tmp,
          cardShow: res.data !== []
        })
      }).catch(err => {
        console.log(err)
      })
    }
    else{
      this.setState({cardShow: true,chooseInfo:r})
    }
  }
  handleClose(){
    this.setState({cardShow: false})
  }
  render(){
    const {classes} = this.props
    return(
      <Frame>
        <Link to='/assistants/family'>
          <Button variant="extendedFab" color="primary" className={classes.NavBtn} >
            <NavigationIcon className={classes.extendedIcon} />
            回老師列表
          </Button>
        </Link>
        <Paper className={classes.container}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell padding='none'></TableCell>
                <TableCell className={classes.header}>學號</TableCell>
                <TableCell className={classes.header}>姓名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.studentList
              .map((student,index) => {
                return (
                  <TableRow key={student.student_id} onClick={()=>this.handleOpen(index)} className={classes.table}>
                    <TableCell numeric padding='none'>
                      {student.recent_failed && <span><i className={`fa fa-exclamation-triangle ${classes.icon}`}/></span>}
                    </TableCell>
                    <TableCell className={classes.font}>
                      {student.student_id}
                    </TableCell>
                    <TableCell className={classes.font}>
                      {student.sname}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
        <Dialog
          open={this.state.cardShow}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          scroll='paper'
          fullWidth={true}
        >
          <DialogContent>
            <InfoCard
              selected={this.state.studentList[this.state.chooseInfo]}
              sender={this.props.idCard.id}
              sender_email={this.props.idCard.email}
            />
          </DialogContent>
        </Dialog>
      </Frame>
    )
  }
}

const mapState = (state)=>({
  idCard: state.Assistant.User.idCard
})

export default connect(mapState)(withStyles(styles)(StudentList))
