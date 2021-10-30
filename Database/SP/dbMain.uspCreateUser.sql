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
SELECT * FROM dbMain.tblbillenum
*/
DROP PROCEDURE IF EXISTS dbMain.uspCreateUser;
DELIMITER &&
CREATE PROCEDURE dbMain.uspCreateUser(
IN document VARCHAR(20),
IN city VARCHAR(50),
IN address VARCHAR(100),
IN contactEmail VARCHAR(150),
IN phone VARCHAR(20),
IN economicActivityCode VARCHAR(50),
IN fiscalResponsability VARCHAR(50),
IN userType VARCHAR(10),
IN name VARCHAR(150)
)
BEGIN
    
	START TRANSACTION;
		INSERT INTO
			dbMain.tblUsers
			(
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
			document,
			city,
			address,
			contactEmail,
			phone,
			economicActivityCode,
			fiscalResponsabilityValue,
			userType,
			name,
            NOW()
            );
    COMMIT;
END &&
DELIMITER ;