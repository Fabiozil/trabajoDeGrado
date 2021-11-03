/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Procedimiento que crea un nuevo producto
Ejemplo de ejecución:
	CALL dbMain.uspUpdateProduct('Papota', '1', 5, 'Papa Capira', 1)
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblProducts;

*/
DROP PROCEDURE IF EXISTS dbMain.uspUpdateProduct;
DELIMITER &&
CREATE PROCEDURE dbMain.uspUpdateProduct(
IN nameE VARCHAR(150),
IN codeE VARCHAR(50), 
IN valueE FLOAT,
IN descriptionE VARCHAR(200),
IN productIDE INT,
IN stockE INT
)
BEGIN
	#SET @stock = (SELECT stock FROM dbMain.tblProducts WHERE productID = productIDE);
    #SELECT @stock;
	SET @stockValue = stockE * valueE;
    START TRANSACTION;
		UPDATE
			dbMain.tblProducts
		SET
			name = nameE,
            code = codeE,
            value = valueE,
            description = descriptionE,
            stockValue = @stockValue,
            updatedAt = NOW(),
            stock = stockE
		WHERE
			productID = productIDE;
	COMMIT;
END &&
DELIMITER ;