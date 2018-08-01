import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import red from '@material-ui/core/colors/red'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'
import NoImage from './Show/1.jpg'
import ProjectDia from './ProjectDia'
import firebase from 'firebase'
let config = {
  apiKey: 'AIzaSyC64Eitf77FqUAMjjPaG1_rk3Sr6pyttoo',
  authDomain: 'code-86ba4.firebaseapp.com',
  databaseURL: 'https://code-86ba4.firebaseio.com',
  projectId: 'code-86ba4',
  storageBucket: 'code-86ba4.appspot.com',
  messagingSenderId: '354539568437'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
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

class RecipeReviewCard extends React.Component {
  constructor (props) {
    super(props)

    this.state = { expanded: false, image: '', file: '' }
  }

  componentDidMount () {
    let directory = this.props.data.year + '/' + this.props.profile.tname + '/' + this.props.data.research_title + '/image/image.jpg'
    let pathReference = storageRef.child(directory)
    pathReference.getDownloadURL().then(url => {
      this.setState({
        image: url
      })
    }
    ).catch(error => {
      this.setState({
        image: NoImage
      })
    })
    directory = this.props.data.year + '/' + this.props.profile.tname + '/' + this.props.data.research_title + '/file/file.pdf'
    pathReference = storageRef.child(directory)
    pathReference.getDownloadURL().then(url => {
      this.setState({
        file: url
      })
    }
    ).catch(error => {
      this.setState({
        file: ''
      })
    })
  }

  render () {
    const { classes } = this.props

    return (
      <div className='col-md-4 col-lg-4' style={{marginTop: '10px'}}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label='Recipe' className={classes.avatar}>
                {this.props.data.research_title[0]}
              </Avatar>
            }
            title={this.props.data.research_title}
            subheader={'年度：' + this.props.data.year}
          />
          <CardMedia
            className={classes.media}
            image={this.state.image}
            title='ㄏ ㄏ'
          />
          <CardActions className={classes.actions} disableActionSpacing>
            <div className={classes.expand}>
              <ProjectDia show={this.props.data} image={this.state.image} file={this.state.file} />
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

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RecipeReviewCard)
