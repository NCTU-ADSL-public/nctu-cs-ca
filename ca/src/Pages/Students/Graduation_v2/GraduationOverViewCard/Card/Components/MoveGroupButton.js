import React from 'react'
// MUI
import { withStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import '../../../../../../../node_modules/animate.css/animate.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeCourse } from '../../../../../../Redux/Students/Actions/Graduation'

const style = {
    Button: {
        transition: "background .2s linear",
        width: "200px",
        paddingRight: 0,
        overflow: 'visible',
        borderRadius: 2,
    },
    ButtonLabel: {
        padding: "5px",
        height: "45px",
        verticalAlign: "default",
        color: "#fcfcfc",
        fontSize: "1em",
        fontWeight: "300",
        letterSpacing: "1px",
        fontFamily: 'Noto Sans CJK TC',
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
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  typography: {
    margin: theme.spacing.unit * 2,
    width: '300px',
  },
  root: {
    fontFamily: "Noto Sans CJK TC",
    letterSpacing: 1,
  }
})

class MoveGroupButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
        }
    }

    state = {
      anchorEl: null,
    };

    handleClick = event => {
      this.setState({
        anchorEl: event.currentTarget,
      });
    };

    handleClose = () => {
      this.setState({
        anchorEl: null,
      });
    };

    render(){
      const {label, flash, backgroundColor, children, classes, rwd} = this.props
      const { anchorEl } = this.state

        return(
            <div style={style.Popover}>

              <Button
                variant="outlined"
                labelStyle={style.ButtonLabel}
                onClick={this.handleClick}
                className={classes.root}
              >
                {label}
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                className={classes.root}
              >
                <MenuItem onClick={this.handleClose} className={classes.root} >專業選修</MenuItem>
                <MenuItem onClick={this.handleClose} className={classes.root} >其他選修</MenuItem>
                <MenuItem onClick={this.handleClose} className={classes.root} >外語</MenuItem>

              </Menu>

            </div>
        )
    }
}

MoveGroupButton.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.overview
})
const mapDispatchToProps = (dispatch) => ({
  changeCourse: (from, end, course) => dispatch(changeCourse(from, end, course))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MoveGroupButton))