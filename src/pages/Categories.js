import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Categories() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleAddProduct = () => {
		navigate(pathname + '/create');
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
