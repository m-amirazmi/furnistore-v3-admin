import { createSlice } from '@reduxjs/toolkit';
import { api, fetchApi } from '../../utils/api';

export const initialState = {
	user: {},
	userToken: '',
	loading: false,
	hasErrors: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserToken: (state, { payload }) => {
			state.userToken = payload;
		},
		getUser: (state) => {
			state.loading = true;
		},
		getUserSuccess: (state, { payload }) => {
			state.user = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getUserFailure: (state) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const userSelector = (state) => state.user;
export const { getUser, getUserSuccess, getUserFailure, setUserToken } = userSlice.actions;

// ASYNC THUNK
export function fetchUser(token) {
	return async (dispatch) => {
		dispatch(getUser());
		try {
			const data = await fetchApi({ endpoint: api.getUser, method: 'get', token: token });
			if (data.error) return dispatch(getUserFailure());
			dispatch(getUserSuccess({ ...data, status: true }));
		} catch (error) {
			dispatch(getUserFailure());
		}
	};
}

export function removeUser() {
	return async (dispatch) => {
		dispatch(getUser());
		try {
			await fetchApi({ endpoint: api.logout, method: 'get' });
			localStorage.removeItem('token');
			dispatch(getUserSuccess({}));
		} catch (error) {
			dispatch(getUserFailure());
		}
	};
}
