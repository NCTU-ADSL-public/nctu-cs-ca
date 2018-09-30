import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import WriteEmail from './WriteEmail'
import SendProjectAgree from './SendProjectAgree'
import ReviewProject from './ReviewProject/index'

const ITEM_HEIGHT = 48

class LongMenu extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      anchorEl: null
    }
  }

  handleClick (event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose () {
    this.setState({ anchorEl: null })
  }

  render () {
    const { anchorEl } = this.state

    return (
      <div>
        <IconButton
          aria-label='More'
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup='true'
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='long-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          <WriteEmail rwd profile={this.props.profile} studentIdcard={this.props.studentIdcard} />
          <SendProjectAgree rwd profile={this.props.profile} studentIdcard={this.props.studentIdcard} />
          <ReviewProject rwd profile={this.props.profile} studentIdcard={this.props.studentIdcard} />
        </Menu>
      </div>
    )
  }
}

export default LongMenu
