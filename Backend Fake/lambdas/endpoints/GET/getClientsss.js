const mysql = require("mysql2");

module.exports.getClientHandler = async (event) => {
    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "root123",
        database: "dbMain",
    });

    con.connect((err) => {
        if (err) throw err;
        console.log("Conectado");
    });

    id = event.queryStringParameters.clientID;
    var r = "el pepe";
    con.query(
        "SELECT * FROM dbmain.tblClients WHERE clientID = " + id,
        function (err, result, fields) {
            if (err) throw err;
            return result;
        }
    );

    console.log(r);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "funcionó",
        }),
    };
};
