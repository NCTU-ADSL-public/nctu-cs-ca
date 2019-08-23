import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { styles } from '../styles'
import { type, typeName, gradeName, semesterName, creditName } from '../macro'

import {
	verifyHandleChange
} from '../../../../Redux/Assistants/Actions/Verify'

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Tooltip,
  Button,
  Chip,
  TableCell,
  Avatar,
  TableRow,
  Table,
  TableBody
} from '@material-ui/core'

import Arrow from '../../../../Components/Arrow'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TIcon from '@material-ui/icons/TurnedInNot'
import OpenInNew from '@material-ui/icons/OpenInNew'

class ApplyItem extends React.Component {

  handleSelect = (e, id) => {
    const { Verify } = this.props;
    let updatedArray = Verify.select
    if (Verify.select.includes(id)) {
      updatedArray = updatedArray.filter(e => e !== id)
      this.props.verifyHandleChange({select: updatedArray, selectAll: false})
    } else {
      updatedArray.push(id)
      let isAll = Verify.formList.filter(e => (type[Verify.index].includes(e.status) && Verify.type.includes(e.type))).every(e => Verify.select.includes(e.id))
      this.props.verifyHandleChange({
        select: updatedArray,
        selectAll: isAll
      })
    }
    e.stopPropagation()
  }

