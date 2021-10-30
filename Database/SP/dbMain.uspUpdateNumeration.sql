/*
Autor:
	Fabio Anaya
Fecha:
	9/19/2021
Descripción:
	Editar consecutivo
Ejemplo de ejecución:
	CALL dbMain.uspUpdateNumeration('ACTIVO', 1, 1, 100, '20221231', "", 1)
    CALL dbMain.uspUpdateNumeration(1, 'INACTIVO', '1', 1, 100, '2022-02-08', '')
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblUsers;
SELECT * FROM dbMain.tblbillnumerations;

*/
DROP PROCEDURE IF EXISTS dbMain.uspUpdateNumeration;
DELIMITER &&
CREATE PROCEDURE dbMain.uspUpdateNumeration(
numerationIDE INT,
IN statusE VARCHAR(20),
IN currentConsecutiveE INT,
IN initialConsecutiveE INT,
IN finalConsecutiveE INT,
IN validUntilE DATE,
IN consecutiveAutorizationE VARCHAR(100)
)
BEGIN
	START TRANSACTION;
		UPDATE
			dbMain.tblbillnumerations
		SET
			initialConsecutive = initialConsecutiveE,
			finalConsecutive = finalConsecutiveE,
			currentConsecutive = currentConsecutiveE,
			validUntil = validUntilE,
			consecutiveAutorization = consecutiveAutorizationE,
            updatedAt = NOW(),
            status = statusE
		WHERE
			numerationID = numerationIDE;
    COMMIT;
END &&
DELIMITER ;