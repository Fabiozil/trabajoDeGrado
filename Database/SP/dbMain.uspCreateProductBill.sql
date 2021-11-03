/*
Autor:
	Fabio Anaya
Fecha:
	9/19/2021
Descripción:
	Creación de relación entre producto y factura
Ejemplo de ejecución:
    CALL dbMain.uspCreateProductBill(15, 5, 2, 14000, 840, 280, 280, 27720,28000)
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
IN productIDS INT UNSIGNED,
IN quantity INT UNSIGNED,
IN value FLOAT,
IN discount FLOAT,
IN consumption FLOAT,
IN iva FLOAT,
IN totalValue FLOAT,
IN netValue FLOAT
)
BEGIN
	SET @stock = (SELECT stock FROM dbMain.tblProducts WHERE productID = productIDS);
    
	START TRANSACTION;
		INSERT INTO
			dbMain.tblBillProduct
			(
			billID,
			productID,
			quantity,
			value,
            discount,
			consumption,
			iva,
			totalValue,
            netValue,
			createdAt
            )
		VALUES
			(
            billID,
            productIDS,
            quantity,
            value,
            discount,
           consumption,
            iva,
            totalValue,
            netValue,
            NOW()
            )
            ;
    COMMIT;
    START TRANSACTION;
		UPDATE
			dbMain.tblProducts
		SET
			stock = @stock - quantity
		WHERE 
			productID = productIDS;
    COMMIT;
    
END &&
DELIMITER ;