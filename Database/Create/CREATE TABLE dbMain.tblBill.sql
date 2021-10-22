/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Creación de tabla de facturas
----------------------------------------------------------------------------------------
*/
CREATE TABLE 
	dbMain.tblBill
    (
    billID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    consecutive INT UNSIGNED NOT NULL,
    totalValue FLOAT NOT NULL,
    paymentMethod VARCHAR(150),
    ivaHolderQuality VARCHAR(10),
    consumptionTaxRate FLOAT,
    consumptionTax FLOAT,
    digitalSign VARCHAR(150),
    CUFE VARCHAR(30),
    XML TEXT,
    QRCode VARCHAR(150),
    userID INT UNSIGNED NOT NULL,
    clientID INT UNSIGNED NOT NULL,
    validationDate DATETIME,
    generationDate DATETIME NOT NULL,
    route VARCHAR(200)
    );
    