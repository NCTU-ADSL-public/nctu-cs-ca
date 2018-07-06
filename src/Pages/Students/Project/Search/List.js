import React from 'react'
import './List.css'

//for table
import Table from './Table'

//for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  filter: {
    padding: '50px 4% 0 8%',
  },
}

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
        (item.tname.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1)
      )
    })
    this.setState({items: updatedList})
  }

  searchCallback = (item) => {
    this.props.parentFunction(item)
  }

  render () {
    return (
      <div style={styles.filter}>

        <div className="filter-list">
          <input type="text"
                 placeholder="搜尋 教授姓名"
                 onChange={this.filterList}
          />
        </div>
        <div
          style = {{
            overflow:'scroll',
            height:'65vh'
          }}>
          <MuiThemeProvider>
            <Table items={this.state.items}
                   parentFunction={this.searchCallback}
            />
          </MuiThemeProvider>
        </div>
      </div>
    )
  }

}
