import formInputs from '../../data/formInputs.json';
const { category: categoryInputs } = formInputs;

export default function CategoryForm({ input, handleInput, handleShow, show, id }) {
	return (
		<div className="py-4">
			<h3 className="text-lg">
				<span>Category #{+id + 1}</span>
				{!show ? (
					<span onClick={() => handleShow(id)} className="ml-2 cursor-pointer text-sm text-gray-400 underline">
						Hide
					</span>
				) : (
					<span onClick={() => handleShow(id)} className="ml-2 cursor-pointer text-sm text-fuchsia-500 underline">
						Show
					</span>
				)}
			</h3>
			{!show && (
				<div className="flex">
					<div className="w-3/5">
						{categoryInputs.map((categoryInput, i) => {
							const inputStyle =
								'form-control m-0 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out  focus:border-fuchsia-600 focus:bg-white focus:text-gray-700 focus:outline-none';
							return (
								<div key={categoryInput.name} className="my-4">
									<label htmlFor={categoryInput.name} className="form-label mb-1 inline-block text-sm text-gray-700">
										{categoryInput.label}
										{categoryInput.isRequired && '*'}
									</label>
									{categoryInput.type === 'textarea' ? (
										<textarea
											id={categoryInput.name}
											className={`${inputStyle} h-40`}
											placeholder={categoryInput.placeholder}
											value={input[i]?.[categoryInput.name]}
											onChange={(e) => handleInput(e, id)}
										></textarea>
									) : (
										<input
											type={categoryInput.type}
											className={inputStyle}
											id={categoryInput.name}
											placeholder={categoryInput.placeholder}
											value={input[i]?.[categoryInput?.name]}
											multiple={categoryInput.multiple}
											accept={categoryInput.accept}
											onChange={(e) => handleInput(e, id)}
										/>
									)}
								</div>
							);
						})}
					</div>
					<div className="w-2/5">
						<div></div>
					</div>
				</div>
			)}
		</div>
	);
}
