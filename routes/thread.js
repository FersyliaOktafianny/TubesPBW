import express from "express";
import { checkLogin, checkStatus } from "../middlewares/authentication.js";
import { addThread, getAllThreadCategory, getAllThisThreadContent } from "../middlewares/thread.js";
import { validateAddThread } from "../middlewares/inputvalidation.js";

const router = express.Router();

router.get("/", (request, response, next) => {
	response.redirect("/");
});
router.get("/:threadid", getAllThisThreadContent, getAllThreadCategory, (request, response, next) => {
	const dataToRender = {
		user_nickname: request.session.user_nickname,
		queryAllThisThreadContent: request.queryAllThisThreadContent,
		queryAllThreadCategory: request.queryAllThreadCategory,
	};
	response.render("thread", dataToRender);
});

router.post("/add", checkLogin, checkStatus, validateAddThread, addThread, (request, response, next) => {
	response.redirect("/");
});

router.post("/:threadid/addReply", (request, response, next) => {});

export { router };
