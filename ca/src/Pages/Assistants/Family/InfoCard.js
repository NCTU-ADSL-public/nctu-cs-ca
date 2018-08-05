import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { 
  Table,
  TableBody, 
  TableCell, 
  TableRow, 
  CardHeader,
  CardContent,
  Avatar,
  Tabs,
  Tab
} from '@material-ui/core'
import { 
  ResponsiveContainer,LineChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip
} from 'recharts'

import MailButton from './MailButton'

const styles = () => ({
  container:{
    width: '100%',
    position: 'relative'
  },
  avatar_f:{
    fontSize: 16,
    backgroundColor:'#F50057',
    color:'#fff'
  },
  avatar_p:{
    backgroundColor:'#3949AB',
    color:'#fff'
  },
  failed:{
    color:'red'
  }
})

class InfoCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      Index: 0
    }
    this.changeIndex = this.changeIndex.bind(this)
  }
  changeIndex(e,v){
    this.setState({Index:v})
  }
  render(){
    const {classes} = this.props
    const semester = ['','上','下','暑']
    return(
      <div className={classes.container}>
        <MailButton
                    sender={this.props.sender} 
                    sender_email={this.props.sender_email} 
                    receiver={this.props.selected.sname}
                    receiver_email={this.props.selected.email}
                    failed={this.props.selected.failed}
                    warning = {this.props.selected.failed}
        />
        <CardHeader
          avatar={
            <Avatar className={this.props.selected.failed ? classes.avatar_f:classes.avatar_p}>
            {this.props.selected.sname[0]}
            </Avatar>
          }
          title={this.props.selected.sname}
          subheader={`${this.props.selected.program} / ${this.props.selected.student_id}`}
        />
  
        <CardContent>
        <div className='text-center h5 mb-2'>各學年度平均總成績</div>
        <ResponsiveContainer aspect={2}>
          <LineChart  data={this.props.selected.score}>
            <XAxis dataKey="semester"/>
            <YAxis domain={[0, 100]}/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Line type="monotone" dataKey="avg" stroke={`${this.props.selected.failed?'#F50057':'#8884d8'}`} activeDot={{r: 8}}/>
          </LineChart>
        </ResponsiveContainer>
          <Tabs 
            value={this.state.Index} 
            onChange={this.changeIndex}
            scrollable
            scrollButtons="on">
            {
              this.props.selected.score && this.props.selected.score.map(
                (v,i)=>(
                  <Tab key={i} value={i} label={`${v.semester.split('-')[0]}${semester[parseInt(v.semester.split('-')[1])]}`} />
                )
              )
            }
          </Tabs>
          <Table>
            <TableBody >
              {this.props.selected.score && this.props.selected.score[this.state.Index].score.map((v,i)=>(
                <TableRow key={i}>
                  <TableCell className={v.pass ? '':classes.failed}>{v.cn}</TableCell>
                  <TableCell className={v.pass ? '':classes.failed}>{v.score===null?(v.pass?'通過':'不通過'):v.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </div>
    )
  }
}

export default withStyles(styles)(InfoCard)