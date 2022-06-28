import express from "express";
import { getAllThread, getAllThreadFirstContent, getAllThreadCategory } from "../middlewares/thread.js";

const router = express.Router();

//GET REQUEST
router.get("/", getAllThread, getAllThreadFirstContent, getAllThreadCategory, (request, response, next) => {
	const dataToRender = {
		pageTitle: "REBBIT | HOME",
		navigationType: "category",
		user_nickname: request.session.user_nickname,
		user_role: request.session.user_role,
		threads: request.queryAllThread,
		threadsFirstContent: request.queryAllThreadFirstContent,
		threadCategories: request.queryAllThreadCategory,
	};
	response.render("home", dataToRender);
});

export { router };
