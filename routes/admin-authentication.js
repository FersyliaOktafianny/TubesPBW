import express from "express";
import { validateLogIn} from "../middlewares/inputvalidation.js";
import { admin_login, checkStatus} from "../middlewares/authentication.js";
import { addUserToSession, removeUserFromSession } from "../middlewares/session.js";

const router = express.Router();

//ADMIN LOGIN
router.get("/admin_login",(request, response, next) => {
	// response.render("login");
	response.render("login_admin", {isNotAuth:''});
});

router.post("/admin_login", validateLogIn, admin_login, addUserToSession, checkStatus, (request, response, next) => {
	response.redirect("home_admin");
});

//ADMIN LOGOUT
router.get("/logout_admin", removeUserFromSession, (request, response, next) => {
	response.redirect("login_admin");
});


export { router };