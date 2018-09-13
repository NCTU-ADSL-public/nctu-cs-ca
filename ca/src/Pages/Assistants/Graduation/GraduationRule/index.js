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
  Popover
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SaveIcon from '@material-ui/icons/Done'
import TransIcon from '@material-ui/icons/ExitToApp'
import FakeData from '../../../../Resources/FakeData'

const styles = ()=>({
  root: {
    margin: '50px auto',
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
    marginLeft: 20
  },
  input : {
    fontSize: 16
  }
})

const FilterRule = [
  {
    title: '共同必修',
    dep: ['17','C1'],
    type: '必修',
    credit: 58
  },
  {
    title: '專業選修',
    dep: ['17','10','55'],
    type: '選修',
    credit: 32
  },
  {
    title: '其他選修',
    dep: !['17','10','55'],
    type: '選修',
    credit: 12
  },
  {
    title: '外語',
    type: '外語',
    credit: 8
  },
  {
    title: '體育',
    dep: ['U9'],
    cos: 6
  },
  {
    title: '藝文賞析',
    dep: ['U3'],
    cos: 2
  }
]

const RuleCard = withStyles(styles)((props)=>{
  const {classes} = props
  return(
    <Card className={classes.card}>
      <CardHeader
        title={props.credit?<span className={classes.title}>{props.title} {props.credit} 學分</span>:<span className={classes.title}>{props.title} {props.cos} 門</span>}
        action={
              <IconButton>
                <SaveIcon/>
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
    label: '資電'
  },
  {
    label: '資A'
  },
  {
    label: '資B'
  },
  {
    label: '網多'
  },
]
class GraduationRule extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      grade: '08',
      group: '資電',
      anchorEl: null, // for menu
      rule : FakeData.GraduationRule,
      open : false,
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
        <span className={classes.select}>
          <TextField
            select
            label="系級"
            value={this.state.grade}
            onChange={this.handleSelect('grade')}
            margin="normal"
            className={classes.input}
          >
            {grade.map(option => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <span>
          <TextField
            select
            label="組別"
            value={this.state.group}
            onChange={this.handleSelect('group')}
            margin="normal"
            className={classes.input}
          >
            {group.map(option => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </span>
        
        {
          FilterRule.map(
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
                        this.state.rule
                        .filter(course=>(!group.dep || group.dep.includes(course.dep_id)) && (!group.type || course.cos_type === group.type))
                        .sort((a,b)=>a.cos_cname.localeCompare(b.cos_cname, 'zh-Hant-TW'))
                        .map((course,index)=>
                        <React.Fragment>
                        <Chip
                          label={course.cos_cname +' / '+ course.teacher}
                          key={index}
                          //onClick={handleClick}
                          onDelete={this.handleOpen}
                          deleteIcon={<TransIcon/>}
                          className={classes.chip}
                          //deleteIcon={<DoneIcon />}
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
                    <Button variant="outlined" color="primary" onClick={this.handlePop} className={classes.button} 
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
                    </Popover>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </RuleCard>
            )
          )
        }
        {/* <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>{"將此課程移至"}</DialogTitle>
          <DialogContent>
           
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              確認
            </Button>
          </DialogActions>
        </Dialog> */}
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>必修</MenuItem>
          <MenuItem onClick={this.handleClose}>專業選修</MenuItem>
          <MenuItem onClick={this.handleClose}>其他選修</MenuItem>
          <MenuItem onClick={this.handleClose}>外語</MenuItem>
          <MenuItem onClick={this.handleClose}>體育</MenuItem>
          <MenuItem onClick={this.handleClose}>藝文賞析</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(GraduationRule)