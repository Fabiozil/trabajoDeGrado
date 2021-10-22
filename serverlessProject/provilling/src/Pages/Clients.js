import React, { useState } from "react";
var axios = require("axios");

function Clients() {
    const [registers, setRegisters] = useState([]);
    const [clientId, setClientId] = useState("");
    const [name, setName] = useState("");
    const [clientType, setClientType] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [address, setAddress] = useState("");
    const [document, setDocument] = useState("");
    const [rf, setRf] = useState("");
    const [phone, setPhone] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [idToEdit, setIdToEdit] = useState(0);
    const [createStatus, setCreateStatus] = useState(true);
    var config = {
        method: "get",
        url: "http://localhost:3000/dev/getClients?userID=1",
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
            <h1> Clientes </h1>
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
                            placeholder="ID Cliente"
                            value={clientId}
                            onInput={(text) => setClientId(text.target.value)}
                        />
                    </div>
                    <div class="col-auto">
                        <button
                            type="submit"
                            class="btn btn-primary mb-3"
                            onClick={searchClient}
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
                            <select
                                className="form-select mb-3"
                                aria-label="Default select example"
                                onChange={(value) =>
                                    setClientType(value.target.value)
                                }
                                value={clientType}
                            >
                                <option value="ipo de cliente">
                                    Tipo de cliente
                                </option>
                                <option value="NATURAL">Natural</option>
                                <option value="JURIDICA">Juridica</option>
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-4">
                            <select
                                className="form-select mb-3"
                                aria-label="Default select example"
                                onChange={(value) => setRf(value.target.value)}
                                selected={rf}
                            >
                                <option value="0">
                                    Responsabilidad Fiscal
                                </option>
                                <option value="Gran Contribuyente">
                                    Gran Contribuyente
                                </option>
                                <option value="Auto Retenedor">
                                    Auto Retenedor
                                </option>
                                <option value="Agente de retencion de IVA">
                                    Agente de retencion de IVA
                                </option>
                                <option value="Regimen Simple de Tributacion">
                                    Regimen Simple de Tributacion
                                </option>
                                <option value="No aplica - Otros">
                                    No aplica - Otros
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-xl-4">
                            <div class="input-group mb-3">
                                <span
                                    class="input-group-text"
                                    id="inputGroup-sizing-default"
                                >
                                    Nombre Contacto
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={contactName}
                                    onInput={(text) =>
                                        setContactName(text.target.value)
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
                                    Correo Contacto
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={contactEmail}
                                    onInput={(text) =>
                                        setContactEmail(text.target.value)
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
                            <div class="input-group mb-3">
                                <span
                                    class="input-group-text"
                                    id="inputGroup-sizing-default"
                                >
                                    Telefono Contacto
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={contactPhone}
                                    onInput={(text) =>
                                        setContactPhone(text.target.value)
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
                    </div>
                    <div className="row">
                        <div className="col">
                            <button
                                class="btn btn-primary "
                                id="btnCreate"
                                onClick={createClient}
                                disabled={!createStatus}
                            >
                                Crear
                            </button>
                            <button
                                class="btn btn-success m-2"
                                id="btnCreate"
                                onClick={editClient}
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
                                onClick={deleteClient}
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
                        <th scope="col">TipoCliente</th>
                        <th scope="col">Tel</th>
                        <th scope="col">Nombre Contacto</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tel Contacto</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Resp Fiscal</th>
                    </tr>
                </thead>
                <tbody>
                    {registers.length === 0 ? (
                        <tr>
                            <td>No existen clientes registrados</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ) : (
                        registers.map((client) => (
                            <tr>
                                <th scope="row">{client.clientID}</th>
                                <td>{client.name}</td>
                                <td>{client.document}</td>
                                <td>{client.clientType}</td>
                                <td>{client.phone}</td>
                                <td>{client.contactName}</td>
                                <td>{client.contactEmail}</td>
                                <td>{client.contactPhone}</td>
                                <td>{client.address}</td>
                                <td>{client.fiscalResponsability}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
    function createClient() {
        var axios = require("axios");
        var data = JSON.stringify({
            clients: [
                {
                    name: name,
                    clientType: clientType,
                    document: document,
                    contactName: contactName,
                    contactEmail: contactEmail,
                    phone: phone,
                    contactPhone: contactPhone,
                    address: address,
                    fiscalResponsability: rf,
                    userAddID: 1,
                },
            ],
        });

        console.log(data);

        var config = {
            method: "post",
            url: "http://localhost:3000/dev/createClient",
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
    function searchClient() {
        var config = {
            method: "get",
            url: "http://localhost:3000/dev/getClient?clientID=" + clientId,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                if (response.status === 400) {
                    alert("Error en el servidor, contacte con soporte");
                } else {
                    if (response.data.length === 0) {
                        alert(
                            "No se encontró cliente asociado al ID ingresado"
                        );
                        setName("");
                        setClientType("Tipo de cliente");
                        setRf("Responsabilidad Fiscal");
                        setContactName("");
                        setContactEmail("");
                        setContactPhone("");
                        setPhone("");
                        setAddress("");
                        setDocument("");
                        setIdToEdit("");
                        setCreateStatus(true);
                    } else {
                        alert("Cliente encontrado");
                        setName(response.data[0]["name"]);
                        setClientType(response.data[0]["clientType"]);
                        setRf(response.data[0]["fiscalResponsability"]);
                        setContactName(response.data[0]["contactName"]);
                        setContactEmail(response.data[0]["contactEmail"]);
                        setContactPhone(response.data[0]["contactPhone"]);
                        setPhone(response.data[0]["phone"]);
                        setAddress(response.data[0]["address"]);
                        setDocument(response.data[0]["document"]);
                        setIdToEdit(response.data[0]["clientID"]);
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
        setClientType("Tipo de cliente");
        setRf("Responsabilidad Fiscal");
        setContactName("");
        setContactEmail("");
        setContactPhone("");
        setPhone("");
        setAddress("");
        setDocument("");
        setIdToEdit("");
        setCreateStatus(true);
    }

    function editClient() {
        var axios = require("axios");
        var data = JSON.stringify({
            clients: [
                {
                    name: name,
                    clientType: clientType,
                    document: document,
                    contactName: contactName,
                    contactEmail: contactEmail,
                    phone: phone,
                    contactPhone: contactPhone,
                    address: address,
                    fiscalResponsability: rf,
                    clientID: idToEdit,
                },
            ],
        });

        var config = {
            method: "patch",
            url: "http://localhost:3000/dev/updateClient",
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

    function deleteClient() {
        var axios = require("axios");
        console.log(idToEdit);
        var data = JSON.stringify({
            clients: [
                {
                    clientID: idToEdit,
                },
            ],
        });

        var config = {
            method: "delete",
            url: "http://localhost:3000/dev/deleteClient",
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
            url: "http://localhost:3000/dev/getClients?userID=1",
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

export default Clients;
