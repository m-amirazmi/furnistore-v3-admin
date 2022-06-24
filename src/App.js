import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout';
import AuthLayout from './components/Layouts/AuthLayout';
import { fetchUser, userSelector } from './redux/features/userSlice';
import { routes } from './utils/routes';

export default function App() {
	const dispatch = useDispatch();
	const { user, loading, userToken } = useSelector(userSelector);

	useEffect(() => {
		const token = userToken || localStorage.getItem('token');
		if (token) dispatch(fetchUser(token));
	}, [dispatch, userToken]);

	if (loading) return null;
	return (
		<BrowserRouter>
			<Routes>
				{routes.map(({ path, isProtected, component: Component }) => {
					const Element = isProtected && !user.status ? <Navigate to="/login" /> : <Component />;
					const Layout = !user.status ? AuthLayout : MainLayout;

					return (
						<Route
							key={path}
							path="/"
							element={
								<Layout>
									<Outlet />
								</Layout>
							}
						>
							<Route key={path} path={path} element={Element} />
						</Route>
					);
				})}
			</Routes>
		</BrowserRouter>
	);
}
