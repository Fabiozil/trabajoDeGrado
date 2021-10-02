const mysql = require("mysql2");

module.exports.createClient = async (event) => {
    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "root123",
    });

    con.connect((err) => {
        if (err) throw err;
        console.log("Conectado");
    });

    clients = JSON.parse(event.body).clients;

    clients.forEach((client) => {
        con.query(
            "CALL dbMain.uspCreateClient('" +
                client.name +
                "', '" +
                client.clientType +
                "', '" +
                client.document +
                "', '" +
                client.contactName +
                "', '" +
                client.contactEmail +
                "', '" +
                client.phone +
                "', '" +
                client.contactPhone +
                "', '" +
                client.address +
                "', " +
                client.fiscalResponsability +
                ", " +
                client.userAddID +
                ")",
            function (err, results, fields) {
                if (err) throw err;
            }
        );
        con.commit(function (err) {
            if (err) {
                con.rollback(function () {
                    throw err;
                });
            }
        });
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "funcionó",
            input: JSON.parse(event.body),
        }),
    };
};
