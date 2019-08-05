import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import GraduationCard from './Card/GraduationCard'


const styles = theme => ({
  container: {
    width: '100%',
    marginBottom: '50px'
  },
  warningText: {
    fontSize: '30px',
    flex: 1,
    textAlign: 'center',
    color: '#6f6f6f'
  },

  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 27,
    zIndex: 10
  },
})

class Status extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  input_filter = (students, target) => {
    return students.filter( student => {
      return (
        target === '' || 
        student.student_id.search(target) !== -1 ||
        student.sname.search(target) !== -1
      )
    })
  }

  render() {
    const { Status, classes } = this.props

    return (
      Status.grade === '' ? (
        <div style = {{ display: 'flex', width: '100%' }}>
          <div style = {{ flex: 0.1 }}/>
          <div className={classes.warningText}>
            請選取年級
          </div>
          <div style = {{ flex: 0.1 }} />
        </div>
      ) : (
        this.input_filter(Status.students, Status.input).length !== 0 ? (
          <div className={classes.container}>{
            this.input_filter(Status.students, Status.input)
            .slice(Status.dataPerPage * Status.page, Status.dataPerPage * (Status.page + 1))
            .map( (student, idx) => 
              <GraduationCard 
                student={student} 
                key={idx}
              />
            )
          }
          </div>
        ) : (
          <div style = {{ display: 'flex', width: '100%' }}>
            <div style = {{ flex: 0.1 }}/>
            <div className={classes.warningText}>
              無符合的資料或是資料尚未讀取完畢
            </div>
            <div style = {{ flex: 0.1 }} />
          </div>
        )
      )
    )
  }
}

const mapStateToProps = state => ({
  Status: state.Assistant.Graduation.Status,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Status))