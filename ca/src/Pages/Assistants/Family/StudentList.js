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
  DialogContent
} from '@material-ui/core'
import InfoCard from './InfoCard'
import FakeData from '../../../Resources/FakeData'
import axios from 'axios'
import {connect} from 'react-redux'

const styles = () => ({
  container:{
    width: '80%',
    margin: '25px auto'
  },
  table:{
    cursor: 'pointer'
  },
  dialog:{
    width:'90%'
  },
  icon:{
    fontSize: 14,
    color: '#f50057',
    marginRight: 4
  }
})

class StudentList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      studentList: FakeData.StudentList,
      chooseInfo: null,
      cardShow: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount(){
    axios.post('assistants/advisee/StudentList', {
      teacher_id: `T${this.props.match.params.tid}`
    }).then(res=>{
      this.setState({studentList:res})
    }).catch(err => {
      console.log(err)
    })
  }
  handleOpen(r){
    if(! ('score' in this.state.studentList[r])){
      let tmp = this.state.studentList
      tmp[r].score = FakeData.StudentScore
      /*
      axios.get('/professors/family/score', {
        id: this.state.initItem[v].student_id,
      }).then(res => {
        tmp[v].score = res
        this.setState({
          chooseInfo:v,
          initItem: tmp,
          dialogOpen:(window.innerWidth<768)
        })
      }).catch(err => {
        console.log(err)
      })
      */
      this.setState({
        chooseInfo:r,
        studentList: tmp,
        cardShow: true
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
      <React.Fragment>
        <Paper className={classes.container}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell padding='none'></TableCell>
                <TableCell>學號</TableCell>
                <TableCell>姓名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.studentList.map((student,index) => {
                return (
                  <TableRow key={student.student_id} onClick={()=>this.handleOpen(index)} className={classes.table}>
                    <TableCell numeric padding='none'>
                      {student.failed && <span><i className={`fa fa-exclamation-triangle ${classes.icon}`}/></span>}
                    </TableCell>
                    <TableCell>
                      {student.student_id}
                    </TableCell>
                    <TableCell>
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
          scroll='paper'
          fullWidth={true}
        >
          <DialogContent>
            <InfoCard 
              selected={this.state.studentList[this.state.chooseInfo]}
              sender={this.props.idCard.name}
              sender_email={this.props.idCard.email}
            />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    )
  }
}

const mapState = (state)=>({
  idCard: state.Assistant.User.idCard
})

export default connect(mapState)(withStyles(styles)(StudentList))