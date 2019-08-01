import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  container: {
    width: '80%',
    margin: '0 auto'
  }
})

const FIRST_SECOND_CN = ['', '專題(一)', '專題(二)', '基礎程式設計通過待確認']

class Check extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        
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
              <TableCell style={{fontSize: '25px', flex: 0.6, paddingTop: '11px', paddingLeft: '0px'}}>專題狀態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            this.props.Check.checks.map( (check, idx) => (
              <TableRow hover style={{display: 'flex', justifyContent: 'center'}} key={idx}>
                <TableCell style={{flex: 0.025, padding: '0px'}}>
                  <IconButton style={{color: 'green', fontSize: '18px'}}>
                    <DoneIcon />
                  </IconButton>
                </TableCell>
                <TableCell style={{flex: 0.025, padding: '0px'}}>
                  <IconButton style={{color: 'red', fontSize: '18px'}}>
                    <ClearIcon />
                  </IconButton>
                </TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.175, paddingTop: '11px', paddingLeft: '20px'}}>{this.hightlight(check.id, this.props.Check.input)}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.175, paddingTop: '11px', paddingLeft: '0px'}}>{this.hightlight(check.name, this.props.Check.input)}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.6, paddingTop: '11px', color: parseInt(check.first_second)=== 3 ? 'red' : '', paddingLeft: '0px'}}>{this.hightlight(FIRST_SECOND_CN[check.first_second], this.props.Check.input)}</TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Check: state.Assistant.Project.Check,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Check))