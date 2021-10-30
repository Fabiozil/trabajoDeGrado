/*
Autor:
	Fabio Anaya
Fecha:
	9/19/2021
Descripción:
	Actualizacion de nuevo usuario
Ejemplo de ejecución:
	CALL dbMain.uspUpdateUser(1, "1152716365", "Rionegro", "Calle 67 #54 365", "fabioanayac@outlook.com", "3015267553", 2, "Auto Retenedor", "NATURAL", "Fabio Enrique Anaya Castillo")
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblUsers;
SELECT * FROM dbMain.tblbillenumerations
*/
DROP PROCEDURE IF EXISTS dbMain.uspUpdateUser;
DELIMITER &&
CREATE PROCEDURE dbMain.uspUpdateUser(
IN userIDE INT UNSIGNED,
IN documentE VARCHAR(20),
IN cityE VARCHAR(50),
IN addressE VARCHAR(100),
IN contactEmailE VARCHAR(150),
IN phoneE VARCHAR(20),
IN economicActivityCodeE VARCHAR(50),
IN fiscalResponsabilityE VARCHAR(50),
IN userTypeE VARCHAR(10),
IN nameE VARCHAR(150)
)
BEGIN
    
	START TRANSACTION;
		UPDATE
			dbMain.tblUsers
		SET
			document = documentE,
			city = cityE,
			address = addressE,
			contactEmail = contactEmailE,
			phone = phoneE,
			economicActivityCode = economicActivityCodeE,
			fiscalResponsability = fiscalResponsabilityE,
			userType = userTypeE,
			name = nameE,
            updatedAt = NOW()
		WHERE
			userID = userIDE;
    COMMIT;
END &&
DELIMITER ;