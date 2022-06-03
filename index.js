import path from "path";

import express from "express";
import session from "express-session";

import {SqlManager} from './SqlManager.js';

const app = express();

app.set("view engine", "ejs");

const publicPath = path.resolve("public");
app.use(express.static(publicPath));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "secret reddut",
    name: "reddut.session",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1 hari
    },
  })
);

const sqlManager = new SqlManager();

const port = 8080;
app.listen(port, () => {
  console.log(".: Listening to port 8080");
});
