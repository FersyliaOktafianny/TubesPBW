import express from "express";
import { checkLogin, checkStatus } from "../middlewares/authentication.js";
import { addThread } from "../middlewares/thread.js";
import { validateAddThread } from "../middlewares/inputvalidation.js";
import {getAllThisThreadContent} from "../middlewares/thread.js";

const router = express.Router();

router.get("/", (request, response, next) => {
	response.redirect("/");
});
router.get("/:threadid", getAllThisThreadContent, (request, response, next) => {
	const dataToRender = {
		queryAllThisThreadContent: request.queryAllThisThreadContent,
	};
	response.render("thread", dataToRender);
});

router.post("/add", checkLogin, checkStatus, validateAddThread, addThread, (request, response, next) => {
	response.redirect("/");
});

router.post("/:threadid/addReply", (request, response, next) => {

});

export { router };
