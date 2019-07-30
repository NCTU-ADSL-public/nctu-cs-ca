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

const styles = theme => ({
  container: {
    width: '80%',
    margin: '0 auto'
  }
})

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
              <TableCell style={{fontSize: '20px', flex: 0.05, paddingTop: '11px'}} />
              <TableCell style={{fontSize: '20px', flex: 0.05, paddingTop: '11px'}} />
              <TableCell style={{fontSize: '20px', flex: 0.2, paddingTop: '11px'}}>學號</TableCell>
              <TableCell style={{fontSize: '20px', flex: 0.2, paddingTop: '11px'}}>姓名</TableCell>
              <TableCell style={{fontSize: '20px', flex: 0.4, paddingTop: '11px'}}>專題狀態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            this.props.Check.checks.map( check => (
              <TableRow hover style={{display: 'flex', justifyContent: 'center'}}>
                <TableCell style={{fontSize: '18px', flex: 0.05, paddingTop: '11px'}}>
                  <DoneIcon />
                </TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.05, paddingTop: '11px'}}>
                  <ClearIcon />
                </TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.2, paddingTop: '11px'}}>{this.hightlight(check.id, this.props.Check.input)}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.2, paddingTop: '11px'}}>{this.hightlight(check.name, this.props.Check.input)}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.4, paddingTop: '11px'}}>{this.hightlight(check.first_second, this.props.Check.input)}</TableCell>
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