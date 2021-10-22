import React, { useState } from "react";
var axios = require("axios");

function Bills() {
    const [registers, setRegisters] = useState([]);
    const [billId, setBillId] = useState("");
    const [name, setName] = useState("");
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
                        >
                            Mostrar
                        </button>
                    </div>
                </div>
            </div>
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Consecutivo</th>
                        <th scope="col">CUFE</th>
                        <th scope="col">ID Cliente</th>
                        <th scope="col">Tasa Consumo</th>
                        <th scope="col">Impuesto Consumo</th>
                        <th scope="col">IVA</th>
                        <th scope="col">Valor</th>
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
                                <td>{bill.CUFE}</td>
                                <td>{bill.clientID}</td>
                                <td>{bill.consuptionTaxRate}</td>
                                <td>{bill.conumptionTax}</td>
                                <td>{bill.ivaHolderQuality}</td>
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
    function searchBill() {}
}

export default Bills;
