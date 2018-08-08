import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  Chip,
  Avatar,
  TextField,
  Badge,
  Button
} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face'
import axios from 'axios'
import FakeData from '../../../Resources/FakeData'

const styles = () => ({
  container:{
    width: '90%',
    margin: '25px auto'
  },
  button:{
    marginRight: 30,
    marginBottom: 25
  },
  icon:{
    fontSize: 17,
    marginRight: 3
  },
  input:{
    marginBottom: 40,
    width: '50%',
    textAlign: 'center'
  },
  chip:{
    marginLeft: 15
  }
})

class Family extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      teacherList: [],
      filter:'',
      toggle:true
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
    return(
        <div className={classes.container}>
        <div className='text-field'>
          <TextField
            id="name"
            label="請輸入教授姓名以進行篩選"
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
        </div>
          {this.state.teacherList
          .filter(teacher =>(
            (teacher.name.trim().toLowerCase().search(
              this.state.filter.trim().toLowerCase()) !== -1)
          ))
           .sort((a,b)=>
            (a.failed_students > b.failed_students)? -1 : 1
            )
            .map((teacher,index)=>(
            teacher.failed_students > 0 ?
            <Link to={`/assistants/family/${teacher.id.substr(1)}`} key={index}>
              <Badge className={classes.button} color="secondary" badgeContent={teacher.failed_students} >
                <Button variant="contained" size="large">
                  <span><i className={`fa fa-graduation-cap ${classes.icon}`}></i></span>
                  {teacher.name}
                </Button>
              </Badge>
            </Link>
            :
            this.state.toggle &&
            <Link to={`/assistants/family/${teacher.id.substr(1)}`} key={index}>
              <Button className={classes.button} variant="contained" size="large">
                <span><i className={`fa fa-graduation-cap ${classes.icon}`}></i></span>
                {teacher.name}
              </Button>
            </Link>
          ))}
        </div>

    )
  }
}

export default withStyles(styles)(Family)