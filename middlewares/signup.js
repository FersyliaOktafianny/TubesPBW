import { sqlPool, getDbConnection, executeQuery } from "./sql.js";

const signup = async (request, response, next) => {
	const name = request.body.name;
    const nickname = request.body.nickname;
    const email = request.body.email;
    const password = request.body.password;
    const password2 = request.body.confirm_password;
    if (password == password2){
        console.log('password valid');
        const query = 'insert into users(name, nickname, email, password, role, joined_date, status) values(?, ?, ?, ?, 3, now(), 1);';
        const dbconn = await getDbConnection(sqlPool);
        const result = await executeQuery(dbconn, query, [name, nickname, email, password]);
        dbconn.release();
        next();
    }else{
        response.redirect('back');
    }
};

export { signup };
