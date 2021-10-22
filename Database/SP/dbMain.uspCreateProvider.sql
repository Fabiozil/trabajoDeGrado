/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Procedimiento que crea un nuevo proveedor
Ejemplo de ejecución:
	CALL dbMain.uspCreateProvider("Proveedor SAS", "11423412123", "3310412", "proveedor@gmail.com", "Diagonal 32D@e3213", 1)
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblProviders;
*/
DROP PROCEDURE IF EXISTS dbMain.uspCreateProvider;
DELIMITER &&
CREATE PROCEDURE dbMain.uspCreateProvider(
IN name VARCHAR(150),
IN document VARCHAR(20), 
IN phone VARCHAR(20),
IN email VARCHAR(200),
IN address VARCHAR(200),
IN userAddID INT
)
BEGIN
    START TRANSACTION;
		INSERT INTO 
			dbMain.tblProviders
			(
			userID,
			name,
			document,
			phone,
			email,
			address,
			createdAt
			)
			VALUES
			(
            userAddID,
			name,
			document,
			phone,
			email,
			address,
			NOW()
			);
	COMMIT;
END &&
DELIMITER ;