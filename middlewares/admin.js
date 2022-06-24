import express from "express";
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

export {getAllUsers}