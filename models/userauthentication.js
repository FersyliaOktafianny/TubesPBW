authenticateUser = (request, response, next) => {
	if (request.session.loggedIn === "user" || request.session.loggedIn === "admin") {
		next();
	} else {
		response.redirect("/login");
	}
};

authenticateAdmin = (request, response, next) => {
	if (request.session.loggedIn === "admin") {
		next();
	} else {
		response.redirect("/admin/login");
	}
};

export { authenticateUser, authenticateAdmin };
