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
					status: e.status === null ? 2 : e.status
				})),
			fetching: false
		}))
	})
}

export const verifyHandleOk = payload => dispatch => {
	axios
		.post('/assistants/offsetApply/setAgree', payload.req)
		.then( res => {
			if (res.data.signal === 1) {
				dispatch(verifyHandleChange({
					formList: payload.Verify.formList.map(
						(item, i) => ({
							...item,
							status: (payload.Verify.select.filter(e => e === i).length === 0) ? 
								item.status : 2
						})
					),
					open: true,
					message: 0,
					select: []
				}))
			} else {
				dispatch(verifyHandleChange({
					open: true,
					message: 1
				}))
			}
		}).catch( err => {
			dispatch(verifyHandleChange({
				open: true, message: 1
			}))
		})
}

export const verifyHandleWithdraw = payload => dispatch => {
	axios
		.post('/assistants/offsetApply/setAgree', payload.req)
		.then( res => {
			if (res.data.signal === 1) {
				dispatch(verifyHandleChange({
					formList: payload.Verify.formList.map(
						(item, i) => ({
							...item,
							status: (payload.Verify.select.filter( e => e === i).length === 0) ? 
								item.status : 3
						})
					),
					open: true,
					message: 0,
					select: []
				}))
			} else {
				dispatch(verifyHandleChange({
					open: true,
					message: 1
				}))
			}
		}).catch( err => {
			dispatch(verifyHandleChange({
				open: true,
				message: 1
			}))
		})
}

export const verifyHandleReturn = payload => dispatch => {
	axios
		.post('/assistants/offsetApply/setAgree', payload.req)
		.then( res => {
			if (res.data.signal === 1) {
				dispatch(verifyHandleChange({
					formList: payload.Verify.formList.map(
						(item, i) => ({
							...item,
							status: (payload.Verify.select.filter( e => e === i).length === 0) ? 
								item.status : 6
						})
					),
					open: true,
					message: 0,
					return: '',
					select: []
				}))
			} else {
				dispatch(verifyHandleChange({
					open: true,
					message: 1
				}))
			}
		}).catch( err => {
			dispatch(verifyHandleChange({
				open: true,
				message: 1
			}))
		})
}

export const verifyHandleSend = payload => dispatch => {
	axios
		.post('/assistants/offsetApply/setAgree', payload.req)
		.then( res => {
			if (res.data.signal === 1) {
				dispatch(verifyHandleChange({
					formList: payload.Verify.formList.map(
						(item, i) => ({
							...item,
							status: (payload.Verify.select.filter( e => e === i).length === 0) ? 
								item.status : payload.req.status
						})
					),
					open: true,
					message: 0,
					select: [],
					transferTo: ''
				}))
			} else {
				dispatch(verifyHandleChange({
					open: true,
					message: 1
				}))
			}
		}).catch( err => {
			dispatch(verifyHandleChange({
				open: true,
				message: 1
			}))
		})
}

export const verifyHandleAllReset = payload => dispatch => {
	axios
		.post('/assistants/offsetApply/setAgree', payload.req)
		.then( res => {
			if (res.data.signal === 1) {
				dispatch(verifyHandleChange({
					formList: payload.Verify.formList.map(
						(item, i) => ({
							...item,
							status: (payload.Verify.select.filter( e => e === i).length === 0) ? 
								item.status : 0
						})
					),
					open: true,
					message: 0,
					select: [],
				}))
			} else {
				dispatch(verifyHandleChange({
					open: true,
					message: 1
				}))
			}
		}).catch( err => {
			dispatch(verifyHandleChange({
				open: true,
				message: 1
			}))
		})
}

export const verifyHandleDownloadFile = payload => dispatch => {
	axios
		.post('/assistants/offsetApply/File', payload)
		.then( res => {
			if (res.data.file) {
				const linkSource = res.data.file;
				const downloadLink = document.createElement("a");
				const fileName = payload.sid + "_抵免文件.pdf";
		
				downloadLink.href = linkSource;
				downloadLink.download = fileName;
				downloadLink.click();
			} else {
				dispatch(verifyHandleChange({
					open: true,
					message: 1
				}))
			}
		}).catch( err => {
			dispatch(verifyHandleChange({
				open: true,
				message: 1
			}))
		})
}
