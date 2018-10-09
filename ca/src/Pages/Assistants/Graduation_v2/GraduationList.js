import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'



import TableFooter from '@material-ui/core/TableFooter';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgressbar from 'react-circular-progressbar'
import TablePagination from '@material-ui/core/TablePagination';
import FirstPage from '@material-ui/icons/FirstPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import LastPage from '@material-ui/icons/LastPage';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  font:{
    fontSize:20,
    fontWeight:400,
    margin: '0 auto',
    justifyContent: 'center',
    textAlign: 'center'
  },
  icon: {
    fontSize: '40px',
    display: 'inline-flex',
    verticalAlign: 'middle',
    color: grey[600],
    '&:hover': {
      color: grey[900],
      transition: 'color 0.5s'
    },
    transition: 'color 0.3s',
    marginRight: '10px',
    marginLeft: '10px'
  },
})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

const GRAD_STATUS_CN = ['未達標', '將達標', '已達標']
const GRAD_STATUS_COLOR = [red[600], blue[600], green[600]]

class index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      studentsPerPage: 8,
      page: 0
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ studentsPerPage: event.target.value });
  };

  render() {

    const { classes, students } = this.props
    const { studentsPerPage, page } = this.state
    const emptyRows = studentsPerPage - Math.min(studentsPerPage, students.length - page * studentsPerPage);

    return (
      <div>
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
              students
              .slice(page * studentsPerPage, page * studentsPerPage + studentsPerPage)
              .map ( student => (
                <TableRow onClick={()=>console.log("Hello")}>
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
            {emptyRows > 0 && (
              <TableRow style={{ height: 71 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div style = {{ textAlign: 'center', marginTop: '10px', marginBottom: '50px' }} >
          <FirstPage className = { classes.icon } onClick = { () => this.setState({ page: 0 }) } />
          <ChevronLeft className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, page - 1) }) } />
          <span style = {{
            display: 'inline-flex',
            verticalAlign: 'middle',
            fontSize: '20px',
            marginRight: '20px',
            marginLeft: '20px'
          }}>{page + 1} / { Math.max(1, Math.ceil(students.length / studentsPerPage)) }</span>
          <ChevronRight className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.min(Math.ceil(students.length / studentsPerPage) - 1, page + 1)) }) } />
          <LastPage className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.ceil(students.length / studentsPerPage) - 1) }) } />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
