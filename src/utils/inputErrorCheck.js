export const loginInputCheck = (input) => {
	let message;
	if (!input.email) message = 'Please enter the required input.';
	else if (!input.email.includes('@')) message = 'Please insert valid email.';
	else if (!input.password) message = 'Please enter the required input.';
	else if (input.password.length < 8) message = 'Password cannot be less than 8 characters.';
	return message;
};

export const registerInputCheck = (input) => {
	let message = loginInputCheck(input);
	if (!message) {
		if (!input.confirm_password) message = 'Please enter the required input.';
		else if (input.password !== input.confirm_password) message = 'The passwords do not matched.';
	}
	return message;
};
