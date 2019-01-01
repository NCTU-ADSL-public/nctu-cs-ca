import React from 'react'
// for c3
import C3Chart from 'react-c3js'
import 'c3/c3.css'

const color = {
  pattern: ['#7fddb1', '#f2bebc']
}

const axis = {
  y: {
    label: {
      text: '人數',
      position: 'outer-middle'
    }
  }
}

export default class Course extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        x: 'x',
        columns: [
          ['x', 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          ['及格', ...props.detail.passed],
          ['不及格', ...props.detail.failed]
        ],
        type: 'bar',
        groups: [
          ['及格', '不及格']
        ]
      }
    }
  }

  render () {
    let data = {
      x: 'x',
      columns: [
        ['x', 5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
        ['及格', ...this.props.detail.passed],
        ['不及格', ...this.props.detail.failed]
      ],
      type: 'bar',
      groups: [
        ['及格', '不及格']
      ]
    }

    return (
      <div>成績分布<br /><br />
        <C3Chart data={data} color={color} axis={axis} />
      </div>
    )
  }
}
