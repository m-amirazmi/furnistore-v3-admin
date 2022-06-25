import Button from '../components/Button';
import useCreateInput from '../hooks/useCreateInput';
import { category, products } from '../utils/api';
import formInputs from '../data/formInputs.json';
import CreateForm from '../components/Form/CreateForm';
import { useEffect, useState } from 'react';

export default function ProductsCreate() {
	const [productInputs, setProductInputs] = useState([]);

	useEffect(() => {
		setInitialFormInputs();
	}, []);

	const setInitialFormInputs = async () => {
		const { product } = formInputs;

		const inputs = [];
		for (const [i, item] of product.entries()) {
			if (item.type !== 'select') inputs.push(item);
			else {
				const categories = await category({ method: 'get' });
				const inputItem = { ...item };
				inputItem.options = categories;
				inputs.push(inputItem);
			}
		}

		setProductInputs(inputs);
	};

	const inputForm = {
		name: '',
		description: '',
		images: [],
		sku: '',
		price: 0,
		discounted_price: 0,
		quantity: 0,
		is_enabled: true,
		is_featured: false,
		category: '',
		vendor: '',
	};

	const { input, loading, showInputs, handleInput, handleAddInput, handleShow, handleSubmit } = useCreateInput({ inputForm, redirect: '/products', save: products });

	console.log(input);

	return (
		<div>
			<div>
				<h1 className="text-xl">
					Create A New <span className="text-fuchsia-500">Product</span>
				</h1>
			</div>
			<div className="mt-8 rounded-xl bg-white py-4 px-8">
				{input.map((i, key) => (
					<div key={key} className={key + 1 !== input.length && 'border-b'}>
						<CreateForm type="Products" key={key} input={i} inputs={productInputs} id={key} handleInput={handleInput} handleShow={handleShow} show={showInputs[key]} />

						{key + 1 === input.length && (
							<div className="mb-4 flex w-3/12 gap-4">
								<Button name={loading ? 'Loading...' : 'Submit Product'} handleClick={handleSubmit} />
								<button className="mt-2 w-full rounded-lg py-2 text-fuchsia-600 hover:text-fuchsia-400" onClick={handleAddInput}>
									+ Add A Product
								</button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
