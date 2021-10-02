const mysql = require("mysql2");

const connection = (db, user, pass) => {
    var con = mysql.createConnection({
        host: db,
        user: user,
        password: pass,
    });

    con.connect((err) => {
        if (err) {
            throw err;
        } else {
            console.log("Connected");
            return con;
        }
    });
};

module.exports = connection;
