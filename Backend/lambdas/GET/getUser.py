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
    try:
        cursorObject.execute("SELECT document, city, address, contactEmail, phone, economicActivityCode, fiscalResponsability, userType, name FROM dbMain.tblUsers WHERE userID = "+ id)
        row_headers = [x[0] for x in cursorObject.description]
        result = cursorObject.fetchall()
        jsonData = []
        for row in result:
            jsonData.append(dict(zip(row_headers, row)))
        print(jsonData)
        response = {
        'status' : 200,
        'body' : json.dumps(jsonData)
    }
    except:
        response = {
        'status' : 400
        }
    db.close()
    print(response)
    return response