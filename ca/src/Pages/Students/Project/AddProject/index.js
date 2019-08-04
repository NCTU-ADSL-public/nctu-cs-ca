import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Grow from '@material-ui/core/Grow'
import Icon from './AddIcon'
import { GridTile } from 'material-ui/GridList'
import Professor from '../../Professor'
import img from '../Image/1.jpg'
import img2 from '../Image/2.jpg'
import img3 from '../Image/rejection.jpg'
import {
  storeProjectsImage,
  storeProjectsFile,
  deleteProject
} from '../../../../Redux/Students/Actions/Project'

const styles = {
  appBar: {
    position: 'sticky',
    background: '#01579B'
  },
  progress: {
    position: 'relative',
    color: '#5D4037'
  },
  flex: {
    flex: 1,
    fontSize: '15px'
  },
  titleStyle: {
    paddingTop: '1',
    color: '#fff',
    align: 'center'
  },
  gridStyle: {
    height: '270px',
    width: '480px',
    paddingTop: '40px',
    cursor: 'pointer',
    animationDuration: '1.5s',
    animationIterationCount: '1',
    borderStyle: 'dashed',
    borderWidth: '0.2px',
    borderColor: '#BCAAA4'
  },
  gridStyleRwd: {
    height: '162px',
    width: '288px',
    cursor: 'pointer',
    animationDuration: '1.5s',
    animationIterationCount: '1'
  },
  button: {
    margin: '3px'
  }
}

const Transition = (props) => (
  <Grow {...props} />
)

class Tile extends React.Component {
  constructor (props) {
    super(props)
    this.deleteData = this.deleteData.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.getString = this.getString.bind(this)
    this.getImage = this.getImage.bind(this)
    this.state = { open: false }
  }

  deleteData () {
    if (window.confirm('如已知會過隊友再按確定。')) {
      const { data } = this.props
      this.props.deleteProject({
        research_title: data.research_title,
        tname: data.tname,
        first_second: data.first_second,
        semester: data.semester
      })
    }
  }

  handleDialogOpen () {
    this.setState({ open: true })
  }

  handleDialogClose () {
    this.setState({ open: false })
  }

  getString (status) {
    let content = status === '3'
      ? '很遺憾您的專題申請已被拒絕，知會隊友後請按右上角刪除已撤銷表單資料，謝謝！'
      : '您的專題申請正在等待審核，如要收回申請請點選左上方收回鍵，欲收回前請先告知隊友！'

    return (
      <div className='text-center' style={{ margin: '30px', height: '300px', fontSize: '20px' }}>
        { content }
      </div>
    )
  }

  getImage () {
    // 根據同意、申請中、拒絕來決定圖片
    switch (this.props.data.agree) {
      // 太舊的資料是書面申請 所以agree是undefined
      case undefined:
      case '1':
        return this.props.data.photo || img
      case '2':
        return img2
      case '3':
        return img3
      default:
        return img
    }
  }

  render () {
    const { classes, rwd } = this.props
    return (
      <div>
        <div className='col-xs-1' />
        <GridTile
          cols={1}
          rows={1}
          title={'申請專題'}
          titleStyle={styles.titleStyle}
          titleBackground='linear-gradient(to top, rgba(97,97,97,0.7) 70%, rgba(238,238,238,0.3) 80%, rgba(62,39,35,0) 100%)'
          style={rwd ? styles.gridStyleRwd : styles.gridStyle}
          className='col-xs-10 col-sm-10 col-md-6 animated bounceIn'
          onClick={this.handleDialogOpen}
         >
          <Icon />
        </GridTile>
        <Dialog
          fullScreen={1}
          open={this.state.open}
          onClose={this.handleDialogClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar >
              <IconButton color='inherit' onClick={this.handleDialogClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='title' color='inherit' className={classes.flex}>
              </Typography>
            </Toolbar>
          </AppBar>
          <Professor />
        </Dialog>
        <div className='col-xs-1' />
      </div>
    )
  }
}

Tile.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  storeImage: (url) => dispatch(storeProjectsImage(url, ownProps.data.research_title, ownProps.data.semester)),
  storeFile: (url) => dispatch(storeProjectsFile(url, ownProps.data.research_title, ownProps.data.semester)),
  deleteProject: (payload) => dispatch(deleteProject(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tile))
