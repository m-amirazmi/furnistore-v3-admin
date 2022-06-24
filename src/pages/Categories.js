import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { category } from '../utils/api';

export default function Categories() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleAddProduct = () => navigate(pathname + '/create');

	useEffect(() => {
		getCategories();
	}, []);

	const getCategories = async () => {
		const fetchCategories = await category({ method: 'get' });
		console.log(fetchCategories);
		return fetchCategories;
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="self-end">
				<Button handleClick={handleAddProduct} name="Add Category" />
			</div>
			<div className="h-96 rounded-xl bg-white"></div>
		</div>
	);
}
