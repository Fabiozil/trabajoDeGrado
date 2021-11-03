import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
} from "react-router-dom";
import Clients from "./Clients";
import Products from "./Products";
import Providers from "./Providers";
import Bills from "./Bills";
import NewBill from "./NewBill";
import Account from "./Account";
import Init from "./Init";
function Home() {
    let { path, url } = useRouteMatch();
    return (
        <Router>
            <div className="row" style={{ minHeight: "5vh" }}>
                <div className="col-12 h-100">
                    <nav class="navbar navbar-light bg-light h-100">
                        <div class="container-fluid">
                            <a class="navbar-brand">
                                <Link
                                    to={`${url}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <img
                                        alt="logo"
                                        src="./logo.png"
                                        style={{ maxHeight: "4vh" }}
                                    />
                                </Link>
                            </a>
                            <form class="d-flex">
                                <button
                                    class="btn btn-outline-primary ml-3"
                                    type="submit"
                                >
                                    <Link
                                        to={`${url}/cuenta`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        Cuenta
                                    </Link>
                                </button>
                            </form>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="row w-100" style={{ minHeight: "85vh" }}>
                <div className="col-1">
                    <ul class="nav flex-column bg-light h-100">
                        <li class="nav-item border border-solid">
                            <a class="nav-link ">
                                <Link
                                    to={`${url}/nuevaFactura`}
                                    style={{ textDecoration: "none" }}
                                >
                                    Nueva Factura
                                </Link>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active">
                                <Link
                                    to={`${url}/bills`}
                                    style={{ textDecoration: "none" }}
                                >
                                    Facturas
                                </Link>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active">
                                <Link
                                    to={`${url}/clients`}
                                    style={{ textDecoration: "none" }}
                                >
                                    Clientes
                                </Link>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page">
                                <Link
                                    to={`${url}/providers`}
                                    style={{ textDecoration: "none" }}
                                >
                                    Proveedores
                                </Link>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">
                                <Link
                                    to={`${url}/products`}
                                    style={{ textDecoration: "none" }}
                                >
                                    Productos
                                </Link>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled">Estadisticas</a>
                        </li>
                    </ul>
                </div>
                <div className="col-11">
                    <div className="p-3">
                        <Switch>
                            <Route exact path={path}>
                                <Init />
                            </Route>
                            <Route exact path={`${path}/products`}>
                                <Products />
                            </Route>
                            <Route exact path={`${path}/clients`}>
                                <Clients />
                            </Route>
                            <Route exact path={`${path}/providers`}>
                                <Providers />
                            </Route>
                            <Route exact path={`${path}/bills`}>
                                <Bills />
                            </Route>
                            <Route exact path={`${path}/nuevaFactura`}>
                                <NewBill />
                            </Route>
                            <Route exact path={`${path}/cuenta`}>
                                <Account />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
            <div
                className="row bg-light w-100 p-2"
                style={{ minHeight: "5vh" }}
            >
                <div className="col-12 d-flex justify-content-between">
                    <h5 className="text-muted">v1.0.0</h5>
                    <h5 className="text-muted">
                        © Laboratorio Clinico Bacteriologico Provilab SAS 2021
                    </h5>
                    <h5 className="text-muted"></h5>
                </div>
            </div>
        </Router>
    );
}
export default Home;
