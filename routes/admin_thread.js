import express from "express";
import { getAllThread } from "../middlewares/admin.js";

const router = express.Router();

router.get("/", getAllThread, (request, response, next) => {
    const dataToRender = {
        user_nickname: request.session.user_nickname,
		userData : request.queryAllThread,
    };
    response.render("homeThread_admin", dataToRender);
});

export { router };