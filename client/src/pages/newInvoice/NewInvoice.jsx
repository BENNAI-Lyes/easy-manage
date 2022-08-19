import { useContext, useEffect, useRef, useState } from "react";

import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import ReactToPrint from "react-to-print";

import "./newInvoice.scss";
import logo from "../../assets/img/logo.png";
import { DeleteOutline } from "@material-ui/icons";
import { getProducts } from "../../context/productContext/productApiCalls";
import { ProductsContext } from "../../context/productContext/productContext";
import { InvoicesContext } from "../../context/invoiceContext/invoiceContext";
import { getInvoices } from "../../context/invoiceContext/invoiceApiCalls";
import { toast } from "react-toastify";
import {
  ADD_INVOICE_FAILURE,
  ADD_INVOICE_START,
  ADD_INVOICE_SUCCESS,
} from "../../context/invoiceContext/invoiceContextActions";

import { getClients } from "../../context/clientContext/clientApiCalls";
import { ClientsContext } from "../../context/clientContext/clientContext";
import { axiosI } from "../../config";

const NewInvoice = () => {
  const bonRef = useRef();

  const [dateC, setDateC] = useState("");

  const { dispatch: dispatchClient, clients } = useContext(ClientsContext);

  useEffect(() => {
    getClients(dispatchClient);
  }, [dispatchClient]);

  //set auto compleat clients data format
  const clientsAutoCompleat = clients.map((c) => ({
    ...c,
    title: c.name,
  }));

  const [client, setClient] = useState("");
  const [clientInputValue, setClientInputValue] = useState("");
  const [clientValue, setClientValue] = useState(null);

  console.log(client);
  const handelAutoCompleatClientChange = (event, newValue) => {
    setClient(newValue.title);
    setClientValue(newValue);
  };

  const [rows, setRows] = useState([]);
  const [q, setQ] = useState(0);
  const [total, setTotal] = useState(0);

  const { dispatch: dispatchInvoice, invoices } = useContext(InvoicesContext);
  //fetch products
  const { dispatch, products } = useContext(ProductsContext);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getInvoices(dispatchInvoice);
  }, [dispatchInvoice]);

  // set autoCompleat data format
  const autoCompleatProducts = products.map((p) => ({
    title: p.name,
    price: p.price,
    quantity: p.quantity,
  }));

  const [product, setProduct] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [productValue, setProductValue] = useState(null);

  const handelAutoCompleatChange = (event, newValue) => {
    setProduct(newValue.title);
    setProductValue(newValue);
  };

  const handelSaveClick = async () => {
    dispatchInvoice(ADD_INVOICE_START());
    try {
      const res = await axiosI.post(
        "facture",
        {
          date,
          number:
            invoices.length === 0
              ? 1
              : invoices[invoices.length - 1]?.number + 1,
          clientName: clientValue?.name,
          total,
          address: clientValue?.address,
          phone: clientValue?.phone,

          chouffeure: clientValue?.driver,
          nif: clientValue?.nif,
          rc: clientValue?.rc,
          activity: clientValue?.activity,
          products: rows.map((r) => ({
            name: r.name,
            price: r.price,
            quantity: r.q,
            total: r.total,
          })),
        },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      dispatchInvoice(ADD_INVOICE_SUCCESS(res.data));
      toast.success("Invoice Added successfully.");

      //clean form

      setRows([]);
      setQ(0);
      setTotal(0);
      setTotal("");
      setProductValue(null);
      setClientValue(null);

      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
      dispatchInvoice(ADD_INVOICE_FAILURE(error));
    }
  };

  function createData(name, q, price, total) {
    return { name, q, price, total };
  }

  const getPriceU = (productName) =>
    autoCompleatProducts.find((p) => p.title === productName).price;

  const getTotal = (price, q) => parseInt(price, 10) * parseInt(q, 10);

  const handelClickWithOutR = () => {
    setRows([
      ...rows,
      createData(
        product,
        q,
        getPriceU(product),
        getTotal(getPriceU(product), q)
      ),
    ]);
    setTotal((prv) => prv + getTotal(getPriceU(product), q));
  };

  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = today.toLocaleDateString("fr-FR", options);

  const handelDeleteClick = (r) => {
    setRows(rows.filter((row) => r !== row));
    setTotal((prev) => prev - r.total);
  };

  return (
    <div className="newInvoice">
      <div className="wrapper">
        <div className="top">
          <h1 className="mainTitle">Nouveau Facture</h1>
          <div className="items">
            <div className="item">
              <Autocomplete
                value={clientValue}
                onChange={handelAutoCompleatClientChange}
                inputValue={clientInputValue}
                onInputChange={(event, newInputValue) => {
                  setClientInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={clientsAutoCompleat}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choisissez le Client"
                    variant="outlined"
                  />
                )}
              />
            </div>
          </div>

          <div className="items">
            <div className="item">
              <Autocomplete
                value={productValue}
                onChange={handelAutoCompleatChange}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={autoCompleatProducts}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choisissez le Produit"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="item">
              <TextField
                id="q"
                label="Quantité"
                sx={{ width: 80 }}
                placeholder="Quantity"
                type="number"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setQ(e.target.value)}
                value={q}
              />
            </div>
            <div className="item">
              <Button
                variant="contained"
                color="primary"
                onClick={handelClickWithOutR}
              >
                Ajouter un produit
              </Button>
            </div>
          </div>

          <div className="items">
            <div className="item">
              <TextField
                id="dd"
                label="changé la date"
                sx={{ width: 100 }}
                placeholder="La date"
                type="string"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setDateC(e.target.value)}
                value={dateC}
              />
            </div>
          </div>

          <div className="items">
            <Button
              variant="contained"
              color="secondary"
              onClick={handelSaveClick}
            >
              sauvegarder
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button variant="outlined" color="secondary">
                  Imprimer
                </Button>
              )}
              content={() => bonRef.current}
            />
          </div>
        </div>

        {/* ///////bon/////// */}
        <div className="bottom" ref={bonRef}>
          <div className="backgroundImg">
            <img src={logo} alt="background" />
          </div>

          <div className="bottomContent">
            <div className="t">
              <div className="info">
                <div className="topInfo">
                  <div className="logo">
                    <img src={logo} alt="logo" />
                    <p>EL MALSSA MOULDING</p>
                  </div>
                  <div className="bonTitle">
                    <h2>Facture</h2>
                    <p>
                      Numéro:{" "}
                      {invoices.length === 0
                        ? 1
                        : invoices[invoices.length - 1]?.number + 1}{" "}
                    </p>
                  </div>
                  <p className="bonDate"> {dateC ? dateC : date} </p>
                </div>

                <div className="bottomInfo">
                  <div className="left">
                    <div className="item">
                      <span className="key">Nom:</span>
                      <span className="value">{clientValue?.name}</span>
                    </div>{" "}
                    <div className="item">
                      <span className="key">Address:</span>
                      <span className="value"> {clientValue?.address} </span>
                    </div>{" "}
                    <div className="item">
                      <span className="key">Numéro de Téléphone:</span>
                      <span className="value"> {clientValue?.phone} </span>
                    </div>{" "}
                    <div className="item">
                      <span className="key">NIF:</span>
                      <span className="value"> {clientValue?.nif} </span>
                    </div>{" "}
                    <div className="item">
                      <span className="key">R.C:</span>
                      <span className="value"> {clientValue?.rc} </span>
                    </div>{" "}
                    <div className="item">
                      <span className="key">Activité:</span>
                      <span className="value"> {clientValue?.activity} </span>
                    </div>{" "}
                  </div>

                  <div className="right">
                    <div className="item">
                      <span className="key">Production:</span>
                      <span className="value">Produit Citernes</span>
                    </div>
                    <div className="item">
                      <span className="key">Address:</span>
                      <span className="value">Ain Mailsa Ain Arnet Sétif </span>
                    </div>
                    <div className="item">
                      <span className="key">Contact:</span>
                      <span className="value"> 0776012015/0555753828 </span>
                    </div>
                    <div className="item">
                      <span className="key">NIF:</span>
                      <span className="value"> 18404120111119600000 </span>
                    </div>
                    <div className="item">
                      <span className="key">R.C:</span>
                      <span className="value"> 19/01-0508950A14 </span>
                    </div>
                    <div className="item">
                      <span className="key">Activité:</span>
                      <span className="value"> fabrication des citernes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="m">
              <div className="table">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell width={250} className="tableCell">
                          Libellé
                        </TableCell>
                        <TableCell align="right" className="tableCell">
                          Quantité
                        </TableCell>
                        <TableCell align="right" className="tableCell">
                          Prix&nbsp;(U)
                        </TableCell>
                        <TableCell align="right" className="tableCell">
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            component="th"
                            scope="row"
                            className="tableCell"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="right" className="tableCell">
                            {row.q}
                          </TableCell>
                          <TableCell align="right" className="tableCell">
                            {row.price},00
                          </TableCell>

                          <TableCell align="right" className="tableCell last">
                            <div className="content">
                              <span>{row.total},00 </span>
                              <button
                                type="button"
                                onClick={() => handelDeleteClick(row)}
                                className="delete"
                              >
                                <DeleteOutline className="deleteIcon" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>

            <div className="b">
              <div className="calc">
                <div className="calcLeft" style={{ border: "none" }}></div>
                <div className="calcRight">
                  <div className="calcItem">
                    <div className="calcItem">
                      <span className="key">HT:</span>
                      <span className="value">{total},00 DA</span>
                    </div>
                    <span className="key">TVA:</span>
                    <span className="value">19%</span>
                  </div>

                  <div className="calcItem">
                    <span className="key">TTC:</span>
                    <span className="value">{total + total * 0.19},00 DA</span>
                  </div>
                </div>
              </div>
              <div className="footer">Cache&Signature</div>
            </div>
            <small>
              <span style={{ color: "blue" }}>EasyManage</span>{" "}
              <span style={{ fontSize: "11px" }}>(Application Web) </span>
              0666041465{" "}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewInvoice;
