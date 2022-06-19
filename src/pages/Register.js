import AuthContainer from '../components/Auth/AuthContainer';
import AuthForm from '../components/Auth/AuthForm';
import AuthHeader from '../components/Auth/AuthHeader';
import AuthLayout from '../components/Layouts/AuthLayout';
import useAuthInput from '../hooks/useAuthInput';
import formAuth from '../data/formAuth.json';
import { registerInputCheck } from '../utils/inputErrorCheck';
import { createSearchParams } from 'react-router-dom';

export default function Register() {
	const redirect = {
		pathname: '/login',
		search: `?${createSearchParams({
			from: 'register',
		})}`,
	};

	const { handleInput, handleSubmit, input, errorMessage } = useAuthInput({ errorCheck: registerInputCheck, redirect });

	const authFormProps = {
		input,
		errorMessage,
		handleInput,
		formInputs: formAuth.registerForm,
		submit: { name: 'REGISTER', handleSubmit },
	};

	return (
		<AuthLayout>
			<AuthContainer>
				<AuthHeader text="Let's get you register right away!" />
				<AuthForm {...authFormProps} />
			</AuthContainer>
		</AuthLayout>
	);
}
