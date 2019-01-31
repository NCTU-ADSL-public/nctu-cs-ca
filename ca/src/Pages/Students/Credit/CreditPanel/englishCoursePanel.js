import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  container: {
    margin: '1%',
    fontFamily: 'Noto Sans CJK TC'
  },
  subtitle1: {
    fontSize: 18,
    fontWeight: 400,
    flexBasis: '10%'
  },
  subtitle2: {
    fontSize: 18,
    fontWeight: 400,
    flexBasis: '13%',
    textAlign: 'center'
  },
  font: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center'
  }
})

class Index extends React.Component {
  render () {
    const { classes, data } = this.props
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.subtitle1}>{`${data.apply_year}${data.apply_semester === 1 ? '上' : '下'}`}</div>
          <div className={classes.subtitle2}>{data.course_name}</div>
          <div className={classes.subtitle2}><div style={{ width: '150px' }} /></div>
          <div className={classes.subtitle2} />
          <div style={{ marginLeft: '20px' }}>
            <Chip
              style={{ background: '#28a745', color: '#fff', fontSize: 14, fontWeight: 400 }}
              label={<span>英授專業課程抵免</span>}
            />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.font}>已修習課程</TableCell>
                <TableCell className={classes.font}>開課系所</TableCell>
                <TableCell className={classes.font}>申請原因</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.font}>{data.course_name}</TableCell>
                <TableCell className={classes.font}>{data.department}</TableCell>
                <TableCell className={classes.font}>{data.reason}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Index)
