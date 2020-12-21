import {
	EMAIL_CREATE_FAIL,
	EMAIL_CREATE_REQUEST,
	EMAIL_CREATE_RESET,
	EMAIL_CREATE_SUCCESS,
	EMAIL_LIST_FAIL,
	EMAIL_LIST_REQUEST,
	EMAIL_LIST_SUCCESS,
} from '../constants/emailConstants'

export const emailListReducer = (state = { emails: [] }, action) => {
	switch (action.type) {
		case EMAIL_LIST_REQUEST:
			return { loading: true, emails: [] }
		case EMAIL_LIST_SUCCESS:
			return { loading: false, emails: action.payload }
		case EMAIL_LIST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const emailCreateReducer = (state = { email: {} }, action) => {
	switch (action.type) {
		case EMAIL_CREATE_REQUEST:
			return { loading: true }
		case EMAIL_CREATE_SUCCESS:
			return { loading: false, success: true, email: action.payload }
		case EMAIL_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case EMAIL_CREATE_RESET:
			return {}
		default:
			return state
	}
}
