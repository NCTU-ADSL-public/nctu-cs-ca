import React from 'react'
import './style.css'
import { Link,withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  Chip,
  Avatar,
  TextField,
  Badge,
  Button,
  IconButton,
  Table,
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face'
import ListIcon from '@material-ui/icons/List'
import ViewIcon from '@material-ui/icons/ViewComfy'
import axios from 'axios'
// import FakeData from '../../../Resources/FakeData'

const styles = () => ({
  container:{
    width: '80%',
    margin: '25px auto',
  },
  bar:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button:{
    marginRight: 30,
    marginBottom: 25,
  },
  buttonText:{
    fontSize: 16,
    fontWeight: 400
  },
  icon:{
    fontSize: 17,
    marginRight: 3
  },
  input:{
    marginBottom: 40,
    width: '50%',
    fontSize: 16
  },
  chip:{
    marginLeft: 15,
    fontSize: 16,
  },
  buttonGroup:{
    marginLeft: 10,
    fontSize: 16
  },
  content:{
    width: '85%',
    margin:'10px auto'
  },
  font:{
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center'
  },
  header:{
    fontSize: 16,
    textAlign: 'center'
  },
  row:{
    cursor: 'pointer'
  },
  font2:{
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    color:'#F50057'
  },
  btncontainer:{
    width: '100%',
    margin:'10px auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(5,5fr)'
  }
})

class Family extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      teacherList: [/*FakeData.TeacherList*/],
      filter:'',
      toggle:true,
      display:0
    }
  }
  componentDidMount(){
    axios.get('/assistants/advisee/TeacherList').then(res =>{
      this.setState({teacherList: res.data})
    }).catch(err => {
      console.log(err)
    })
  }
  render(){
    const {classes} = this.props
    const Wrapper = (props)=>(
      this.state.display === 1 ?
      <div className={classes.btncontainer}>
        {props.children}
      </div>
      :
      <Table className={classes.content}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>姓名</TableCell>
            <TableCell className={classes.header}>近期被當人數</TableCell>
            <TableCell className={classes.header}>被當總人數</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.children}
        </TableBody>
      </Table>
    )
    return(
        <div className={classes.container}>
        <div className={classes.bar}>
          <TextField
            id="name"
            label={<span className={classes.font}>請輸入教授姓名以進行篩選</span>}
            value={this.state.filter}
            onChange={(e)=>this.setState({filter:e.target.value})}
            margin="normal"
            className={classes.input}
          />
          <Chip
            avatar={
              <Avatar>
                <FaceIcon />
              </Avatar>
            }
            label={this.state.toggle?'僅顯示需關注對象':'全部顯示'}
            color='primary'
            clickable
            className={classes.chip}
            onClick={()=>{this.setState({toggle:!this.state.toggle})}}
          />
          <span className={classes.buttonGroup}>
            <IconButton onClick={()=>this.setState({display:0})} color={`${this.state.display === 0 ? 'secondary':'default'}`}>
              <ListIcon/>
            </IconButton>
            <IconButton onClick={()=>this.setState({display:1})} color={`${this.state.display === 1 ? 'secondary':'default'}`}>
              <ViewIcon/>
            </IconButton>
          </span>
        </div>
            <Wrapper>
            {this.state.display === 0 ?
            this.state.teacherList
              .filter(teacher =>(
                (teacher.name.trim().toLowerCase().search(
                  this.state.filter.trim().toLowerCase()) !== -1)
              ))
              .sort((a,b)=>
                (a.recent_failed > b.recent_failed)? -1 : 1
                )
              .map((teacher,index)=>(
                teacher.recent_failed > 0 ?
                    <TableRow className={classes.row} key={index} onClick={()=>this.props.history.push(`/assistants/family/${teacher.id.substr(1)}`)}>
                      <TableCell className={classes.font2}>{teacher.name}</TableCell>
                      <TableCell className={classes.font2}>{teacher.recent_failed}</TableCell>
                      <TableCell className={classes.font2}>{teacher.failed_students}</TableCell>
                    </TableRow>
                  :
                  this.state.toggle &&
                    <TableRow className={classes.row} key={index} onClick={()=>this.props.history.push(`/assistants/family/${teacher.id.substr(1)}`)}>
                      <TableCell className={classes.font}>{teacher.name}</TableCell>
                      <TableCell className={classes.font}>{teacher.recent_failed}</TableCell>
                      <TableCell className={classes.font}>{teacher.failed_students}</TableCell>
                    </TableRow>
              )):
            this.state.teacherList
              .filter(teacher =>(
                (teacher.name.trim().toLowerCase().search(
                  this.state.filter.trim().toLowerCase()) !== -1)
              ))
              .sort((a,b)=>
                (a.recent_failed > b.recent_failed)? -1 : 1
                )
                .map((teacher,index)=>{
                  return teacher.recent_failed > 0 ?
                    <Link to={`/assistants/family/${teacher.id.substr(1)}`} key={index}>
                      <Badge className={classes.button} color="secondary" badgeContent={teacher.recent_failed} >
                        <Button variant="contained" size="large">
                          <span><i className={`fa fa-graduation-cap ${classes.icon}`}></i></span>
                          <span className={classes.buttonText}>{teacher.name}</span>
                        </Button>
                      </Badge>
                    </Link>
                    :
                    this.state.toggle &&
                    <Link to={`/assistants/family/${teacher.id.substr(1)}`} key={index}>
                      <Button className={classes.button} variant="contained" size="large">
                        <span><i className={`fa fa-graduation-cap ${classes.icon}`}></i></span>
                        <span className={classes.buttonText}>{teacher.name}</span>
                      </Button>
                    </Link> 
              })
            }
            </Wrapper>
        </div>

    )
  }
}

export default withStyles(styles)(withRouter(Family))