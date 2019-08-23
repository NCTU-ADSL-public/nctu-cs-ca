import React from 'react'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { styles, theme } from './../styles'

import { 
	verifyHandleChange,
	verifyHandleOk,
	verifyHandleWithdraw,
	verifyHandleReturn,
	verifyHandleSend,
	verifyHandleAllReset
} from '../../../../Redux/Assistants/Actions/Verify'

import {
  IconButton,
  Tooltip,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Input,
  Avatar,
} from '@material-ui/core'
import OKIcon from '@material-ui/icons/Done'
import FaceIcon from '@material-ui/icons/Face'
import TrashIcon from '@material-ui/icons/Delete'
import ReturnIcon from '@material-ui/icons/Replay'
import Send from '@material-ui/icons/Send'
import Reset from '@material-ui/icons/Restore'

class OptionToolIcons extends React.Component {
  handleReason = (e) => {
    this.props.verifyHandleChange({return: e.target.value})
  }
  handleChange = (event) => {
    this.props.verifyHandleChange({ transferTo: event.target.value })
	}
	_IconButton = (title, icon, onClick, disabled=false) => {
		const { classes } = this.props;
		return (
			<Tooltip 
				title={title} 
				placement='top'
				classes={{
					tooltip: classes.tooltip
				}}
			>
				<IconButton className={classes.sideIcon}
					onClick={onClick}
					disabled={disabled}
				>
					{icon}
				</IconButton>
			</Tooltip>
		)
	}
	handleOK = () => {
		const { Verify } = this.props;
		this.props.verifyHandleOk({
			req: {
				courses: Verify.select.map(
					e => ({
						sid: Verify.formList[e].sid,
						timestamp: Verify.formList[e].date,
						reason: null,
						email: Verify.formList[e].email
					})
				),
				status: 2,
				transferTo: ''
			},
			Verify
		})
	}
	handleWithdraw = () => {
		const { Verify } = this.props;
		this.props.verifyHandleWithdraw({
			req: {
				courses: Verify.select.map(
					e => ({
						sid: Verify.formList[e].sid,
						timestamp: Verify.formList[e].date,
						reason: null,
						email: Verify.formList[e].email
					})
				),
				status: 3,
				transferTo: ''
			},
			Verify
		})
	}
	handleReturn = () => {
		const { Verify } = this.props;
		this.props.verifyHandleReturn({
			req: {
				courses: Verify.select.map(
					e => ({
						sid: Verify.formList[e].sid,
						timestamp: Verify.formList[e].date,
						reason: Verify.return,
						email: Verify.formList[e].email
					})
				),
				status: 6,
				transferTo: ''
			},
			Verify
		})
	}
	handleSend = () => {
		const { Verify } = this.props;
		this.props.verifyHandleSend({
			req: {
				courses: Verify.select.map(
					e => ({
						sid: Verify.formList[e].sid,
						timestamp: Verify.formList[e].date,
						reason: null,
						email: Verify.formList[e].email
					})
				),
				status: Verify.teacherList.filter(
					e => e.id === Verify.transferTo
				)[0].status === 1 ? 1 : 5
			},
			Verify
		})
	}
	handleAllReset = () => {
		const { Verify } = this.props;
		this.props.verifyHandleAllReset({
			req: {
				courses: Verify.select.map(
					e => ({
						sid: Verify.formList[e].sid,
						timestamp: Verify.formList[e].date,
						reason: null,
						email: Verify.formList[e].email
					})
				),
				status: 0,
				transferTo: ''
			},
			Verify
		})
	}
  render() {
		const { Verify, classes } = this.props;
		return (
			(Verify.index === 0 && (
				<React.Fragment>
					{this._IconButton('同意已選取抵免單', <OKIcon />, this.handleOK)}
					{this._IconButton('不同意已選取抵免單', <TrashIcon />, this.handleWithdraw)}
					<Input
						placeholder='退回原因'
						value={Verify.return}
						onChange={this.handleReason}
					/>
					{this._IconButton('退回已選取抵免單', <ReturnIcon />, this.handleReturn, Verify.return === '')}
					<FormControl>
						{/* <InputLabel htmlFor='select-multiple'>審核人</InputLabel> */}
						<Select
							value={Verify.transferTo}
							input={<Input id='select-multiple' />}
							onChange={this.handleChange}
							renderValue={selected => (
								<div className={classes.chips}>{
									<Chip avatar={
										<Avatar>
											<FaceIcon />
										</Avatar>
												}
										label={Verify.teacherList.filter(e => e.id === selected)[0].name}
										className={classes.chip} />
								}
								</div>
						)}
					>
					{
						Verify.teacherList.map(
							t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
						)
					}
					</Select>
				</FormControl>
					<MuiThemeProvider theme={theme}>
						{this._IconButton('送出已選取抵免單', <Send />, this.handleSend, Verify.transferTo === '')}
					</MuiThemeProvider>
				</React.Fragment>)) ||
			(Verify.index === 1 && (
				<React.Fragment>
					{this._IconButton('重置已選取抵免單', <Reset />, this.handleAllReset)}
				</React.Fragment>)) ||
			(Verify.index === 2 && (
				<React.Fragment>
					{this._IconButton('重置已選取抵免單', <Reset />, this.handleAllReset)}
				</React.Fragment>)) ||
			(Verify.index === 3 && (
				<React.Fragment>
					{this._IconButton('重置已選取抵免單', <Reset />, this.handleAllReset)}
					{/* <Tooltip title={'刪除已選取抵免單'} placement='top'>
						<IconButton className={classes.sideIcon} style={{cursor: 'not-allowed'}}
						>
							<TrashIcon />
						</IconButton>
					</Tooltip> */}
				</React.Fragment>)) ||
			(Verify.index === 4 && (
				<React.Fragment>
					{this._IconButton('重置已選取抵免單', <Reset />, this.handleAllReset)}
					{/* <Tooltip title={'刪除已選取抵免單'} placement='top'>
						<IconButton className={classes.sideIcon} style={{cursor: 'not-allowed'}}
						>
							<TrashIcon />
						</IconButton>
					</Tooltip> */}
				</React.Fragment>)) ||
			(Verify.index === 5 && (
				<React.Fragment>
					{this._IconButton('重置已選取抵免單', <Reset />, this.handleAllReset)}
					{/* <Tooltip title={'刪除已選取抵免單'} placement='top'>
						<IconButton className={classes.sideIcon} style={{cursor: 'not-allowed'}}
						>
							<TrashIcon />
						</IconButton>
					</Tooltip> */}
				</React.Fragment>)) || 
			(Verify.index === 6 && "")
		)
	}
}

const mapStateToProps = (state) => ({
	Verify: state.Assistant.Verify
})

const mapDispatchToProps = (dispatch) => ({
	verifyHandleChange: (payload) => dispatch(verifyHandleChange(payload)),
	verifyHandleOk: (payload) => dispatch(verifyHandleOk(payload)),
	verifyHandleWithdraw: (payload) => dispatch(verifyHandleWithdraw(payload)),
	verifyHandleReturn: (payload) => dispatch(verifyHandleReturn(payload)),
	verifyHandleSend: (payload) => dispatch(verifyHandleSend(payload)),
	verifyHandleAllReset: (payload) => dispatch(verifyHandleAllReset(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OptionToolIcons))