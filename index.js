import path from "path";
import express from "express";
import session from "express-session";
import mysql from 'mysql';

const app = express();

//VIEW ENGINE
//app.set("view engine", "ejs");

//FORM (POST) HANDLER
app.use(
    express.urlencoded({
        extended: true,
    })
);

//[SEMENTARA] STATIC PATH
const viewPath = path.resolve("view");
const stylePath = path.resolve("style");
const assetsPath = path.resolve("assets");
app.use("/view", express.static(viewPath));
app.use("/style", express.static(stylePath));
app.use("/assets", express.static(assetsPath));

//SESSION
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

//ROUTE
import { router as authRoute } from "./routes/auth.js";
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


//
const pool = mysql.createPool({
    user: 'root',
    password: '',
    database: 'tubespbw',
    host: 'localhost',
    connectionLimit: 10
});

const dbConnect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        })
    })
};

const getUsers = conn => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
};

const addNewUser = (conn, name) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO user_data SET ?', name, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};