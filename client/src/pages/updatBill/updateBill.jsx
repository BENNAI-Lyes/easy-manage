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

import "./updateBill.scss";
import logo from "../../assets/img/logo.png";

import { getProducts } from "../../context/productContext/productApiCalls";
import {
  addReturnProduct,
  deleteReturnedProduct,
  getReturnProducts,
  updateReturnedProduct,
} from "../../context/returnProductContext/returnProductContextApiCalls";
import { ProductsContext } from "../../context/productContext/productContext";
import { BillsContext } from "../../context/billContext/billContext";
import { updateBill } from "../../context/billContext/billContextApiCalls";
import { ReturnProductsContext } from "../../context/returnProductContext/returnProductContext";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { updateClient } from "../../context/clientContext/clientApiCalls";
import { ClientsContext } from "../../context/clientContext/clientContext";

import { axiosI } from "../../config";

const NewBill = () => {
  const bonRef = useRef();
  const bill = useLocation().bill;
  const { dispatch: dispatchBill } = useContext(BillsContext);
  const { dispatch: dispatchClient } = useContext(ClientsContext);

  const [rows, setRows] = useState(bill.products);

  const [total, setTotal] = useState(bill.total);
  const [totalRemise, setTotalRemise] = useState(bill.totalRemise);
  const [credit, setCredit] = useState(bill.credit);

  const { dispatch: dispatchReturnProduct, returnProducts } = useContext(
    ReturnProductsContext
  );

  useEffect(() => {
    getReturnProducts(dispatchReturnProduct);
  }, [dispatchReturnProduct]);

  //fetch products
  const { dispatch, products } = useContext(ProductsContext);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  // set autoCompleat data format
  const autoCompleatProducts = products.map((p) => ({
    title: p.name,
    price: p.price,
    quantity: p.quantity,
  }));

  const [client, setClient] = useState({});

  useEffect(() => {
    const getClient = async () => {
      try {
        const res = await axiosI.get("client/find/" + bill.clientId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setClient(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getClient();
  }, [bill]);

  const [returnQuantity, setReturnQuantity] = useState(0);
  const [returnProduct, setReturnProduct] = useState("");
  const [returnInputValue, setReturnInputValue] = useState("");
  const [returnProductValue, setReturnProductValue] = useState(null);
  const [returnedProducts, setReturnedProducts] = useState(
    bill.productsReturned
  );

  const [moneyMin, setMoneyMin] = useState(0);

  const handelReturnAutoCompleatChange = (event, newValue) => {
    setReturnProduct(newValue.title);
    setReturnProductValue(newValue);
  };

  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = today.toLocaleDateString("fr-FR", options);

  const handelSaveClick = () => {
    if (returnedProducts.length > 0) {
      //add return products
      if (bill.productsReturned.length === 0) {
        addReturnProduct(dispatchReturnProduct, {
          billNumber: bill.number,
          bDate: bill.date,
          rDate: date,
          clientName: bill.clientName,
          products: returnedProducts,
        });
      } else {
        const rp = returnProducts.find((r) => r.billNumber === bill.number);
        updateReturnedProduct(dispatchReturnProduct, rp?._id, {
          products: returnedProducts,
        });
      }

      setReturnedProducts([]);

      //save new bill
      updateBill(dispatchBill, {
        _id: bill._id,
        date: bill.date,
        number: bill.number,
        clientName: bill.clientName,
        remise: bill.remise,
        total,
        totalRemise,
        address: bill.address,
        phone: bill.phone,
        credit,

        products: rows.map((r) => ({
          name: r.name,
          price: r.price,
          priceRemisé: r.priceRemisé,
          quantity: r.quantity,
          remise: r.remise,
          total: r.total,
        })),
        productsReturned: returnedProducts.map((r) => ({
          name: r.name,
          quantity: r.quantity,
        })),
      });

      //update client credit
      updateClient(dispatchClient, {
        credit: client.credit - moneyMin,
        _id: bill.clientId,
      });
    } else {
      alert("Les produits retournés sont vides");
    }
  };

  const getProductPrice = (productName) => {
    return products.find((p) => p.name === productName);
  };

  const handelReturnOneProductClick = () => {
    if (returnProduct && returnQuantity) {
      setReturnedProducts([
        ...returnedProducts,
        { name: returnProduct, quantity: returnQuantity },
      ]);
      setMoneyMin(
        (prev) =>
          prev +
          (bill.remise
            ? getProductPrice(returnProduct)?.price * returnQuantity -
              (getProductPrice(returnProduct)?.price *
                returnQuantity *
                bill.remise) /
                100
            : getProductPrice(returnProduct)?.price * returnQuantity)
      );
    } else toast.error("Product name,and Quantity are required.");
  };

  useEffect(() => {
    setTotal(bill.total - (moneyMin + (bill.remise * moneyMin) / 100));
    setTotalRemise(bill.totalRemise - moneyMin);
    setCredit(
      bill.remise !== 0
        ? bill.totalRemise - moneyMin - bill.vers
        : bill.total - (moneyMin + (bill.remise * moneyMin) / 100) - bill.vers
    );

    returnedProducts.forEach((rp) => {
      let items = [...rows];
      rows.forEach((r, i) => {
        if (r.name === rp.name) {
          let item = { ...rows[i] };

          item.quantity = item.quantity - rp.quantity;
          item.total = item.remise
            ? item.quantity * item.priceRemisé
            : item.quantity * item.price;

          items[i] = item;
        }
      });
      setRows(items);
    });
  }, [returnedProducts]);

  console.log("returnProducts", returnProducts);
  console.log("bill", bill);

  const getDesc = (p) => {
    if (bill.remise !== 0) {
      return (
        getProductPrice(p.name)?.price * p.quantity -
        (getProductPrice(p.name)?.price * p.quantity * bill.remise) / 100
      );
    } else {
      return getProductPrice(p.name)?.price * p.quantity;
    }
  };

  return (
    <div className="newBill">
      <div className="wrapper">
        <div className="top">
          <h1 className="mainTitle">Mettre à jour le billet</h1>

          <h3
            className="subTitle"
            style={{ color: "gray", marginTop: "15px", fontSize: "24px" }}
          >
            Retourner des Produits
          </h3>

          <div className="items">
            <div className="item">
              <Autocomplete
                value={returnProductValue}
                onChange={handelReturnAutoCompleatChange}
                inputValue={returnInputValue}
                onInputChange={(event, newInputValue) => {
                  setReturnInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={autoCompleatProducts}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choisissez le produit"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="item">
              <TextField
                id="rq"
                label="Quantité"
                sx={{ width: 80 }}
                placeholder="Return Quantity"
                type="number"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setReturnQuantity(e.target.value)}
                value={returnQuantity}
              />
            </div>
            <div className="item">
              <Button
                variant="outlined"
                color="primary"
                onClick={handelReturnOneProductClick}
              >
                ajouter
              </Button>
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
                    <h2>Bon De Livraison</h2>
                    <p>Numéro: {bill.number} </p>
                  </div>
                  <p className="bonDate"> {bill.date} </p>
                </div>

                <div className="bottomInfo billBottomInfo">
                  <div className="left" style={{ border: "none" }}>
                    <div className="item">
                      <span className="key">Nom:</span>
                      <span className="value">{bill.clientName}</span>
                    </div>{" "}
                    <div className="item">
                      <span className="key">Address:</span>
                      <span className="value"> {bill.address} </span>
                    </div>{" "}
                    <div className="item">
                      <span className="key">Numéro de Téléphone:</span>
                      <span className="value"> {bill.phone} </span>
                    </div>{" "}
                  </div>

                  <div className="right" style={{ border: "none" }}>
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
                        {bill.remise !== 0 && (
                          <>
                            <TableCell align="right" className="tableCell">
                              Remise
                            </TableCell>
                            <TableCell align="right" className="tableCell">
                              Prix Remisé
                            </TableCell>
                          </>
                        )}
                        <TableCell align="right" className="tableCell">
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            component="th"
                            scope="row"
                            className="tableCell"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="right" className="tableCell">
                            {row.quantity}
                          </TableCell>
                          <TableCell align="right" className="tableCell">
                            {row.price},00
                          </TableCell>
                          {bill.remise !== 0 && (
                            <>
                              <TableCell align="right" className="tableCell">
                                {row.remise} %
                              </TableCell>
                              <TableCell align="right" className="tableCell">
                                {row.priceRemisé},00
                              </TableCell>
                            </>
                          )}
                          <TableCell align="right" className="tableCell last">
                            <div className="content">
                              <span>{row.total},00 </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {returnedProducts.length > 0 && (
                <div className="productR">
                  {!bill.productsReturned && <h3>Produits Retournés: </h3>}
                  <div className="prs">
                    {returnedProducts.map((p, index) => (
                      <div
                        className="pr"
                        style={{ display: "flex", alignItems: "center" }}
                        key={index + Math.random()}
                      >
                        <span className="prName"> {p.name}</span>
                        <span className="prQ">{p.quantity}:</span>
                        <span className="prQ" style={{ fontSize: "14px" }}>
                          ({getDesc(p)},00 DA){" "}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="b">
              <div className="calc billCalc">
                <div className="calcLeft">
                  <div className="calcItem">
                    <span className="key">Crédit:</span>
                    <span className="value">
                      {" "}
                      {credit}
                      ,00 DA
                    </span>
                  </div>
                  <div className="calcItem" style={{ marginTop: "10px" }}>
                    <span className="key">Ancien Crédit:</span>
                    <span className="value"> {bill?.oldCredit},00 DA </span>
                  </div>
                  <div className="calcItem" style={{ marginTop: "10px" }}>
                    <span className="key">Vers:</span>
                    <span className="value"> {bill.vers},00 DA</span>
                  </div>
                </div>
                <div className="calcRight">
                  <div className="calcItem">
                    <span className="key">Total Bon:</span>
                    <span className="value">{total},00</span>
                  </div>
                  {bill.remise !== 0 && (
                    <>
                      <div className="calcItem">
                        <span className="key">Remise:</span>
                        <span className="value">{total - totalRemise},00</span>
                      </div>
                      <div className="calcItem">
                        <span className="key">Total Avec remise:</span>
                        <span className="value">{totalRemise},00</span>
                      </div>
                    </>
                  )}
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

export default NewBill;
