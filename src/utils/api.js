import axios from 'axios';

const API = process.env.REACT_APP_API;

export const fetchApi = async ({ endpoint, method, body, token, type }) => {
	try {
		const { data } = await axios({
			method,
			url: endpoint,
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': type === 'form' ? 'multipart/form-data' : 'application/json',
			},
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
	upload: API + '/upload',
	categories: API + '/categories',
};

export const auth = async ({ input, page }) => {
	const data = { ...input, roles: ['Staff'] };
	return await fetchApi({ endpoint: api[page], body: data, method: 'post' });
};

export const upload = async ({ input }) => {
	const formData = new FormData();
	formData.append('image', input);
	return await fetchApi({ endpoint: api.upload, body: formData, method: 'post', type: 'form' });
};

export const category = async ({ body }) => {
	return await fetchApi({ endpoint: api.categories, body, method: 'post' });
};
