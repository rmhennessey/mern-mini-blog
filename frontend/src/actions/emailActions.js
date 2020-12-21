import axios from 'axios'
import {
	EMAIL_LIST_REQUEST,
	EMAIL_LIST_SUCCESS,
	EMAIL_LIST_FAIL,
	EMAIL_CREATE_FAIL,
	EMAIL_CREATE_SUCCESS,
	EMAIL_CREATE_REQUEST,
} from '../constants/emailConstants'

export const listEmails = () => async (dispatch, getState) => {
	try {
		dispatch({ type: EMAIL_LIST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get('/api/emails', config)

		dispatch({
			type: EMAIL_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: EMAIL_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const createEmail = (firstName, lastName, email) => async (dispatch) => {
	try {
		dispatch({
			type: EMAIL_CREATE_REQUEST,
		})

		const { data } = await axios.post(`/api/emails`, {
			firstName,
			lastName,
			email,
		})

		dispatch({
			type: EMAIL_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: EMAIL_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
