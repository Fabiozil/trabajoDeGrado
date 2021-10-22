/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Creación de tabla de usuarios
----------------------------------------------------------------------------------------
*/
DROP TABLE IF EXISTS dbMain.tblUsers;
CREATE TABLE 
	dbMain.tblUsers
    (
    userID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    numerationID INT UNSIGNED,
    document VARCHAR(20),
    city VARCHAR(50),
	address VARCHAR(100),
    contactEmail VARCHAR(150)NOT NULL,
    phone VARCHAR(20),
    economicActivityCode INT NOT NULL,
    fiscalResponsability VARCHAR(30) NOT NULL,
    userType VARCHAR(10) NOT NULL,
    name VARCHAR(150) NOT NULL,
    updatedAt DATETIME,
    createdAt DATETIME NOT NULL
    );
    