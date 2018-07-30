import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import AssignmentIcon from '@material-ui/icons/Assignment'
import PrintIcon from '@material-ui/icons/Print'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import CircularProgressbar from 'react-circular-progressbar'
import { connect } from 'react-redux'
import { fetchProfessors } from '../../../../Redux/Students/Actions/Professor/index'
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  progress: {
    left: '30px',
    top: '30px',
    position: 'absolute'
  },
  progressRwd: {
    position: 'absolute',
    left: '18%'
  },
  button: {
    margin: theme.spacing.unit * 2,
    background: '#34855e'
  },
  icon: {
    marginRight: theme.spacing.unit
  },
  text: {
    fontSize: '40px',
    left: '100px',
    top: '90px',
    position: 'absolute',
    textAlign: 'center'
  }
})

class Index extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  render () {
    const { classes, rwd, overview} = this.props
    return (
      <div>
        <div className='row' style={{marginTop: '30px'}}>
          <div className='col-xs-3 col-sm-3 col-md-1  col-lg-1' />
          <div className='col-xs-6 col-sm-8 col-md-10 col-lg-10' onClick={this.handleClickOpen}>
            <CircularProgressbar
              percentage={70}
              text={`畢業${overview.total}/${overview.total_require}`}
              initialAnimation
              styles={{
                path: { stroke: '#34855e'},
                text: { fill: '#34855e', fontSize: '12px' }
              }}
          />
          </div>
          <div className='col-xs-3 col-sm-3 visible-xs visible-sm' />
        </div>
        <Divider style={{marginBottom:'20px', marginTop:'20px'}}/>
         {/*<div className='col-md-6 col-lg-6'>*/}
         {/*<Button variant='contained' color='primary' className={classes.button} size='large' fullWidth>*/}
         {/*<PrintIcon className={classes.icon} />*/}
         {/*列印*/}
         {/*</Button>*/}
         {/*</div>*/}
         {/*<div className='col-md-6 col-lg-6'>*/}
         {/*<Button variant='contained' color='primary' className={classes.button} size='large' fullWidth>*/}
         {/*<EditIcon className={classes.icon} />*/}
         {/*編輯課程*/}
         {/*</Button>*/}
         {/*</div>*/}
         {/*<Button variant='contained' color='primary' className={classes.button} size='large' fullWidth>*/}
         {/*<AssignmentIcon className={classes.icon} />*/}
         {/*傳送畢業預審給助理*/}
         {/*</Button>*/}
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  overview: state.all.overview
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProfessors())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
