import express from "express";

import { getAllThisCategoryThread, getAllThreadFirstContent, getAllThreadCategory } from "../middlewares/thread.js";

const router = express.Router();

//GET REQUEST
router.get("/:categoryid", getAllThisCategoryThread, getAllThreadFirstContent, getAllThreadCategory, (request, response, next) => {
	const dataToRender = {
		pageTitle: "REBBIT | CATEGORY",
		navigationType: "category",
		user_nickname: request.session.user_nickname,
		threads: request.queryAllThisCategoryThread,
        threadsFirstContent: request.queryAllThreadFirstContent,
		threadCategories: request.queryAllThreadCategory,
	};
	response.render("home", dataToRender);
});

export { router };
