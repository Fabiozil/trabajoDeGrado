from fpdf import FPDF
import qrcode

fileName = "facturita"
route = "google.com/" + fileName
img = qrcode.make("route")
img.save(fileName + ".jpg")
userName = "Provilab SAS"
userDocument = "1152716365"
userAddress = "Calle 67 #54 - 365"
userPhone = "301 5267 553"
userCity = "Rionegro, Antioquia"
userEmail = "fabioanayac@outlook.com"
clientName = "Fabio Anaya"
clientDocument = "1152716365"
clientAddress = "Diagonal 32D #32 sur 39"
clientPhone= "331 40 12"
clientEmail= "acostacostademarfil@gmail.com"
clientCity = "Rionegro, Antioquia"
products = [{ 'code': 'papa01', 'productName': 'papa', 'value': 1000, 'quantity': 2, 'total': 2000, 'discount': 0, 'IVA': 0, 'consumption': 0, 'total':2000 }]
paymentMethod = "Efectivo"
autorization = "2123123"
validUntil = "20210909"
lawDescription = "Sobre esta factura de venta se aplican las normas descritas en el articulo 5 ley 1231 de 2006."
lawDescription2 = "El comprador declara haber recibido real y materialmente las mercancias o servicios descritos"
lawDescription3 = "y el vendedor declara haber prestado los servicio o dado los productos"
CUFE = "0be760180f7602c3e22392333df9ef771e5dcbae1a197dbc9b"
generationDate = '2021-10-25'
consecutive = '245723'

class PDF(FPDF):
    def header(self):
        #self.set_fill_color(200, 200, 200) #Fill Color
        self.image('logo.png', 10, 10, 25)
        #User Name
        self.set_font('helvetica', 'B', 13)
        self.cell(40)
        self.cell(40, 5, userName, border = 0, ln = 0, align = 'C')
        self.cell(55)
        self.cell(40, 5, "Factura Electronica # "+ consecutive, border = 0, ln = 0, align = 'C')
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
        self.image(fileName + '.jpg', 100, 10, 25)
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
pdf.cell(195, 125, "", border = 1)
pdf.ln(0)
pdf.set_fill_color(200, 200, 200)
pdf.cell(15, 10, "Item #", border = 1, ln = 0, align= 'C', fill = 1)
pdf.cell(20, 10, "Código", border = 1, ln = 0, align= 'C', fill = 1)
pdf.cell(20, 10, "Producto", border = 1, ln = 0, align= 'C', fill = 1)
pdf.cell(20, 10, "P.Unidad", border = 1, ln = 0, align= 'C', fill = 1)
pdf.cell(20, 10, "Cantidad", border = 1, ln = 0, align= 'C', fill = 1)
pdf.cell(20, 10, "Valor", border = 1, ln = 0, align= 'C', fill = 1)
pdf.cell(20, 10, "Descuento", border = 1, ln = 0, align= 'C', fill = 1)
pdf.cell(15, 10, "IVA", border = 1, ln = 0, align= 'C', fill = 1)
pdf.cell(25, 10, "Imp Consumo", border = 1, ln = 0, align= 'C', fill = 1)
pdf.cell(20, 10, "Total", border = 1, ln = 0, align= 'C', fill = 1)
pdf.ln(10)
#Products
for product in products:
    print(product)
    pdf.cell(15, 5, "Item #", border = 1, ln = 0, align= 'C')
    pdf.cell(20, 5, product['code'], border = 1, ln = 0, align= 'C')
    pdf.cell(20, 5, product['productName'], border = 1, ln = 0, align= 'C')
    pdf.cell(20, 5, "P.Unidad", border = 1, ln = 0, align= 'C')
    pdf.cell(20, 5, "Cantidad", border = 1, ln = 0, align= 'C')
    pdf.cell(20, 5, "Valor", border = 1, ln = 0, align= 'C')
    pdf.cell(20, 5, "Descuento", border = 1, ln = 0, align= 'C')
    pdf.cell(15, 5, "IVA", border = 1, ln = 0, align= 'C')
    pdf.cell(25, 5, "Imp Consumo", border = 1, ln = 0, align= 'C')
    pdf.cell(20, 5, "Total", border = 1, ln = 0, align= 'C')
    pdf.ln(0)
#Total
pdf.ln(125 - len(products) * 5 - 5)
pdf.set_font('helvetica',"B",  10)
pdf.cell(15, 5, "Total Items: ", border = 0, ln = 0)
pdf.set_font('helvetica',"",  10)
pdf.cell(20, 5, str(len(products)), border = 0, ln = 0, align= 'C')
pdf.cell(80)
pdf.cell(20, 5, "Descuento", border = 1, ln = 0, align= 'C')
pdf.cell(15, 5, "IVA", border = 1, ln = 0, align= 'C')
pdf.cell(25, 5, "Imp Consumo", border = 1, ln = 0, align= 'C')
pdf.cell(20, 5, "Total", border = 1, ln = 0, align= 'C')
pdf.ln(5)
pdf.cell(115)
pdf.cell(80, 5, "Total", border = 1, ln = 0, align= 'C', fill = 1)
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
pdf.cell(195, 5, "Autorización de consecutivos número: " + autorization + ". Valida hasta: " + validUntil, border = 0, ln = 0, align = 'C')
pdf.ln(5)
pdf.set_font('helvetica',"B",  10)
pdf.cell(195, 5, "CUFE: " + CUFE, border = 0, ln = 0, align = 'C')
pdf.ln(5)
pdf.set_font('helvetica',"",  10)
pdf.cell(195, 5, "Factura Valida por 12 meses " + CUFE, border = 0, ln = 0, align = 'C')

pdf.output(fileName + ".pdf")