import express from "express";
const app = express();

//[SEMENTARA] STATIC PATH
import path from "path";
const viewPath = path.resolve("view");
const stylePath = path.resolve("style");
const assetsPath = path.resolve("assets");
app.use("/view", express.static(viewPath));
app.use("/style", express.static(stylePath));
app.use("/assets", express.static(assetsPath));

//VIEW ENGINE
//app.set("view engine", "ejs");

//FORM (POST) HANDLER
app.use(
	express.urlencoded({
		extended: true,
	})
);

//SESSION
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

//MYSQL
import mysql from "mysql";
import { getDbConnection, executeQuery } from "./models/sql.js";
const sqlPool = mysql.createPool({
	user: "root",
	password: "",
	database: "rebbit",
	host: "localhost",
});

//ROUTE
import { router as authRoute } from "./routes/loginsignup.js";
app.use("/auth", authRoute);

//START
const port = 8080;
app.listen(port, (error) => {
	if (error) {
		console.log(".: ERROR");
	} else {
		console.log(".: Listening to port 8080");
	}
});