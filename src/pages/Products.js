import Button from '../components/Button';
import ItemsTable from '../components/ItemsTable';
import useDisplayItems from '../hooks/useDisplayItems';
import { products } from '../utils/api';
import formInputs from '../data/formInputs.json';
const { product } = formInputs;

export default function Products() {
	const { bulk, items, handleAddProduct, handleBulk, handleRemove } = useDisplayItems({ type: products });

	return (
		<div className="flex flex-col gap-4">
			<div className="flex w-full">
				{bulk.length > 0 && (
					<div>
						<button onClick={handleRemove} className="mt-2 py-2 px-4 text-sm text-fuchsia-500">
							Remove
						</button>
					</div>
				)}
				<div className="ml-auto">
					<Button handleClick={handleAddProduct} name="Add Product" />
				</div>
			</div>
			<div className="rounded-xl bg-white">
				<div className="relative overflow-x-auto sm:rounded-lg">
					{items.length === 0 ? <div className="p-8 text-center">No Data Found...</div> : <ItemsTable bulk={bulk} handleBulk={handleBulk} items={items} inputs={product} />}
				</div>
			</div>
		</div>
	);
}
