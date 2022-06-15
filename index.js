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
// //Function: Membuat koneksi database baru di dalam pool.
// const getDbConnection = (sqlPool) => {
// 	return new Promise((resolve, reject) => {
// 		sqlPool.getConnection((err, conn) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve(conn);
// 			}
// 		});
// 	});
// };

// //queryArguments harus berbentuk array (bisa array kosong).
// const executeQuery = (dbConn, query, queryArguments) => {
// 	return new Promise((resolve, reject) => {
// 		if (query.includes("?") && queryArguments.length > 0) {
// 			dbConn.query(query, queryArguments, (err, result) => {
// 				if (err) {
// 					reject(err);
// 				} else {
// 					resolve(result);
// 				}
// 			});
// 		} else {
// 			dbConn.query(query, (err, result) => {
// 				if (err) {
// 					reject(err);
// 				} else {
// 					resolve(result);
// 				}
// 			});
// 		}
// 	});
// };
import mysql from "mysql";
import { getDbConnection, executeQuery } from "./models/sql.js";
const sqlPool = mysql.createPool({
    user: "root",
    password: "",
    database: "rebbit",
    host: "localhost",
})

//get all USERS
app.get('', (req, res) => {
    sqlPool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * FROM users', (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            }
            else {
                console.log(err)
            }
        })
    })
})

// add users
app.post('/signup', (req, res) => {
    sqlPool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT INTO users SET ?', params, (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            }
            else {
                console.log(err)
            }
        })
    })
})

//MIDDLEWARE: AUTHENTICATION
const authenticateUser = (request, response, next) => {
	if (request.session.loggedIn === "user" || request.session.loggedIn === "admin") {
		next();
	} else {
		response.redirect("/login");
	}
};

const authenticateAdmin = (request, response, next) => {
	if (request.session.loggedIn === "admin") {
		next();
	} else {
		response.redirect("back");
	}
};

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