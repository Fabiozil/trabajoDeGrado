import mysql.connector
import json
  
def lambda_handler(event, context):
    db = mysql.connector.connect(
            host ="127.0.0.1",
            user = "root",
            passwd = "root123",
            database = "dbMain",
            auth_plugin='mysql_native_password'
    )
    print(event["queryStringParameters"])
    id = event["queryStringParameters"]["billID"]
    # preparing a cursor object
    cursorObject = db.cursor()
    
    # getting bill data
    query = "	SELECT C.name,C.city,C.contactPhone,C.address,C.document,C.contactEmail,B.totalValue,B.CUFE,CAST(B.validationDate AS CHAR(30)) AS validationDate,CAST(B.generationDate AS CHAR(30)) AS generationDate FROM dbMain.tblBills AS B	INNER JOIN dbMain.tblClients AS C ON (C.clientID = B.clientID) WHERE billID = "+ str(id)
    print(query)
    cursorObject.execute(query)
    row_headers = [x[0] for x in cursorObject.description]
    result = cursorObject.fetchall()
    jsonDataBill = []
    for row in result:
        jsonDataBill.append(dict(zip(row_headers, row)))
    print(jsonDataBill)

    # getting products data
    queryProducts = "SELECT BP.productID,P.code,P.name,BP.value,BP.quantity,BP.netValue,BP.discount,BP.iva,BP.consumption,BP.totalValue	FROM dbMain.tblBills AS B INNER JOIN dbMain.tblBillProduct AS BP ON (BP.billID = B.billID) INNER JOIN dbMain.tblProducts AS P ON (BP.productID = P.productID) WHERE B.billID = "+ str(id)
    print(queryProducts)
    cursorObject.execute(queryProducts)
    row_headers = [x[0] for x in cursorObject.description]
    result = cursorObject.fetchall()
    jsonDataProducts = []
    for row in result:
        jsonDataProducts.append(dict(zip(row_headers, row)))
    print(jsonDataProducts)

    db.close()

    response = {
        'status' : 200,
        'body' : json.dumps({'bill' : jsonDataBill,
        'products' : jsonDataProducts})
    }

    print(response)
    return response