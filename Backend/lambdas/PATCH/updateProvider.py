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
    
    # creating database
    for register in data['providers']:
        try:
            print(register)
            query = "CALL dbMain.uspUpdateProvider('"+register['name']+"', '"+register['document']+"', '"+register['phone']+"', '"+register['email']+"', '"+register['address']+"', "+str(register['providerID'])+")"
            print(query)
            cursorObject.execute(query)
            db.commit()
        except:
            db.close()
            response = {
                'status' : 200,
                'body' : json.dumps({'Error': 'Error al actualizar registros'})
            }
            return response
    
    response = {
        'status' : 200,
        'body' : json.dumps({'Estado': 'Exito, registros actualizados'})
    }
    db.close()
    return response