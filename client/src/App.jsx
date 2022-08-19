import "./app.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

import Home from "./pages/home/Home";

import Clients from "./pages/clients/Clients";
import Client from "./pages/client/Client";
import NewClient from "./pages/newClient/NewClient";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Workers from "./pages/workers/Workers";
import Worker from "./pages/worker/Worker";
import NewWorker from "./pages/newWorker/NewWorker";

import Bills from "./pages/bills/Bills";
import Bill from "./pages/bill/Bill";
import NewBill from "./pages/newBill/NewBill";
import UpdateBill from "./pages/updatBill/updateBill";

import Invoices from "./pages/invoices/Invoices";
import Invoice from "./pages/invoice/Invoice";
import NewInvoice from "./pages/newInvoice/NewInvoice";
import Login from "./pages/login/Login";

import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/authContext";
import ClientInfo from "./pages/clientInfo/ClientInfo";
import ReturnProducts from "./pages/returnProducts/ReturnProducts";
import Expenses from "./pages/expenses/Expenses";
import WorkerInfo from "./pages/workerInfo/WorkerInfo";
import Commande from "./pages/commande/Commande";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      {!user ? <Login /> : <Redirect to="/" />}

      {user ? (
        <div className="app">
          {/* <Topbar /> */}

          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/returnedProducts">
              <ReturnProducts />
            </Route>

            <Route path="/clients">
              <Clients />
            </Route>

            <Route path="/client/:clientId">
              <Client />
            </Route>

            <Route path="/clientInfo/:clientId">
              <ClientInfo />
            </Route>

            <Route path="/newClient">
              <NewClient />
            </Route>

            <Route path="/employees">
              <Workers />
            </Route>

            <Route path="/worker/:workerId">
              <Worker />
            </Route>

            <Route path="/workerInfo/:workerId">
              <WorkerInfo />
            </Route>

            <Route path="/newWorker">
              <NewWorker />
            </Route>

            <Route path="/produits">
              <Products />
            </Route>

            <Route path="/product/:productId">
              <Product />
            </Route>

            <Route path="/newProduct">
              <NewProduct />
            </Route>

            <Route path="/billets">
              <Bills />
            </Route>

            <Route path="/bill/:billId">
              <Bill />
            </Route>

            <Route path="/newBill">
              <NewBill />
            </Route>

            <Route path="/updateBill/:billId">
              <UpdateBill />
            </Route>

            <Route path="/factures">
              <Invoices />
            </Route>

            <Route path="/invoice/:invoiceId">
              <Invoice />
            </Route>

            <Route path="/newInvoice">
              <NewInvoice />
            </Route>

            <Route path="/dépenses">
              <Expenses />
            </Route>
            <Route path="/commande">
              <Commande />
            </Route>
          </Switch>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </Router>
  );
}

export default App;
