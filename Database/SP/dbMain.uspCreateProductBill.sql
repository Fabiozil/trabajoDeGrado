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
SELECT * FROM dbMain.tblBillProduct;
SELECT * FROM dbMain.tblProducts;
*/
DROP PROCEDURE IF EXISTS dbMain.uspCreateProductBill;
DELIMITER &&
CREATE PROCEDURE dbMain.uspCreateProductBill(
IN billID INT UNSIGNED,
IN productID INT UNSIGNED,
IN quantity INT UNSIGNED,
IN value FLOAT,
IN discount FLOAT,
IN consumptionTax FLOAT,
IN IVA FLOAT,
IN totalValue FLOAT
)
BEGIN
	SET @stock = (SELECT stock FROM dbMain.tblProducts WHERE productID = productID);
    
	START TRANSACTION;
		INSERT INTO
			dbMain.tblProductBill
			(
			billID,
			productID,
			quantity,
			value,
            discount,
			consumptionTax,
			IVA,
			totalValue,
			createdAt
            )
		VALUES
			(
            billID,
            productID,
            quantity,
            value,
            discount,
           consumptionTax,
            IVA,
            totalValue,
            NOW()
            )
            ;
    COMMIT;
    START TRANSACTION;
		UPDATE
			dbMain.tblProducts
		SET
			stock = stock - @stock
		WHERE 
			productID = productID;
    COMMIT;
    
END &&
DELIMITER ;