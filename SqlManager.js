import mysql from "mysql";

export class SqlManager {
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
  //queryArguments harus berbentuk array.
  executeQuery = (dbConn, query, queryArguments) => {
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
}