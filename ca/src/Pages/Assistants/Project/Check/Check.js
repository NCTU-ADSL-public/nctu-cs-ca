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

  render () {
    const { classes } = this.props;
    const {  } = this.state;

    return (
      <div className={classes.container}>
        <Table>
          <TableHead>
            <TableRow style={{display: 'flex'}}>
              <TableCell style={{fontSize: '20px', flex: 0.2}}>學號</TableCell>
              <TableCell style={{fontSize: '20px', flex: 0.2}}>姓名</TableCell>
              <TableCell style={{fontSize: '20px', flex: 0.4}}>專題狀態</TableCell>
              <TableCell style={{fontSize: '20px', flex: 0.1}} />
              <TableCell style={{fontSize: '20px', flex: 0.1}} />
            </TableRow>
          </TableHead>
          <TableBody>
          {
            this.props.Check.checks.map( check => (
              <TableRow hover>
                <TableCell style={{fontSize: '18px', flex: 0.2}}>{check.id}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.2}}>{check.name}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.4}}>{check.first_second}</TableCell>
                <TableCell>
                  <DoneIcon style={{fontSize: '18px'}} />
                </TableCell>
                <TableCell>
                  <ClearIcon style={{fontSize: '18px'}} />
                </TableCell>
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