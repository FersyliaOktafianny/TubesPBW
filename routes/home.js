import express from "express";
import { getAllThread, getAllThreadCategory } from "../middlewares/thread.js";

const router = express.Router();

router.get("/", getAllThread, getAllThreadCategory, (request, response, next) => {
	const dataToRender = {
		nickname: request.session.user_nickname,
		queryAllThread: request.queryAllThread,
		queryAllThreadCategory: request.queryAllThreadCategory,
	};
	response.render("home", dataToRender);
});

export { router };
