import express from "express";
import { login, checkStatus, signup } from "../middlewares/authentication.js";
import { addUserToSession, removeUserFromSession } from "../middlewares/session.js";

const router = express.Router();

router.get("/", (request, response, next) => {
	response.redirect("/authentication/login");
});

//LOGIN
router.get("/login", (request, response, next) => {
	response.render("login");
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
	response.render("signup");
});
router.post("/signup", signup, (request, response, next) => {
	response.redirect("/authentication/login");
});

export { router };
