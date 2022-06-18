import express from "express";
import { getAllThread, getAllThreadFirstContent, getAllThreadCategory } from "../middlewares/thread.js";

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

export { router };
