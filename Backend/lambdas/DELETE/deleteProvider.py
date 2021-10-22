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
    print(data)
    # preparing a cursor object
    cursorObject = db.cursor()
    
    # creating database
    for register in data['providers']:
        try:
            print(register)
            query = "DELETE FROM dbmain.tblProviders WHERE providerID = "+str(register['providerID'])
            print(query)
            cursorObject.execute(query)
            db.commit()
        except:
            db.close()
            response = {
                'status' : 200,
                'body' : json.dumps({'Error': 'Error al eliminar el registro'})
            }
            return response
    
    response = {
        'status' : 200,
        'body' : json.dumps({'Estado': 'Exito, registro eliminado'})
    }
    db.close()
    return response