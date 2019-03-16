import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import red from '@material-ui/core/colors/red'
import NoImage from './1.jpg'
import ProjectDetail from './projectDetail'
import firebase from 'firebase'

let storageRef = firebase.storage().ref()

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
})

class ProjectCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      image: NoImage, // 預設空字串會在fetch圖片前有error
      file: ''
    }
  }

  componentDidMount () {
    let directory = `${this.props.data.year}/${this.props.profile.tname}/${this.props.data.research_title}/image/image.jpg`
    storageRef
      .child(directory)
      .getDownloadURL()
      .then(url => {
        this.setState({ image: url })
      })
      .catch(error => {
        console.log(error)
        this.setState({ image: NoImage })
      })

    directory = `${this.props.data.year}/${this.props.profile.tname}/${this.props.data.research_title}/file/file.pdf`
    storageRef
      .child(directory)
      .getDownloadURL()
      .then(url => {
        this.setState({ file: url })
      })
      .catch(error => {
        console.log(error)
        this.setState({ file: '' })
      })
  }

  render () {
    const { classes } = this.props

    return (
      <div className='col-xs-12 col-md-4 col-lg-4' style={{ marginTop: '10px' }}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label='Recipe' className={classes.avatar}>
                {this.props.data.research_title[0]}
              </Avatar>
            }
            title={this.props.data.research_title}
            subheader={'學期：' + this.props.data.semester}
          />
          <CardMedia
            className={classes.media}
            image={this.state.image}
            title=''
          />
          <CardActions className={classes.actions} disableActionSpacing>
            <div className={classes.expand}>
              <ProjectDetail show={this.props.data} image={this.state.image} file={this.state.file} />
            </div>
          </CardActions>
          <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
            <CardContent>
              {this.props.data.intro}
            </CardContent>
          </Collapse>
        </Card>
      </div>
    )
  }
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProjectCard)
