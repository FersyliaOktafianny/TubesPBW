//START
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
const sqlPool = mysql.createPool({
    user: "root",
    password: "",
    database: "rebbit",
    host: "localhost",
})

//Function: Membuat koneksi database baru di dalam pool.
const getDbConnection = (sqlPool) => {
	return new Promise((resolve, reject) => {
		sqlPool.getConnection((err, conn) => {
			if (err) {
				reject(err);
			} else {
				resolve(conn);
			}
		});
	});
};

//queryArguments harus berbentuk array (bisa array kosong).
const executeQuery = (dbConn, query, queryArguments) => {
	return new Promise((resolve, reject) => {
		if (query.includes("?") && queryArguments.length > 0) {
			dbConn.query(query, queryArguments, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		} else {
			dbConn.query(query, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		}
	});
};

// //get all USERS
// app.get('', (req, res) => {
//     sqlPool.getConnection((err, connection) => {
//         if (err) throw err
//         console.log(`connected as id ${connection.threadId}`)

//         connection.query('SELECT * FROM users', (err, rows) => {
//             connection.release()

//             if (!err) {
//                 res.send(rows)
//             }
//             else {
//                 console.log(err)
//             }
//         })
//     })
// })

// // add users
// app.post('/signup', (req, res) => {
//     sqlPool.getConnection((err, connection) => {
//         if (err) throw err
//         console.log(`connected as id ${connection.threadId}`)

//         const params = req.body

//         connection.query('INSERT INTO users SET ?', params, (err, rows) => {
//             connection.release()

//             if (!err) {
//                 res.send(rows)
//             }
//             else {
//                 console.log(err)
//             }
//         })
//     })
// })

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

//ROUTER
app.get('/',(request, response) => {
    // const dbconn = await getDbConnection(sqlPool);
    // const result = await executeQuery(dbconn, "select * from users;", []);
    // if(result){
    //     console.log("YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    // }
    response.sendFile(path.join(path.resolve("view"), "homepage.html"));
});

app.get('/', async(request, response) =>{
    const name = request.body;
})

app.get('/login', (request, response) => {
    response.sendFile(path.join(path.resolve("view"), "login_User.html"));
});

app.get('/signup', (request, response) => {
    response.sendFile(path.join(path.resolve("view"), "signup.html"));
});

app.post('/signup', async (request, response) => {
    const name = request.body.name;
    const nickname = request.body.nickname;
    const email = request.body.email;
    const password = request.body.password;
    const confirmpass = request.body.confirm_password;
    if (password == confirmpass){
        console.log('password valid');
        const query = 'insert into users(name, nickname, email, password, role, joined_date, status) values(?, ?, ?, ?, 3, now(), 1);';
    }
    const dbconn = await getDbConnection(sqlPool);
    const result = await executeQuery(dbconn, query, [name, nickname, email, password]);
    dbconn.release();
    response.redirect('/');
});

app.get('/userprofile', (request, response) => {
    response.sendFile(path.join(path.resolve("view"), "userprofile.html"));
});


app.get('/Threadpage', (request, response) => {
    response.sendFile(path.join(path.resolve("view"), "userprofile.html"));
});


