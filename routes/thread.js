import express from "express";
import { checkLogin, checkStatus } from "../middlewares/authentication.js";
import { addThread, addReply, addLike, getAllThreadCategory, getAllThisThreadContent } from "../middlewares/thread.js";
import { validateAddThread, validateAddReply } from "../middlewares/inputvalidation.js";

const router = express.Router();

router.get("/", (request, response, next) => {
	response.redirect("/");
});
router.get("/:threadid", getAllThisThreadContent, getAllThreadCategory, (request, response, next) => {
	const dataToRender = {
		user_nickname: request.session.user_nickname,
		threadid: request.params.threadid,
		threadtitle: request.threadtitle,
		queryAllThisThreadContent: request.queryAllThisThreadContent,
		queryAllThreadCategory: request.queryAllThreadCategory,
	};
	response.render("thread", dataToRender);
});

router.post("/add", checkLogin, checkStatus, validateAddThread, addThread, (request, response, next) => {
	response.redirect("/");
});

router.post("/:threadid/addReply", checkLogin, checkStatus, validateAddReply, addReply, (request, response, next) => {
	response.redirect("back");
});

router.post("/:threadid/:threadcontentid/addLike", checkLogin, checkStatus, addLike, (request, response, next) => {
	response.redirect("back");
});

export { router };
