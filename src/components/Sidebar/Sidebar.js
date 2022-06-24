import AppTitle from '../AppTitle';
import SideNav from './SideNav';

export default function Sidebar() {
	return (
		<div className="h-screen w-2/12">
			<div className="h-full w-full p-8">
				<AppTitle />
				<div className="mt-8">
					<SideNav />
				</div>
			</div>
		</div>
	);
}
