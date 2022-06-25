import NotFound from '../pages/404';
import Categories from '../pages/Categories';
import CategoriesCreate from '../pages/CategoriesCreate';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Products from '../pages/Products';
import ProductsCreate from '../pages/ProductsCreate';
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
		path: '/products',
		name: 'Products',
		component: Products,
		isProtected: true,
		roles: ['Product'],
		subpath: [
			{ path: '', name: 'Products', component: Products, isProtected: true, roles: ['Product'] },
			{ path: '/create', name: 'Create Product', component: ProductsCreate, isProtected: true, roles: ['Product'] },
			{ path: '/categories', name: 'Categories', component: Categories, isProtected: true, roles: ['Product'] },
			{ path: '/categories/create', name: 'Create Category', component: CategoriesCreate, isProtected: true, roles: ['Product'] },
		],
	},
	{
		path: '*',
		name: '404',
		component: NotFound,
		isProtected: false,
		roles: [],
	},
];
