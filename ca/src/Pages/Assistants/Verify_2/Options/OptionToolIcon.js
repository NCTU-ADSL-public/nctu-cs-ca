import React from 'react'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { styles, theme } from './../styles'

import { 
  verifyHandleChange 
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
    this.props.verifyHandleChange({ transferTo: event.target.value})
  }
  render() {
		const { Verify, classes } = this.props;
		return (            
			(Verify.index === 0 &&
				(<React.Fragment>
				<Tooltip 
					title={'同意已選取抵免單'} 
					placement='top'
					classes={{
						tooltip: classes.tooltip
					}}
				>
					<IconButton className={classes.sideIcon}
						onClick={this.handleOk}
					>
						<OKIcon />
					</IconButton>
				</Tooltip>
				<Tooltip 
					title={'不同意已選取抵免單'} 
					placement='top'
					classes={{
						tooltip: classes.tooltip
					}}
				>
					<IconButton className={classes.sideIcon}
						onClick={this.handleWithdraw}
					>
						<TrashIcon />
					</IconButton>
				</Tooltip>
				<Input
					placeholder='退回原因'
					value={Verify.return}
					onChange={this.handleReason}
				/>
				<Tooltip 
					title={'退回已選取抵免單'} 
					placement='top'
					classes={{
						tooltip: classes.tooltip
					}}
				>
					<span>
						<IconButton className={classes.sideIcon}
							onClick={this.handleReturn}
							disabled={Verify.return === ''}
					>
							<ReturnIcon />
						</IconButton>
					</span>
				</Tooltip>
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
					<Tooltip 
						title={'送出已選取抵免單'} 
						placement='top'
						classes={{
							tooltip: classes.tooltip
						}}
					>
						<span>
							<IconButton className={classes.sideIcon}
								onClick={this.handleSend}
								disabled={Verify.transferTo === ''}
					>
								<Send />
							</IconButton>
						</span>
					</Tooltip>
				</MuiThemeProvider>
			</React.Fragment>)) ||
			(Verify.index === 1 &&
				(<React.Fragment>
						<Tooltip 
							title={'重置已選取抵免單'} 
							placement='top'
							classes={{
								tooltip: classes.tooltip
							}}
						>
							<IconButton className={classes.sideIcon}
								onClick={this.handleAllReset}
							>
								<Reset />
							</IconButton>
						</Tooltip>
					</React.Fragment>)) ||
			(Verify.index === 2 &&
				(<React.Fragment>
						<Tooltip 
							title={'重置已選取抵免單'} 
							placement='top'
							classes={{
								tooltip: classes.tooltip
							}}
						>
							<IconButton className={classes.sideIcon}
								onClick={this.handleAllReset}
							>
								<Reset />
							</IconButton>
						</Tooltip>
					</React.Fragment>)) ||
			(Verify.index === 3 && 
				(<React.Fragment>
					<Tooltip 
						title={'重置已選取抵免單'} 
						placement='top'
						classes={{
							tooltip: classes.tooltip
						}}
					>
						<IconButton className={classes.sideIcon}
							onClick={this.handleAllReset}
						>
							<Reset />
						</IconButton>
					</Tooltip>
					{/* <Tooltip title={'刪除已選取抵免單'} placement='top'>
						<IconButton className={classes.sideIcon} style={{cursor: 'not-allowed'}}
						>
							<TrashIcon />
						</IconButton>
					</Tooltip> */}
				</React.Fragment>)) ||
			(Verify.index === 4 &&
				(<React.Fragment>
					<Tooltip 
						title={'重置已選取抵免單'} 
						placement='top'
						classes={{
							tooltip: classes.tooltip
						}}
					>
						<IconButton className={classes.sideIcon}
							onClick={this.handleAllReset}
						>
							<Reset />
						</IconButton>
					</Tooltip>
					{/* <Tooltip title={'刪除已選取抵免單'} placement='top'>
						<IconButton className={classes.sideIcon} style={{cursor: 'not-allowed'}}
						>
							<TrashIcon />
						</IconButton>
					</Tooltip> */}
				</React.Fragment>)) ||
			(Verify.index === 5 &&
				(<React.Fragment>
					<Tooltip 
						title={'重置已選取抵免單'} 
						placement='top'
						classes={{
							tooltip: classes.tooltip
						}}
					>
						<IconButton className={classes.sideIcon}
							onClick={this.handleAllReset}
						>
							<Reset />
						</IconButton>
					</Tooltip>
					{/* <Tooltip title={'刪除已選取抵免單'} placement='top'>
						<IconButton className={classes.sideIcon} style={{cursor: 'not-allowed'}}
						>
							<TrashIcon />
						</IconButton>
					</Tooltip> */}
				</React.Fragment>)) || (Verify.index === 6 && "")
		)
	}
}

const mapStateToProps = (state) => ({
	Verify: state.Assistant.Verify
})

const mapDispatchToProps = (dispatch) => ({
	verifyHandleChange: (payload) => dispatch(verifyHandleChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OptionToolIcons))