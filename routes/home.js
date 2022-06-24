import express from "express";
import { getAllThread, getAllThreadFirstContent, getAllThreadCategory } from "../middlewares/thread.js";
import { getAllUsers } from "../middlewares/admin.js";

const router = express.Router();

router.get("/", getAllThread, getAllThreadFirstContent, getAllThreadCategory, (request, response, next) => {
	const dataToRender = {
		user_nickname: request.session.user_nickname,
		queryAllThread: request.queryAllThread,
		queryAllThreadFirstContent: request.queryAllThreadFirstContent,
		queryAllThreadCategory: request.queryAllThreadCategory,
	};
	response.render("home", dataToRender);
});

router.get("/homeadmin", getAllUsers, (request, response, next) => {
	const dataToRender = {
		user_nickname: request.session.user_nickname,
		userData : request.queryAllUsers,
		queryAllThread: request.queryAllThread,
		queryAllThreadFirstContent: request.queryAllThreadFirstContent,
	};
	response.render("home_admin", dataToRender);
});

export { router };
