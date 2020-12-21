import {} from '../constants/ideaConstants'
import {
	NUGGET_CREATE_FAIL,
	NUGGET_CREATE_REQUEST,
	NUGGET_CREATE_RESET,
	NUGGET_CREATE_SUCCESS,
	NUGGET_DELETE_FAIL,
	NUGGET_DELETE_REQUEST,
	NUGGET_DELETE_SUCCESS,
	NUGGET_DETAILS_FAIL,
	NUGGET_DETAILS_REQUEST,
	NUGGET_DETAILS_RESET,
	NUGGET_DETAILS_SUCCESS,
	NUGGET_LIST_FAIL,
	NUGGET_LIST_REQUEST,
	NUGGET_LIST_SUCCESS,
	NUGGET_UPDATE_FAIL,
	NUGGET_UPDATE_REQUEST,
	NUGGET_UPDATE_RESET,
	NUGGET_UPDATE_SUCCESS,
} from '../constants/nuggetConstants'

export const nuggetListReducer = (state = { nuggets: [] }, action) => {
	switch (action.type) {
		case NUGGET_LIST_REQUEST:
			return { loading: true, nuggets: [] }
		case NUGGET_LIST_SUCCESS:
			return { loading: false, nuggets: action.payload }
		case NUGGET_LIST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const nuggetDetailsReducer = (state = { nugget: {} }, action) => {
	switch (action.type) {
		case NUGGET_DETAILS_REQUEST:
			return { loading: true }
		case NUGGET_DETAILS_SUCCESS:
			return { loading: false, success: true, nugget: action.payload }
		case NUGGET_DETAILS_FAIL:
			return { loading: false, error: action.payload }
		case NUGGET_DETAILS_RESET:
			return {}
		default:
			return state
	}
}

export const nuggetCreateReducer = (state = { nugget: {} }, action) => {
	switch (action.type) {
		case NUGGET_CREATE_REQUEST:
			return { loading: true }
		case NUGGET_CREATE_SUCCESS:
			return { loading: false, success: true, NUGGET: action.payload }
		case NUGGET_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case NUGGET_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const nuggetUpdateReducer = (state = { nugget: {} }, action) => {
	switch (action.type) {
		case NUGGET_UPDATE_REQUEST:
			return { loading: true }
		case NUGGET_UPDATE_SUCCESS:
			return { loading: false, success: true, nugget: action.payload }
		case NUGGET_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		case NUGGET_UPDATE_RESET:
			return { idea: {} }
		default:
			return state
	}
}

export const nuggetDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case NUGGET_DELETE_REQUEST:
			return { loading: true }
		case NUGGET_DELETE_SUCCESS:
			return { loading: false, success: true }
		case NUGGET_DELETE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
