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
    flexBasis: '10%',
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
  }
})

class Index extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.subtitle1}>107上</Typography>
          <Typography className={classes.subtitle2}>計算機概論</Typography>
          <Typography className={classes.subtitle2}><div style={{ width: '150px' }}/></Typography>
          <Typography className={classes.subtitle2}></Typography>
          <Typography style={{ marginLeft: '20px' }}>
            <Chip
              style={{ background: '#28a745', color: '#fff', fontSize: 14, fontWeight: 400 }}
              label={<span>英授專業課程抵免</span>}
            />
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.font}>已修習課程</TableCell>
                <TableCell className={classes.font}>開課系所</TableCell>
                <TableCell className={classes.font2}>申請原因</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.font}>計算機概論</TableCell>
                <TableCell className={classes.font}>電機系</TableCell>
                <TableCell className={classes.font}>aasasvfbfdbgdfsaasasvfbfdbgdfsaasasvfbfdbgdfs</TableCell>
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
