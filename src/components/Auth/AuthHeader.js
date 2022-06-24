import { useLocation, useNavigate } from 'react-router-dom';
import AppTitle from '../AppTitle';

export default function AuthHeader({ text }) {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<div>
			<div className="flex flex-col items-center justify-between md:flex-row">
				<AppTitle />
				<p className="mt-2 flex gap-1 text-sm md:mt-0">
					<span
						onClick={() => navigate('/login')}
						className={`${pathname === '/login' ? 'bg-fuchsia-400 text-fuchsia-700' : 'cursor-pointer text-gray-500'} 
              rounded-md bg-opacity-20 py-1 px-2 hover:bg-fuchsia-700 hover:bg-opacity-10 hover:text-fuchsia-600`}
					>
						Login
					</span>
					<span
						onClick={() => navigate('/register')}
						className={`${pathname === '/register' ? 'bg-fuchsia-400 text-fuchsia-700' : 'cursor-pointer text-gray-500'} 
              rounded-md bg-opacity-20 py-1 px-2 hover:bg-fuchsia-700 hover:bg-opacity-10 hover:text-fuchsia-600`}
					>
						Register
					</span>
				</p>
			</div>
			<p className="mt-3 text-center italic text-gray-500 md:text-left" dangerouslySetInnerHTML={{ __html: text ? text : 'Welcome back!' }}></p>
		</div>
	);
}
