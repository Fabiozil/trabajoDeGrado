/*
Autor:
	Fabio Anaya
Fecha:
	9/19/2021
Descripción:
	Creación de factura nueva
Ejemplo de ejecución:
	CALL dbMain.uspCreateBill(1, "1152716365", "Rionegro", "Calle 67 #54 365", "fabioanayac@outlook.com", "3015267553", 2, 1, "NATURAL", "Fabio Enrique Anaya")
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblUsers;
SELECT * FROM dbMain.tblbills;
SELECT * FROM dbMain.tblbillnumerations;
*/
DROP PROCEDURE IF EXISTS dbMain.uspCreateBill;
DELIMITER &&
CREATE PROCEDURE dbMain.uspCreateBill(
IN userID INT UNSIGNED,
IN totalValue FLOAT,
IN paymentMethod VARCHAR(50),
IN tax FLOAT,
IN digitalSign VARCHAR(20),
IN CUFE VARCHAR(100),
IN XML VARCHAR(500),
IN clientID VARCHAR(10),
IN generationDate DATE,
IN route VARCHAR(100)
)
BEGIN
	SET @consecutive = (SELECT currentConsecutive FROM dbMain.tblbillnumeration WHERE userID = userID AND status = 'ACTIVA');
    
	START TRANSACTION;
		INSERT INTO
			dbMain.tblBills
			(
			consecutive,
			totalValue,
			paymentMethod,
			tax,
			digitalSign,
			CUFE,
			XML,
			userID,
			clientID,
			validationDate,
			generationDate,
			route
            )
		VALUES
			(
            consecutive,
            totalValue,
            paymentMethod,
            tax,
            digitalSign,
            CUFE,
            XML,
            userID,
            clientID,
            NOW(),
            generationDate,
            route
            )
            ;
    COMMIT;
    START TRANSACTION;
		UPDATE
			dbMain.tblbillnumeration
		SET
			currentConsecutive = @consecutive + 1
		WHERE 
			userID = userID AND status = 'ACTIVA';
    COMMIT;
    
END &&
DELIMITER ;