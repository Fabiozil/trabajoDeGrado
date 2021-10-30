/*
Autor:
	Fabio Anaya
Fecha:
	9/18/2021
Descripción:
	Creación de tablas intermedias
----------------------------------------------------------------------------------------
*/
DROP TABLE IF EXISTS dbMain.tblDeliverProduct;
DROP TABLE IF EXISTS dbMain.tblProviderUser;
DROP TABLE IF EXISTS dbMain.tblProductUser;
DROP TABLE IF EXISTS dbMain.tblClientUser;
DROP TABLE IF EXISTS dbMain.tblBillProduct;
CREATE TABLE 
	dbMain.tblDeliverProduct
    (
    deliverProductID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    providerID INT UNSIGNED NOT NULL,
    productID INT UNSIGNED NOT NULL,
    createdAt DATETIME NOT NULL
    );
    
CREATE TABLE 
	dbMain.tblBillProduct
    (
    billProductID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    billID INT UNSIGNED NOT NULL,
    productID INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    value FLOAT NOT NULL,
    consumptionTax FLOAT NOT NULL,
    IVA FLOAT NOT NULL,
    totalValue FLOAT NOT NULL,
    createdAt DATETIME NOT NULL
    );
/*
CREATE TABLE 
	dbMain.tblProviderUser
    (
    providerUserID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    providerID INT UNSIGNED NOT NULL,
    userID INT UNSIGNED NOT NULL,
    createdAt DATETIME NOT NULL
CREATE TABLE 
	dbMain.tblProductUser
    (
    productUserID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    productID INT UNSIGNED NOT NULL,
    userID INT UNSIGNED NOT NULL,
    createdAt DATETIME NOT NULL
    );
CREATE TABLE 
	dbMain.tblClientUser
    (
    clientUserID INT UNSIGNED AUTO_INCREMENT UNIQUE,
    clientID INT UNSIGNED NOT NULL,
    userID INT UNSIGNED NOT NULL,
    createdAt DATETIME NOT NULL
    );
*/
    

    