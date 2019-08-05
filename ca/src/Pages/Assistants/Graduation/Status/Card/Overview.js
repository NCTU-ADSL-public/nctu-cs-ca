import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import CircularProgressbar from 'react-circular-progressbar'
import OpenInNew from '@material-ui/icons/OpenInNew'

const styles = theme => ({

})

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  hightlight = (label, raw_input) => {
    if (raw_input === '')
      return label
    const target = new RegExp(raw_input,"gi");
    var result, indices = [];
    while ( (result = target.exec(label)) ) {
        indices.push(result.index);
    }
    indices.push(label.length)
    return indices.length ? (
      <span>
        <span>{label.substr(0, indices[0])}</span>
        {
          indices.map( (index, idx) =>
            <span key={idx}>
              <span style={{background: 'yellow'}}>{label.substr(index, raw_input.length)}</span>
              <span>{idx === indices.length - 1 ? '' : label.substr(index + raw_input.length, indices[idx + 1] - index - raw_input.length)}</span>
            </span>
          )
        }
      </span>
    ) : label
  }

  render() {
    const { classes, student, Status } = this.props

    return (
      <div style={{ width: '15%', display: 'block', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', fontWeight: 'bold' }} >{ this.hightlight(student.sname, Status.input) }
          <OpenInNew style={{
            fontSize: '20px',
            marginLeft: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            verticalAlign: 'middle'}}
            onClick={() => window.open('/assistants/head/s/' + student.student_id + '/' + student.sname + '/' + student.program)}
          />
        </div>
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>{ this.hightlight(student.student_id + ' / ' + student.program, Status.input) }</div>
        <CircularProgressbar
          percentage={100 * student.total_credit / 128}
          text={student.total_credit ? student.total_credit.toString() : 'error'}
          initialAnimation
          styles={{
            root: { maxWidth: '180px' },
            path: { stroke: '#34855e' },
            text: { fill: '#34855e', fontSize: '25px', fontWeight: 'bold' }
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  Status: state.Assistant.Graduation.Status,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Overview))