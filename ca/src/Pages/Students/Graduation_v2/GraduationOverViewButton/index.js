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
import Divider from '@material-ui/core/Divider'
import RwdIconBtn from './Component/RwdIconButton'
import PrintBtn from './Component/PrintBtn'

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
    background: '#7c7c7c',
    color : '#ffffff',
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
              text={`畢業 ${overview.total}/${overview.total_require}`}
              initialAnimation
              styles={{
                path: { stroke: '#34855e'},
                text: { fill: '#34855e', fontSize: '12px' }
              }}
          />
          </div>
          <div className='col-xs-3 col-sm-3 col-md-1  col-lg-1' />
          <div className='col-xs-3 col-sm-3 visible-xs visible-sm' >
            <RwdIconBtn />
          </div>
        </div>
        <Divider style={{marginBottom:'20px', marginTop:'20px'}}/>
         <div className='hidden-sm hidden-xs'>
           <PrintBtn />
           <Button variant='contained' color='default' className={classes.button} size='large' fullWidth>
           <AssignmentIcon className={classes.icon} />
             畢業預審資訊
           </Button>
         </div>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.overview
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProfessors())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
