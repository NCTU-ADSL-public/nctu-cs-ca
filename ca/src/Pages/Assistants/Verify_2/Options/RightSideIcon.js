import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { styles } from './../styles'
import { typeName } from '../../Verify/macro';

import {
	Tooltip,
	Button
} from '@material-ui/core'

import CloudDownloadIcon from '@material-ui/icons/CloudDownload'

import { verifyHandleChange } from '../../../../Redux/Assistants/Actions/Verify'
import VerifyDownload from './VerifyDownload'

class RightSideIcon extends React.Component {
  handleSwitch = (i) => {
		const { Verify } = this.props;
    if (Verify.type.length === 4) {
    	this.props.verifyHandleChange({selectAll: false, select: [], type: [i]})
    } else if (Verify.type.includes(i)) {
		this.props.verifyHandleChange({selectAll: false, select: [], type: [0, 1, 2, 3]})
    } else {
      this.props.verifyHandleChange({selectAll: false, select: [], type: [i]})
    }
	}
	
  render() {
		const { classes, Verify } = this.props;
    return (
      <div className={classes.sideIcon2}>
			{
				typeName.map( 
					(e, i) => 
						<Tooltip 
							title={e[0]} 
							key={i} 
							placement='top'
							classes={{
								tooltip: classes.tooltip
							}}
						>
							<div
                onClick={() => this.handleSwitch(i)}
								style={{
									background: (Verify.type.includes(i)) ? e[1] : '#ccc',
									display: 'inline-block',
									width: 22,
									height: 22,
									marginLeft: 8,
									marginTop: 11,
									color: '#f5f5f5',
									textAlign: 'center',
									cursor: 'pointer'
								}}
							>{e[2]}</div>
						</Tooltip>
				)
			}
				<Button size='small' onClick={(e) => this.props.verifyHandleChange({anchorEl: e.currentTarget})}>
					<CloudDownloadIcon />
				</Button>
				<VerifyDownload />
			</div>
    )
  }
}

const mapStateToProps = (state) => ({
	Verify: state.Assistant.Verify
})

const mapDispatchToProps = (dispatch) => ({
	verifyHandleChange: (payload) => dispatch(verifyHandleChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RightSideIcon))