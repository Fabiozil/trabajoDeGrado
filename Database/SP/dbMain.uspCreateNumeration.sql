/*
Autor:
	Fabio Anaya
Fecha:
	9/19/2021
Descripción:
	Creación de nuevo usuario
Ejemplo de ejecución:
	CALL dbMain.uspCreateNumeration('ACTIVO', 1, 1, 100, '20221231', "", 1)
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblUsers;
SELECT * FROM dbMain.tblbillnumerations;

*/
SELECT COUNT(0) AS Count FROM dbmain.tblbillnumerations WHERE userAddID = 1 AND status = 'ACTIVO';
DROP PROCEDURE IF EXISTS dbMain.uspCreateNumeration;
DELIMITER &&
CREATE PROCEDURE dbMain.uspCreateNumeration(
IN status VARCHAR(20),
IN currentConsecutive INT,
IN initialConsecutive INT,
IN finalConsecutive INT,
IN validUntil DATE,
IN consecutiveAutorization VARCHAR(100),
userAddID INT
)
BEGIN
	START TRANSACTION;
		INSERT INTO
			dbMain.tblbillnumerations
			(
			initialConsecutive,
			finalConsecutive,
			currentConsecutive,
			validUntil,
			consecutiveAutorization,
            createdAt,
            userAddID,
            status
            )
            VALUES
            (
			initialConsecutive,
			finalConsecutive,
			currentConsecutive,
			validUntil,
			consecutiveAutorization,
            NOW(),
            userAddID,
            status
            );
    COMMIT;
END &&
DELIMITER ;