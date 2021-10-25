import React, { useState } from "react";
var axios = require("axios");

function Accounts() {
    const [registers, setRegisters] = useState([]);
    const [userId, setUserId] = useState(1);
    const [name, setName] = useState("");
    const [document, setDocument] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [economicalActivity, setEconomicalActivity] = useState(0);
    const [rf, setRf] = useState("");
    const [userType, setUserType] = useState("");

    const [createStatus, setCreateStatus] = useState(true);
    const [idToEdit, setIdToEdit] = useState("");
    const [numerationID, setNumerationID] = useState("");
    const [numerationStatus, setNumerationStatus] = useState(0);
    const [validUntil, setValidUntil] = useState(new Date());
    const [initialConsecutive, setInitialConsecutive] = useState(0);
    const [finalConsecutive, setFinalConsecutive] = useState(0);
    const [currentConsecutive, setCurrentConsecutive] = useState(0);
    var config = {
        method: "get",
        url: "http://localhost:3000/dev/getUser?userID=1",
        headers: {},
    };
    React.useEffect(
        () =>
            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setName(response.data[0]["name"]);
                    setDocument(response.data[0]["document"]);
                    setEmail(response.data[0]["contactEmail"]);
                    setPhone(response.data[0]["phone"]);
                    setAddress(response.data[0]["address"]);
                    setCity(response.data[0]["city"]);
                    setRf(response.data[0]["fiscalResponsability"]);
                    setUserType(response.data[0]["userType"]);
                    setEconomicalActivity(
                        response.data[0]["economicalActivityCode"]
                    );
                    recargarTabla();
                })
                .catch(function (error) {
                    console.log(error);
                }),
        []
    );

    return (
        <div className="col-12">
            <div className="mb-2">
                <h1>Tu Cuenta </h1>
                <small className="text-muted mt-0 pt-0 sub-sup-font-size">
                    Gestiona los datos de tu cuenta como tus consecutivos de
                    facturacion entre otros
                </small>
            </div>
            <div
                className="border-solid border shadow p-3
            mb-3"
            >
                <h4 className="mb-0">Tus datos.</h4>
                <small className="text-muted mt-0 pt-0 sub-sup-font-size">
                    En esta seccion puedes verificar y modificar tus datos
                </small>
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
                                    Documento
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={document}
                                    onInput={(text) =>
                                        setDocument(text.target.value)
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
                                    Correo Electronico
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={email}
                                    onInput={(text) =>
                                        setEmail(text.target.value)
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
                                    Ciudad
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={city}
                                    onInput={(text) =>
                                        setCity(text.target.value)
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
                                    Direccion
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={address}
                                    onInput={(text) =>
                                        setAddress(text.target.value)
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
                                    Telefono
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={phone}
                                    onInput={(text) =>
                                        setPhone(text.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-xl-4">
                            <select
                                className="form-select mb-3"
                                aria-label="Default select example"
                                onChange={(value) =>
                                    setEconomicalActivity(value.target.value)
                                }
                            >
                                <option value="0">
                                    Codigo de Actividad Economica
                                </option>
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-4">
                            <select
                                className="form-select mb-3"
                                aria-label="Default select example"
                                onChange={(value) => setRf(value.target.value)}
                            >
                                <option value="0">
                                    Responsabilidad Fiscal
                                </option>
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-4">
                            <select
                                className="form-select mb-3"
                                aria-label="Default select example"
                                onChange={(value) =>
                                    setUserType(value.target.value)
                                }
                            >
                                <option value="0">Tipo de Usuario</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button
                                class="btn btn-success m-2"
                                id="btnCreate"
                                onClick={editUser}
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-solid border shadow p-3">
                <h4 className="mb-0">Tus consecutivos</h4>
                <small className="text-muted mt-0 pt-0 sub-sup-font-size">
                    Agrega nuevos consecutivos o modifica los existentes. Para
                    editar ingresa el ID del que quieras editar y selecciona
                    buscar
                </small>
                <div className="row mt-3">
                    <div class="col-auto">
                        <input
                            type="text"
                            class="form-control"
                            id="inputClientID"
                            placeholder="ID Producto"
                            value={numerationID}
                            onInput={(text) =>
                                setNumerationID(text.target.value)
                            }
                        />
                    </div>
                    <div class="col-auto">
                        <button
                            type="submit"
                            class="btn btn-primary mb-3"
                            onClick={searchNumeration}
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
                                    Consecutivo Inicial
                                </span>
                                <input
                                    type="number"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={initialConsecutive}
                                    onInput={(text) =>
                                        setInitialConsecutive(text.target.value)
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
                                    Consecutivo Final
                                </span>
                                <input
                                    type="number"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={finalConsecutive}
                                    onInput={(text) =>
                                        setFinalConsecutive(text.target.value)
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
                                    Consecutivo Actual
                                </span>
                                <input
                                    type="number"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={currentConsecutive}
                                    onInput={(text) =>
                                        setCurrentConsecutive(text.target.value)
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
                                    Valido Hasta
                                </span>
                                <input
                                    type="date"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={validUntil}
                                    onInput={(text) =>
                                        setValidUntil(text.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-4">
                            <select
                                className="form-select mb-3"
                                aria-label="Default select example"
                                onChange={(value) =>
                                    setNumerationStatus(value.target.value)
                                }
                            >
                                <option value="0">
                                    Estado de la enumeracion
                                </option>
                                <option value="ACTIVO">Activo</option>
                                <option value="INACTIVO">Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button
                                class="btn btn-primary "
                                id="btnCreate"
                                onClick={createNumeration}
                                disabled={!createStatus}
                            >
                                Crear
                            </button>
                            <button
                                class="btn btn-success m-2"
                                id="btnCreate"
                                onClick={editNumeration}
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
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Inicial</th>
                        <th scope="col">Final</th>
                        <th scope="col">Actual</th>
                        <th scope="col">Fecha Vencimiento</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {registers.length === 0 ? (
                        <tr>
                            <td>No existen numeraciones registradas</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ) : (
                        registers.map((enumeration) => (
                            <tr>
                                <th scope="row"></th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
    function createNumeration() {
        var axios = require("axios");
        var data = JSON.stringify({
            numerations: [
                {
                    numerationStatus: numerationStatus,
                    currentConsecutive: currentConsecutive,
                    initialConsecutive: initialConsecutive,
                    finalConsecutive: finalConsecutive,
                    validUntil: validUntil,
                    consecutiveAutorization: "",
                    userAddID: 1,
                },
            ],
        });

        console.log(data);

        var config = {
            method: "post",
            url: "http://localhost:3000/dev/createNumeration",
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
    function searchNumeration() {
        var config = {
            method: "get",
            url:
                "http://localhost:3000/dev/getProduct?productID=" +
                numerationID,
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
                        setIdToEdit("");
                        setCreateStatus(true);
                    } else {
                        alert("Producto encontrado");
                        setName(response.data[0]["name"]);
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
        setIdToEdit("");
        setCreateStatus(true);
    }

    function editNumeration() {
        var axios = require("axios");
        var data = JSON.stringify({
            products: [
                {
                    name: name,
                    productID: idToEdit,
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

    function recargarTabla() {
        var config = {
            method: "get",
            url: "http://localhost:3000/dev/getNumerations?userID=1",
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
    function editUser() {}
}

export default Accounts;
