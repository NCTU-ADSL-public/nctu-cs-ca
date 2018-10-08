import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgressbar from 'react-circular-progressbar'
import TablePagination from '@material-ui/core/TablePagination';

const styles = theme => ({
  table: {
    marginTop: '50px',
  },
  font:{
    fontSize:20,
    fontWeight:400,
    margin: '0 auto',
    justifyContent: 'center',
    textAlign: 'center'
  },
})

const mapStateToProps = (state) => ({
  students: state.Assistant.Graduation.students
})

const mapDispatchToProps = (dispatch) => ({

})

const GRAD_STATUS_CN = ['未達標', '將達標', '已達標']
const GRAD_STATUS_COLOR = ['red', 'blue', 'green']

class index extends React.Component {


  render() {

    const { classes, students } = this.props

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {
              ['學號', '姓名', '組別', '總學分', '畢業狀態'].map( title =>
                <TableCell className={classes.font}>{ title }</TableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            students.map ( student => (
              <TableRow>
                <TableCell className={classes.font}>{student.id}</TableCell>
                <TableCell className={classes.font}>{student.name}</TableCell>
                <TableCell className={classes.font}>{student.program}</TableCell>
                <TableCell className={classes.font}>
                  <div style={{ width: "50px", margin: '0 auto', marginTop: '5px' }}>
                    <CircularProgressbar
                      percentage={100 * student.total / 128}
                      text={student.total}
                      initialAnimation
                      styles={{
                        path: { stroke: '#34855e' },
                        text: { fill: '#34855e', fontSize: '30px', fontWeight: 'bold' }
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell className={classes.font} style = {{ color: GRAD_STATUS_COLOR[parseInt(student.status)]}}>
                  {GRAD_STATUS_CN[parseInt(student.status)]}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
