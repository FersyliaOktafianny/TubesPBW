import { sqlPool, executeQuery, getDbConnection } from "../modules/sql.js";

const getAllUsers = async (request, response, next) => {
    const query = "SELECT * FROM users;";
    const queryArgs = [];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
    dbConn.release();
	request.queryAllUsers = result;
	next();
};

const getAllThread = async (request, response, next) => {
	const query = "SELECT threads.*, thread_categories.name AS category, users.*, thread_contents.like_count FROM threads INNER JOIN thread_contents ON threads.id=thread_contents.thread_id INNER JOIN users ON thread_contents.author_id=users.id INNER JOIN thread_categories ON thread_categories.id = threads.category_id ORDER BY like_count DESC;";
	const queryArgs = [];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	console.log();
	request.queryAllThread = result;
	next();
};

export {getAllUsers, getAllThread}