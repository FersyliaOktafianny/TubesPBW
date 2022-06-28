import express from "express";
import { login, checkStatus} from "../middlewares/authentication.js";
import { validateLogIn, signUpValidation } from "../middlewares/inputvalidation.js";
import { addUserToSession, removeUserFromSession } from "../middlewares/session.js";

const router = express.Router();

router.get("/", (request, response, next) => {
	response.redirect("/authentication/login");
});

//LOGIN
router.get("/login", (request, response, next) => {
	// response.render("login");
	response.render("login", {isNotAuth:''});
});

router.post("/login", login, addUserToSession, checkStatus, (request, response, next) => {
	response.redirect("/");
});

//LOGOUT
router.get("/logout", removeUserFromSession, (request, response, next) => {
	response.redirect("/");
});

//SINGUP
router.get("/signup", (request, response, next) => {
	response.render("signup", {passwordmatch:''});
});
router.post("/signup", signUpValidation, (request, response, next) => {
	response.redirect("/authentication/login");
});

export { router };
