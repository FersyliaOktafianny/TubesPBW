//============================== START ==============================

import express from "express";

const app = express();
const port = 45;
app.listen(port, (error) => {
	if (error) {
		console.log(".: ERROR");
	} else {
		console.log(".: Listening to port " + port);
	}
});

//============================== STATIC PATH ==============================

import path from "path";

const stylesPath = path.resolve("styles");
const assetsPath = path.resolve("assets");
const scriptsPath = path.resolve("scripts");
app.use("/styles", express.static(stylesPath));
app.use("/assets", express.static(assetsPath));
app.use("/scripts", express.static(scriptsPath));

//============================== VIEW ENGINE ==============================

app.set("view engine", "ejs");

//============================== FORM (POST) HANDLER ==============================

app.use(
	express.urlencoded({
		extended: true,
	})
);

//============================== SESSION ==============================

import session from "express-session";

app.use(
	session({
		secret: "secret rebbit",
		name: "rebbit.session",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, //1 hari
		},
	})
);

//============================== ROUTE ==============================

import { router as homeRoute } from "./routes/home.js";
import { router as authenticationRoute } from "./routes/authentication.js";
import { router as myRoute } from "./routes/my.js";
import { router as threadRoute } from "./routes/thread.js";
import { router as categoryRoute } from "./routes/category.js";

app.use("/", homeRoute);
app.use("/authentication", authenticationRoute);
app.use("/my", myRoute);
app.use("/thread", threadRoute);
app.use("/category", categoryRoute);

import { router as adminAuthenticationRoute } from "./routes/admin_authentication.js";
import { router as adminHomeRoute } from "./routes/admin_users.js";
import { router as adminThreadRoute } from "./routes/admin_thread.js";

app.use("/admin", adminAuthenticationRoute);
app.use("/admin_home", adminHomeRoute);
app.use("/admin_thread", adminThreadRoute);
