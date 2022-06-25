import express from "express";
import { getAllUsers } from "../middlewares/admin.js";

const router = express.Router();

router.get("/", getAllUsers, (request, response, next) => {
	// console.log(request.session.user_nickname);
	const dataToRender = {
		user_nickname: request.session.user_nickname,
		userData : request.queryAllUsers,
	};
	response.render("home_admin", dataToRender);
});

export { router };