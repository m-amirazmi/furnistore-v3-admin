import AuthMessageError from './AuthMessageError';

export default function AuthForm({ input, handleInput, formInputs, submit, errorMessage }) {
	return (
		<div className="mt-4">
			{formInputs.map(({ name, label, type, placeholder, isRequired }) => (
				<div key={name} className="my-4">
					<label htmlFor={name} className="form-label mb-1 inline-block text-sm text-gray-700">
						{label}
						{isRequired && '*'}
					</label>
					<input
						type={type}
						className="form-control m-0 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out  focus:border-fuchsia-600 focus:bg-white focus:text-gray-700 focus:outline-none"
						id={name}
						placeholder={placeholder}
						value={input[name] || ''}
						onChange={handleInput}
					/>
				</div>
			))}

			<AuthMessageError message={errorMessage} />

			<button className="mt-2 w-full rounded-lg bg-fuchsia-600 py-2 text-white hover:bg-fuchsia-500" onClick={submit.handleSubmit}>
				{submit.name}
			</button>
		</div>
	);
}
