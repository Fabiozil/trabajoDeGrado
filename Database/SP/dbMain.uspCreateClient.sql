/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Creación de tabla de clientes
Ejemplo de ejecución:
	CALL dbMain.uspCreateClient("Jorge Luis Anaya", "NATURAL", "1221233", "Jorge Anaya", "j-anaya-@hotmail.com", "321411241", "321411241", "Diagonal 32D #32 sur 39", 2, 1)
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblClients;
SELECT * FROM dbmain.tblClients WHERE clientID = 1
*/
DELIMITER &&
DROP PROCEDURE IF EXISTS dbMain.uspCreateClient;
CREATE PROCEDURE dbMain.uspCreateClient(
IN name VARCHAR(150),
IN clientType VARCHAR(10), 
IN document VARCHAR(20),
IN contactName VARCHAR(150),
IN contactEmail VARCHAR(150),
IN phone VARCHAR(20), 
IN contactPhone VARCHAR(20),
IN address VARCHAR(150),
IN fiscalResponsability INT,
IN userAddID INT
)
BEGIN
	SET @fiscalResponsabilityValue = "";
	CASE 
		WHEN fiscalResponsability = 1 THEN SET @fiscalResponsabilityValue = "Gran Contribuyente";
        WHEN fiscalResponsability = 2 THEN SET @fiscalResponsabilityValue = "Auto Retenedor";
        WHEN fiscalResponsability = 3 THEN SET @fiscalResponsabilityValue = "Agente de retencion de IVA";
        WHEN fiscalResponsability = 4 THEN SET @fiscalResponsabilityValue = "Regimen Simple de Tributacion";
        ELSE SET @fiscalResponsabilityValue = "No aplica - Otros";
	END CASE; 
    START TRANSACTION;
		INSERT INTO 
			dbMain.tblClients
			(
			name,
			clientType,
			document,
			contactName,
			contactEmail,
			phone,
			contactPhone,
			address,
			fiscalResponsability,
			userID,
			createdAt
			)
			VALUES
			(
			name,
			clientType, 
			document,
			contactName,
			contactEmail,
			phone, 
			contactPhone,
			address,
			@fiscalResponsabilityValue,
			userAddID,
			NOW()
			);
END &&
DELIMITER ;