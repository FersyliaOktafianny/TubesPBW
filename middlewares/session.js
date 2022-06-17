const addUserToSession = (request, response, next) => {
	request.session.user_id = request.login_data.id;
	request.session.user_role = request.login_data.role;
	request.session.user_status = request.login_data.status;
	request.session.user_email = request.login_data.email;
	request.session.user_name = request.login_data.name;
	request.session.user_nickname = request.login_data.nickname;
	next();
};

const removeUserFromSession = (request, response, next) => {
	request.session.destroy();
	next();
};

export { addUserToSession, removeUserFromSession };
