/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Creación de tabla de facturas
----------------------------------------------------------------------------------------
*/
DROP TABLE IF EXISTS dbMain.tblBills;
CREATE TABLE 
	dbMain.tblBills
    (
    billID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    consecutive INT UNSIGNED NOT NULL,
    totalValue FLOAT NOT NULL,
    paymentMethod VARCHAR(150),
    tax FLOAT,
    digitalSign VARCHAR(150),
    CUFE VARCHAR(30),
    XML TEXT,
    userID INT UNSIGNED NOT NULL,
    clientID INT UNSIGNED NOT NULL,
    validationDate DATETIME NOT NULL,
    generationDate DATE NOT NULL,
    route VARCHAR(200)
    );
    