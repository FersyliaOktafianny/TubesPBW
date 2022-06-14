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

export { getDbConnection, executeQuery };
