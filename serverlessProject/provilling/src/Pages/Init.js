import React from "react";

function Init() {
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div class="row bg-light border-solid border shadow mb-5 p-3">
                        <div className="col-12 w-100">
                            <h1 className="text-strong p-3 text-center">
                                Bienvenido a Provilling !
                            </h1>
                        </div>
                        <div className="col-12 w-100 b">
                            <small className="text-muted d-flex justify-content-center">
                                Para empezar, usa la barra de navegación a la
                                izquierda de la pantalla
                            </small>
                        </div>
                    </div>
                    <div class="container-fluid bg-light border-solid border shadow p-3">
                        <div className="row">
                            <h3 className="text-strong d-flex justify-content-center">
                                Notas de Versión:
                            </h3>
                        </div>
                        <div className="row">
                            <ul className="list-group list-group-flush p-2">
                                <li className="list-group-item text-strong text-center">
                                    <h5 className="text-strong">1.0.0!</h5>
                                </li>
                                <li className="list-group-item text-center">
                                    Se termina el modulo de Facturación con
                                    generación de factura automatica, versión
                                    inicial de la aplicación
                                </li>
                                <li className="list-group-item text-center">
                                    <h5 className="text-strong">0.9.0</h5>
                                </li>
                                <li className="list-group-item text-center">
                                    Se hacen adecuaciones a tablas y procesos
                                    para la facturación
                                </li>
                                <li className="list-group-item text-center">
                                    <h5 className="text-strong">0.8.0</h5>
                                </li>
                                <li className="list-group-item text-center">
                                    Parche de corrección de errores en modulos
                                    principalmente de Productos
                                </li>
                                <li className="list-group-item text-center">
                                    <h5 className="text-strong">0.7.0</h5>
                                </li>
                                <li className="list-group-item text-center">
                                    Se implementa la lógica de visualizar
                                    facturas
                                </li>
                                <li className="list-group-item text-center">
                                    <h5 className="text-strong">0.6.0</h5>
                                </li>
                                <li className="list-group-item text-center">
                                    Se implementa la lógica de gestión de
                                    Productos y Proveedores
                                </li>
                                <li className="list-group-item text-center">
                                    <h5 className="text-strong">0.5.0</h5>
                                </li>
                                <li className="list-group-item text-center">
                                    Se implementa la lógica de gestión de
                                    Clientes
                                </li>
                                <li className="list-group-item text-center">
                                    <h5 className="text-strong">0.4.0</h5>
                                </li>
                                <li className="list-group-item text-center">
                                    Se implementa la lógica de gestión de
                                    Usuario
                                </li>
                                <li className="list-group-item text-center">
                                    <h5 className="text-strong">0.3.0</h5>
                                </li>
                                <li className="list-group-item text-center">
                                    Se implementa base de datos con interfaz
                                    mediante un API
                                </li>
                                <li className="list-group-item text-center">
                                    <h5 className="text-strong">0.2.0</h5>
                                </li>
                                <li className="list-group-item text-center">
                                    Se agrega la lógica de base de datos
                                </li>
                                <li className="list-group-item text-center">
                                    <h5 className="text-strong">0.1.0</h5>
                                </li>
                                <li className="list-group-item text-center">
                                    Se crean las pantallas aún sin
                                    funcionalidades
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Init;
