import mysql.connector
import json
from fpdf import FPDF
import qrcode


def lambda_handler(event, context):
    #Connection with database
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

    #getting of client info
    try:
        query = "SELECT name, contactEmail, document, contactPhone, city, address FROM dbmain.tblClients WHERE clientID = " + str(data['bill']['clientID'])
        print(query)
        cursorObject.execute(query)
        row_headers = [x[0] for x in cursorObject.description]
        result = cursorObject.fetchall()
        jsonData = []
        for row in result:
            jsonData.append(dict(zip(row_headers, row)))
    except:
        print('Error en info del cliente')
        db.close()
        response = {
            'status' : 200,
            'body' : json.dumps({'Error': 'Error al consultar el cliente'})
        }
        return response
    print('infor del cliuente')
    print(jsonData)
    clientName = jsonData[0]['name']
    clientDocument = jsonData[0]['document']
    clientAddress = jsonData[0]['address']
    clientPhone= jsonData[0]['contactPhone']
    clientEmail= jsonData[0]['contactEmail']
    clientCity = jsonData[0]['city']

    #Parameters to generate document
    #GENERATE XML WOULD BE HERE BUT I DONT HAVE THE STRUCTURE YET
    #######################################
    #######################################
    #######################################
    #######################################
    #######################################
    XML = ''
    digitalSign = ""
    CUFE = "0be760180f7602c3e22392333df9ef771e5dcbae1a197dbc9b"
    lawDescription = "Sobre esta factura de venta se aplican las normas descritas en el articulo 5 ley 1231 de 2006."
    lawDescription2 = "El comprador declara haber recibido real y materialmente las mercancias o servicios descritos"
    lawDescription3 = "y el vendedor declara haber prestado los servicio o dado los productos"


    

    #getting of user info
    try:
        query = "SELECT name, contactEmail, document, phone, city, address FROM dbmain.tblUsers WHERE userID = " + str(data['bill']['userID'])
        print(query)
        cursorObject.execute(query)
        row_headers = [x[0] for x in cursorObject.description]
        result = cursorObject.fetchall()
        jsonData = []
        for row in result:
            jsonData.append(dict(zip(row_headers, row)))
    except:
        print('error con el usuario')
        db.close()
        response = {
            'status' : 200,
            'body' : json.dumps({'Error': 'Error al consultar el usuario'})
        }
        return response
    print('Informacion del usuario')
    print(jsonData)
    userName = jsonData[0]['name']
    userDocument = jsonData[0]['document']
    userAddress = jsonData[0]['address']
    userPhone = jsonData[0]['phone']
    userCity = jsonData[0]['city']
    userEmail = jsonData[0]['contactEmail']


    #getting of bill info
    try:
        query = "SELECT currentConsecutive, consecutiveAutorization, CAST(validUntil AS CHAR(50)) AS validUntil FROM dbmain.tblBillNumerations WHERE userAddID = " + str(data['bill']['userID']) + " AND status = 'ACTIVO'"
        print(query)
        cursorObject.execute(query)
        row_headers = [x[0] for x in cursorObject.description]
        result = cursorObject.fetchall()
        jsonData = []
        for row in result:
            jsonData.append(dict(zip(row_headers, row)))
    except:
        print('error en consecutivos')
        db.close()
        response = {
            'status' : 200,
            'body' : json.dumps({'Error': 'Error al consultar el usuario'})
        }
        return response
    print('Informacion de la factura')
    print(jsonData)
    autorization = jsonData[0]['consecutiveAutorization']
    validUntil = jsonData[0]['validUntil']
    consecutive = jsonData[0]['currentConsecutive']
    paymentMethod = data['bill']['paymentMethod']
    generationDate = data['bill']['generationDate']

    products = data['products']
    

    #Generate PDF
    fileName = clientName + '-' + str(consecutive) + ' ' +  data['bill']['generationDate']
    route = "testing.com/" + fileName
    img = qrcode.make("route")
    img.save(fileName + ".jpg")

    class PDF(FPDF):
        def header(self):
            #self.set_fill_color(200, 200, 200) #Fill Color
            self.image('logo.png', 10, 10, 25)
            #User Name
            self.set_font('helvetica', 'B', 13)
            self.cell(40)
            self.cell(40, 5, userName, border = 0, ln = 0, align = 'C')
            self.cell(55)
            self.cell(40, 5, "Factura Electronica # "+ str(consecutive), border = 0, ln = 0, align = 'C')
            self.ln(4)
            #User Document
            self.set_font('helvetica', '', 10)
            self.cell(40)
            self.cell(40, 5, userDocument, border = 0, ln = 0, align = 'C')
            self.ln(4)
            #User Address
            self.set_font('helvetica', '', 10)
            self.cell(40)
            self.cell(40, 5, userAddress, border = 0, ln = 0, align = 'C')
            self.ln(4)
            #User City
            self.set_font('helvetica', '', 10)
            self.cell(40)
            self.cell(40, 5, userCity, border = 0, ln = 0, align = 'C')
            self.cell(55)
            self.cell(40, 5, "Fecha Generacion: "+ generationDate, border = 0, ln = 0, align = 'C')
            self.ln(4)
            #User Phone
            self.set_font('helvetica', '', 10)
            self.cell(40)
            self.cell(40, 5, userPhone, border = 0, ln = 0, align = 'C')
            self.ln(4)
            #User Email
            self.set_font('helvetica', '', 10)
            self.cell(40)
            self.cell(40, 5, userEmail, border = 0, ln = 0, align = 'C')
            self.ln(4)
            #QR Code
            self.image(fileName + '.jpg', 110, 10, 25)
            self.ln(5)

        def footer(self):
            self.set_y(-15)
            self.set_font('helvetica', 'I', 10)
            self.set_text_color(169, 169, 169) #Text Color
            self.cell(0, 10, "Realizado con Sofware 'Provilling' Autoría de Fabio Anaya para Provilab SAS", align='C')
    
    pdf = PDF('P', 'mm', 'Letter') 
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto = True, margin = 15)
    pdf.add_page()
    pdf.set_font('helvetica',"",  10)
    #Client information
    pdf.cell(20)
    pdf.cell(160, 35, "", border = 0, ln = 0)
    pdf.ln(0.5)
    #Client Name
    pdf.cell(20)
    pdf.set_font('helvetica',"B",  10)
    pdf.cell(40, 10, "Nombre Cliente: ")
    pdf.set_font('helvetica',"",  10)
    pdf.cell(50, 10, clientName)
    pdf.ln(5)
    #Client Document
    pdf.cell(20)
    pdf.set_font('helvetica',"B",  10)
    pdf.cell(40, 10, "Documento: ")
    pdf.set_font('helvetica',"",  10)
    pdf.cell(50, 10, clientDocument)
    pdf.ln(5)
    #Client Address
    pdf.cell(20)
    pdf.set_font('helvetica',"B",  10)
    pdf.cell(40, 10, "Dirección: ")
    pdf.set_font('helvetica',"",  10)
    pdf.cell(50, 10, clientAddress)
    pdf.ln(5)
    #Client City
    pdf.cell(20)
    pdf.set_font('helvetica',"B",  10)
    pdf.cell(40, 10, "Ciudad: ")
    pdf.set_font('helvetica',"",  10)
    pdf.cell(50, 10, clientCity)
    pdf.ln(5)
    #Client Phone
    pdf.cell(20)
    pdf.set_font('helvetica',"B",  10)
    pdf.cell(40, 10, "Teléfono: ")
    pdf.set_font('helvetica',"",  10)
    pdf.cell(50, 10, clientPhone)
    pdf.ln(5)
    #Client Email
    pdf.cell(20)
    pdf.set_font('helvetica',"B",  10)
    pdf.cell(40, 10, "Correo Electrónico: ")
    pdf.set_font('helvetica',"",  10)
    pdf.cell(50, 10, clientEmail)
    pdf.ln(10)
    #Tabla de productos
    pdf.cell(195, 125, "", border = 1)#195
    pdf.ln(0)
    pdf.set_fill_color(200, 200, 200)
    pdf.cell(8, 10, "Item", border = 1, ln = 0, align= 'C', fill = 1)
    pdf.cell(20, 10, "Código", border = 1, ln = 0, align= 'C', fill = 1)
    pdf.cell(25, 10, "Producto", border = 1, ln = 0, align= 'C', fill = 1)
    pdf.cell(22, 10, "P.Unidad", border = 1, ln = 0, align= 'C', fill = 1)
    pdf.cell(8, 10, "Cant", border = 1, ln = 0, align= 'C', fill = 1)
    pdf.cell(24, 10, "Valor", border = 1, ln = 0, align= 'C', fill = 1)
    pdf.cell(20, 10, "Descuento", border = 1, ln = 0, align= 'C', fill = 1)
    pdf.cell(20, 10, "IVA", border = 1, ln = 0, align= 'C', fill = 1)
    pdf.cell(25, 10, "Imp Consumo", border = 1, ln = 0, align= 'C', fill = 1)
    pdf.cell(23, 10, "Total", border = 1, ln = 0, align= 'C', fill = 1)
    pdf.ln(10)
    #Products
    item = 1
    for product in products:
        print(product)
        pdf.cell(8, 5, str(item), border = 1, ln = 0, align= 'C')
        pdf.cell(20, 5, product['code'], border = 1, ln = 0, align= 'C')
        pdf.cell(25, 5, product['name'], border = 1, ln = 0, align= 'C')
        pdf.cell(22, 5, "${:,.2f}".format(product['value']), border = 1, ln = 0, align= 'C')
        pdf.cell(8, 5, str(product['quantity']), border = 1, ln = 0, align= 'C')
        pdf.cell(24, 5, "${:,.2f}".format(product['netValue']), border = 1, ln = 0, align= 'C')
        pdf.cell(20, 5, "${:,.2f}".format(product['discount']), border = 1, ln = 0, align= 'C')
        pdf.cell(20, 5, "${:,.2f}".format(product['iva']), border = 1, ln = 0, align= 'C')
        pdf.cell(25, 5, "${:,.2f}".format(product['consumption']), border = 1, ln = 0, align= 'C')
        pdf.cell(23, 5, "${:,.2f}".format(product['totalValue']), border = 1, ln = 0, align= 'C')
        pdf.ln(5)
        item = item + 1
    #Total
    pdf.ln(125 - len(products) * 5 - 5)
    pdf.set_font('helvetica',"B",  10)
    pdf.cell(15, 5, "Total Items: ", border = 0, ln = 0)
    pdf.set_font('helvetica',"",  10)
    pdf.cell(20, 5, str(len(products)), border = 0, ln = 0, align= 'C')
    pdf.cell(48)
    pdf.cell(24, 5, "${:,.2f}".format(data['bill']['total']), border = 1, ln = 0, align= 'C')
    pdf.cell(20, 5, "${:,.2f}".format(data['bill']['totalDiscount']), border = 1, ln = 0, align= 'C')
    pdf.cell(20, 5, "${:,.2f}".format(data['bill']['totalIVA']), border = 1, ln = 0, align= 'C')
    pdf.cell(25, 5, "${:,.2f}".format(data['bill']['totalConsumption']), border = 1, ln = 0, align= 'C')
    pdf.cell(23, 5, "${:,.2f}".format(data['bill']['totalValue']), border = 1, ln = 0, align= 'C')
    pdf.ln(5)
    pdf.cell(83)
    pdf.cell(112, 5,"Total", border = 1, ln = 0, align= 'C', fill = 1)
    pdf.ln(5)
    #Final description
    pdf.set_font('helvetica',"B",  10)
    pdf.cell(30, 5, "Metodo de Pago: ", border = 0, ln = 0)
    pdf.set_font('helvetica',"",  10)
    pdf.cell(20, 5, paymentMethod, border = 0, ln = 0)
    pdf.ln(15)
    pdf.set_text_color(200, 200, 200)
    pdf.set_font('helvetica',"",  10)
    pdf.cell(195, 5, lawDescription, border = 0, ln = 0, align = 'C')
    pdf.ln(5)
    pdf.cell(195, 5, lawDescription2, border = 0, ln = 0, align = 'C')
    pdf.ln(5)
    pdf.cell(195, 5, lawDescription3, border = 0, ln = 0, align = 'C')
    pdf.ln(5)
    pdf.cell(195, 5, "Autorización de consecutivos número: " + autorization + ". Valido hasta: " + validUntil, border = 0, ln = 0, align = 'C')
    pdf.ln(5)
    pdf.set_font('helvetica',"B",  10)
    pdf.cell(195, 5, "CUFE: " + CUFE + '. Fecha aprobación: ' + generationDate, border = 0, ln = 0, align = 'C')
    pdf.set_font('helvetica',"",  10)
    pdf.ln(5)
    pdf.cell(195, 5, "Factura Valida por 12 meses", border = 0, ln = 0, align = 'C')
    pdf.output(fileName + ".pdf")
    billRoute = "C:/Facturas"

    print("Ahora a insertar en base de datos")
    #Inserts to the database
    
    try:
        print(data['bill'])
        register = data['bill']
        queryInsert = "INSERT INTO dbMain.tblBills(consecutive,total,totalDiscount,totalIVA,totalConsumption,totalValue,paymentMethod,digitalSign,CUFE,XML,userID,clientID,validationDate,generationDate,route) VALUES ("+ str(consecutive)+","+str(register['total'])+","+str(register['totalDiscount'])+","+str(register['totalIVA'])+", "+str(register['totalConsumption'])+","+str(register['totalValue'])+", '"+register['paymentMethod']+"', '"+digitalSign+"', '"+CUFE+"', '"+XML+"',"+str(register['userID'])+","+str(register['clientID'])+", '"+register['generationDate']+"','"+register['generationDate']+"', '"+billRoute+"')"
        print(queryInsert)
        cursorObject.execute(queryInsert)
        billID = cursorObject.lastrowid
        db.commit()
        #queryUpdate = "CALL dbMain.uspCreateBill("+str(register['userID'])+","+str(register['total'])+","+str(register['totalDiscount'])+","+str(register['totalIVA'])+", "+str(register['totalConsumption'])+","+str(register['totalValue'])+", '"+register['paymentMethod']+"', '"+digitalSign+"', '"+CUFE+"', '"+XML+"',"+str(register['clientID'])+", '"+register['generationDate']+"', '"+billRoute+"')"
        queryUpdate = "UPDATE dbMain.tblbillnumerations SET currentConsecutive = "+str((consecutive + 1))+" WHERE userAddID = "+str(register['userID'])+" AND status = 'ACTIVO';"
        print(queryUpdate)
        cursorObject.execute(queryUpdate)
        db.commit() 
        cursorObject.execute(queryUpdate)
        
    except:
        print('error en al insertar factura')
        db.close()
        response = {
            'status' : 200,
            'body' : json.dumps({'Error': 'Error al crear la factura'})
        }
        return response

    # creating registers of products
    for register in data['products']:
        try:
            print(register)
            query = "CALL dbMain.uspCreateProductBill("+str(billID)+", "+str(register['id'])+", "+str(register['quantity'])+", "+str(register['value'])+", "+str(register['discount'])+", "+str(register['consumption'])+", "+str(register['iva'])+", "+str(register['totalValue'])+","+str(register['netValue'])+")"
            print(query)
            cursorObject.execute(query)
            db.commit()
        except:
            print('error al insertar productos')
            db.close()
            response = {
                'status' : 200,
                'body' : json.dumps({'Error': 'Error al agregar los productos a la factura'})
            }
            return response

    response = {
        'status' : 200,
        'body' : json.dumps({'Estado': 'Exito, factura creada satisfactoriamente'})
    }
    db.close()
    return response