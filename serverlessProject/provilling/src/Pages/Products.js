import React, { useState } from "react";
var axios = require("axios");

function Products() {
    const [registers, setRegisters] = useState([]);
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [Stock, setStock] = useState("");
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [idToEdit, setIdToEdit] = useState(0);
    const [createStatus, setCreateStatus] = useState(true);
    var config = {
        method: "get",
        url: "http://localhost:3000/dev/getProducts?userID=1",
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
            <h1> Productos </h1>
            <div className="border-solid border shadow p-3">
                <h4 className="mb-0">Editar / Crear.</h4>
                <small className="text-muted mt-0 pt-0 sub-sup-font-size">
                    Para editar un registro ingresa su ID en el campo y presiona
                    buscar
                </small>
                <div className="row mt-3">
                    <div class="col-auto">
                        <input
                            type="text"
                            class="form-control"
                            id="inputClientID"
                            placeholder="ID Producto"
                            value={productId}
                            onInput={(text) => setProductId(text.target.value)}
                        />
                    </div>
                    <div class="col-auto">
                        <button
                            type="submit"
                            class="btn btn-primary mb-3"
                            onClick={searchProduct}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
                <div class="row g-3 mt-2">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-xl-4">
                            <div class="input-group mb-3">
                                <span
                                    class="input-group-text"
                                    id="inputGroup-sizing-default"
                                >
                                    Nombre
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={name}
                                    onInput={(text) =>
                                        setName(text.target.value)
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
                                    Code
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={code}
                                    onInput={(text) =>
                                        setCode(text.target.value)
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
                                    Stock en Inventario
                                </span>
                                <input
                                    type="number"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={Stock}
                                    onInput={(text) =>
                                        setStock(text.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row"></div>
                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-xl-2">
                            <div class="input-group mb-3">
                                <span
                                    class="input-group-text"
                                    id="inputGroup-sizing-default"
                                >
                                    Precio Venta
                                </span>
                                <input
                                    type="number"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={value}
                                    onInput={(text) =>
                                        setValue(text.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-8 col-xl-10">
                            <div class="input-group mb-3">
                                <span
                                    class="input-group-text"
                                    id="inputGroup-sizing-default"
                                >
                                    Descripción
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={description}
                                    onInput={(text) =>
                                        setDescription(text.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button
                                class="btn btn-primary "
                                id="btnCreate"
                                onClick={createProduct}
                                disabled={!createStatus}
                            >
                                Crear
                            </button>
                            <button
                                class="btn btn-success m-2"
                                id="btnCreate"
                                onClick={editProduct}
                                disabled={createStatus}
                            >
                                Editar
                            </button>
                            <button
                                class="btn btn-outline-success"
                                id="btnCreate"
                                onClick={changeToCreate}
                                disabled={createStatus}
                            >
                                Nuevo
                            </button>
                            <button
                                class="btn btn-danger m-2"
                                id="btnCreate"
                                onClick={deleteProduct}
                                disabled={createStatus}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Code</th>
                        <th scope="col">Stock en Inventario</th>
                        <th scope="col">Precio Venta</th>
                        <th scope="col">Precio Inventario</th>
                        <th scope="col">Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {registers.length === 0 ? (
                        <tr>
                            <td>No existen productos registrados</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ) : (
                        registers.map((product) => (
                            <tr>
                                <th scope="row">{product.productID}</th>
                                <td>{product.name}</td>
                                <td>{product.code}</td>
                                <td>{product.stock}</td>
                                <td>{product.value}</td>
                                <td>{product.stockValue}</td>
                                <td>{product.description}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
    function createProduct() {
        var axios = require("axios");
        var data = JSON.stringify({
            products: [
                {
                    name: name,
                    code: code,
                    stock: Stock,
                    value: value,
                    description: description,
                    userAddID: 1,
                },
            ],
        });

        console.log(data);

        var config = {
            method: "post",
            url: "http://localhost:3000/dev/createProduct",
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
                    alert("Registro creado satisfactoriamente");
                    recargarTabla();
                }
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                alert("Error al crear el registro, contacte con soporte");
                console.log(error);
            });
    }
    function searchProduct() {
        var config = {
            method: "get",
            url: "http://localhost:3000/dev/getProduct?productID=" + productId,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                if (response.status === 400) {
                    alert("Error en el servidor, contacte con soporte");
                } else {
                    if (response.data.length === 0) {
                        alert(
                            "No se encontró producto asociado al ID ingresado"
                        );
                        setName("");
                        setCode("");
                        setStock("");
                        setValue("");
                        setDescription("");
                        setIdToEdit("");
                        setCreateStatus(true);
                    } else {
                        alert("Producto encontrado");
                        setName(response.data[0]["name"]);
                        setCode(response.data[0]["code"]);
                        setStock(response.data[0]["stock"]);
                        setValue(response.data[0]["value"]);
                        setDescription(response.data[0]["description"]);
                        setIdToEdit(response.data[0]["productID"]);
                        setCreateStatus(false);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Verifique el ID ingresado");
            });
    }

    function changeToCreate() {
        setName("");
        setCode("");
        setStock("");
        setValue("");
        setDescription("");
        setIdToEdit("");
        setCreateStatus(true);
    }

    function editProduct() {
        var axios = require("axios");
        var data = JSON.stringify({
            products: [
                {
                    name: name,
                    code: code,
                    value: value,
                    description: description,
                    productID: idToEdit,
                    stock: Stock,
                },
            ],
        });

        var config = {
            method: "patch",
            url: "http://localhost:3000/dev/updateProduct",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.status === 400) {
                    alert("Error en el servidor, contacte con soporte");
                } else {
                    alert("Registro editado satisfactoriamente");
                    recargarTabla();
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Error en el servidor, contacte con soporte");
            });
    }

    function deleteProduct() {
        var axios = require("axios");
        console.log(idToEdit);
        var data = JSON.stringify({
            products: [
                {
                    productID: idToEdit,
                },
            ],
        });

        var config = {
            method: "delete",
            url: "http://localhost:3000/dev/deleteProduct",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.status === 400) {
                    alert("Error en el servidor, contacte con soporte");
                } else {
                    alert("Registro eliminado satisfactoriamente");
                    recargarTabla();
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Error en el servidor, contacte con soporte");
            });
    }

    function recargarTabla() {
        var config = {
            method: "get",
            url: "http://localhost:3000/dev/getProducts?userID=1",
            headers: {},
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setRegisters(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default Products;
