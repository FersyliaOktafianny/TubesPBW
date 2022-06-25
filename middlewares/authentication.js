import { sqlPool, getDbConnection, executeQuery } from "../modules/sql.js";

const login = async (request, response, next) => {
	const email = request.body.email;
	const password = request.body.password;
	const query = "SELECT * FROM users WHERE email=? AND password=?;";
	const queryArgs = [email, password];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	request.login_data = result[0];
	next();
};

const admin_login = async (request, response, next) => {
	const email = request.body.email;
	const password = request.body.password;
	const query = "SELECT * FROM users WHERE email=? AND password=?; AND role='admin'";
	const queryArgs = [email, password];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	request.login_data = result[0];
	next();
};

const checkStatus = (request, response, next) => {
	if (request.session.user_status == "normal") {
		next();
	} else {
		response.redirect("/authentication/logout");
	}
};

const checkLogin = (request, response, next) => {
	if (request.session.user_role) {
		next();
	} else {
		response.redirect("/authentication/login");
	}
};

const checkAdmin = (request, response, next) => {
	if (request.session.user_role == "admin") {
		next();
	} else {
		response.redirect("back");
	}
};

export { login, admin_login, checkLogin, checkStatus, checkAdmin };
