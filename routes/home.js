import express from "express";
import { getAllThread } from "../middlewares/thread.js";

const router = express.Router();

router.get("/", getAllThread, (request, response, next) => {
	const dataToRender = {
		queryResult: request.queryResult,
	};
	response.render("home", dataToRender);
});

export { router };
