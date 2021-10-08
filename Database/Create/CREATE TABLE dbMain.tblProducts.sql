/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Creación de tabla de productos
----------------------------------------------------------------------------------------
DROP TABLE dbMain.tblProducts;
*/
CREATE TABLE 
	dbMain.tblProducts
    (
    productID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    userID INT UNSIGNED,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(50),
	stockValue FLOAT,
    stock INT  UNSIGNED NOT NULL,
    value FLOAT,
    description VARCHAR(200),
    updatedAt DATETIME,
    createdAt DATETIME NOT NULL
    );
    