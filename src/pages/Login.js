import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import AuthContainer from '../components/Auth/AuthContainer';
import AuthForm from '../components/Auth/AuthForm';
import AuthHeader from '../components/Auth/AuthHeader';
import AuthMessageSuccess from '../components/Auth/AuthMessageSuccess';
import AuthLayout from '../components/Layouts/AuthLayout';
import formAuth from '../data/formAuth.json';
import useAuthInput from '../hooks/useAuthInput';
import { loginInputCheck } from '../utils/inputErrorCheck';

export default function Login() {
	const { search } = useLocation();
	const { handleInput, handleSubmit, setSuccessMessage, successMessage, input, errorMessage } = useAuthInput({ errorCheck: loginInputCheck, redirect: { pathname: '/' } });

	useEffect(() => {
		if (search.split('?from=')[1] === 'register') setSuccessMessage('Successfully registered! Please login to continue.');
	}, [search]);

	const authFormProps = {
		input,
		errorMessage,
		handleInput,
		formInputs: formAuth.loginForm,
		submit: { name: 'LOGIN', handleSubmit },
	};

	return (
		<AuthLayout>
			<AuthContainer>
				<AuthMessageSuccess message={successMessage} />
				<AuthHeader />
				<AuthForm {...authFormProps} />
			</AuthContainer>
		</AuthLayout>
	);
}
