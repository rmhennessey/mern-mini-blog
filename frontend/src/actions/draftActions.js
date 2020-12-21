import axios from 'axios'
import {
	DRAFT_LIST_REQUEST,
	DRAFT_LIST_SUCCESS,
	DRAFT_LIST_FAIL,
	DRAFT_CREATE_FAIL,
	DRAFT_CREATE_SUCCESS,
	DRAFT_CREATE_REQUEST,
	DRAFT_DETAILS_REQUEST,
	DRAFT_DETAILS_SUCCESS,
	DRAFT_DETAILS_FAIL,
	DRAFT_DETAILS_RESET,
	DRAFT_UPDATE_REQUEST,
	DRAFT_UPDATE_SUCCESS,
	DRAFT_UPDATE_FAIL,
	DRAFT_DELETE_REQUEST,
	DRAFT_DELETE_SUCCESS,
	DRAFT_DELETE_FAIL,
} from '../constants/draftConstants'

export const listDrafts = () => async (dispatch, getState) => {
	try {
		dispatch({ type: DRAFT_LIST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get('/api/drafts', config)

		dispatch({
			type: DRAFT_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: DRAFT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listDraftDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DRAFT_DETAILS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/drafts/${id}`, config)

		dispatch({
			type: DRAFT_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: DRAFT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const resetDraftDetails = () => (dispatch) => {
	dispatch({ type: DRAFT_DETAILS_RESET })
}

export const createDraft = (title, subtitle, body, tags, links) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: DRAFT_CREATE_REQUEST,
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
			`/api/drafts`,
			{ title, subtitle, body, tags, links },
			config
		)

		dispatch({
			type: DRAFT_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: DRAFT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateDraft = (draft) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DRAFT_UPDATE_REQUEST,
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

		const { data } = await axios.put(`/api/drafts/${draft._id}`, draft, config)

		dispatch({
			type: DRAFT_UPDATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: DRAFT_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteDraft = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DRAFT_DELETE_REQUEST,
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

		await axios.delete(`/api/drafts/${id}`, config)

		dispatch({
			type: DRAFT_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: DRAFT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
