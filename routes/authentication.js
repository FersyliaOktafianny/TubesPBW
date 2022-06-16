import express from "express";
import path from "path";
import { signup as signupMiddleware } from "../middlewares/signup.js";
import { login as loginMiddleware } from "../middlewares/login.js";

const router = express.Router();

const sendLoginPage = (request, response) => {
	response.sendFile(path.join(path.resolve("view"), "login_User.html"));
};
const sendSignupPage = (request, response) => {
	response.sendFile(path.join(path.resolve("view"), "signup.html"));
};

router.get("/login", sendLoginPage);
router.post("/login", loginMiddleware);
router.get("/signup", sendSignupPage);
router.post("/signup", signupMiddleware);

export { router };
