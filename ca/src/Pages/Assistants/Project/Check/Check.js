import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
            <TableRow>
              <TableCell style={{fontSize: '20px'}}>學號</TableCell>
              <TableCell style={{fontSize: '20px'}}>姓名</TableCell>
              <TableCell style={{fontSize: '20px'}}>專題狀態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            this.props.Check.checks.map( check => (
              <TableRow>
                <TableCell style={{fontSize: '18px'}}>{check.id}</TableCell>
                <TableCell style={{fontSize: '18px'}}>{check.name}</TableCell>
                <TableCell style={{fontSize: '18px'}}>{check.first_second}</TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
      {
        this.props.Check.checks.map( check => (
          <div>
            {check.id}
          </div>
        ))
      }
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