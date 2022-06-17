import express from "express";
import { checkLogin, checkStatus } from "../middlewares/authentication.js";
import { addThread } from "../middlewares/thread.js";
import { validateAddThread } from "../middlewares/inputvalidation.js";

const router = express.Router();

router.get("/", (request, response, next) => {
	response.redirect("/");
});
router.get("/:threadname", (request, response, next) => {
	response.render("thread");
});

router.post("/add", checkLogin, checkStatus, validateAddThread, addThread, (request, response, next) => {
	response.redirect("/");
});

export { router };
