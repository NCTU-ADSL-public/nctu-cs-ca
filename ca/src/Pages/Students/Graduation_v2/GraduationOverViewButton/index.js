import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgressbar from 'react-circular-progressbar'
import { connect } from 'react-redux'
import { fetchProfessors } from '../../../../Redux/Students/Actions/Professor/index'
import Divider from '@material-ui/core/Divider'
import RwdIconBtn from './Component/RwdIconButton'
import PrintBtn from './Component/PrintBtn'
import InfoBtn from './Component/InfoBtn'
import './index.css'

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
    margin: '20px 0 20px 0',
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
        <div className='visible-xs visible-sm col-xs-12 col-sm-12' style={{marginTop: '3px'}}>
          <div className="green"> </div><div className="text">已通過</div>
          <div className="red"> </div><div  className="text">未通過</div>
          <div className="gray"> </div><div  className="text">未修課</div>
          <div className="yellow"> </div><div  className="text">未抵免課程</div>
        </div>
        <div className='visible-xs visible-sm col-xs-12 col-sm-12'>
          <div className="purple"> </div><div  className="text">免修或抵免課程</div>
          <div className="blue"> </div><div  className="text">當期課程</div>
        </div>
        <Divider style={{marginBottom:'20px', marginTop:'20px', clear: 'both'}}/>
         <div className='hidden-sm hidden-xs'>
           <PrintBtn />
           <InfoBtn />
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
