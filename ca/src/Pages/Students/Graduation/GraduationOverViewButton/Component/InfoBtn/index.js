import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import { connect } from 'react-redux'
import { fetchProfessors } from '../../../../../../Redux/Students/Actions/Professor'
import AnimatedProgress from '../../../../../../Components/AnimatedProgress'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  icon: {
    marginRight: theme.spacing.unit
  },
  formControl: {
    marginBottom: '10px',
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  tooltip: {
    fontSize: '12px'
  },
  flex: {
    flex: 1
  },
  appBar: {
    backgroundColor: '#7c7c7c',
    color: '#FFF'
  },
  button: {
    backgroundColor: '#7c7c7c',
    color: '#FFF'
  }
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClickOpen.bind(this)
    this.state = {
      open: false
    }
  }

  handleClickOpen () {
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  render () {
    return (
      <div>
        <div className='overview hidden-xs'>
          <div className='overview-course col-sm-3 col-md-3' >
            <div className='showcourseoverview'>共同必修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.compulsory}</font>/{this.props.overview.compulse_require}&nbsp;學分<br /><AnimatedProgress value={this.props.overview.compulsory / this.props.overview.compulse_require * 100} /></div>
            <div className='showcourseoverview'>服務學習&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.service}</font>/{this.props.overview.service_require}&nbsp;門<br /><AnimatedProgress value={this.props.overview.service / this.props.overview.service_require * 100} /></div>
            <div className='showcourseoverview'>英文授課&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.english}</font>/{this.props.overview.english_require}&nbsp;門<br /><AnimatedProgress value={this.props.overview.english / this.props.overview.english_require * 100} /></div>
          </div>
          <div className='overview-course col-sm-3 col-md-3' >
            <div className='showcourseoverview'>藝文賞析&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.art}</font>/{this.props.overview.art_require}&nbsp;門<br /><AnimatedProgress value={this.props.overview.art / this.props.overview.art_require * 100} /></div>
            <div className='showcourseoverview'>通&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;識&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.general}</font>/{this.props.overview.general_require}&nbsp;學分<br /><AnimatedProgress value={this.props.overview.general / this.props.overview.general_require * 100} /></div>
            <div className='showcourseoverview'>抵免研究所課程<font size={5} color='#338d68'>&nbsp;{this.props.overview.graduate}</font>&nbsp;學分<br /></div>
          </div>
          <div className='overview-course col-sm-3 col-md-3' >
            <div className='showcourseoverview'>外&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;語&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.language}</font>/{this.props.overview.language_require}&nbsp;學分<br /><AnimatedProgress value={this.props.overview.language / this.props.overview.language_require * 100} /></div>
            <div className='showcourseoverview'>專業選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.pro}</font>/{this.props.overview.pro_require}&nbsp;學分<br /><AnimatedProgress value={this.props.overview.pro / this.props.overview.pro_require * 100} /></div>
          </div>
          <div className='overview-course col-sm-3 col-md-3' >
            <div className='showcourseoverview'>體&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;育&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.pe}</font>/{this.props.overview.pe_require}&nbsp;門<br /><AnimatedProgress value={this.props.overview.pe / this.props.overview.pe_require * 100} /></div>
            <div className='showcourseoverview'>其他選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.other}</font>/{this.props.overview.other_require}&nbsp;學分<br /><AnimatedProgress value={this.props.overview.other / this.props.overview.other_require * 100} /></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.overview
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProfessors())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withMobileDialog()(Index)))
