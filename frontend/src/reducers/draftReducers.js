import {
	DRAFT_LIST_REQUEST,
	DRAFT_LIST_SUCCESS,
	DRAFT_LIST_FAIL,
	DRAFT_CREATE_REQUEST,
	DRAFT_CREATE_SUCCESS,
	DRAFT_CREATE_FAIL,
	DRAFT_CREATE_RESET,
	DRAFT_DETAILS_REQUEST,
	DRAFT_DETAILS_SUCCESS,
	DRAFT_DETAILS_FAIL,
	DRAFT_DETAILS_RESET,
	DRAFT_UPDATE_REQUEST,
	DRAFT_UPDATE_SUCCESS,
	DRAFT_UPDATE_FAIL,
	DRAFT_UPDATE_RESET,
	DRAFT_DELETE_REQUEST,
	DRAFT_DELETE_SUCCESS,
	DRAFT_DELETE_FAIL,
} from '../constants/draftConstants'

export const draftListReducer = (state = { drafts: [] }, action) => {
	switch (action.type) {
		case DRAFT_LIST_REQUEST:
			return { loading: true, drafts: [] }
		case DRAFT_LIST_SUCCESS:
			return { loading: false, drafts: action.payload }
		case DRAFT_LIST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const draftDetailsReducer = (state = { draft: {} }, action) => {
	switch (action.type) {
		case DRAFT_DETAILS_REQUEST:
			return { loading: true }
		case DRAFT_DETAILS_SUCCESS:
			return { loading: false, success: true, draft: action.payload }
		case DRAFT_DETAILS_FAIL:
			return { loading: false, error: action.payload }
		case DRAFT_DETAILS_RESET:
			return {}
		default:
			return state
	}
}

export const draftCreateReducer = (state = { draft: {} }, action) => {
	switch (action.type) {
		case DRAFT_CREATE_REQUEST:
			return { loading: true }
		case DRAFT_CREATE_SUCCESS:
			return { loading: false, success: true, draft: action.payload }
		case DRAFT_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case DRAFT_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const draftUpdateReducer = (state = { draft: {} }, action) => {
	switch (action.type) {
		case DRAFT_UPDATE_REQUEST:
			return { loading: true }
		case DRAFT_UPDATE_SUCCESS:
			return { loading: false, success: true, draft: action.payload }
		case DRAFT_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		case DRAFT_UPDATE_RESET:
			return { draft: {} }
		default:
			return state
	}
}

export const draftDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DRAFT_DELETE_REQUEST:
			return { loading: true }
		case DRAFT_DELETE_SUCCESS:
			return { loading: false, success: true }
		case DRAFT_DELETE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
