/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Creación de tabla de proveedores
----------------------------------------------------------------------------------------
DROP TABLE dbMain.tblProviders
*/
CREATE TABLE 
	dbMain.tblProviders
    (
    providerID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    userID INT UNSIGNED,
    name VARCHAR(150) NOT NULL,
    document VARCHAR(20),
	phone VARCHAR(20),
    email VARCHAR(150),
    address VARCHAR(150),
    updatedAt DATETIME,
    createdAt DATETIME NOT NULL
    );
    