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

const getAllThisThreadContent = async (request, response, next) => {
	const threadid = request.params.threadid;
	const query1 = "SELECT title FROM threads WHERE id=?;";
	const queryArgs1 = [threadid];
	const query2 = "SELECT thread_contents.*, users.nickname FROM thread_contents LEFT JOIN users ON thread_contents.author_id=users.id WHERE thread_id=? ORDER BY created_date ASC";
	const queryArgs2 = [threadid];
	const dbConn = await getDbConnection(sqlPool);
	const result1 = await executeQuery(dbConn, query1, queryArgs1);
	const result2 = await executeQuery(dbConn, query2, queryArgs2);
	dbConn.release();
	request.threadtitle = result1[0].title;
	request.queryAllThisThreadContent = result2;
	next();
};

const getAllThisCategoryThread = async (request, response, next) => {
	const categoryid = request.params.categoryid;
	const query = "SELECT * FROM threads WHERE category_id=? ORDER BY created_date DESC;";
	const queryArgs = [categoryid];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	request.queryAllThisCategoryThread = result;
	next();
};

const getAllMyThread = async (request, response, next) => {
	const authorid = request.session.user_id;
	const query = "SELECT * FROM threads WHERE author_id=? ORDER BY created_date DESC;";
	const queryArgs = [authorid];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	request.queryAllMyThread = result;
	next();
};

const getAllMyReply = async (request, response, next) => {
	const authorid = request.session.user_id;
	const query = "SELECT thread_contents.*, threads.title FROM thread_contents LEFT JOIN threads ON threads.id=thread_contents.thread_id WHERE thread_contents.author_id=? ORDER BY created_date DESC;";
	const queryArgs = [authorid];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	request.queryAllMyReply = result;
	next();
};

const getAllMyThreadFirstContent = async (request, response, next) => {
	const authorid = request.session.user_id;
	const query = "SELECT * FROM thread_contents WHERE author_id=? GROUP BY thread_id ORDER BY created_date ASC;";
	const queryArgs = [authorid];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	request.queryAllMyThreadFirstContent = result;
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

const addReply = async (request, response, next) => {
	const threadid = request.params.threadid;
	const replycontent = request.body.replycontent;
	const replyauthor = request.session.user_id;
	const query = "INSERT INTO thread_contents(thread_content, like_count, created_date, thread_id, author_id) VALUES(?, 0, now(), ?, ?);";
	const queryArgs = [replycontent, threadid, replyauthor];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	next();
};

const addLike = async (request, response, next) => {
	const threadcontentid = request.params.threadcontentid;
	const query = "UPDATE thread_contents SET like_count=like_count+1 WHERE id=?;";
	const queryArgs = [threadcontentid];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	dbConn.release();
	next();
};

const lockThread = async (request, response, next) => {
	const threadid = request.params.threadid;
	const query = "SELECT lock_by FROM threads WHERE id=?;";
	const queryArgs = [threadid];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
	if(result[0].lock_by){
		const query = "UPDATE threads SET lock_by=NULL WHERE id=?;";
		const queryArgs = [threadid];
		const result2 = await executeQuery(dbConn, query, queryArgs);
	}else{
		const modid = request.session.user_id;
		const query = "UPDATE threads SET lock_by=? WHERE id=?;";
		const queryArgs = [modid, threadid];
		const result2 = await executeQuery(dbConn, query, queryArgs);
	}
	dbConn.release();
	next();
};

const checkThread = async (request, response, next) => {
	if(request.params.threadid){
		const threadid = request.params.threadid;
		const query = "SELECT lock_by FROM threads WHERE id=?;";
		const queryArgs = [threadid];
		const dbConn = await getDbConnection(sqlPool);
		const result = await executeQuery(dbConn, query, queryArgs);
		dbConn.release();
		if(result[0].lock_by){
			response.redirect("back");
			return;
		}else{
			next();
			return;
		}
	}
	if(request.params.threadcontentid){
		const threadcontentid = request.params.threadcontentid;
		const query = "SELECT thread_id FROM thread_contents WHERE id=?;";
		const queryArgs = [threadcontentid];
		const dbConn = await getDbConnection(sqlPool);
		const result = await executeQuery(dbConn, query, queryArgs);
		const threadid = result[0].thread_id;
		const query2 = "SELECT lock_by FROM threads WHERE id=?;";
		const queryArgs2 = [threadid];
		const result2 = await executeQuery(dbConn, query, queryArgs);
		if(result2[0].lock_by){
			response.redirect("back");
			return;
		}else{
			next();
			return;
		}
		dbConn.release();
		next();
	}
	
};

export { getAllThread, getAllThreadContent, getAllThreadFirstContent, getAllThisThreadContent, getAllThreadCategory, getAllThisCategoryThread, getAllMyThread, getAllMyReply, getAllMyThreadFirstContent, addThread, addReply, addLike, lockThread, checkThread };
