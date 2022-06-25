import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useDisplayItems({ type }) {
	const [items, setItems] = useState([]);
	const [bulk, setBulk] = useState([]);

	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		getItems();
	}, []);

	const getItems = async () => {
		const fetchItems = await type({ method: 'get' });
		return setItems(fetchItems);
	};

	const handleAddProduct = () => navigate(pathname + '/create');

	const handleBulk = (e) => {
		if (typeof e === 'string' && e === 'all') {
			if (bulk.length < items.length) setBulk(items);
			else setBulk([]);
		} else {
			const copyBulk = [...bulk];
			const category = items.find((c) => c._id === e._id);
			const findInBulk = copyBulk.find((b) => b._id === e._id);
			if (findInBulk) {
				setBulk(copyBulk.filter((b) => b._id !== e._id));
			} else {
				copyBulk.push(category);
				setBulk(copyBulk);
			}
		}
	};

	const handleRemove = async () => {
		for (const eachBulk of bulk) {
			await type({ method: 'delete', id: eachBulk._id });
			setBulk([]);
			getItems();
		}
	};

	return { bulk, items, handleAddProduct, handleBulk, handleRemove };
}
