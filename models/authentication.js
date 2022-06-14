const authenticateUser = (request, response, next) => {
	if (request.session.loggedIn === "user" || request.session.loggedIn === "admin") {
		next();
	} else {
		response.redirect("/login");
	}
};

const authenticateAdmin = (request, response, next) => {
	if (request.session.loggedIn === "admin") {
		next();
	} else {
		response.redirect("back");
	}
};

export { authenticateUser, authenticateAdmin };