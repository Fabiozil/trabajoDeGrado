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
    id = event["queryStringParameters"]["userID"]
    # preparing a cursor object
    cursorObject = db.cursor()
    
    # creating database
    cursorObject.execute("SELECT clientID, name, clientType, document, contactName, contactEmail, phone, contactPhone, address, fiscalResponsability FROM dbMain.tblClients WHERE userID = "+ id)
    row_headers = [x[0] for x in cursorObject.description]
    result = cursorObject.fetchall()
    jsonData = []
    for row in result:
        jsonData.append(dict(zip(row_headers, row)))
    print(result[0])
    print(jsonData)
    db.close()

    response = {
        'status' : 200,
        'body' : json.dumps(jsonData)
    }
    return response