/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Creación de tabla de facturas
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblBills;
SELECT name, contactEmail, document, phone, city, address FROM dbmain.tblUsers WHERE userID = 1
SELECT currentConsecutive, consecutiveAutorization, CAST(validUntil AS CHAR(50)) AS validUntil FROM dbmain.tblBillNumerations WHERE userAddID = 1 AND status = 'ACTIVO'
SELECT * FROM dbmain.tblClients WHERE clientID = 1
SELECT * FROM dbmain.tblBillNumerations
UPDATE SET city = 'Rionegro, Antioquia'
*/
DROP TABLE IF EXISTS dbMain.tblBills;
CREATE TABLE 
	dbMain.tblBills
    (
    billID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    consecutive INT UNSIGNED NOT NULL,
    total FLOAT NOT NULL,
	totalDiscount FLOAT NOT NULL,
	totalIVA FLOAT NOT NULL,
	totalConsumption FLOAT NOT NULL,
    totalValue FLOAT NOT NULL,
    paymentMethod VARCHAR(150),
    digitalSign VARCHAR(150),
    CUFE VARCHAR(100),
    XML TEXT,
    userID INT UNSIGNED NOT NULL,
    clientID INT UNSIGNED NOT NULL,
    validationDate DATETIME NOT NULL,
    generationDate DATE NOT NULL,
    route VARCHAR(200)
    );
    