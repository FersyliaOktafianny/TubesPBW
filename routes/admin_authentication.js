import express from "express";
import { validateLogIn} from "../middlewares/inputvalidation.js";
import { admin_login, checkStatus} from "../middlewares/authentication.js";
import { addUserToSession, removeUserFromSession } from "../middlewares/session.js";

const router = express.Router();

router.get("/", (request, response, next) => {
	response.redirect("/admin/login");
});

//ADMIN LOGIN
router.get("/login",(request, response, next) => {
	// response.render("login");
	response.render("login_admin", {isNotAuth:''});
});

router.post("/login", validateLogIn, admin_login, addUserToSession, checkStatus, (request, response, next) => {
	// console.log(request.session.user_nickname);
	response.redirect("/admin_home");
});

//ADMIN LOGOUT
router.get("/logout_admin", removeUserFromSession, (request, response, next) => {
	response.redirect("/");
});


export { router };