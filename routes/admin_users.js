import express from "express";
import { getAllUsers } from "../middlewares/admin.js";

const router = express.Router();

router.get("/homeadmin", getAllUsers, (request, response, next) => {
	const dataToRender = {
		user_nickname: request.session.user_nickname,
		userData : request.queryAllUsers,
	};
	console.log(userData);
	response.render("home_admin", dataToRender);
});

export { router };