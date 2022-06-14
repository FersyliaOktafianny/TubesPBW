import path from "path";
import express from "express";

const router = express.Router();

router.get("/login", (request, response) => {
	response.sendFile(path.join(path.resolve("view"), "/login.html"));
});
router.get("/signup", (request, response) => {
	response.sendFile(path.join(path.resolve("view"), "/signup.html"));
});

export { router };
