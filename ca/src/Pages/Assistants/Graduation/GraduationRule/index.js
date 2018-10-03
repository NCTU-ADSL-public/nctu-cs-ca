import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Select,
  Popover,
  Table,
  TableBody, 
  TableCell, 
  TableRow, 
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import RecoverIcon from '@material-ui/icons/History'
import TransIcon from '@material-ui/icons/ExitToApp'
import FakeData from '../../../../Resources/FakeData'

const styles = ()=>({
  root: {
    margin: '0 auto',
    marginBottom: 50,
    width: '90%'
  },
  title: {
    fontSize: '1.4em',
    margin: '2% 0'
  },
  subtitle:{
    fontSize: '1.2em',
  },
  card: {
    margin: '2.5%'
  },
  chip: {
    margin: 4,
    fontSize: 13.5,
  },
  select: {
    marginRight: 10
  },
  button:{
    marginLeft: 20,
    position: 'absolute',
    right: 25,
    top: 32,
  },
  input : {
    fontSize: 17
  },
  filter : {
    position: 'relative',
    marginLeft: '3%'
  },
  font:{
    fontSize:16,
    fontWeight:400
  },
})

const RuleCard = withStyles(styles)((props)=>{
  const {classes} = props
  return(
    <Card className={classes.card}>
      <CardHeader
        title={props.credit?<span className={classes.title}>{props.title} {props.credit} 學分</span>:<span className={classes.title}>{props.title} {props.cos} 門</span>}
        action={
              <IconButton>
                <RecoverIcon/>
              </IconButton>
            }
      />
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  )
})
const grade = [
  {
    label: '08'
  },
  {
    label: '09'
  },
  {
    label: '10'
  },
  {
    label: '11'
  },
]
const group = [
  {
    label: '資電',
    value: 0
  },
  {
    label: '資工',
    value: 1
  },
  {
    label: '網多',
    value: 2
  },
]
class GraduationRule extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      grade: '08',
      group: 0,
      //anchorEl: null, // for menu
      allCourse : FakeData.AllCourse,
      rule : FakeData.AllType,
      open : false, //for dialog
      form: false,
      courses: [],
      moveTo: '',
      pop: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handlePop = this.handlePop.bind(this)
    this.handleClosePop = this.handleClosePop.bind(this)
  }
  handleChange(event){
    this.setState({moveTo:event.target.value})
  }
  handleOpen(e){
    this.setState({anchorEl:e.currentTarget})
  }
  handleClose(){
    this.setState({anchorEl:null})
  }
  handlePop(){
    this.setState({pop:true})
  }
  handleClosePop(){
    this.setState({pop:false})
  }
  handleSelect = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render(){
    const {classes} = this.props
    return(
      <div className={classes.root}>
        <div className={classes.filter}>
        <span className={classes.select}>
          <TextField
            select
            label={<span className={classes.input}>系級</span>}
            value={this.state.grade}
            onChange={this.handleSelect('grade')}
            margin="normal"
            InputProps={{
            classes: {
              input: classes.input,
            },
            }}
          >
            {grade.map(option => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <span className={classes.select}>
          <TextField
            select
            label={<span className={classes.input}>組別</span>}
            value={this.state.group}
            onChange={this.handleSelect('group')}
            margin="normal"
            InputProps={{
            classes: {
              input: classes.input,
            },
            }}
          >
            {group.map(option => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <Button variant="outlined" color="primary" className={classes.button}
        onClick={()=>this.setState({form:true})}>
          新增課程
        </Button>
        </div>
        {
          this.state.rule.map(
            (group,index)=>(
              <RuleCard title={group.title} credit={group.credit} cos={group.cos} key={index}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <span className={classes.subtitle}>
                      全部課程
                    </span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                      {
                        this.state.allCourse
                        .filter(course=> 
                        (course.rule===[] && course.type.includes(group.title)) || //三組規則一樣
                        (course.rule[this.state.group]===group.title)//三組規則不一樣
                        )
                        .sort((a,b)=>a.cos_cname.localeCompare(b.cos_cname, 'zh-Hant-TW'))
                        .map((course,index)=>
                        <React.Fragment>
                        <Chip
                          label={course.title}
                          key={index}
                          onClick={()=>this.setState({open:true,courses:[...course.courses]})}
                          onDelete={this.handleOpen}
                          deleteIcon={<TransIcon/>}
                          className={classes.chip}
                        /> 
                        </React.Fragment>
                        )
                      }
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <span className={classes.subtitle}>操作</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {group.credit?
                      <Input
                      value={group.credit}
                      margin="normal"
                      endAdornment={<InputAdornment position="end">學分</InputAdornment>}
                    />
                    :
                    <Input
                      value={group.cos}
                      margin="normal"
                      endAdornment={<InputAdornment position="end">門</InputAdornment>}
                    />
                    }
                    {/* <Button variant="outlined" color="primary" onClick={this.handlePop} className={classes.button} 
                      buttonRef={node => {
                        this.anchor = node
                      }}
                    >
                      以當期課號新增課程
                    </Button>
                    <Popover 
                      open={this.state.pop}
                      anchorEl={this.anchor}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      onClose={this.handleClosePop}
                    >
                    <DialogTitle>{"新增課程"}</DialogTitle>
                      <DialogContent>
                          <TextField
                            onChange={e=>this.handleChange(e.target.value)}
                            placeholder="請輸入當期課號"
                            margin="normal"
                          />
                      </DialogContent>
                    </Popover> */}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </RuleCard>
            )
          )
        }
        <Dialog
          open={this.state.open}
          onClose={()=>this.setState({open:false})}
          fullWidth
          maxWidth='md'
        >
          <DialogTitle className={classes.font}>{"可抵免的課程"}</DialogTitle>
          <DialogContent>
          <Table>
            <TableBody >
              {this.state.courses.map((v,i)=>(
                <TableRow key={i}>
                <TableCell className={classes.font}>{v.code}</TableCell>
                  <TableCell className={classes.font}>{v.name}</TableCell>
                  <TableCell className={classes.font}>{v.teacher}</TableCell>
                </TableRow>
              ))}
              <TableCell className={classes.font}>
                <Input
                  placeholder="永久課號"
                />
              </TableCell>
              <TableCell className={classes.font}>
                <Input
                  placeholder="課程名稱"
                />
              </TableCell>
              <TableCell className={classes.font}>
                <Input
                  placeholder="授課老師"
                />
              </TableCell>
            </TableBody>
          </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.setState({open:false})} color="primary">
              取消
            </Button>
            <Button onClick={()=>{}} color="primary" autoFocus>
              新增可抵免課程
            </Button>
          </DialogActions>
        </Dialog>
        {/* form dialog */}
        <Dialog
          open={this.state.form}
          onClose={()=>this.setState({form:false})}
          fullWidth
          maxWidth='md'
        >
        <DialogTitle className={classes.font}>{"新增課程"}</DialogTitle>
          <DialogContent>
            
            <Input
              placeholder="永久課號"
            />
            <Input
              placeholder="課程名稱"
            />
            <Input
              placeholder="授課老師"
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.setState({form:false})} color="primary">
              取消
            </Button>
            <Button onClick={()=>{}} color="primary" autoFocus>
              確認
            </Button>
          </DialogActions>
        </Dialog>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {this.state.rule.map((type,i)=>
            <MenuItem key={i} onClick={this.handleClose}>
              {type.title}
            </MenuItem>
          )}
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(GraduationRule)