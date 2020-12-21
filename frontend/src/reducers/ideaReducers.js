import {
	IDEA_CREATE_FAIL,
	IDEA_CREATE_REQUEST,
	IDEA_CREATE_RESET,
	IDEA_CREATE_SUCCESS,
	IDEA_DELETE_FAIL,
	IDEA_DELETE_REQUEST,
	IDEA_DELETE_SUCCESS,
	IDEA_DETAILS_FAIL,
	IDEA_DETAILS_REQUEST,
	IDEA_DETAILS_RESET,
	IDEA_DETAILS_SUCCESS,
	IDEA_LIST_FAIL,
	IDEA_LIST_REQUEST,
	IDEA_LIST_SUCCESS,
	IDEA_UPDATE_FAIL,
	IDEA_UPDATE_REQUEST,
	IDEA_UPDATE_RESET,
	IDEA_UPDATE_SUCCESS,
} from '../constants/ideaConstants'

export const ideaListReducer = (state = { ideas: [] }, action) => {
	switch (action.type) {
		case IDEA_LIST_REQUEST:
			return { loading: true, ideas: [] }
		case IDEA_LIST_SUCCESS:
			return { loading: false, ideas: action.payload }
		case IDEA_LIST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const ideaDetailsReducer = (state = { idea: {} }, action) => {
	switch (action.type) {
		case IDEA_DETAILS_REQUEST:
			return { loading: true }
		case IDEA_DETAILS_SUCCESS:
			return { loading: false, success: true, idea: action.payload }
		case IDEA_DETAILS_FAIL:
			return { loading: false, error: action.payload }
		case IDEA_DETAILS_RESET:
			return {}
		default:
			return state
	}
}

export const ideaCreateReducer = (state = { idea: {} }, action) => {
	switch (action.type) {
		case IDEA_CREATE_REQUEST:
			return { loading: true }
		case IDEA_CREATE_SUCCESS:
			return { loading: false, success: true, idea: action.payload }
		case IDEA_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case IDEA_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const ideaUpdateReducer = (state = { idea: {} }, action) => {
	switch (action.type) {
		case IDEA_UPDATE_REQUEST:
			return { loading: true }
		case IDEA_UPDATE_SUCCESS:
			return { loading: false, success: true, idea: action.payload }
		case IDEA_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		case IDEA_UPDATE_RESET:
			return { idea: {} }
		default:
			return state
	}
}

export const ideaDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case IDEA_DELETE_REQUEST:
			return { loading: true }
		case IDEA_DELETE_SUCCESS:
			return { loading: false, success: true }
		case IDEA_DELETE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
