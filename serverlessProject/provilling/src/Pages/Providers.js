import React, { useState } from "react";
var axios = require("axios");

function Providers() {
    const [registers, setRegisters] = useState([]);
    const [providerId, setProviderId] = useState("");
    const [name, setName] = useState("");
    const [document, setDocument] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [idToEdit, setIdToEdit] = useState(0);
    const [createStatus, setCreateStatus] = useState(true);
    var config = {
        method: "get",
        url: "http://localhost:3000/dev/getProviders?userID=1",
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
            <h1> Proveedores </h1>
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
                            placeholder="ID Proveedor"
                            value={providerId}
                            onInput={(text) => setProviderId(text.target.value)}
                        />
                    </div>
                    <div class="col-auto">
                        <button
                            type="submit"
                            class="btn btn-primary mb-3"
                            onClick={searchProvider}
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
                                    Correo
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
                        <div className="col-sm-12 col-md-6 col-xl-8">
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
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={address}
                                    onInput={(text) =>
                                        setAddress(text.target.value)
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
                                onClick={createProvider}
                                disabled={!createStatus}
                            >
                                Crear
                            </button>
                            <button
                                class="btn btn-success m-2"
                                id="btnCreate"
                                onClick={editProvider}
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
                                onClick={deleteProvider}
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
                        <th scope="col">Documento</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Email</th>
                        <th scope="col">Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    {registers.length === 0 ? (
                        <tr>
                            <td>No existen proveedores registrados</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ) : (
                        registers.map((provider) => (
                            <tr>
                                <th scope="row">{provider.providerID}</th>
                                <td>{provider.name}</td>
                                <td>{provider.document}</td>
                                <td>{provider.phone}</td>
                                <td>{provider.email}</td>
                                <td>{provider.address}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
    function createProvider() {
        var axios = require("axios");
        var data = JSON.stringify({
            providers: [
                {
                    name: name,
                    document: document,
                    phone: phone,
                    email: email,
                    address: address,
                    userAddID: 1,
                },
            ],
        });

        console.log(data);

        var config = {
            method: "post",
            url: "http://localhost:3000/dev/createProvider",
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
    function searchProvider() {
        var config = {
            method: "get",
            url:
                "http://localhost:3000/dev/getProvider?providerID=" +
                providerId,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                if (response.status === 400) {
                    alert("Error en el servidor, contacte con soporte");
                } else {
                    if (response.data.length === 0) {
                        alert(
                            "No se encontró proveedor asociado al ID ingresado"
                        );
                        setName("");
                        setDocument("");
                        setPhone("");
                        setEmail("");
                        setAddress("");
                        setIdToEdit("");
                        setCreateStatus(true);
                    } else {
                        alert("Proveedor encontrado");
                        setName(response.data[0]["name"]);
                        setEmail(response.data[0]["email"]);
                        setPhone(response.data[0]["phone"]);
                        setAddress(response.data[0]["address"]);
                        setDocument(response.data[0]["document"]);
                        setIdToEdit(response.data[0]["providerID"]);
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
        setEmail("");
        setPhone("");
        setAddress("");
        setDocument("");
        setIdToEdit("");
        setCreateStatus(true);
    }

    function editProvider() {
        var axios = require("axios");
        var data = JSON.stringify({
            providers: [
                {
                    providerID: idToEdit,
                    name: name,
                    document: document,
                    email: email,
                    phone: phone,
                    address: address,
                },
            ],
        });

        var config = {
            method: "patch",
            url: "http://localhost:3000/dev/updateProvider",
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

    function deleteProvider() {
        var axios = require("axios");
        console.log(idToEdit);
        var data = JSON.stringify({
            providers: [
                {
                    providerID: idToEdit,
                },
            ],
        });

        var config = {
            method: "delete",
            url: "http://localhost:3000/dev/deleteProvider",
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
            url: "http://localhost:3000/dev/getProviders?userID=1",
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

export default Providers;
