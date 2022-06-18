import { sqlPool, getDbConnection, executeQuery } from "../modules/sql.js";

const getAllThread = async (request, response, next) => {
	const query = "SELECT * FROM threads ORDER BY created_date DESC;";
	const queryArgs = [];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	request.queryAllThread = result;
	next();
};

const getAllThreadCategory = async (request, response, next) => {
	const query = "SELECT * FROM thread_categories;";
	const queryArgs = [];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	request.queryAllThreadCategory = result;
	next();
};

const getAllThreadContent = async (rquest, response, next) => {
	const query = "SELECT * FROM thread_contents;";
	const queryArgs = [];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	request.queryAllThreadContent = result;
	next();
};

const getAllThreadFirstContent = async (request, response, next) => {
	const query = "SELECT * FROM thread_contents GROUP BY thread_id ORDER BY created_date ASC;";
	const queryArgs = [];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	request.queryAllThreadFirstContent = result;
	next();
};

const getAllThisThreadContent = async (rquest, response, next) => {
	const threadid = request.params.threadid;
	const query = "SELECT * FROM thread_contents WHERE thread_id=? ORDER BY created_date ASC;";
	const queryArgs = [];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	request.queryAllThisThreadContent = result;
	next();
};

const addThread = async (request, response, next) => {
	const threadtitle = request.body.threadtitle;
	const threadcategory = request.body.threadcategory;
	const threadcontent = request.body.threadcontent;
	const threadauthor = request.session.user_id;
	const query1 = "INSERT INTO threads(title, created_date, lock_by, author_id, category_id) VALUES (?, now(), null, ?, ?);";
	const queryArgs1 = [threadtitle, threadauthor, threadcategory];
	const query2 = "INSERT INTO thread_contents(thread_content, like_count, created_date, thread_id, author_id) VALUES (?, 0, now(), (select id from threads where author_id=? order by created_date desc limit 1), ?);";
	const queryArgs2 = [threadcontent, threadauthor, threadauthor];
	const dbConn = await getDbConnection(sqlPool);
	const result1 = await executeQuery(dbConn, query1, queryArgs1);
	const result2 = await executeQuery(dbConn, query2, queryArgs2);
	dbConn.release();
	next();
};

const addReply = async (request, response, next) => {};

export { getAllThread, getAllThreadContent, getAllThreadFirstContent, getAllThisThreadContent, getAllThreadCategory, addThread };
