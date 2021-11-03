/*
Autor:
	Fabio Anaya
Fecha:
	9/19/2021
Descripción:
	Procedimiento que retorna los productos asociados a una factura
Ejemplo de ejecución:
    CALL dbMain.uspGetBillProducts(20)
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblUsers;
SELECT * FROM dbMain.tblbills;
SELECT * FROM dbMain.tblbillnumerations;
SELECT * FROM dbMain.tblBillProduct;
SELECT * FROM dbMain.tblProducts;
*/

DROP PROCEDURE IF EXISTS dbMain.uspGetBillProducts;
DELIMITER &&
CREATE PROCEDURE dbMain.uspGetBillProducts(
IN billIDS INT UNSIGNED
)
BEGIN
	SELECT
		BP.productID,
        P.code,
        P.name,
        BP.value,
        BP.quantity,
        BP.netValue,
        BP.discount,
        BP.iva,
        BP.consumption,
        BP.totalValue
	FROM
		dbMain.tblBills AS B
		INNER JOIN dbMain.tblBillProduct AS BP
        ON (BP.billID = B.billID)
        INNER JOIN dbMain.tblProducts AS P
        ON (BP.productID = P.productID)
	WHERE B.billID = billIDS;
END &&
DELIMITER ;