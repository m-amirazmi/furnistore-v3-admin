import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import CategoryForm from '../components/Categories/CategoryForm';
import { category, upload } from '../utils/api';

export default function CategoriesCreate() {
	const [input, setInput] = useState([{ name: '', description: '', images: [] }]);
	const [showInputs, setShowInputs] = useState([]);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleInput = ({ currentTarget }, key) => {
		const copyInputs = [...input];
		if (currentTarget.id === 'images') copyInputs[key][currentTarget.id] = currentTarget.files;
		else copyInputs[key][currentTarget.id] = currentTarget.value;
		setInput(copyInputs);
	};

	const handleAddInput = () => {
		const copyInputs = [...input];
		copyInputs.push({ name: '', description: '', images: [] });
		setInput(copyInputs);
	};

	const handleShow = (id) => {
		const copyShowInputs = [...showInputs];
		copyShowInputs[id] = !copyShowInputs[id];
		setShowInputs(copyShowInputs);
	};

	const handleSubmit = async () => {
		setLoading(true);
		for (const [i, eachInput] of input.entries()) {
			const images = [];
			for (const image of eachInput.images) {
				const res = await upload({ input: image });
				images.push(res);
			}

			eachInput.images = images;
			const res = await category({ body: eachInput });
			console.log(res);
		}
		navigate('/products/categories');
		setInput([{ name: '', description: '', images: [] }]);
		setLoading(false);
	};

	return (
		<div>
			<div>
				<h1 className="text-xl">
					Create A New <span className="text-fuchsia-500">Category</span>
				</h1>
			</div>
			<div className="mt-8 rounded-xl bg-white py-4 px-8">
				{input.map((i, key) => (
					<div key={key} className={key + 1 !== input.length && 'border-b'}>
						<CategoryForm key={key} input={i} handleInput={handleInput} id={key} handleShow={handleShow} show={showInputs[key]} />
						{key + 1 === input.length && (
							<div className="mb-4 flex w-3/12 gap-4">
								<Button name={loading ? 'Loading...' : 'Submit Category'} handleClick={handleSubmit} />
								<button className="mt-2 w-full rounded-lg py-2 text-fuchsia-600 hover:text-fuchsia-400" onClick={handleAddInput}>
									+ Add A Category
								</button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
