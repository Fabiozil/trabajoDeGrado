const mysql = require("mysql2");
require("dotenv").config();

module.exports.createProductHandler = async (event) => {
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    });

    con.connect((err) => {
        if (err) throw err;
        console.log("Conectado");
    });

    products = JSON.parse(event.body).products;

    products.forEach((product) => {
        con.query(
            "CALL dbMain.uspCreateproduct('" +
                product.name +
                "', '" +
                product.code +
                "', " +
                product.stock +
                ", " +
                product.value +
                ", '" +
                product.description +
                "'," +
                product.userAddID +
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
