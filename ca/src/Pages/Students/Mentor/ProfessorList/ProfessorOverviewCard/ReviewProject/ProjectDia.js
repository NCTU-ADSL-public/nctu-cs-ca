import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Show from './Show'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class ProjectDia extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Learn more...</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth='true'
          maxWidth={false}
        >
          <DialogTitle id="alert-dialog-title">{this.props.show.research_title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className='container'>
                <Show show={this.props.show} image={this.props.image} file={this.props.file} />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default ProjectDia
