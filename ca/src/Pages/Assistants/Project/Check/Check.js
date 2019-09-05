import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Table from '@material-ui/core/Table';
import Tooltip from '@material-ui/core/Tooltip';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  agreeCheck,
  rejectCheck
} from '../../../../Redux/Assistants/Actions/Project/Check';

const styles = theme => ({
  container: {
    width: '80%',
    margin: '0 auto'
  },
  dialog: {
    minWidth: '500px'
  },
  tooltip: {
    fontSize: '15px'
  }
})

const FIRST_SECOND_CN = ['', '專題(一)', '專題(二)', '基礎程式設計通過待確認']

class Check extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      agreeOpen: false,
      rejectOpen: false,
      check: ''
    }
  }

  hightlight = (label, raw_input) => {
    if (raw_input === '')
      return label
    const target = new RegExp(raw_input,"gi");
    var result, indices = [];
    while ( (result = target.exec(label)) ) {
        indices.push(result.index);
    }
    indices.push(label.length)
    return indices.length ? (
      <span>
        <span>{label.substr(0, indices[0])}</span>
        {
          indices.map( (index, idx) =>
            <span key={idx}>
              <span style={{background: 'yellow'}}>{label.substr(index, raw_input.length)}</span>
              <span>{idx === indices.length - 1 ? '' : label.substr(index + raw_input.length, indices[idx + 1] - index - raw_input.length)}</span>
            </span>
          )
        }
      </span>
    ) : label
  }

  render () {
    const { classes } = this.props;
    const {  } = this.state;

    return (
      <div className={classes.container}>
        <Table>
          <TableHead>
            <TableRow style={{display: 'flex', justifyContent: 'center'}}>
              <TableCell style={{flex: 0.025, padding: '0px'}} >
                <IconButton style={{fontSize: '18px'}} disabled/>
              </TableCell>
              <TableCell style={{flex: 0.025, padding: '0px'}} >
                <IconButton style={{fontSize: '18px'}} disabled/>
              </TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.175, paddingTop: '11px', paddingLeft: '20px'}}>學號</TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.175, paddingTop: '11px', paddingLeft: '0px'}}>姓名</TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.175, paddingTop: '11px', paddingLeft: '0px'}}>教授</TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.6, paddingTop: '11px', paddingLeft: '0px'}}>專題狀態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            this.props.Check.checks.map( (check, idx) => (
              <TableRow hover style={{display: 'flex', justifyContent: 'center'}} key={idx}>
                <TableCell style={{flex: 0.025, padding: '0px'}}>
                  <Tooltip
                    title={'加選'} 
                    placement='top'
                    classes={{
                      tooltip: classes.tooltip
                    }}
                  >
                    <IconButton style={{color: 'green', fontSize: '18px'}}
                      onClick = { () =>
                        this.setState({ 
                          agreeOpen: true,
                          check
                        })
                      }
                    >
                      <DoneIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell style={{flex: 0.025, padding: '0px'}}>
                  <Tooltip
                    title={'退選'} 
                    placement='top'
                    classes={{
                      tooltip: classes.tooltip
                    }}
                  >
                    <IconButton style={{color: 'red', fontSize: '18px'}}
                      onClick = { () => 
                        this.setState({
                          rejectOpen: true,
                          check
                        })
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.175, paddingTop: '11px', paddingLeft: '20px'}}>{this.hightlight(check.id, this.props.Check.input)}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.175, paddingTop: '11px', paddingLeft: '0px'}}>{this.hightlight(check.name, this.props.Check.input)}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.175, paddingTop: '11px', paddingLeft: '0px'}}>{this.hightlight(check.professor_name, this.props.Check.input)}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.6, paddingTop: '11px', color: parseInt(check.first_second)=== 3 ? 'red' : '', paddingLeft: '0px'}}>{this.hightlight(FIRST_SECOND_CN[check.first_second], this.props.Check.input)}</TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>

        <Dialog
          open={this.state.agreeOpen}
          onClose={ () => this.setState({ agreeOpen: false})}
          className={this.props.classes.dialog}
          fullWidth
        >
          <DialogTitle>
            <div style={{fontSize: '30px', fontWeight: 'bold'}}>專題加選確認</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {
                this.state.check.first_second === "3" &&
                <div style={{fontSize: '20px', margin: '10px', color: 'red', fontWeight: 'bold'}}>
                  {"請確認是否通過基礎程式設計"}
                </div>
              }
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"姓名: " + this.state.check.name}
              </div>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"學號: " + this.state.check.id}
              </div>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"專題教授: " + this.state.check.professor_name}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => 
                this.setState({ agreeOpen: false})
              }
              style={{ color: 'grey', fontSize: '20px'}} 
            >
              取消
            </Button>
            <Button 
              onClick={() => {
                  this.setState({ agreeOpen: false})
                  this.props.agree_check({
                    "student_id": this.state.check.id,
                    "research_title": this.state.check.research_title,
                    "semester": this.state.check.semester,
                    "first_second": this.state.check.first_second
                  })
                }
              } 
              style={{ color: 'blue', fontSize: '20px'}} 
            >
              確定加選
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog
          open={this.state.rejectOpen}
          onClose={ () => this.setState({ rejectOpen: false})}
          className={this.props.classes.dialog}
          fullWidth
        >
          <DialogTitle>
            <div style={{fontSize: '30px', fontWeight: 'bold'}}>專題退選確認</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"姓名: " + this.state.check.name}
              </div>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"學號: " + this.state.check.id}
              </div>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"專題教授: " + this.state.check.professor_name}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => 
                this.setState({ rejectOpen: false})
              }
              style={{ color: 'grey', fontSize: '20px'}} 
            >
              取消
            </Button>
            <Button 
              onClick={() => {
                this.setState({ rejectOpen: false})
                  this.props.reject_check({
                    "student_id": this.state.check.id,
                    "research_title": this.state.check.research_title,
                    "semester": this.state.check.semester,
                    "first_second": this.state.check.first_second
                  })
                }
              } 
              style={{ color: 'red', fontSize: '20px'}} 
            >
              確定退選
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Check: state.Assistant.Project.Check,
})

const mapDispatchToProps = (dispatch) => ({
  agree_check: (payload) => dispatch(agreeCheck(payload)),
  reject_check: (payload) => dispatch(rejectCheck(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Check))