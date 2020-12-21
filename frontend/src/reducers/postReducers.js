import {
	POST_LIST_REQUEST,
	POST_LIST_SUCCESS,
	POST_LIST_FAIL,
	POST_CREATE_REQUEST,
	POST_CREATE_SUCCESS,
	POST_CREATE_FAIL,
	POST_CREATE_RESET,
	POST_DETAILS_REQUEST,
	POST_DETAILS_SUCCESS,
	POST_DETAILS_FAIL,
	POST_DETAILS_RESET,
	POST_UPDATE_REQUEST,
	POST_UPDATE_SUCCESS,
	POST_UPDATE_FAIL,
	POST_UPDATE_RESET,
	POST_DELETE_REQUEST,
	POST_DELETE_SUCCESS,
	POST_DELETE_FAIL,
	POST_SLUG_REQUEST,
	POST_SLUG_SUCCESS,
	POST_SLUG_FAIL,
	POST_SLUG_RESET,
} from '../constants/postConstants'

export const postListReducer = (state = { posts: [] }, action) => {
	switch (action.type) {
		case POST_LIST_REQUEST:
			return { loading: true, posts: [] }
		case POST_LIST_SUCCESS:
			return {
				loading: false,
				posts: action.payload.posts,
				pages: action.payload.pages,
				page: action.payload.page,
			}
		case POST_LIST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const postDetailsReducer = (state = { post: {} }, action) => {
	switch (action.type) {
		case POST_DETAILS_REQUEST:
			return { loading: true }
		case POST_DETAILS_SUCCESS:
			return { loading: false, success: true, post: action.payload }
		case POST_DETAILS_FAIL:
			return { loading: false, error: action.payload }
		case POST_DETAILS_RESET:
			return {}
		default:
			return state
	}
}

export const postSlugReducer = (state = { post: {} }, action) => {
	switch (action.type) {
		case POST_SLUG_REQUEST:
			return { loading: true }
		case POST_SLUG_SUCCESS:
			return { loading: false, success: true, post: action.payload }
		case POST_SLUG_FAIL:
			return { loading: false, error: action.payload }
		case POST_SLUG_RESET:
			return {}
		default:
			return state
	}
}

export const postCreateReducer = (state = { post: {} }, action) => {
	switch (action.type) {
		case POST_CREATE_REQUEST:
			return { loading: true }
		case POST_CREATE_SUCCESS:
			return { loading: false, success: true, post: action.payload }
		case POST_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case POST_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const postUpdateReducer = (state = { post: {} }, action) => {
	switch (action.type) {
		case POST_UPDATE_REQUEST:
			return { loading: true }
		case POST_UPDATE_SUCCESS:
			return { loading: false, success: true, post: action.payload }
		case POST_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		case POST_UPDATE_RESET:
			return { post: {} }
		default:
			return state
	}
}

export const postDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case POST_DELETE_REQUEST:
			return { loading: true }
		case POST_DELETE_SUCCESS:
			return { loading: false, success: true }
		case POST_DELETE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
