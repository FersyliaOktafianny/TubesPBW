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
import {router as userprofileRoute} from "./routes/userprofile.js"

app.get("/", homeRoute);
app.use("/authentication", authenticationRoute);
app.use("/userprofile", userprofileRoute)
