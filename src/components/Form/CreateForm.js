export default function CreateForm({ type, id, show, handleShow, handleInput, input, inputs }) {
	const renderInputType = (inputItem, i) => {
		const inputStyle =
			'form-control m-0 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out  focus:border-fuchsia-600 focus:bg-white focus:text-gray-700 focus:outline-none';

		if (inputItem.type === 'textarea') {
			return <textarea id={inputItem.name} className={`${inputStyle} h-40`} placeholder={inputItem.placeholder} value={input[inputItem.name]} onChange={(e) => handleInput(e, id)}></textarea>;
		} else if (inputItem.type === 'select') {
			return (
				<select id={inputItem.name} className={inputStyle} onChange={(e) => handleInput(e, id)} value={input[inputItem.name] || ''}>
					<option value="" disabled>
						Choose a {inputItem.name}
					</option>
					{inputItem.options.map((opt) => (
						<option value={opt._id}>{opt.name}</option>
					))}
				</select>
			);
		} else if (inputItem.type === 'checkbox') {
			return <input className="ml-2" checked={input[inputItem.name]} type={inputItem.type} id={inputItem.name} placeholder={inputItem.placeholder} onChange={(e) => handleInput(e, id)} />;
		} else if (inputItem.type === 'file') {
			return (
				<input
					type={inputItem.type}
					className={inputStyle}
					id={inputItem.name}
					placeholder={inputItem.placeholder}
					multiple={inputItem.multiple}
					accept={inputItem.accept}
					onChange={(e) => handleInput(e, id)}
				/>
			);
		} else {
			return <input type={inputItem.type} className={inputStyle} id={inputItem.name} placeholder={inputItem.placeholder} value={input[inputItem?.name]} onChange={(e) => handleInput(e, id)} />;
		}
	};

	return (
		<div className="py-4">
			<h3 className="text-lg">
				<span className="capitalize">
					{type} #{+id + 1}
				</span>
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
						{inputs.map((inputItem, i) => {
							return (
								<div key={inputItem.name} className="my-4">
									<label htmlFor={inputItem.name} className="form-label mb-1 inline-block text-sm text-gray-700">
										{inputItem.label}
										{inputItem.isRequired && '*'}
									</label>
									{renderInputType(inputItem, i)}
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
