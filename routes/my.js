import express from "express";
import { checkLogin, checkStatus } from "../middlewares/authentication.js";
import { getAllMyThread, getAllMyThreadFirstContent, getAllMyReply } from "../middlewares/thread.js";

const router = express.Router();

//GET REQUEST
router.get("/profile", checkLogin, checkStatus, getAllMyThread, getAllMyReply, (request, response, next) => {
	const dataToRender = {
		pageTitle: "REBBIT | " + request.session.user_nickname + "'S PROFILE",
		navigationType: "my",
		user_nickname: request.session.user_nickname,
		user_name: request.session.user_name,
		user_joined_date: request.session.user_joined_date,
		threadCount: request.queryAllMyThread.length,
		replyCount: request.queryAllMyReply.length,
	};
	response.render("myprofile", dataToRender);
});

router.get("/thread", checkLogin, checkStatus, getAllMyThread, getAllMyThreadFirstContent, (request, response, next) => {
	const dataToRender = {
		pageTitle: "REBBIT | " + request.session.user_nickname + "'S THREADS",
		navigationType: "my",
		user_nickname: request.session.user_nickname,
		threads: request.queryAllMyThread,
		threadsFirstContent: request.queryAllMyThreadFirstContent,
	};
	response.render("mythread", dataToRender);
});

router.get("/reply", checkLogin, checkStatus, getAllMyReply, (request, response, next) => {
	const dataToRender = {
		pageTitle: "REBBIT | " + request.session.user_nickname + "'S REPLIES",
		navigationType: "my",
		user_nickname: request.session.user_nickname,
		replies: request.queryAllMyReply,
	};
	response.render("myreply", dataToRender);
});

export { router };
