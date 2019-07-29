
import React from 'react'
import { connect } from 'react-redux'
import AnimatedProgress from '../../../../../Components/AnimatedProgress'
import './style.css'

const ProgressBar = (props) => (
  <div className='showCourseOverview'>
    <div className='progressBar'>{ props.title }</div>
    <font size={5} color='#338d68'>{ props.complete }</font>/
    <div className='progressBar'>{ props.require }</div>
    { props.unit }
    <AnimatedProgress value={props.complete / props.require * 100} />
  </div>
)

const NoProgressBar = (props) => (
  <div className='showCourseOverview'>
    <div className='progressBar'>{ props.title }</div>
    <font size={5} color='#338d68'>{ props.complete }</font>
    <div className='progressBar' />
    { props.unit }
  </div>
)

class Index extends React.Component {
  render () {
    const overview = this.props.overview

    return (
      <div>
        <div className='overview hidden-xs'>
          <div className='overviewCourse col-sm-3 col-md-3'>
            <ProgressBar
              title='共同必修'
              unit='學分'
              complete={overview.compulsory}
              require={overview.compulse_require}
            />
            <ProgressBar
              title='服務學習'
              unit='門'
              complete={overview.service}
              require={overview.service_require}
            />
            <ProgressBar
              title='英文授課'
              unit='門'
              complete={overview.english}
              require={overview.english_require}
            />
          </div>
          <div className='overviewCourse col-sm-3 col-md-3'>
            <ProgressBar
              title='藝文賞析'
              unit='門'
              complete={overview.art}
              require={overview.art_require}
            />
            <ProgressBar
              title={
                <div>
                  <div className='progressBar2'>通</div>識
                </div>
              }
              unit='學分'
              complete={overview.general}
              require={overview.general_require}
            />
            <NoProgressBar
              title='抵免研究所課程'
              unit='學分'
              complete={overview.graduate}
            />
          </div>
          <div className='overviewCourse col-sm-3 col-md-3'>
            <ProgressBar
              title={
                <div>
                  <div className='progressBar2'>外</div>語
                </div>
              }
              unit='學分'
              complete={overview.language}
              require={overview.language_require}
            />
            <ProgressBar
              title='專業選修'
              unit='學分'
              complete={overview.pro}
              require={overview.pro_require}
            />
          </div>
          <div className='overviewCourse col-sm-3 col-md-3'>
            <ProgressBar
              title={
                <div>
                  <div className='progressBar2'>體</div>育
                </div>
              }
              unit='門'
              complete={overview.pe}
              require={overview.pe_require}
            />
            <ProgressBar
              title='其他選修'
              unit='學分'
              complete={overview.other}
              require={overview.other_require}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.overview
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
