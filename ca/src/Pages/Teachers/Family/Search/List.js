import React from 'react'
// import './List.css'

//for table
import Table from './Table'

//for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {TextField} from 'material-ui'

export default class StudentList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      initItems: this.props.items,
      items: [],

    }

    this.filterList = this.filterList.bind(this)
  }

  componentDidMount () {
    this.setState({items: this.props.items})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({items: nextProps.items})
    }
  }

  filterList (event) {
    let updatedList = this.props.items
    updatedList = updatedList.filter((item) => {
      return (
        (item.student_id.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1) ||
        (item.sname.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1)
      )
    })
    this.setState({items: updatedList})
  }

  // searchCallback = (item) => {
  //   if (item.cos_code !== undefined) this.props.parentFunction(item)
  // }

  render () {
    return (
      <div>
          {/* <input type="text"
                 placeholder="搜尋 學號/ 姓名"
                 onChange={this.filterList}
          /> */}
          <MuiThemeProvider>
            <Table items={this.state.items}
                  choose={this.props.choose}
                  filter={this.filterList}
            />
          </MuiThemeProvider>
      </div>
    )
  }

}
