import Button from '../components/Button';
import CreateForm from '../components/Form/CreateForm';
import useCreateInput from '../hooks/useCreateInput';
import { category } from '../utils/api';
import formInputs from '../data/formInputs.json';
const { category: categoryInputs } = formInputs;

export default function CategoriesCreate() {
	const inputForm = { name: '', description: '', images: [] };
	const { input, loading, showInputs, handleInput, handleAddInput, handleShow, handleSubmit } = useCreateInput({ inputForm, redirect: '/products/categories', save: category });

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
						<CreateForm type="Category" key={key} input={i} inputs={categoryInputs} id={key} handleInput={handleInput} handleShow={handleShow} show={showInputs[key]} />
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
