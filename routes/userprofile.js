import express from "express";
import { checkLogin, checkStatus } from "../middlewares/authentication.js";

const router = express.Router();

router.get("/", checkLogin, checkStatus, (request, response, next) => {
	const dataToRender = {
		nickname: request.session.user_nickname,
	};
	response.render("userprofile", dataToRender);
});

export { router };
