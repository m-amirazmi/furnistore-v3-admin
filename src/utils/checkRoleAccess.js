export const checkRoleAccess = (userRoles, pageRoles) => {
	return pageRoles.find((role) => {
		if (userRoles.includes(role)) return true;
		return false;
	});
};
