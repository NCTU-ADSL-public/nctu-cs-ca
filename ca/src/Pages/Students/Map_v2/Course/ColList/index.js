import React from 'react'
import Course from '../CourseBtn'
import { connect } from 'react-redux'

const Index = ({ colCourse, onTodoClick }) => (
  <div>
    {colCourse.map(todo =>
      <Course
        key={todo.id}
        {...todo}
      />
    )}
  </div>
)

const getcolCourse = (data, grad, sem) => {
  return data.filter(t => (t.grade === grad && t.semester === sem))
}

const mapStateToProps = (state, ownProps) => {
  return {
    colCourse: getcolCourse(state.Student.Map.CourseMap, ownProps.grad, ownProps.sem)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
