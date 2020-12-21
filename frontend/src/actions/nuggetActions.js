import axios from 'axios'
import {
	NUGGET_LIST_REQUEST,
	NUGGET_LIST_SUCCESS,
	NUGGET_LIST_FAIL,
	NUGGET_CREATE_FAIL,
	NUGGET_CREATE_SUCCESS,
	NUGGET_CREATE_REQUEST,
	NUGGET_DETAILS_REQUEST,
	NUGGET_DETAILS_SUCCESS,
	NUGGET_DETAILS_FAIL,
	NUGGET_DETAILS_RESET,
	NUGGET_UPDATE_REQUEST,
	NUGGET_UPDATE_SUCCESS,
	NUGGET_UPDATE_FAIL,
	NUGGET_DELETE_REQUEST,
	NUGGET_DELETE_SUCCESS,
	NUGGET_DELETE_FAIL,
} from '../constants/nuggetConstants'

export const listNuggets = () => async (dispatch, getState) => {
	try {
		dispatch({ type: NUGGET_LIST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get('/api/nuggets', config)

		dispatch({
			type: NUGGET_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: NUGGET_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listNuggetDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: NUGGET_DETAILS_REQUEST })

		// From getState(), we want to access userInfo which is inside userLogin
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/nuggets/${id}`, config)

		dispatch({
			type: NUGGET_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: NUGGET_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const resetNuggetDetails = () => (dispatch) => {
	dispatch({ type: NUGGET_DETAILS_RESET })
}

export const createNugget = (title, episode, tags) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: NUGGET_CREATE_REQUEST,
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
			`/api/nuggets`,
			{ title, episode, tags },
			config
		)

		dispatch({
			type: NUGGET_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: NUGGET_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateNugget = (nugget) => async (dispatch, getState) => {
	try {
		dispatch({
			type: NUGGET_UPDATE_REQUEST,
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

		const { data } = await axios.put(
			`/api/nuggets/${nugget._id}`,
			nugget,
			config
		)

		dispatch({
			type: NUGGET_UPDATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: NUGGET_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteNugget = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: NUGGET_DELETE_REQUEST,
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

		await axios.delete(`/api/nuggets/${id}`, config)

		dispatch({
			type: NUGGET_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: NUGGET_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
