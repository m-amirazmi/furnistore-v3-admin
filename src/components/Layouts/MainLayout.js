import Sidebar from '../Sidebar/Sidebar';

export default function MainLayout({ children }) {
	return (
		<div className="flex">
			<Sidebar />
			<div className="w-10/12 bg-gray-100">{children}</div>
		</div>
	);
}
