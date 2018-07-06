import React from 'react'
//for c3
import C3Chart from 'react-c3js'
import 'c3/c3.css'

export default class GaugeChart extends React.Component {

  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidUpdate () {
    this.chart.chart.internal.config.gauge_max = this.props.member
    this.chart.chart.load({
      columns: [
        ['及格', this.props.passed],
      ],
      type: 'gauge',
    })
  }

  render () {

    let data = {
      data: {
        columns: [
          ['及格', this.props.passed],
        ],
        type: 'gauge',
      },

      color: {
        pattern: ['#7fddb1', '#f2bebc'],
      },

      gauge: {
        max: this.props.member,
      },
    }

    return (
      <div>及格率
        <C3Chart data={data.data}
                 color={data.color}
                 gauge={data.gauge}
                 ref={(chart) => { this.chart = chart }}
        />
      </div>
    )
  }
}
