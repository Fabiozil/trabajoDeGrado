import mysql.connector
import sys
import logging
import rds_config
import pymysql
import json
  
def lambda_handler(event, context):
    dataBase = mysql.connector.connect(
            host ="127.0.0.1",
            user = "root",
            password = "root123"
    )
    body = json.loads(event)
    print(body)
    id = body['clientID']
    # preparing a cursor object
    cursorObject = dataBase.cursor()
    
    # creating database
    cursorObject.execute("SELECT * FROM dbMain.tblClients WHERE clientID = "+ id)
    print(id)
    result = cursor.fetchall()

    dataBase.close()

    return result
