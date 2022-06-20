import express from "express";
import { sqlPool, executeQuery, getDbConnection } from "../modules/sql.js";
import { getAllThreadCategory } from "./thread.js";

const router = express.Router();

const validateAddThread = (request, response, next) => {
	const threadtitle = request.body.threadtitle;
	const threadcategory = request.body.threadcategory;
	const threadcontent = request.body.threadcontent;
	const threadauthor = request.session.user_id;
	if (!threadtitle || !threadcategory || !threadcontent) {
		response.redirect("/");
		return;
	}
	next();
};

const validateLogIn = async (request, response, next) => {
	const email = request.body.email;
	const password = request.body.password;
	const query = "SELECT * FROM users WHERE email=?;";
	const queryArgs = [email, password];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);

	if (result[0].password != password) {
		response.render("login", {isNotAuth:'wrong password'})
		return; 
	} else{
		request.login_data = result[0]
		next();
	}
}

export { validateAddThread, validateLogIn};
