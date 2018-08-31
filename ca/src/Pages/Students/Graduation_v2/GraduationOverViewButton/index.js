import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgressbar from 'react-circular-progressbar'
import { connect } from 'react-redux'
import { fetchProfessors } from '../../../../Redux/Students/Actions/Professor/index'
import Divider from '@material-ui/core/Divider'
import RwdIconBtn from './Component/RwdIconButton'
import RwdIconButton from './Component/RwdIconButton'
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
    const { classes, englishCheck, overview} = this.props
    return (
      <div>
        <div style={{marginTop: '10px'}}>
          <div className='visible-md visible-lg col-md-12'>
            <div className="green"> </div><div className="text">已通過</div>
            <div className="red"> </div><div  className="text">未通過</div>
            <div className="gray"> </div><div  className="text">未修課</div>
            <div className="yellow"> </div><div  className="text">未抵免課程</div>
            <div className="purple"> </div><div  className="text">免修或抵免課程</div>
            <div className="blue"> </div><div  className="text">當期課程</div>
          </div>
          <div className='visible-md visible-lg col-md-12 well' style={{marginTop: '5px', clear: 'both', color: 'gray'}}>
            <div className='col-md-11'>
              <div>
                是否已考過英檢：
                {(englishCheck==="3" || englishCheck==="4" )?"已考過英檢":(englishCheck==="0")?"未考過英檢":(englishCheck==="2")?"英文已換修":"英文已抵免"}
              </div>
              <div>
                畢業預審是否已送交助理審核：
                {englishCheck?"已送審":"未送審"}
              </div>
            </div>
            <div className='pull-right col-md-1'>
              <RwdIconButton />
            </div>
          </div>
          <div className='col-xs-3 col-sm-3 visible-xs visible-sm' />
          <div className='col-xs-6 col-sm-8 col-md-2 col-lg-2' onClick={this.handleClickOpen}>
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
          <div className='col-xs-3 col-sm-3 visible-xs visible-sm' />
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
        <div className='hidden-sm hidden-xs col-md-10 col-lg-10'>
          <InfoBtn />
        </div>
        <Divider className='visible-xs visible-sm' style={{marginBottom:'20px', marginTop:'20px', clear: 'both'}}/>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.overview,
  englishCheck: state.Student.Graduation.englishCheck
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProfessors())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
