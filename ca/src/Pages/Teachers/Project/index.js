import React from 'react'
// mui
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DescriptionIcon from '@material-ui/icons/Description'
import ApplyIcon from '@material-ui/icons/AssignmentTurnedIn'
// components
import GroupList from './GroupList'
import GroupApply from '../Group/GroupApply'
// css
import './style.css'

class Group extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 0
    }
  }
  render () {
    const { type } = this.state
    return (
      <div className='container'>
        <div className='row' style={{marginTop: 40}}>
          <div className='col-md-3'>
            <List>
              <ListItem button key={0} onClick={() => this.setState({type: 0})}
                style={type === 0 ? {background: '#e4e6f5'} : {}} >
                <ListItemIcon><DescriptionIcon color={type === 0 ? 'primary' : ''} /></ListItemIcon>
                <ListItemText primary={'專題列表'} />
              </ListItem>
              <ListItem button key={1} onClick={() => this.setState({type: 1})}
                style={type === 1 ? {background: '#e4e6f5'} : {}} >
                <ListItemIcon><ApplyIcon color={type === 1 ? 'primary' : ''} /></ListItemIcon>
                <ListItemText primary={'專題申請審核'} />
              </ListItem>
            </List>
          </div>
          <div className='col-md-9'>
            {
              type === 0
              ? <GroupList idCard={this.props.idCard} handleGroupClick={this.handleGroupClick} />
              : <GroupApply idCard={this.props.idCard} handleGroupClick={this.handleGroupClick} />
            }
          </div>
        </div>
      </div>
    )
  }
}
export default Group
