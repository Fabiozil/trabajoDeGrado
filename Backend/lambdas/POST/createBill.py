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
    data = json.loads(event['body'])
    # preparing a cursor object
    cursorObject = db.cursor()
    
    # creating bill
    try:
        print(data['bill'])
        register = data['bill']
        query = "CALL dbMain.uspCreateBill('"+register['name']+"', '"+register['clientType']+"', '"+register['document']+"', '"+register['contactName']+"', '"+register['contactEmail']+"', '"+register['phone']+"', '"+register['contactPhone']+"', '"+register['address']+"','"+register['fiscalResponsability']+"', "+str(register['userAddID'])+")"
        print(query)
        cursorObject.execute(query)
        db.commit()
    except:
        db.close()
        response = {
            'status' : 200,
            'body' : json.dumps({'Error': 'Error al insertar registros'})
        }
        return response

    # creating registers of products
    for register in data['products']:
        try:
            print(register)
            query = "CALL dbMain.uspCreateProductBill('"+register['name']+"', '"+register['clientType']+"', '"+register['document']+"', '"+register['contactName']+"', '"+register['contactEmail']+"', '"+register['phone']+"', '"+register['contactPhone']+"', '"+register['address']+"','"+register['fiscalResponsability']+"', "+str(register['userAddID'])+")"
            print(query)
            cursorObject.execute(query)
            db.commit()
        except:
            db.close()
            response = {
                'status' : 200,
                'body' : json.dumps({'Error': 'Error al insertar registros'})
            }
            return response
    
    response = {
        'status' : 200,
        'body' : json.dumps({'Estado': 'Exito, registros ingresados'})
    }
    db.close()
    return response