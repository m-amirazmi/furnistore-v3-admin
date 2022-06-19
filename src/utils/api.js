import axios from 'axios';

const API = process.env.REACT_APP_API;

export const fetchApi = async ({ endpoint, method, body, token }) => {
	try {
		const { data } = await axios({
			method,
			url: endpoint,
			headers: { Authorization: 'Bearer ' + token },
			data: body,
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.log(error);
		return { error: true, message: error.response.data.message };
	}
};

export const api = {
	register: API + '/auth/signup',
	login: API + '/auth/signin',
	logout: API + '/auth/signout',
	getUser: API + '/users',
};

export const auth = async ({ input, page }) => {
	const data = { ...input, roles: ['Staff'] };
	return await fetchApi({ endpoint: api[page], body: data, method: 'post' });
};
