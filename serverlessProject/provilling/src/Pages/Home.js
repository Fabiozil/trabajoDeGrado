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
function Home() {
    let { path, url } = useRouteMatch();
    return (
        <Router>
            <div className="row">
                <div className="col-12">
                    <nav class="navbar navbar-light bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand">
                                <Link
                                    to={`${url}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    Inicio
                                </Link>
                            </a>
                            <form class="d-flex">
                                <img alt="logo" src="../public/logo.png" />
                                <button class="btn btn-warning" type="submit">
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
            <div className="row">
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
                                <h1>Bienvenido</h1>
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
        </Router>
    );
}
export default Home;
