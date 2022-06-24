import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { fetchUser, userSelector } from '../redux/features/userSlice';
import { routes } from '../utils/routes';
import AuthLayout from './Layouts/AuthLayout';
import MainLayout from './Layouts/MainLayout';

export default function AppRoutes() {
	const dispatch = useDispatch();
	const { user, loading, userToken } = useSelector(userSelector);

	useEffect(() => {
		const token = userToken || localStorage.getItem('token');
		if (token) dispatch(fetchUser(token));
	}, [dispatch, userToken]);

	if (!routes || routes.length === 0 || loading) return null;
	return (
		<Routes>
			{routes.map(({ path, subpath, isProtected, component: Component }) => {
				const Element = isProtected && !user.status ? <Navigate to="/login" /> : <Component />;
				const Layout = !user.status ? AuthLayout : MainLayout;

				if (subpath) {
					return (
						<Route
							key={path}
							path={'/products'}
							element={
								<Layout>
									<Outlet />
								</Layout>
							}
						>
							{subpath.map((sp) => {
								const SpElement = sp.isProtected && !user.status ? <Navigate to="/login" /> : <sp.component />;
								const Layout = !user.status ? AuthLayout : MainLayout;
								return <Route key={sp.path} path={path + sp.path} element={SpElement} />;
							})}
						</Route>
					);
				} else {
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
				}
			})}
		</Routes>
	);
}
