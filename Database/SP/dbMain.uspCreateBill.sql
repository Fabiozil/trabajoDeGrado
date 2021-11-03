/*
Autor:
	Fabio Anaya
Fecha:
	9/19/2021
Descripción:
	Creación de factura nueva
Ejemplo de ejecución:
	CALL dbMain.uspCreateBill(1, "1152716365", "Rionegro", "Calle 67 #54 365", "fabioanayac@outlook.com", "3015267553", 2, 1, "NATURAL", "Fabio Enrique Anaya")
    CALL dbMain.uspCreateBill(1,20000,2000,3800, 1200,23000, 'Transferencia', '', '0be760180f7602c3e22392333df9ef771e5dcbae1a197dbc9b', '', 1, '2021-11-01', 'C:/Facturas')
    CALL dbMain.uspCreateBill(1,0,0,0, 0,0, 'Cheque', '', '0be760180f7602c3e22392333df9ef771e5dcbae1a197dbc9b', '',3, '2021-11-01', 'C:/Facturas')
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblUsers;
SELECT * FROM dbMain.tblbills;
SELECT * FROM dbMain.tblbillnumerations;
CREATE TABLE prueba (ID INT UNSIGNED AUTO_INCREMENT UNIQUE, nombre VARCHAR(100))
*/
DROP PROCEDURE IF EXISTS dbMain.uspCreateBill;
DELIMITER &&
CREATE PROCEDURE dbMain.uspCreateBill(
IN userID INT UNSIGNED,
IN total FLOAT,
IN totalDiscount FLOAT,
IN totalIVA FLOAT,
IN totalConsumption FLOAT,
IN totalValue FLOAT,
IN paymentMethod VARCHAR(50),
IN digitalSign VARCHAR(20),
IN CUFE VARCHAR(100),
IN XML VARCHAR(500),
IN clientID VARCHAR(10),
IN generationDate DATE,
IN route VARCHAR(100)
)
BEGIN
	SET @consecutive = (SELECT currentConsecutive FROM dbMain.tblbillnumerations WHERE userAddID = userID AND status = 'ACTIVO');
-- 	START TRANSACTION;
-- 		INSERT INTO
-- 			dbMain.tblBills
-- 			(
-- 			consecutive,
--             total,
--             totalDiscount,
--             totalIVA,
--             totalConsumption,
-- 			totalValue,
-- 			paymentMethod,
-- 			digitalSign,
-- 			CUFE,
-- 			XML,
-- 			userID,
-- 			clientID,
-- 			validationDate,
-- 			generationDate,
-- 			route
--             )
-- 		VALUES
-- 			(
--             @consecutive,
--             total,
--             totalDiscount,
--             totalIVA,
--             totalConsumption,
--             totalValue,
--             paymentMethod,
--             digitalSign,
--             CUFE,
--             XML,
--             userID,
--             clientID,
--             NOW(),
--             generationDate,
--             route
--             )
--             ;
--     COMMIT;
    START TRANSACTION;
		UPDATE
			dbMain.tblbillnumerations
		SET
			currentConsecutive = @consecutive + 1
		WHERE 
			userAddID = userID AND status = 'ACTIVO';
    COMMIT;
    
END &&
DELIMITER ;