/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Procedimiento que crea un nuevo producto
Ejemplo de ejecución:
	CALL dbMain.uspCreateProduct("Papa", "1", 3, 5, "Papa Capira", 1)
----------------------------------------------------------------------------------------
SELECT * FROM dbMain.tblProducts;
*/
DROP PROCEDURE IF EXISTS dbMain.uspCreateProduct;
DELIMITER &&
CREATE PROCEDURE dbMain.uspCreateProduct(
IN name VARCHAR(150),
IN code VARCHAR(50), 
IN stock INT UNSIGNED,
IN value FLOAT,
IN description VARCHAR(200),
IN userAddID INT
)
BEGIN
	SET @stockValue = stock * value;
    START TRANSACTION;
		INSERT INTO 
			dbMain.tblProducts
			(
			userID,
			name,
			code,
			stockValue,
			stock,
			value,
			description,
			createdAt
			)
			VALUES
			(
            userAddID,
			name,
			code,
			@stockValue,
			stock,
			value,
            description,
			NOW()
			);
	COMMIT;
END &&
DELIMITER ;