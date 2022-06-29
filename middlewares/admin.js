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
	const query = "SELECT * FROM threads ORDER BY created_date DESC;";
	const queryArgs = [];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	console.log();
	request.queryAllThread = result;
	next();
};

// const getAllThread = async (request, response, next) => {
// 	const threadid = request.params.threadid;
// 	const query1 = "SELECT title FROM threads WHERE id=?;";
// 	const queryArgs1 = [threadid];
// 	const query2 = "SELECT * FROM threads INNER JOIN thread_contents ON threads.id=thread_contents.thread_id INNER JOIN users ON thread_contents.author_id=users.id WHERE thread_id=? ORDER BY thread_contents.like_count ASC";
// 	const queryArgs2 = [threadid];
// 	const dbConn = await getDbConnection(sqlPool);
// 	const result1 = await executeQuery(dbConn, query1, queryArgs1);
// 	const result2 = await executeQuery(dbConn, query2, queryArgs2);
// 	dbConn.release();
// 	console.log(result1);
// 	console.log('==');
// 	console.log(result2);
// 	request.threadtitle = result1[0].title;
// 	request.queryAllThisThreadContent = result2;
// 	next();
// };

export {getAllUsers, getAllThread}