import {handleActions } from 'redux-actions'
import FakeData from '../../../../Resources/FakeData'

const initalState = {
	/******start for test*****
	formList: FakeData.FormList.map((e, i) => ({...e, id: i})),
  teacherList: FakeData.TeacherList.sort((a, b) => b.status - a.status),
  *********end for test***************/
	formList:[],
	teacherList: [],
	isOld: false,
	open: false,
	message: 0,
	index: 0,
	select: [],
	selectAll: false,
	type: [0, 1, 2, 3],
	transferTo: '',
	return: '',
	anchorEl: null,
	fetching: true
}

export default handleActions({
	VERIFY_HANDLE_CHANGE: (state, action) => ({
		...state,
		...action.payload
	})
}, initalState)
