import "./bills.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Add, Visibility, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { BillsContext } from "../../context/billContext/billContext";
import {
  deleteBill,
  getBills,
} from "../../context/billContext/billContextApiCalls";
import ReactToPrint from "react-to-print";

const Bills = () => {
  const { dispatch, bills, isFetching } = useContext(BillsContext);
  const invoicesRef = useRef();

  useEffect(() => {
    getBills(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "number", headerName: "N°", width: 100 },
    {
      field: "clientName",
      headerName: "Nom du client",
      width: 120,
    },
    {
      field: "date",
      headerName: "Date",
      width: 140,
    },
    {
      field: "total",
      headerName: "Total",
      width: 150,
      renderCell: (params) => {
        return params.row.remise !== 0
          ? params.row.totalRemise + ",00 DA"
          : params.row.total + ",00 DA";
      },
    },
    {
      field: "vers",
      headerName: "Versement",
      width: 145,
      renderCell: (params) => {
        return params.row.vers + ",00 DA";
      },
    },
    {
      field: "credit",
      headerName: "Crédit ",
      width: 145,
      renderCell: (params) => {
        return params.row.credit + ",00 DA";
      },
    },
    {
      field: "oldCredit",
      headerName: "Ancien Crédit",
      width: 150,
      renderCell: (params) => {
        return params.row.oldCredit + ",00 DA";
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="actionCell">
            <Link
              to={{
                pathname: `/updateBill/${params.row._id}`,
                bill: params.row,
              }}
            >
              <Edit className="editIcon" />
            </Link>
            <Link
              to={{
                pathname: `/bill/${params.row._id}`,
                bill: params.row,
              }}
            >
              <Visibility className="editIcon" style={{ color: "yellow" }} />
            </Link>
            <DeleteOutline
              className="deleteIcon"
              onClick={() => {
                deleteBill(dispatch, params.row._id);
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="bills">
      <div className="wrapper">
        <div className="header">
          <h2 className="title">Les Billets</h2>
          <div className="headerButton">
            <ReactToPrint
              trigger={() => (
                <Button variant="outlined" color="secondary">
                  Imprimer
                </Button>
              )}
              content={() => invoicesRef.current}
            />
            <Link to="/newBill">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                className="button"
              >
                Nouveau billet
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
              rows={bills}
              columns={columns}
              pageSize={14}
              checkboxSelection
              disableSelectionOnClick
              getRowId={(r) => r._id || Math.random()}
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
