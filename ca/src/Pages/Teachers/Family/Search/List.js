import React from 'react'
// import './List.css'

//for table
import Table from './Table'

//for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class StudentList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: []
    }
    this.filterList = this.filterList.bind(this)
  }

  componentWillMount () {
    this.setState({items: this.props.items})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({items: nextProps.items})
    }
  }

  filterList (event) {
    let updatedList = this.props.items
    updatedList = updatedList.filter((item) =>(
      (item.student_id.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1) ||
      (item.sname.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1)
    ))
    this.setState({items: updatedList})
  }

  render () {
    return (
      <MuiThemeProvider>
        <Table items={this.state.items}
              choose={this.props.choose}
              filter={this.filterList}
        />
      </MuiThemeProvider>
    )
  }

}
