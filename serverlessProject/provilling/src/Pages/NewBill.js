import React, { useState, useCallback } from "react";
var axios = require("axios");

function NewBill() {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [clientID, setClientID] = useState(0);
    const [clientRegisters, setClientRegisters] = useState([]);
    const [productRegisters, setProductRegisters] = useState([]);
    const [date, setDate] = useState(new Date());
    const [quantity, setQuantity] = useState("");
    const [discount, setDiscount] = useState(0);
    const [iva, setIVA] = useState(0);
    const [consumption, setConsumption] = useState(0);
    const [productID, setProductID] = useState(0);
    const [productsOnBill, setProductsOnBill] = useState([]);
    const [numerationStatus, setNumerationStatus] = useState(false);
    const [userID, setUserID] = useState(1);

    var config = {
        method: "get",
        url: "http://localhost:3000/dev/getClients?userID=1",
        headers: {},
    };

    React.useEffect(
        () =>
            axios(config)
                .then(function (response) {
                    setClientRegisters(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                }),
        []
    );

    var configProducts = {
        method: "get",
        url: "http://localhost:3000/dev/getProducts?userID=1",
        headers: {},
    };
    React.useEffect(
        () =>
            axios(configProducts)
                .then(function (response) {
                    setProductRegisters(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                }),
        []
    );

    var configNumerations = {
        method: "get",
        url: "http://localhost:3000/dev/getNumerationStatus?userID=1",
        headers: {},
    };

    React.useEffect(
        () =>
            axios(configNumerations)
                .then(function (response) {
                    if (response.data[0]["Count"] == 1) {
                        setNumerationStatus(true);
                    } else {
                        alert(
                            "Verifique por favor los consecutivos activos, debe de ser solo uno. Hasta que no corrija no podrá generar facturas"
                        );
                    }
                })
                .catch(function (error) {
                    console.log(error);
                }),
        []
    );

    function addProduct() {
        var axios = require("axios");
        var config = {
            method: "get",
            url: "http://localhost:3000/dev/getProduct?productID=" + productID,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                if (
                    response.data[0]["stock"] <
                    parseInt(quantity) + countOnBill(productID)
                ) {
                    alert(
                        "Cantidad ingresada invalida, no hay suficiente stock del producto"
                    );
                    return;
                } else {
                    var nuevoProducto = {
                        id: response.data[0]["productID"],
                        code: response.data[0]["code"],
                        name: response.data[0]["name"],
                        value: response.data[0]["value"],
                        quantity: quantity,
                        netValue: quantity * response.data[0]["value"],
                        discount:
                            quantity *
                            response.data[0]["value"] *
                            (discount / 100),
                        iva: quantity * response.data[0]["value"] * (iva / 100),
                        consumption:
                            quantity *
                            response.data[0]["value"] *
                            (consumption / 100),
                        totalValue:
                            quantity * response.data[0]["value"] +
                            quantity * response.data[0]["value"] * (iva / 100) +
                            quantity *
                                response.data[0]["value"] *
                                (consumption / 100) -
                            quantity *
                                response.data[0]["value"] *
                                (discount / 100),
                    };
                    setProductsOnBill((prevValue) => [
                        ...prevValue,
                        nuevoProducto,
                    ]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function countOnBill(IDToSearch) {
        var count = 0;
        productsOnBill.forEach((product) => {
            if (product.id === IDToSearch) {
                count += parseInt(product.quantity);
            }
        });
        return count;
    }

    function generateBill() {
        var axios = require("axios");
        var data = JSON.stringify({
            products: productsOnBill,
            bill: {
                clientID: clientID,
                userID: userID,
                total: total,
                totalDiscount: totalDiscount,
                totalIVA: totalIVA,
                totalConsumption: totalConsumption,
                totalValue: totalValue,
                generationDate: date,
                paymentMethod: paymentMethod,
            },
        });

        console.log(data);

        var config = {
            method: "post",
            url: "http://localhost:3000/dev/createBill",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                if (response.status === 400) {
                    alert("Error en el servidor, contacte con soporte");
                } else {
                    alert("Factura creada satisfactoriamente");
                }
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                alert("Error al crear el registro, contacte con soporte");
                console.log(error);
            });
    }

    const total = React.useMemo(() => {
        let total = 0;
        productsOnBill.forEach((product) => {
            total = total + product.netValue;
        });
        return total;
    }, [productsOnBill]);
    const totalIVA = React.useMemo(() => {
        let total = 0;
        productsOnBill.forEach((product) => {
            total = total + product.iva;
        });
        return total;
    }, [productsOnBill]);
    const totalConsumption = React.useMemo(() => {
        let total = 0;
        productsOnBill.forEach((product) => {
            total = total + product.consumption;
        });
        return total;
    }, [productsOnBill]);
    const totalValue = React.useMemo(() => {
        let total = 0;
        productsOnBill.forEach((product) => {
            total = total + product.totalValue;
        });
        return total;
    }, [productsOnBill]);
    const totalDiscount = React.useMemo(() => {
        let total = 0;
        productsOnBill.forEach((product) => {
            total = total + product.discount;
        });
        return total;
    }, [productsOnBill]);

    return (
        <div className="col-12">
            <h1> Nueva Factura </h1>
            <div className="border-solid border shadow p-3">
                <h4 className="mb-0">Información del Cliente</h4>
                <small className="text-muted mt-0 pt-0 sub-sup-font-size">
                    Agregue los datos de la factura y presione crear al
                    finalizar para crear una nueva factura
                </small>
                <div className="row mt-3">
                    <div className="col-sm-12 col-md-4 col-xl-4">
                        <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            onChange={(value) =>
                                setClientID(value.target.value)
                            }
                        >
                            <option value="0">Seleccione el cliente</option>
                            {clientRegisters.map((client) => (
                                <option value={client.clientID}>
                                    ID: {client.clientID} | {client.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-12 col-md-4 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Fecha Factura
                            </span>
                            <input
                                type="date"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={date}
                                onInput={(text) => setDate(text.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-xl-4">
                        <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            onChange={(value) =>
                                setPaymentMethod(value.target.value)
                            }
                        >
                            <option value="0">Metodo de pago</option>
                            <option value="Transferencia">Transferencia</option>
                            <option value="Credito">Credito</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Efectivo">Efectivo</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="border-solid border shadow p-3 mt-3">
                <h4 className="mb-0">Agregar Productos</h4>
                <small className="text-muted mt-0 pt-0 sub-sup-font-size">
                    Agregue los datos del producto para agregarlos a la factura
                </small>
                <div className="row mt-3">
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            onChange={(value) =>
                                setProductID(value.target.value)
                            }
                        >
                            <option value="0">Seleccione el producto</option>
                            {productRegisters.map((product) => (
                                <option value={product.productID}>
                                    Codigo: {product.code} | {product.name} |
                                    Stock: {product.stock} | ${product.value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Cantidad
                            </span>
                            <input
                                type="number"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={quantity}
                                onInput={(text) =>
                                    setQuantity(text.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Descuento (%)
                            </span>
                            <input
                                type="number"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={discount}
                                onInput={(text) =>
                                    setDiscount(text.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Impuesto IVA (%)
                            </span>
                            <input
                                type="number"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={iva}
                                onInput={(text) => setIVA(text.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                            >
                                Impuesto Consumo (%)
                            </span>
                            <input
                                type="number"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={consumption}
                                onInput={(text) =>
                                    setConsumption(text.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div class="col-auto">
                            <button
                                type="submit"
                                class="btn btn-outline-success mb-3"
                                onClick={addProduct}
                            >
                                Agregar Producto
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th scope="col">ID Producto</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio Unidad</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Descuento</th>
                        <th scope="col">IVA</th>
                        <th scope="col">Impuesto Consumo</th>
                        <th scope="col">Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {productsOnBill.length === 0 ? (
                        <tr>
                            <td>La Factura no tiene productos</td>
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
                        productsOnBill.map((product) => (
                            <tr>
                                <td>{product.id}</td>
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
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">{total}</th>
                        <th scope="col">{totalDiscount}</th>
                        <th scope="col">{totalIVA}</th>
                        <th scope="col">{totalConsumption}</th>
                        <th scope="col">{totalValue}</th>
                    </tr>
                </tbody>
            </table>
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div class="col-auto">
                    <button
                        type="submit"
                        class="btn btn-success mb-3"
                        onClick={generateBill}
                        disabled={!numerationStatus}
                    >
                        Generar Factura
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewBill;
