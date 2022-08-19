import "./invoices.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { InvoicesContext } from "../../context/invoiceContext/invoiceContext";
import {
  deleteInvoice,
  getInvoices,
} from "../../context/invoiceContext/invoiceApiCalls";
import ReactToPrint from "react-to-print";

const Bills = () => {
  const { dispatch, invoices, isFetching } = useContext(InvoicesContext);
  const invoicesRef = useRef();

  useEffect(() => {
    getInvoices(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "number", headerName: "N°", width: 120 },

    {
      field: "clientName",
      headerName: "Nom du client",
      width: 220,
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 230,
      renderCell: (params) => {
        return params.row.createdAt.slice(0, 10);
      },
    },
    {
      field: "total",
      headerName: "Total",
      width: 250,
      renderCell: (params) => {
        return params.row.total + ",00 DA";
      },
    },
    {
      field: "facture",
      headerName: "Facture",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="actionCell">
            <Link
              to={{
                pathname: `/invoice/${params.row._id}`,
                invoice: params.row,
              }}
            >
              Voire la facture
            </Link>
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="actionCell">
            <DeleteOutline
              className="deleteIcon"
              onClick={() => {
                deleteInvoice(dispatch, params.row._id);
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="invoices">
      <div className="wrapper">
        <div className="header">
          <h2 className="title">Les Factures</h2>
          <div className="headerButton">
            <ReactToPrint
              trigger={() => (
                <Button variant="outlined" color="secondary">
                  Imprimer
                </Button>
              )}
              content={() => invoicesRef.current}
            />
            <Link to="/newInvoice">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                className="button"
              >
                Nouveau facture
              </Button>
            </Link>
          </div>
        </div>

        {!isFetching ? (
          <div
            className="table"
            style={{ height: "145vh", width: "100%" }}
            ref={invoicesRef}
          >
            <DataGrid
              rows={invoices}
              columns={columns}
              pageSize={14}
              checkboxSelection
              disableSelectionOnClick
              getRowId={(row) => row._id}
            />
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="primary" style={{ marginTop: "50px" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bills;
