import { sqlPool, getDbConnection, executeQuery } from "../modules/sql.js";

const getAllThread = async (request, response, next) => {
	const query = "SELECT * FROM threads";
	const queryArgs = [];
	const dbConn = await getDbConnection(sqlPool);
	const result = await executeQuery(dbConn, query, queryArgs);
    dbConn.release();
	request.queryResult = result;
	next();
};

export { getAllThread };