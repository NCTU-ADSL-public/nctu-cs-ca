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
  progress: {
    margin: '0 10px'
  }
})

const Arrow = () => (
  <svg height='8' width='130'>
    <circle cx='2' cy='4' r='2' fill='rgb(200,200,200)' />
    <circle cx='8' cy='4' r='2' fill='rgb(195,195,195)' />
    <circle cx='14' cy='4' r='2' fill='rgb(190,190,190)' />
    <circle cx='20' cy='4' r='2' fill='rgb(185,185,185)' />
    <circle cx='26' cy='4' r='2' fill='rgb(180,180,180)' />
    <circle cx='32' cy='4' r='2' fill='rgb(175,175,175)' />
    <circle cx='38' cy='4' r='2' fill='rgb(170,170,170)' />
    <circle cx='44' cy='4' r='2' fill='rgb(165,165,165)' />
    <circle cx='50' cy='4' r='2' fill='rgb(160,160,160)' />
    <circle cx='56' cy='4' r='2' fill='rgb(155,155,155)' />
    <circle cx='62' cy='4' r='2' fill='rgb(150,150,150)' />
    <circle cx='68' cy='4' r='2' fill='rgb(145,145,145)' />
    <circle cx='74' cy='4' r='2' fill='rgb(140,140,140)' />
    <circle cx='80' cy='4' r='2' fill='rgb(135,135,135)' />
    <circle cx='86' cy='4' r='2' fill='rgb(130,130,130)' />
    <circle cx='92' cy='4' r='2' fill='rgb(125,125,125)' />
    <circle cx='98' cy='4' r='2' fill='rgb(120,120,120)' />
    <circle cx='104' cy='4' r='2' fill='rgb(115,115,115)' />
    <circle cx='110' cy='4' r='2' fill='rgb(110,110,110)' />
    <circle cx='116' cy='4' r='2' fill='rgb(105,105,105)' />
    <polygon points='121,0 121,8 129,4' style={{ fill: 'rgb(100,100,100)' }} />
  </svg>
)

class Index extends React.Component {
  render () {
    const { classes, data } = this.props
    let color
    switch (data.status) {
      case 0:
        color = '#ffee99'
        break
      case 1:
        color = '#3aa276'
        break
      case 2:
        color = '#d93a64'
        break
      default:
        color = '#ffffff'
        break
    }
    return (
      <ExpansionPanel defaultExpanded style={{ borderLeft: `7px solid ${color}`}}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.subtitle1}>{`${data.apply_year}${data.apply_semester === 1 ? '上' : '下'}`}</div>
          <div className={classes.subtitle2}>{data.original_course_name}</div>
          <div className={classes.progress}><Arrow /></div>
          <div className={classes.subtitle2}>{data.current_course_name}</div>
          <div style={{ marginLeft: '20px' }}>
            <Chip
              style={{ background: '#ffcc22', color: '#fff', fontSize: 14, fontWeight: 400 }}
              label={<span>學分抵免</span>}
            />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.font}>已修習課程</TableCell>
                <TableCell className={classes.font}>開課系所</TableCell>
                <TableCell className={classes.font}>原課程學分</TableCell>
                <TableCell className={classes.font}>預抵免課程</TableCell>
                <TableCell className={classes.font}>預抵免學分</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.font}>{data.original_course_name}</TableCell>
                <TableCell className={classes.font}>{`${data.original_course_department}(${data.original_school})`}</TableCell>
                <TableCell className={classes.font}>{data.original_course_credit}</TableCell>
                <TableCell className={classes.font}>{data.current_course_name}</TableCell>
                <TableCell className={classes.font}>{data.current_course_credit}</TableCell>
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
