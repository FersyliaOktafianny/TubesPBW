import express from "express";
import { checkLogin, checkStatus } from "../middlewares/authentication.js";
import { getAllMyThread, getAllMyThreadFirstContent, getAllMyReply } from "../middlewares/thread.js";

const router = express.Router();

router.get("/profile", checkLogin, checkStatus, (request, response, next) => {
	const dataToRender = {
		user_nickname: request.session.user_nickname,
	};
	response.render("myprofile", dataToRender);
});

router.get("/thread", checkLogin, checkStatus, getAllMyThread, getAllMyThreadFirstContent, (request, response, next) => {
	const dataToRender = {
		user_nickname: request.session.user_nickname,
		queryAllMyThread: request.queryAllMyThread,
		queryAllMyThreadFirstContent: request.queryAllMyThreadFirstContent,
	};
	response.render("mythread", dataToRender);
});

router.get("/reply", checkLogin, checkStatus, getAllMyReply, (request, response, next) => {
	const dataToRender = {
		user_nickname: request.session.user_nickname,
		queryAllMyReply: request.queryAllMyReply,
	};
	response.render("myreply", dataToRender);
});

export { router };
