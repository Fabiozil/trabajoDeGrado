import React, { useState } from "react";
var axios = require("axios");

function Bills() {
    const [registers, setRegisters] = useState([]);
    const [billId, setBillId] = useState("");
    const [name, setName] = useState("");
    const [showInfo, setShowInfo] = useState(false);
    //States for displaying the bill information
    const [products, setProducts] = useState([]);
    const [bill, setBill] = useState([{ name: "" }]);
    //const [clientName, setClientName] = useState("");

    // getting of user bills
    var config = {
        method: "get",
        url: "http://localhost:3000/dev/getBills?userID=1",
        headers: {},
    };
    React.useEffect(
        () =>
            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setRegisters(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                }),
        []
    );

    // function for getting bill info
    function searchBill() {
        var config = {
            method: "get",
            url: "http://localhost:3000/dev/getBill?billID=" + billId,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                if (response.status === 400) {
                    alert("Error en el servidor, contacte con soporte");
                    setShowInfo(false);
                } else {
                    alert("Factura encontrada");
                    setProducts(response.data.products);
                    setShowInfo(true);
                    setBill(response.data.bill);
                    console.log(response.data.products);
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Verifique el ID ingresado");
                setShowInfo(false);
            });
    }

    return (
        <div className="col-12">
            <h1> Facturas </h1>
            <div className="border-solid border shadow p-3">
                <h4 className="mb-0">Revisar Detalle</h4>
                <small className="text-muted mt-0 pt-0 sub-sup-font-size">
                    Para revisar detalle de las facturas y descargarlas ingresa
                    su ID y presionar mostrar
                </small>
                <div className="row mt-3">
                    <div class="col-auto">
                        <input
                            type="text"
                            class="form-control"
                            id="inputClientID"
                            placeholder="ID Factura"
                            value={billId}
                            onInput={(text) => setBillId(text.target.value)}
                        />
                    </div>
                    <div class="col-auto">
                        <button
                            type="submit"
                            class="btn btn-primary mb-3"
                            onClick={searchBill}
                            data-toggle="modal"
                            data-target=".bd-example-modal-lg"
                        >
                            Mostrar
                        </button>
                    </div>
                </div>
            </div>
            <div
                className="border-solid border shadow p-3 mt-3 mb-3"
                hidden={!showInfo}
            >
                <h4 className="mb-0">Información de Factura</h4>
                <div className="row mt-3">
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Nombre Cliente
                            </span>
                            <input
                                type="text"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                disabled={true}
                                value={bill[0].name}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Correo Contacto
                            </span>
                            <input
                                type="text"
                                class="form-control"
                                disabled={true}
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={bill[0].contactEmail}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Número Contacto
                            </span>
                            <input
                                type="text"
                                disabled={true}
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={bill[0].contactPhone}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Ciudad
                            </span>
                            <input
                                type="text"
                                disabled={true}
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={bill[0].city}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Dirección
                            </span>
                            <input
                                type="text"
                                class="form-control"
                                disabled={true}
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={bill[0].address}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Documento
                            </span>
                            <input
                                type="text"
                                class="form-control"
                                disabled={true}
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={bill[0].document}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                CUFE
                            </span>
                            <input
                                type="text"
                                class="form-control"
                                disabled={true}
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={bill[0].city}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Fecha Generación
                            </span>
                            <input
                                type="text"
                                class="form-control"
                                disabled={true}
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={bill[0].document}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Valor Total
                            </span>
                            <input
                                type="text"
                                class="form-control"
                                disabled={true}
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={bill[0].address}
                            />
                        </div>
                    </div>
                </div>
                <h4 className="mb-0">Productos</h4>
                <table class="table table-striped mt-3 border border-solid">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Valor Neto</th>
                            <th scope="col">Descuento</th>
                            <th scope="col">IVA</th>
                            <th scope="col">Impuesto Consumo</th>
                            <th scope="col">Valor Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {registers.length === 0 ? (
                            <tr>
                                <td>
                                    La factura no tuvo productos registrados
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr>
                                    <th scope="row">{product.productID}</th>
                                    <td>{product.code}</td>
                                    <td>{product.name}</td>
                                    <td>{product.value}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.netValue}</td>
                                    <td>{product.discount}</td>
                                    <td>{product.iva}</td>
                                    <td>{product.consumption}</td>
                                    <td>{product.totalValue}</td>
                                </tr>
                            ))
                        )}
                        <tr>
                            <th scope="row">Total</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{bill[0].totalValue}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Consecutivo</th>
                        <th scope="col">ID Cliente</th>
                        <th scope="col">Total Neto</th>
                        <th scope="col">Descuento</th>
                        <th scope="col">Impuesto Consumo</th>
                        <th scope="col">IVA</th>
                        <th scope="col">Valor Total</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Fecha Validacion</th>
                    </tr>
                </thead>
                <tbody>
                    {registers.length === 0 ? (
                        <tr>
                            <td>No existen Facturas registradas</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ) : (
                        registers.map((bill) => (
                            <tr>
                                <th scope="row">{bill.billID}</th>
                                <td>{bill.consecutive}</td>
                                <td>{bill.clientID}</td>
                                <td>{bill.total}</td>
                                <td>{bill.totalDiscount}</td>
                                <td>{bill.totalConsumption}</td>
                                <td>{bill.totalIVA}</td>
                                <td>{bill.totalValue}</td>
                                <td>{bill.generationDate}</td>
                                <td>{bill.validationDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Bills;
