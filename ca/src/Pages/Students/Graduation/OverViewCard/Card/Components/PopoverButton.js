import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Popover from '@material-ui/core/Popover'
import '../../../../../../../node_modules/animate.css/animate.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { changeCourse } from '../../../../../../Redux/Students/Actions/Graduation'

const style = {
  Button: {
    transition: 'background .2s linear',
    width: '200px',
    paddingRight: 0,
    overflow: 'visible',
    borderRadius: 2
  },
  ButtonLabel: {
    padding: '5px',
    height: '45px',
    verticalAlign: 'default',
    color: '#fcfcfc',
    fontSize: '1em',
    fontWeight: '300',
    letterSpacing: '1px',
    fontFamily: 'Noto Sans CJK TC'
  },
  ButtonBox: {
    margin: '0 1px 6px 1px',
    float: 'left',
    height: 32
  },
  Popover: {
    zIndex: 1000
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  typography: {
    margin: theme.spacing.unit * 2,
    width: '300px'
  }
})

class PopoverButton extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      isOpened: false,
      anchorEl: null
    }
  }

  handleClick (event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose () {
    this.setState({
      anchorEl: null
    })
  }

  render () {
    const { label, flash, backgroundColor, children, classes, rwd } = this.props
    const { anchorEl } = this.state

    return (
      <div style={style.Popover}>
        <div className={flash ? 'animated flash' : ''}
          // onClick={this.handleClick}
          style={style.ButtonBox}
          ref='target'
        >
          <MuiThemeProvider>
            <FlatButton
              className='grad-btn'
              labelStyle={style.ButtonLabel}
              hoverColor={'#80b0d9'}
              backgroundColor={backgroundColor || '#616161'}
              style={{ ...style.Button, width: rwd ? '100px' : '150px' }}
              label={label}
              onClick={this.handleClick}
            />
          </MuiThemeProvider>
        </div>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <div className={classes.typography}>
            {children}
          </div>
        </Popover>
      </div>
    )
  }
}

PopoverButton.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.overview,
  assis: state.Student.Graduation.assis
})

const mapDispatchToProps = (dispatch) => ({
  changeCourse: (from, end, course) => dispatch(changeCourse(from, end, course))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PopoverButton))
