import express from "express";
import { getAllThread } from "../middlewares/thread.js";

const router = express.Router();

router.get("/", getAllThread, (request, response, next) => {
	const dataToRender = {
		nickname: request.session.user_nickname,
		queryResult: request.queryResult,
	};
	response.render("home", dataToRender);
});

export { router };
