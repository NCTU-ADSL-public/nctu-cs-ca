
import { createAction } from 'redux-actions'

export const CourseCreditChange = createAction('COURSE_CREDIT_CHANGE')

export const courseCreditChange = (type, value) => dispatch => {
  let object = { type: type, value: value }
  dispatch(CourseCreditChange(object))
}
