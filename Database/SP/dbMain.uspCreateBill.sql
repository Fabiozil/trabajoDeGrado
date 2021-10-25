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
*/
DROP PROCEDURE IF EXISTS dbMain.uspCreateBill;
DELIMITER &&
CREATE PROCEDURE dbMain.uspCreateBill(
IN userID INT UNSIGNED,
IN totalValue VARCHAR(20),
IN paymentMethod VARCHAR(50),
IN ivaHolderQuality VARCHAR(100),
IN consumptionTax VARCHAR(150),
IN digitalSign VARCHAR(20),
IN CUFE INT,
IN XML INT,
IN QRCode VARCHAR(10),
IN clientID VARCHAR(10),
IN validationDate VARCHAR(10),
IN generationDate VARCHAR(10),
IN route VARCHAR(10)
)
BEGIN
	SET @consecutive = (SELECT * FROM dbMain.tblbillnumeration WHERE userID = userID)
    
	START TRANSACTION;
		INSERT INTO
			dbMain.tblBills
			(
			consecutive,
			totalValue,
			paymentMethod,
			ivaHolderQuality,
			consumptionTax,
			digitalSign,
			CUFE,
			XML,
			QRCode,
			userID,
			clientID,
			validationDate,
			generationDate,
			route
            )
		VALUES
			(
            )
            ;
    COMMIT;
END &&
DELIMITER ;