import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
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
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import Arrow from '../../../../Components/Arrow'
import { actions, deleteCredit } from '../../../../Redux/Students/Actions/Credit'

const styles = theme => ({
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
  },
  progress: {
    margin: '0 10px'
  },
  rejectFont: {
    color: 'red',
    fontSize: '20px',
    padding: '10px 30px 30px'
  },
  button: {
    margin: '5px'
  }
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleDelete () {
    // 只有被審核中才能刪除
    if (this.props.data.status === 0) {
      if (window.confirm('確定刪除「學分抵免單」？')) {
        this.props.deleteCredit({
          timestamp: this.props.data.timestamp
        })
      }
    }
  }

  handleEdit () {
    // 只有被退件才能編輯
    if (this.props.data.status === 3) {
      window.alert('編輯請重新上傳附件檔案')
      this.props.updatePayload({
        ...this.props.data
      })
      this.props.history.push({
        pathname: '/students/credit/apply',
        state: {
          edit: true,
          index: 0
        }
      })
    }
  }

  render () {
    const { classes, data, mobile } = this.props
    const color = ['#f3864a', '#3aa276', '#d93a64', '#aaaaaa', '#ffffff'][data.status]
    const status = ['審核中', '審核通過', '審核不通過', '退件', '---'][data.status]
    const sid = this.props.studentIdcard.student_id

    if (mobile) {
      return (
        <ExpansionPanel defaultExpanded style={{ borderLeft: `7px solid ${color}` }}>
          <div style={{ display: 'flex' }} >
            <div style={{
              background: color,
              width: 87,
              borderRadius: '0 0 2px 0',
              color: '#fff',
              textAlign: 'center'
            }}>
              { status }
            </div>
            <div style={{ flex: 0.98 }} />
            <Icon
              style={{ color: 'grey', fontSize: '30px' }}
              onClick={this.handleEdit}
            >
              edit_icon
            </Icon>
            <DeleteIcon
              style={{ color: 'grey', fontSize: '30px' }}
              onClick={this.handleDelete}
            />
          </div>

          <div style={{ margin: '20px 0 15px 0', display: 'flex', justifyContent: 'center' }}>
            <Chip
              style={{ background: '#5599ff', color: '#fff', fontSize: 18, fontWeight: 400 }}
              label={<span> <b>{`${data.apply_year}${data.apply_semester === 1 ? '上' : '下'}`}</b> 學分抵免</span>}
            />
          </div>
          <div style={{ margin: '5px', display: 'flex', justifyContent: 'center' }}>
            <Chip
              style={{ background: '#d8eadd', color: '#464646', fontSize: 18, fontWeight: 400 }}
              label={<span>{data.original_course_name}</span>}
            />
          </div>
          <div className={classes.subtitle2}><span className='glyphicon glyphicon-chevron-down' /></div>
          <div style={{ margin: '5px', display: 'flex', justifyContent: 'center' }}>
            <Chip
              style={{ background: '#d8eadd', color: '#464646', fontSize: 18, fontWeight: 400 }}
              label={<span>{data.current_course_name}</span>}
            />
          </div>

          <ExpansionPanelDetails>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.headFont}>已修習課程</TableCell>
                  <TableCell className={classes.font}>{ data.original_course_name }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headFont}>開課系所</TableCell>
                  <TableCell className={classes.font}>{ `${data.original_course_department}(${data.original_school})` }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headFont}>原課程學分</TableCell>
                  <TableCell className={classes.font}>{ data.original_course_credit }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headFont}>預抵免課程</TableCell>
                  <TableCell className={classes.font}>{ data.current_course_name }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headFont}>預抵免學分</TableCell>
                  <TableCell className={classes.font}>{ data.current_course_credit }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headFont}>檔案</TableCell>
                  <TableCell className={classes.font}>
                    <a href={data.file} download={`${sid}_學分抵免.pdf`}>下載</a>
                  </TableCell>
                </TableRow>
                {
                  data.status === 3 &&
                  <TableRow>
                    <TableCell className={classes.headFont} style={{ color: 'red' }}>退件原因</TableCell>
                    <TableCell className={classes.font} style={{ color: 'red' }}>{data.reject_reason}</TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    } else {
      return (
        <div>
          <ExpansionPanel defaultExpanded style={{ borderLeft: `7px solid ${color}` }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.subtitle1}>{`${data.apply_year}${data.apply_semester === 1 ? '上' : '下'}`}</div>
              <div className={classes.subtitle2}>{data.original_course_name}</div>
              <div className={classes.progress}><Arrow /></div>
              <div className={classes.subtitle2}>{data.current_course_name}</div>
              <div style={{ marginLeft: '20px' }}>
                <Chip
                  style={{ background: '#5599ff', color: '#fff', fontSize: 14, fontWeight: 400 }}
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
                    <TableCell className={classes.font}>檔案</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.font}>{data.original_course_name}</TableCell>
                    <TableCell className={classes.font}>{`${data.original_course_department}(${data.original_school})`}</TableCell>
                    <TableCell className={classes.font}>{data.original_course_credit}</TableCell>
                    <TableCell className={classes.font}>{data.current_course_name}</TableCell>
                    <TableCell className={classes.font}>{data.current_course_credit}</TableCell>
                    <TableCell className={classes.font}>
                      <a href={data.file} download={`${sid}_學分抵免.pdf`}>下載</a>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ExpansionPanelDetails>
            {
              data.status === 3 &&
              <div className={classes.rejectFont}>
                <div style={{ display: 'inline' }}>退件原因：</div>
                <div style={{ display: 'inline' }}>{data.reject_reason}</div>
              </div>
            }
          </ExpansionPanel>

          <div style={{ display: 'flex', position: 'relative', height: '20px', top: '-40px' }}>
            <div style={{ flex: 0.92 }} />
            <Button
              variant='fab'
              color='primary'
              mini
              aria-label='Edit'
              className={classes.button}
              onClick={this.handleEdit}
              disabled={data.status !== 3}
            >
              <Icon>edit_icon</Icon>
            </Button>
            <Button
              variant='fab'
              color='secondary'
              mini
              aria-label='Delete'
              className={classes.button}
              onClick={this.handleDelete}
              disabled={data.status !== 0}
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
      )
    }
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard
})

const mapDispatchToProps = (dispatch) => ({
  updatePayload: (payload) => dispatch(actions.credit.waiveCourse.store(payload)),
  deleteCredit: (payload) => dispatch(deleteCredit(payload))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index)))
