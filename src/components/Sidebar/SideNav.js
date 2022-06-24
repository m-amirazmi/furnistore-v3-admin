import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import navigation from '../../data/navigation.json';
import { userSelector } from '../../redux/features/userSlice';

export default function SideNav() {
	const [expand, setExpand] = useState();
	const { pathname } = useLocation();

	const { user } = useSelector(userSelector);

	const handleExpand = (nav) => {
		if (expand && expand.path === nav.path) setExpand(null);
		else setExpand(nav);
	};

	if (!navigation || !user || !user.roles) return null;
	return navigation.map((nav, i) => {
		const current = 'bg-gradient-to-br from-fuchsia-600 to-fuchsia-400 text-gray-50 shadow';

		const hasRoleAccess = nav.roles.find((role) => {
			if (user.roles.includes(role)) return true;
			return false;
		});

		if (!hasRoleAccess) return;

		return (
			<div key={i} className="my-2">
				<Link to={!nav.subpath ? nav.path : nav.path + nav.subpath[0].path}>
					<div
						className={`cursor-pointer rounded-lg p-4 text-gray-500 hover:shadow ${nav.path === pathname && current} ${nav.path === expand?.path && expand.subpath && 'shadow'}`}
						onClick={() => handleExpand(nav)}
					>
						<p className="flex items-center justify-between">
							<span>{nav.page}</span>
							{nav.subpath && <span>+</span>}
						</p>
					</div>
					{nav.subpath && expand && expand.subpath && nav.path === expand.path && (
						<ul className="mt-2 w-full pl-4 text-gray-500">
							{nav.subpath.map((sub) => (
								<Link key={sub.page} to={nav.path + sub.path}>
									<li className={`w-full cursor-pointer rounded-lg py-2 px-4 text-sm hover:shadow ${nav.path + sub.path === pathname && current}`}>{sub.page}</li>
								</Link>
							))}
						</ul>
					)}
				</Link>
			</div>
		);
	});
}
