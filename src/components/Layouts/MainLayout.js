import { useDispatch, useSelector } from 'react-redux';
import { removeUser, userSelector } from '../../redux/features/userSlice';
import Sidebar from '../Sidebar/Sidebar';

export default function MainLayout({ children }) {
	const { user } = useSelector(userSelector);
	const dispatch = useDispatch();

	const handleLogout = async () => await dispatch(removeUser());

	return (
		<div className="flex">
			<Sidebar />
			<div className="w-10/12 bg-gray-100">
				<div className="p-8">
					<div className="flex justify-end gap-4">
						<div>Welcome</div>
						<div className="cursor-pointer" onClick={handleLogout}>
							Logout
						</div>
					</div>
					<div className="mt-8">{children}</div>
				</div>
			</div>
		</div>
	);
}
