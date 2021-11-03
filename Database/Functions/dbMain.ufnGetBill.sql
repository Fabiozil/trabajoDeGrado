/*
Autor:
	Fabio Anaya
Fecha:
	9/19/2021
Descripción:
	Procedimiento que retorna los datos necesarios para mostrar una factura en aplicación
Ejemplo de ejecución:
    CALL dbMain.uspGetBill(20)
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblUsers;
SELECT * FROM dbMain.tblbills;
SELECT * FROM dbMain.tblbillnumerations;
SELECT * FROM dbMain.tblBillProduct;
SELECT * FROM dbMain.tblProducts;
*/

DROP PROCEDURE IF EXISTS dbMain.uspGetBill;
DELIMITER &&
CREATE PROCEDURE dbMain.uspGetBill(
IN billIDS INT UNSIGNED
)
BEGIN
	SELECT
		C.name,
        C.city,
        C.contactPhone,
        C.address,
        C.document,
        C.contactEmail,
        B.totalValue,
        B.CUFE,
        CAST(B.validationDate AS CHAR(30)) AS validationDate,
        CAST(B.generationDate AS CHAR(30)) AS generationDate
	FROM
		dbMain.tblBills AS B
		INNER JOIN dbMain.tblClients AS C
        ON (C.clientID = B.clientID)
	WHERE billID = billIDS;
END &&
DELIMITER ;