import React from 'react'
import Pager from 'react-pager'
import { connect } from 'react-redux'
import { changepage } from '../../../../../Redux/Students/Actions/Professor'

class Index extends React.Component {
  constructor (props) {
    super(props)

    this.handlePageChanged = this.handlePageChanged.bind(this)

    this.state = {
      total: this.props.total,
      current: 1,
      visiblePage: 3
    }
  }

  handlePageChanged (newPage) {
    this.props.changePage(newPage)
    this.setState({ current: newPage })
  }

  render () {
    return (
      <Pager
        total={this.state.total}
        current={this.state.current}
        visiblePages={this.state.visiblePage}
        titles={{ first: '<|', last: '>|' }}
        className='pagination-sm pull-right'
        onPageChanged={this.handlePageChanged}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  changePage: (p) => dispatch(changepage(p))
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
