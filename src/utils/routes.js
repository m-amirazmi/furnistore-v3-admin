import NotFound from '../pages/404';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const routes = [
	{
		path: '/',
		name: 'Dashboard',
		component: Home,
		isProtected: true,
		roles: ['Staff', 'Admin', 'Content', 'Product'],
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		isProtected: false,
		roles: [],
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		isProtected: false,
		roles: [],
	},
	{
		path: '*',
		name: '404',
		component: NotFound,
		isProtected: false,
		roles: [],
	},
];
