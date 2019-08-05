import { createAction } from 'redux-actions'

export const check_handle_change = createAction('CHECK_HANDLE_CHANGE');

export const checkHandleChange = (payload) => dispatch => {
    dispatch(check_handle_change(payload));
}