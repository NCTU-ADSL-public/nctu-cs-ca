import React from 'react'
import { connect } from 'react-redux'
import { ChangeTeacher } from '../../../../Redux/Teachers/Actions/Project'
import Button from '@material-ui/core/Button'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (agree) {
    let payload = {
      student_id: this.props.student_id,
      semester: this.props.sem,
      research_title: this.props.research.research_title,
      first_second: this.props.research.first_second,
      agree_replace: agree
    }
    this.props.ChangeTeacher(payload)
  }

  render () {
    return (
      <div>
        該學生向您申請改變專題教授，請選擇同意與否，謝謝！
        <div className='row'>
          <Button
            className='col-md-6'
            style={{ fontSize: '12px', width: '80px' }}
            color='inherit'
            onClick={() => this.handleClick(0)}
           >
            不同意
          </Button>
          <Button
            className='col-md-6'
            style={{ fontSize: '12px', width: '80px' }}
            color='inherit'
            onClick={() => this.handleClick(1)}
           >
            同意
          </Button>

        </div>
      </div>
    )
  }
}
const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({
  ChangeTeacher: (payload) => dispatch(ChangeTeacher(payload))
})

export default connect(mapState, mapDispatch)(Index)
