import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser, userSelector } from '../redux/features/userSlice';
import { api, fetchApi } from '../utils/api';

export default function Home() {
	const { user } = useSelector(userSelector);
	const dispatch = useDispatch();

	const handleLogout = async () => await dispatch(removeUser());

	return (
		<div>
			This is secured dashboard {user.email} {user.first_name}
			<button className="bg-blue-500" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
}
