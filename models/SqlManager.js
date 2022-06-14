import mysql from "mysql";

class sqlmanager {
	constructor() {
		this.sqlPool = mysql.createPool({
			user: "root",
			password: "",
			database: "ide",
			host: "localhost",
		});
	}
	//Function: Membuat koneksi database baru di dalam pool.
	getDbConnection = () => {
		return new Promise((resolve, reject) => {
			this.sqlPool.getConnection((err, conn) => {
				if (err) {
					reject(err);
				} else {
					resolve(conn);
				}
			});
		});
	};
	//queryArguments harus berbentuk array (bisa array kosong).
	executeQuery = (query, queryArguments) => {
		return new Promise((resolve, reject) => {
			const dbConn = this.getDbConnection();
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
}
export { sqlmanager };