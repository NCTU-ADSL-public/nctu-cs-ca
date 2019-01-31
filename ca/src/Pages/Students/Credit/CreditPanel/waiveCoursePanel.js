import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
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
    fontSize: '1.2em',
    flexBasis: '10%'
  },
  subtitle2: {
    fontSize: '1.2em',
    flexBasis: '13%',
    textAlign: 'center'
  },
  font: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center'
  },
  font2: {
    color: 'rgba(0, 0, 0, 0.54)',
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
    const { classes } = this.props
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.subtitle1}>107上</Typography>
          <Typography className={classes.subtitle2}>邏輯與設計</Typography>
          <Typography className={classes.progress}><Arrow /></Typography>
          <Typography className={classes.subtitle2}>數位電路設計</Typography>
          <Typography style={{ marginLeft: '20px' }}>
            <Chip
              style={{ background: '#ffcc22', color: '#fff', fontSize: 14, fontWeight: 400 }}
              label={<span>學分抵免</span>}
            />
          </Typography>
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
                <TableCell className={classes.font}>邏輯與設計</TableCell>
                <TableCell className={classes.font}>電機系(清華大學)</TableCell>
                <TableCell className={classes.font}>4</TableCell>
                <TableCell className={classes.font}>數位電路設計</TableCell>
                <TableCell className={classes.font}>3</TableCell>
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
