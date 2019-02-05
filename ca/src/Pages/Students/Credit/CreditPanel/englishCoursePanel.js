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
  },
  headFont: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    color: '#8f8f8f'
  }
})

class Index extends React.Component {
  render () {
    const { classes, data, mobile } = this.props
    let color, status
    switch (data.status) {
      case 0:
        color = '#f3864a'
        status = '審核中'
        break
      case 1:
        color = '#3aa276'
        status = '審核通過'
        break
      case 2:
        color = '#d93a64'
        status = '審核不通過'
        break
      default:
        color = '#ffffff'
        status = '---'
        break
    }
    if (mobile) {
      return (
        <ExpansionPanel defaultExpanded style={{ borderLeft: `7px solid ${color}`}}>
          <div style={{
            background: color,
            width: 87,
            borderRadius: '0 0 2px 0',
            color: '#fff',
            textAlign: 'center'
          }}>{status}</div>
          <div style={{ margin: '20px 0 15px 0', display: 'flex', justifyContent: 'center' }}>
            <Chip
              style={{ background: '#5599ff', color: '#fff', fontSize: 18, fontWeight: 400 }}
              label={<span> <b>{`${data.apply_year}${data.apply_semester === 1 ? '上' : '下'}`}</b> 英授專業課程抵免</span>}
            />
          </div>
          <div style={{ margin: '5px', display: 'flex', justifyContent: 'center' }}>
            <Chip
              style={{ background: '#d8eadd', color: '#464646', fontSize: 18, fontWeight: 400 }}
              label={<span>{data.course_name}</span>}
            />
          </div>
          <ExpansionPanelDetails>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.headFont}>已修習課程</TableCell>
                  <TableCell className={classes.font}>{data.course_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headFont}>開課系所</TableCell>
                  <TableCell className={classes.font}>{data.department}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headFont}>申請原因</TableCell>
                  <TableCell className={classes.font}>{data.reason}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headFont}>檔案</TableCell>
                  <TableCell className={classes.font}><a target='_blank' rel='noopener noreferrer' href={data.file}> 下載 </a></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    } else {
      return (
        <ExpansionPanel defaultExpanded style={{ borderLeft: `7px solid ${color}` }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.subtitle1}>{`${data.apply_year}${data.apply_semester === 1 ? '上' : '下'}`}</div>
            <div className={classes.subtitle2}>{data.course_name}</div>
            <div className={classes.subtitle2}>
              <div style={{ width: '150px' }} />
            </div>
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
                  <TableCell className={classes.font}>檔案</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.font}>{data.course_name}</TableCell>
                  <TableCell className={classes.font}>{data.department}</TableCell>
                  <TableCell className={classes.font}>{data.reason}</TableCell>
                  <TableCell className={classes.font}><a target='_blank' rel='noopener noreferrer' href={data.file}> 下載 </a></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    }
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Index)
