import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Card from './Card'
import { connect } from 'react-redux'
import { fetchProfessors } from '../../Mentor/Actions'

const styles = {
  root: {
    flexGrow: 1
  }
}

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: null,
    }
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    })
  }

  render () {
    const { rwd } = this.props
    const { expanded } = this.state
    return (
      <div className=''>
        <Card title='共同必修' rwd={rwd} complete={this.props.overview.compulsory} require={this.props.overview.compulse_require} value={Number(this.props.overview.compulsory) / Number(this.props.overview.compulse_require) * 100} />
        <Card title='專業選修' rwd={rwd} complete={this.props.overview.pro} require={this.props.overview.pro_require} value={Number(this.props.overview.pro) / Number(this.props.overview.pro_require) * 100} />
        <Card title='其他選修' rwd={rwd} complete={this.props.overview.other} require={this.props.overview.other_require} value={Number(this.props.overview.other) / Number(this.props.overview.other_require) * 100} />
        <Card title='外語' rwd={rwd} complete={this.props.overview.language} require={this.props.overview.language_require} value={Number(this.props.overview.language) / Number(this.props.overview.language_require) * 100} />
        <Card title='體育' rwd={rwd} complete={this.props.overview.pe} require={this.props.overview.pe_require} value={Number(this.props.overview.pe) / Number(this.props.overview.pe_require) * 100} isMen/>
        <Card title='藝文賞析' rwd={rwd} complete={this.props.overview.art} require={this.props.overview.tart_require} value={Number(this.props.overview.art) / Number(this.props.overview.art_require) * 100} isMen/>
        <Card title='服務學習' rwd={rwd} complete={this.props.overview.service} require={this.props.overview.service_require} value={Number(this.props.overview.service) / Number(this.props.overview.service_require) * 100} isMen/>
        <Card title='英文授課' rwd={rwd} complete={this.props.overview.english} require={this.props.overview.english_require} value={Number(this.props.overview.english) / Number(this.props.overview.english_require) * 100} isMen/>
        <Card title='通識' rwd={rwd} complete={this.props.overview.general} require={this.props.overview.general_require} value={Number(this.props.overview.general) / Number(this.props.overview.general_require) * 100} />
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  overview: state.all.overview
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProfessors())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
