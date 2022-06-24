import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppTitle from '../components/AppTitle';
import { removeUser, userSelector } from '../redux/features/userSlice';
import { api, fetchApi } from '../utils/api';
import SideNav from '../components/Sidebar/SideNav';
import Sidebar from '../components/Sidebar/Sidebar';
import MainLayout from '../components/Layouts/MainLayout';

export default function Home() {
	const { user } = useSelector(userSelector);
	const dispatch = useDispatch();

	const handleLogout = async () => await dispatch(removeUser());

	return <div>this is content</div>;
}
