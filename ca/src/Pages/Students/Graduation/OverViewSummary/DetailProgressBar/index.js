
import React from 'react'
import { connect } from 'react-redux'
import AnimatedProgress from '../../../../../Components/AnimatedProgress'
import './style.css'

const ProgressBar = (props) => (
  <div className='showCourseOverview'>
    <div className='progressBar'>{ props.title }</div>
    <font size={5} color='#338d68'>{ props.credit }</font>/
    <div className='progressBar'>{ props.credit_require }</div>
    { props.unit }
    <AnimatedProgress value={props.credit / props.credit_require * 100} /></div>
)

const NoProgressBar = (props) => (
  <div className='showCourseOverview'>
    <div className='progressBar'>{ props.title }</div>
    <font size={5} color='#338d68'>{ props.credit }</font>
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
              title={'共同必修'}
              unit={'學分'}
              credit={overview.compulsory}
              credit_require={overview.compulse_require}
            />
            <ProgressBar
              title={'服務學習'}
              unit={'門'}
              credit={overview.service}
              credit_require={overview.service_require}
            />
            <ProgressBar
              title={'英文授課'}
              unit={'門'}
              credit={overview.english}
              credit_require={overview.english_require}
            />
          </div>
          <div className='overviewCourse col-sm-3 col-md-3'>
            <ProgressBar
              title={'藝文賞析'}
              unit={'門'}
              credit={overview.art}
              credit_require={overview.art_require}
            />
            <ProgressBar
              title={
                <div>
                  <div className='progressBar2'>通</div>識
                </div>
              }
              unit={'學分'}
              credit={overview.general}
              credit_require={overview.general_require}
            />
            <NoProgressBar
              title={'抵免研究所課程'}
              unit={'學分'}
              credit={overview.graduate}
            />
          </div>
          <div className='overviewCourse col-sm-3 col-md-3'>
            <ProgressBar
              title={
                <div>
                  <div className='progressBar2'>外</div>語
                </div>
              }
              unit={'學分'}
              credit={overview.language}
              credit_require={overview.language_require}
            />
            <ProgressBar
              title={'專業選修'}
              unit={'學分'}
              credit={overview.pro}
              credit_require={overview.pro_require}
            />
          </div>
          <div className='overviewCourse col-sm-3 col-md-3'>
            <ProgressBar
              title={
                <div>
                  <div className='progressBar2'>體</div>育
                </div>
              }
              unit={'門'}
              credit={overview.pe}
              credit_require={overview.pe_require}
            />
            <ProgressBar
              title={'其他選修'}
              unit={'學分'}
              credit={overview.other}
              credit_require={overview.other_require}
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
