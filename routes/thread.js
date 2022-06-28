import express from "express";
import { checkLogin, checkStatus } from "../middlewares/authentication.js";
import { addThread, addReply, addLike, getAllThreadCategory, getAllThisThreadContent, lockThread, checkThread } from "../middlewares/thread.js";
import { validateAddThread, validateAddReply } from "../middlewares/inputvalidation.js";

const router = express.Router();

//GET REQUEST
router.get("/", (request, response, next) => {
	response.redirect("/");
});

router.get("/:threadid", getAllThisThreadContent, getAllThreadCategory, (request, response, next) => {
	const dataToRender = {
		pageTitle: "REBBIT | THREAD",
		navigationType: "category",
		user_nickname: request.session.user_nickname,
		threadid: request.params.threadid,
		threadtitle: request.threadtitle,
		replies: request.queryAllThisThreadContent,
		threadCategories: request.queryAllThreadCategory,
	};
	response.render("thread", dataToRender);
});

//POST REQUEST
router.post("/add", checkLogin, checkStatus, validateAddThread, addThread, (request, response, next) => {
	response.redirect("/");
});

router.post("/:threadid/addReply", checkLogin, checkStatus, checkThread, validateAddReply, addReply, (request, response, next) => {
	response.redirect("back");
});

router.post("/:threadid/:threadcontentid/addLike", checkLogin, checkStatus, checkThread, addLike, (request, response, next) => {
	response.redirect("back");
});

router.post("/:threadid/lockThread", checkLogin, checkStatus, lockThread, (request, response, next) => {
	response.redirect("back");
});

export { router };
