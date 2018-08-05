import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import FakeData from '../../../Resources/FakeData'

const styles = () => ({
  container:{
    width: '80%',
    margin: '25px auto'
  },
  button:{
    marginRight: 30,
    marginBottom: 25
  },
  icon:{
    fontSize: 17,
    marginRight: 3
  }
})

class Family extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      teacherList: FakeData.TeacherList
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
          {this.state.teacherList.sort((a,b)=>
            (a.failed_students > b.failed_students)? -1 : 1
            ).map((teacher,index)=>(
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