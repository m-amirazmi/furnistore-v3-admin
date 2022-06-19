import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUser, setUserToken, userSelector } from '../redux/features/userSlice';
import { auth } from '../utils/api';

export default function useAuthInput({ errorCheck, redirect }) {
	const [input, setInput] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const { user } = useSelector(userSelector);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const page = pathname.split('/')[1];

	useEffect(() => {
		if (user.status) navigate('/');
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const error = errorCheck(input);
		if (error) return setErrorMessage(error);

		const res = await auth({ input, page });
		if (res.error) return setErrorMessage(res.message);

		if (page === 'login') {
			localStorage.setItem('token', res.accessToken);
			await dispatch(fetchUser(res.accessToken));
			await dispatch(setUserToken(res.accessToken));
		}

		navigate(redirect);
	};
	const handleInput = ({ target }) => {
		setErrorMessage('');
		setSuccessMessage('');
		setInput({ ...input, [target.id]: target.value });
	};

	return { input, errorMessage, successMessage, handleInput, handleSubmit, setSuccessMessage };
}
