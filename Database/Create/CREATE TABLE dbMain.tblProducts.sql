/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Creación de tabla de productos
----------------------------------------------------------------------------------------
*/
CREATE TABLE 
	dbMain.tblProducts
    (
    productID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    userID INT UNSIGNED UNIQUE,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(50),
	stockValue FLOAT UNSIGNED,
    stock INT  UNSIGNED NOT NULL,
    value FLOAT UNSIGNED,
    description VARCHAR(200),
    updatedAt DATETIME,
    createdAt DATETIME NOT NULL
    );
    