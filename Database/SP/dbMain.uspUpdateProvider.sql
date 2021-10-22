/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Procedimiento que actualizar un proveedor
Ejemplo de ejecución:
	CALL dbMain.uspUpdateProvider("Proveedor SAS", "11423412123", "3310412", "proveedor@gmail.com", "Diagonal 32D@e3213", 1)
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblProviders;
*/
DROP PROCEDURE IF EXISTS dbMain.uspUpdateProvider;
DELIMITER &&
CREATE PROCEDURE dbMain.uspUpdateProvider(
IN name VARCHAR(150),
IN document VARCHAR(20), 
IN phone VARCHAR(20),
IN email VARCHAR(200),
IN address VARCHAR(200),
IN providerIDE INT
)
BEGIN
    START TRANSACTION;
		UPDATE 
			dbMain.tblProviders
		SET
			name = name,
			document = document,
			phone = phone,
			email = email,
			address = address,
			updatedAt = NOW()
		WHERE
			providerID = providerIDE;
	COMMIT;
END &&
DELIMITER ;