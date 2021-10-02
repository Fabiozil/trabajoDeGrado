/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Creación de tabla de clientes
----------------------------------------------------------------------------------------
*/
DROP TABLE IF EXISTS dbMain.tblClients;
CREATE TABLE 
	dbMain.tblClients
    (
    clientID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    userID INT UNSIGNED,
    name VARCHAR(150),
    clientType VARCHAR(10),
    document VARCHAR(20),
    contactName VARCHAR(150),
    contactEmail VARCHAR(150),
    phone VARCHAR(20),
    contactPhone VARCHAR(20),
    address VARCHAR(150),
    fiscalResponsability VARCHAR(30),
    updatedAt DATETIME,
    createdAt DATETIME NOT NULL
    );
    