import { createAction } from 'redux-actions'

export const check_handle_change = createAction('GRADUATION_CHECK_HANDLE_CHANGE');

export const checkHandleChange = (payload) => dispatch => {
    dispatch(check_handle_change(payload));
}