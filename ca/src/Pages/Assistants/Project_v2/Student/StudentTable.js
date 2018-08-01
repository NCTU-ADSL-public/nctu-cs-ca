import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columnData = [
  { id: '學號', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: '姓名', numeric: true, disablePadding: false, label: 'Calories' },
  { id: '', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const data = [
    {
        "student": {
            "id": "0616001",
            "name": "王大明",
            "program": "資工A"
        },
        "project": {
            "status": 0,
            "title": "無人機",
            "professor_name": "王小明"
        }
    },
    {
        "student": {
            "id": "0616002",
            "name": "李大明",
            "program": "資工B"
        },
        "project": {
            "status": 1,
            "title": "AI",
            "professor_name": "李小明"
        }
    },
    {
        "student": {
            "id": "0616213",
            "name": "陳小明",
            "program": "網多"
        },
        "project": {
            "status": 2
        }
    },
    {
        "student": {
            "id": "0616213",
            "name": "陳小明",
            "program": "資電"
        },
        "project": {
            "status": 2
        }
    },
    {
        "student": {
            "id": "0616213",
            "name": "陳小明",
            "program": "工工"
        },
        "project": {
            "status": 2
        }
    },
    {
        "student": {
            "id": "0616213",
            "name": "陳小明",
            "program": "電資學士班"
        },
        "project": {
            "status": 1
        }
    }
]

class StudentTable extends React.Component {

  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 5
    }
  }

  render() {
    const { page, rowsPerPage } = this.state

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>學號</TableCell>
              <TableCell>姓名</TableCell>
              <TableCell>組別</TableCell>
              <TableCell>專題狀況</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map( (item) => {
                return (
                  <TableRow>
                    <TableCell>{item.student.id}</TableCell>
                    <TableCell>{item.student.name}</TableCell>
                    <TableCell>{item.student.program}</TableCell>
                    <TableCell>{item.project.status}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <TablePagination
          component = "div"
          count = {data.length}
          rowsPerPage = { rowsPerPage }
          page = { page }
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage = {(event, page) => this.setState({ page })}
        />
      </div>
    )
  }
}

export default StudentTable
