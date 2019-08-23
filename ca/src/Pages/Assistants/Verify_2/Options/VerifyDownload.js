import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { styles } from './../styles'
import { semesterName, statusName, gradeName } from '../../Verify/macro';

import {
	Popover,
	MenuItem
} from '@material-ui/core'

import { verifyHandleChange } from '../../../../Redux/Assistants/Actions/Verify'
import { CSVLink } from 'react-csv'

class VerifyDownload extends React.Component {
	downCSV = (i) => {
		const { Verify } = this.props
    switch (i) {
      case 2:
        return (Verify.formList.filter(e => (e.type === 2))
        .map(e => {
          return ({
            type: '學分抵免',
            sid: e.sid,
            name: e.name,
            info: e.info,
            nameA: e.nameA,
            department: e.department,
            creditA: e.creditA,
            codeB: e.codeB,
            nameB: e.nameB,
            creditB: e.creditB,
            typeB: e.typeB,
            apply_year: e.apply_year,
            apply_semester: semesterName[e.apply_semester],
            cos_year_old: e.cos_year_old,
            cos_semester_old: semesterName[e.cos_semester_old],
            status: statusName[e.status]
          })
        }))
      case 3:
        return (Verify.formList.filter(e => (e.type === 3))
        .map(e => {
          return ({
            type: '課程免修',
            sid: e.sid,
            name: e.name,
            info: e.info,
            nameA: e.nameA,
            department: e.department,
            creditA: e.creditA,
            codeB: e.codeB,
            nameB: e.nameB,
            creditB: e.creditB,
            typeB: e.typeB,
            apply_year: e.apply_year,
            apply_semester: semesterName[e.apply_semester],
            cos_year_old: gradeName[e.cos_year_old],
            cos_semester_old: semesterName[e.cos_semester_old],
            status: statusName[e.status]
          })
        }))
      case 0:
        return Verify.formList.filter(e => e.type === 0)
      .map(e => {
        return ({
          type: '本系必修課程抵免',
          sid: e.sid,
          name: e.name,
          info: e.info,
          nameA: e.nameA,
          department: e.department,
          creditA: e.creditA,
          codeB: e.codeB,
          nameB: e.nameB,
          apply_year: e.apply_year,
          apply_semester: semesterName[e.apply_semester],
          cos_year_old: e.cos_year_old,
          cos_semester_old: semesterName[e.cos_semester_old],
          status: statusName[e.status]
        })
      })
      case 1:
        return Verify.formList.filter(e => e.type === 1)
      .map(e => {
        return ({
          type: '英授專業課程抵免',
          sid: e.sid,
          name: e.name,
          info: e.info,
          codeA: e.codeA,
          nameA: e.nameA,
          department: e.department,
          teacher: e.teacher,
          apply_year: e.apply_year,
          apply_semester: semesterName[e.apply_semester],
          cos_year_old: e.cos_year_old,
          cos_semester_old: semesterName[e.cos_semester_old],
          status: statusName[e.status]
        })
      })
      default:
        break
    }
	}
	
