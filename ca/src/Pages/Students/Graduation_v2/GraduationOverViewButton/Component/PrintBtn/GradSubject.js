import React from 'react'
import './GradTable.css'

class GradSubject extends React.Component {
  render () {
    let realscore = [null, null, null, null, null, null, null, null, null, null, null, null]
    realscore[this.props.year * 3 + this.props.semester - 3] = this.props.score
    return (
      <tr className={(this.props.name === ' ') ? 'bigger-row' : ''}>
        <td className='left-text'>{this.props.name}</td>
        <td>{realscore[0]}</td>
        <td>{realscore[1]}</td>
        <td>{realscore[2]}</td>
        <td>{realscore[3]}</td>
        <td>{realscore[4]}</td>
        <td>{realscore[5]}</td>
        <td>{realscore[6]}</td>
        <td>{realscore[7]}</td>
        <td>{realscore[8]}</td>
        <td>{realscore[9]}</td>
        <td>{realscore[10]}</td>
        <td>{realscore[11]}</td>
        <td>{this.props.credit}</td>
        <td>{this.props.realCredit}</td>
        <td className='left-text' style={{ paddingLeft: 5 }}>{this.props.comment}</td>
      </tr>
    )
  }
}

export default GradSubject
