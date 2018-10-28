import React from 'react'
import Card from './Card'
import { connect } from 'react-redux'
import { changeCourse } from '../../../../Redux/Students/Actions/Graduation/index'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: null
    }
  }

  render () {
    const { rwd } = this.props
    return (
      <div className={rwd ? 'overview' : ''}>
        <Card title='共同必修' rwd={rwd} complete={this.props.overview.compulsory} require={this.props.overview.compulse_require} value={Number(this.props.overview.compulsory) / Number(this.props.overview.compulse_require) * 100} />
        <Card title='專業選修' rwd={rwd} complete={this.props.overview.pro} require={this.props.overview.pro_require} value={Number(this.props.overview.pro) / Number(this.props.overview.pro_require) * 100} />
        <Card title='其他選修' rwd={rwd} complete={this.props.overview.other} require={this.props.overview.other_require} value={Number(this.props.overview.other) / Number(this.props.overview.other_require) * 100} />
        <Card title='外語' rwd={rwd} complete={this.props.overview.language} require={this.props.overview.language_require} value={Number(this.props.overview.language) / Number(this.props.overview.language_require) * 100} />
        <Card title='體育' rwd={rwd} complete={this.props.overview.pe} require={this.props.overview.pe_require} value={Number(this.props.overview.pe) / Number(this.props.overview.pe_require) * 100} isMen />
        <Card title='藝文賞析' rwd={rwd} complete={this.props.overview.art} require={this.props.overview.art_require} value={Number(this.props.overview.art) / Number(this.props.overview.art_require) * 100} isMen />
        <Card title='服務學習' rwd={rwd} complete={this.props.overview.service} require={this.props.overview.service_require} value={Number(this.props.overview.service) / Number(this.props.overview.service_require) * 100} isMen />
        <Card title='英文授課' rwd={rwd} complete={this.props.overview.english} require={this.props.overview.english_require} value={Number(this.props.overview.english) / Number(this.props.overview.english_require) * 100} isMen />
        <Card title='通識(舊制)' rwd={rwd} complete={this.props.overview.general} require={this.props.overview.general_require} value={Number(this.props.overview.general) / Number(this.props.overview.general_require) * 100} />
        <Card title='通識(新制)' rwd={rwd} complete={this.props.overview.general_new} require={this.props.overview.general_new_require} value={Number(this.props.overview.general_new) / Number(this.props.overview.general_new_require) * 100} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.overview,
  done: state.Student.Graduation.status === 'DONE'
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
