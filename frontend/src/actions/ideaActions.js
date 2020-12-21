import axios from 'axios'
import {
	IDEA_LIST_REQUEST,
	IDEA_LIST_SUCCESS,
	IDEA_LIST_FAIL,
	IDEA_CREATE_FAIL,
	IDEA_CREATE_SUCCESS,
	IDEA_CREATE_REQUEST,
	IDEA_DELETE_REQUEST,
	IDEA_DELETE_SUCCESS,
	IDEA_DELETE_FAIL,
	IDEA_UPDATE_REQUEST,
	IDEA_UPDATE_SUCCESS,
	IDEA_UPDATE_FAIL,
	IDEA_DETAILS_REQUEST,
	IDEA_DETAILS_FAIL,
	IDEA_DETAILS_SUCCESS,
	IDEA_DETAILS_RESET,
} from '../constants/ideaConstants'

export const listIdeas = () => async (dispatch, getState) => {
	try {
		dispatch({ type: IDEA_LIST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get('/api/ideas', config)

		dispatch({
			type: IDEA_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: IDEA_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listIdeaDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: IDEA_DETAILS_REQUEST })

		// From getState(), we want to access userInfo which is inside userLogin
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/ideas/${id}`, config)

		dispatch({
			type: IDEA_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: IDEA_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const resetIdeaDetails = () => (dispatch) => {
	dispatch({ type: IDEA_DETAILS_RESET })
}

export const createIdea = (title, body, tags) => async (dispatch, getState) => {
	try {
		dispatch({
			type: IDEA_CREATE_REQUEST,
		})

		// From getState(), we want to access userInfo which is inside userLogin
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(
			`/api/ideas`,
			{ title, body, tags },
			config
		)

		dispatch({
			type: IDEA_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: IDEA_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateIdea = (idea) => async (dispatch, getState) => {
	try {
		dispatch({
			type: IDEA_UPDATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.put(`/api/ideas/${idea._id}`, idea, config)

		dispatch({
			type: IDEA_UPDATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: IDEA_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteIdea = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: IDEA_DELETE_REQUEST,
		})

		// From getState(), we want to access userInfo which is inside userLogin
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		await axios.delete(`/api/ideas/${id}`, config)

		dispatch({
			type: IDEA_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: IDEA_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