  render() {
    const { Verify, classes, apply } = this.props;
    return (
      <ExpansionPanel 
        defaultExpanded
        className={Verify.select.includes(apply.id) ? classes.selected : ''}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <span className={classes.subtitle}>
            <span className={classes.action}>
              <svg height='22' width='22' style={{verticalAlign: 'text-top'}} onClick={(e) => this.handleSelect(e, apply.id)}>
                <Tooltip 
                  title={Verify.select.includes(apply.id) ? `點擊已取消勾選` : `點擊以選取此抵免單`} 
                  placement='top'
                  classes={{
                    tooltip: classes.tooltip
                  }}
                >
                  <circle cx='11' cy='11' r='11' fill={Verify.select.includes(apply.id) ? '#3f51b5' : '#ccc'} />
                </Tooltip>
              </svg>
            </span>
            {/* {`${apply.year}${semester[apply.semester - 1]}`} */}
            <div
              style={{
                background: typeName[apply.type][1],
                display: 'inline-block',
                width: 22,
                height: 22,
                marginLeft: 8,
                marginTop: 11,
                color: '#f5f5f5',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >{typeName[apply.type][2]}</div>
            <span>
              <Tooltip title={
                <React.Fragment>
                  {
                    <div>開課學校:&nbsp;{apply.school}</div>}
                  <div>開課系所:&nbsp;{apply.department}</div>
                  <div>永久課號:&nbsp;{apply.codeA}</div>
                  <div>學分:&nbsp;{apply.creditA}</div>
                </React.Fragment>
              } placement='top'>
                <Button color='primary' onClick={(e) => e.stopPropagation()} className={classes.btn}>
                  {apply.nameA}
                </Button>
              </Tooltip>
              {
                apply.type !== 1 &&
                <React.Fragment>
                  <span className={classes.progress}> <Arrow /></span>
                  <Tooltip title={
                    <React.Fragment>
                      <div>永久課號:&nbsp;{apply.codeB}</div>
                      <div>學分:&nbsp;{apply.creditB}</div>
                    </React.Fragment>
                  } placement='top'>
                    <Button color='primary' onClick={(e) => e.stopPropagation()}className={classes.btn}>
                      {apply.nameB}
                    </Button>
                  </Tooltip>
                </React.Fragment>
              }
            </span>
            {apply.previous && 
            <Chip
              style={{background: '#e26e6e', color: '#fff', fontSize: 14, fontWeight: 400}}
              label={<span onClick={(e) => e.stopPropagation()}>重送的抵免單</span>} />}
            {apply.status === 5 && <Chip
              style={{background: '#dc3545', color: '#fff', fontSize: 14, fontWeight: 400, marginLeft: 5}}
              label={
                <span onClick={(e) => e.stopPropagation()}>特殊案例需交由原授課教授審核</span>
              } />}
          </span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            <TableBody >
              <TableRow className={classes.header}>
                <TableCell className={classes.font3}>學號</TableCell>
                <TableCell className={classes.font3}>姓名</TableCell>
                <TableCell className={classes.font3}>電話</TableCell>
                <TableCell className={classes.font3}>班別</TableCell>
                {/* {apply.type !== 3 &&<TableCell className={classes.font3}>預抵免課程</TableCell>} */}

              </TableRow>
              <TableRow >
                <TableCell className={classes.font}>{apply.sid}</TableCell>
                <TableCell className={classes.font}>{apply.name}</TableCell>
                <TableCell className={classes.font}>{apply.phone}</TableCell>
                <TableCell className={classes.font}>{apply.info}</TableCell>
                {/* {apply.type !== 3 && <TableCell className={classes.font}>{`${apply.nameB}(${apply.codeB})`}</TableCell>} */}

              </TableRow>
              <TableRow className={classes.header}>
                <TableCell className={classes.font3}>已(欲)修習課程</TableCell>
                <TableCell className={classes.font3}>開課系所</TableCell>
                <TableCell className={classes.font3}>成績</TableCell>
                <TableCell className={classes.font3}>抵免附件</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.font}>{
                  apply.type === 3 ? 
                    gradeName[apply.cos_year_old] + semesterName[apply.cos_semester_old] + " " + apply.nameA
                  :
                  `${apply.cos_year_old}-${semesterName[apply.cos_semester_old]} ${apply.nameA}${apply.type !== 3 ? ` (${apply.codeA})` : ''}`
                }</TableCell>
                <TableCell className={classes.font}>{apply.department}</TableCell>
                <TableCell className={classes.font}>{(apply.type === 0 || apply.type === 1) ? <span style={{color: '#888'}}><i>此抵免不需要成績</i></span> : apply.score}</TableCell>
                <TableCell className={classes.font6} ><a target='_blank' rel='noopener noreferrer' href={apply.file}>抵免附件下載</a></TableCell>
              </TableRow>
              <TableRow className={classes.header}>
                <TableCell className={classes.font3}>申請日期</TableCell>

                <TableCell className={classes.font3} colSpan={3}>申請原因</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.font} >{apply.date.split(' ')[0].split('-').join('/')}</TableCell>
                <TableCell className={classes.font} colSpan={3} >
                  {apply.type === 0 && <Chip style={{ verticalAlign: 'inherit'}} avatar={
                    <Avatar>
                      <TIcon />
                    </Avatar>
              }label={apply.reason_type} />
                }
                  {apply.reason}
                </TableCell>
              </TableRow>
              {
                ((apply.status === 6) || (apply.status === 0 && apply.reject_reason !== null)) && (
                  <TableRow>
                    <TableCell className={classes.font3} >退回原因</TableCell>
                    <TableCell className={classes.font} colSpan={3} >{(apply.reject_reason === '' || apply.reject_reason === undefined) ? '-' : apply.reject_reason}</TableCell>
                  </TableRow>
                )
             }
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
        <div style={{ position: 'relative', top: -20, fontSize: '30px', fontWeight: 'bold' }} >
          <OpenInNew style={{
            fontSize: '20px',
            marginLeft: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            verticalAlign: 'middle'}}
            onClick={() => window.open(`/assistants/head/c/${apply.sid}/${creditName[apply.type]}/${apply.date}`)}
          />
        </div>
        {/* <ExpansionPanelActions>
          {this.state.index === 0 && (
            <React.Fragment>
              <Button onClick={() => this.handleDisagree(apply.id)}>
                <span className={classes.font2}>不同意</span>
              </Button>
              <Button color='primary' onClick={() => this.handleAgree(apply.id)}>
                <span className={classes.font2}>同意抵免</span>
              </Button>
            </React.Fragment>
          )}
          {this.state.index === 2 && (
            <React.Fragment>
              <Button onClick={() => this.handleReset(apply.id)}>
                <span className={classes.font2}>重置</span>
              </Button>
            </React.Fragment>
          )}
          {this.state.index === 3 && (
            <React.Fragment>
              <Button onClick={() => this.handleReset(apply.id)}>
                <span className={classes.font3}>重置</span>
              </Button>
              <Button style={{cursor: 'not-allowed'}}>
                <span className={classes.font4}>刪除</span>
              </Button>
            </React.Fragment>
          )}
        </ExpansionPanelActions> */}
      </ExpansionPanel>
    )
  }
}

const mapStateToProps = (state) => ({
	Verify: state.Assistant.Verify
})

const mapDispatchToProps = (dispatch) => ({
	verifyHandleChange: (payload) => dispatch(verifyHandleChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ApplyItem))