  render() {
		const { Verify } = this.props
    return (
			<Popover
				open={Boolean(Verify.anchorEl)}
				anchorEl={Verify.anchorEl}
				onClose={() => this.props.verifyHandleChange({anchorEl: null})}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
			>
				<CSVLink
                filename={'本系必修課程抵免.csv'}
                data={this.downCSV(0)} headers={[
                    { label: '抵免申請項目', key: 'type' },
                    { label: '學號', key: 'sid' },
                    { label: '申請者', key: 'name' },
                    { label: '系所/年級/班別', key: 'info' },
                    { label: '修課資料|課程名稱', key: 'nameA' },
                    { label: '修課資料|開課系所', key: 'department' },
                    { label: '修課資料|學分數', key: 'creditA' },
                    { label: '修課資料|學年', key: 'cos_year_old' },
                    { label: '修課資料|學期', key: 'cos_semester_old' },
                    { label: '抵免科目資料|永久課號', key: 'codeB' },
                    { label: '抵免科目資料|課程名稱', key: 'nameB' },
                    { label: '申請學年度', key: 'apply_year' },
                    { label: '申請學期', key: 'apply_semester' },
                    { label: '申請狀態', key: 'status' }]}>
                <MenuItem >
                    本系必修課程抵免
                    </MenuItem>
              </CSVLink>
				<CSVLink
					filename={'英授專業課程抵免.csv'}
					data={this.downCSV(1)} headers={[
							{ label: '抵免申請項目', key: 'type' },
							{ label: '學號', key: 'sid' },
							{ label: '申請者', key: 'name' },
							{ label: '系所/年級/班別', key: 'info' },
							{ label: '永久課號', key: 'codeA' },
							{ label: '課程名稱', key: 'nameA' },
							{ label: '開課系所', key: 'department' },
							{ label: '授課老師', key: 'teacher' },
							{ label: '修課學年', key: 'cos_year_old' },
							{ label: '修課學期', key: 'cos_semester_old' },
							{ label: '申請學年度', key: 'apply_year' },
							{ label: '申請學期', key: 'apply_semester' },
							{ label: '申請狀態', key: 'status' }]}>
					<MenuItem >
							英授專業課程抵免
							</MenuItem>
				</CSVLink>
				<CSVLink
					filename={'學分抵免.csv'}
					data={this.downCSV(2)} headers={[
							{ label: '抵免申請項目', key: 'type' },
							{ label: '學號', key: 'sid' },
							{ label: '申請者', key: 'name' },
							{ label: '系所/年級/班別', key: 'info' },
							{ label: '修課資料|科目名稱', key: 'nameA' },
							{ label: '修課資料|開課系所', key: 'department' },
							{ label: '修課資料|學分數', key: 'creditA' },
							{ label: '修課資料|學年', key: 'cos_year_old' },
							{ label: '修課資料|學期', key: 'cos_semester_old' },
							{ label: '抵免科目資料|永久課號', key: 'codeB' },
							{ label: '抵免科目資料|科目名稱', key: 'nameB' },
							{ label: '抵免科目資料|學分', key: 'creditB' },
							{ label: '抵免科目資料|選別', key: 'typeB' },
							{ label: '申請學年度', key: 'apply_year' },
							{ label: '申請學期', key: 'apply_semester' },
							{ label: '申請狀態', key: 'status' }]}>
					<MenuItem >
							學分抵免
							</MenuItem>
				</CSVLink>
				<CSVLink
                filename={'課程免修.csv'}
                data={this.downCSV(3)} headers={[
                    { label: '抵免申請項目', key: 'type' },
                    { label: '學號', key: 'sid' },
                    { label: '申請者', key: 'name' },
                    { label: '系所/年級/班別', key: 'info' },
                    { label: '修課資料|科目名稱', key: 'nameA' },
                    { label: '修課資料|開課系所', key: 'department' },
                    { label: '修課資料|學分數', key: 'creditA' },
                    { label: '修課資料|學年', key: 'cos_year_old' },
                    { label: '修課資料|學期', key: 'cos_semester_old' },
                    { label: '抵免科目資料|永久課號', key: 'codeB' },
                    { label: '抵免科目資料|科目名稱', key: 'nameB' },
                    { label: '抵免科目資料|學分', key: 'creditB' },
                    { label: '抵免科目資料|選別', key: 'typeB' },
                    { label: '申請學年度', key: 'apply_year' },
                    { label: '申請學期', key: 'apply_semester' },
                    { label: '申請狀態', key: 'status' }]}>
                <MenuItem >
                    課程免修
                    </MenuItem>
              </CSVLink>
			</Popover>
		)
  }
}

const mapStateToProps = (state) => ({
	Verify: state.Assistant.Verify
})

const mapDispatchToProps = (dispatch) => ({
	verifyHandleChange: (payload) => dispatch(verifyHandleChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VerifyDownload))
