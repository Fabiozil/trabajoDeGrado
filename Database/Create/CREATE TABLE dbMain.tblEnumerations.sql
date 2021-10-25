/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Creación de tabla de clientes
----------------------------------------------------------------------------------------
DROP TABLE dbMain.tblBillNumerations;
*/
CREATE TABLE 
	dbMain.tblBillNumerations
    (
    numerationID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    consecutiveAutorization VARCHAR(30),
    status VARCHAR(10),
    currentConsecutive INT UNSIGNED NOT NULL,
    initialConsecutive INT UNSIGNED NOT NULL,
    finalConsecutive INT UNSIGNED NOT NULL,
    validUntil DATE,
    updatedAt DATETIME,
    userAddID INT UNSIGNED NOT NULL,
    createdAt DATETIME NOT NULL
    );
    