/*
Autor:
	Fabio Anaya
Fecha:
	9/19/2021
Descripción:
	Creación de nuevo usuario
Ejemplo de ejecución:
	CALL dbMain.uspCreateUser(1, "1152716365", "Rionegro", "Calle 67 #54 365", "fabioanayac@outlook.com", "3015267553", 2, 1, "NATURAL", "Fabio Enrique Anaya")
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblUsers;
*/
DELIMITER &&
DROP PROCEDURE IF EXISTS dbMain.uspCreateUser;
CREATE PROCEDURE dbMain.uspCreateUser(
IN numerationID INT UNSIGNED,
IN document VARCHAR(20),
IN city VARCHAR(50),
IN address VARCHAR(100),
IN contactEmail VARCHAR(150),
IN phone VARCHAR(20),
IN economicActivityCode INT,
IN fiscalResponsability INT,
IN userType VARCHAR(10),
IN name VARCHAR(150)
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
			dbMain.tblUsers
			(
			numerationID,
			document,
			city,
			address,
			contactEmail,
			phone,
			economicActivityCode,
			fiscalResponsability,
			userType,
			name,
            createdAt
            )
            VALUES
            (
			numerationID,
			document,
			city,
			address,
			contactEmail,
			phone,
			economicActivityCode,
			@fiscalResponsabilityValue,
			userType,
			name,
            NOW()
            );
    COMMIT;
END &&
DELIMITER ;