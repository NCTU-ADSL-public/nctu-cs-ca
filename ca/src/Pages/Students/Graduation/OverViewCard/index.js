
import React from 'react'
import { connect } from 'react-redux'
import Card from './Card'

class Index extends React.Component {
  render () {
    const { rwd } = this.props

    return (
      <div className={rwd && 'overview'}>
        <Card
          title='共同必修'
          rwd={rwd}
          complete={this.props.overview.compulsory}
          require={this.props.overview.compulse_require}
          value={this.props.overview.compulsory / this.props.overview.compulse_require * 100}
          unit='學分'
        />
        <Card
          title='專業選修'
          rwd={rwd}
          complete={this.props.overview.pro}
          require={this.props.overview.pro_require}
          value={this.props.overview.pro / this.props.overview.pro_require * 100}
          unit='學分'
        />
        <Card
          title='其他選修'
          rwd={rwd}
          complete={this.props.overview.other}
          require={this.props.overview.other_require}
          value={this.props.overview.other / this.props.overview.other_require * 100}
          unit='學分'
        />
        <Card
          title='外語'
          rwd={rwd}
          complete={this.props.overview.language}
          require={this.props.overview.language_require}
          value={this.props.overview.language / this.props.overview.language_require * 100}
          unit='學分'
        />
        <Card
          title='體育'
          rwd={rwd}
          complete={this.props.overview.pe}
          require={this.props.overview.pe_require}
          value={this.props.overview.pe / this.props.overview.pe_require * 100}
          unit='門'
        />
        <Card
          title='藝文賞析'
          rwd={rwd}
          complete={this.props.overview.art}
          require={this.props.overview.art_require}
          value={this.props.overview.art / this.props.overview.art_require * 100}
          unit='門'
        />
        <Card
          title='服務學習'
          rwd={rwd}
          complete={this.props.overview.service}
          require={this.props.overview.service_require}
          value={this.props.overview.service / this.props.overview.service_require * 100}
          unit='門'
        />
        <Card
          title='英文授課'
          rwd={rwd}
          complete={this.props.overview.english}
          require={this.props.overview.english_require}
          value={this.props.overview.english / this.props.overview.english_require * 100}
          unit='門'
        />
        {
          // 還沒送審或送審時選舊制
          (this.props.reviewCheck === 0 || this.props.generalCourseSelect === 0) &&
          <Card
            title='通識(舊制)'
            rwd={rwd}
            complete={this.props.overview.general}
            require={this.props.overview.general_require}
            value={this.props.overview.general / this.props.overview.general_require * 100}
            unit='學分'
          />
        }
        {
          // 還沒送審或送審時選新制
          (this.props.reviewCheck === 0 || this.props.generalCourseSelect === 1) &&
          <Card
            title='通識(新制)'
            rwd={rwd}
            complete={this.props.overview.general_new}
            require={this.props.overview.general_new_require}
            value={this.props.overview.general_new / this.props.overview.general_new_require * 100}
            unit='學分'
          />
        }
        <Card
          title='抵免研究所課程'
          rwd={rwd}
          complete={this.props.overview.graduate}
          require={this.props.overview.graduate}
          value={100}
          unit='學分'
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.overview,
  reviewCheck: state.Student.Graduation.check,
  generalCourseSelect: state.Student.Graduation.generalCourseSelect
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
