import { sqlPool, getDbConnection, executeQuery } from "./sql.js";

const login = async (request, response, next) => {
	const email = request.body.email;
	const password = request.body.password;
	const query = "SELECT * FROM users WHERE email=? AND password=?;";
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, [email, password]);
	if (result.length > 0) {
		next();
	} else {
		response.redirect("back");
	}
};

export { login };
