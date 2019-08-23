import { createAction } from 'redux-actions'
import axios from 'axios';

export const verifyHandleChange = createAction('VERIFY_HANDLE_CHANGE');

export const getTeacherList = () => dispatch => {
	axios.get('/assistants/advisee/teacherList').then( res => {
		dispatch(verifyHandleChange({
			teacherList: res.data
				.sort((a, b) => b.status - a.status)
				.map(t => ({
					id: t.id,
					name: t.name,
					status: t.status
				}))
			})
		)
	})
}

export const getFormList = () => dispatch => {
	axios.get('/assistants/offsetApply/Show').then( res => {
		dispatch(verifyHandleChange({
			formList: res.data
				.map((e, i) => ({
					...e,
					id: i,
					fetching: false
				}))
		}))
	})
}