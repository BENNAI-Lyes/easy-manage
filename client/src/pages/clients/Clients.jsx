import "./clients.scss";
import { DataGrid } from "@material-ui/data-grid";
import { Edit, DeleteOutline, Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { ClientsContext } from "../../context/clientContext/clientContext";
import {
  deleteClient,
  getClients,
} from "../../context/clientContext/clientApiCalls";
import ReactToPrint from "react-to-print";

const Clients = () => {
  const { dispatch, clients, isFetching } = useContext(ClientsContext);

  const clientRef = useRef();

  useEffect(() => {
    getClients(dispatch);
  }, [dispatch]);

  const columns = [
    {
      field: "détails",
      headerName: "Détails",
      width: 90,
      renderCell: (params) => {
        return (
          <div className="actionCell">
            <Link
              to={{
                pathname: `/clientInfo/${params.row._id}`,
                client: params.row,
              }}
            >
              <p style={{ textDecoration: "underline" }}>les Versement</p>
            </Link>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Nom",
      width: 190,
    },
    {
      field: "address",
      headerName: "Adresse",
      width: 190,
    },
    {
      field: "phone",
      headerName: "N° Téléphone",
      width: 190,
    },
    {
      field: "credit",
      headerName: "Crédit Total",
      width: 190,
      renderCell: (params) => {
        return params.row.credit + ",00 DA";
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="actionCell">
            <Link
              to={{
                pathname: `/client/${params.row._id}`,
                client: params.row,
              }}
            >
              <Edit className="editIcon" />
            </Link>

            <DeleteOutline
              className="deleteIcon"
              onClick={() => {
                deleteClient(dispatch, params.row._id);
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="clients">
      <div className="wrapper">
        <div className="header">
          <h3 className="title">Les Clients</h3>
          <div className="headerButton">
            <ReactToPrint
              trigger={() => (
                <Button variant="outlined" color="secondary">
                  Imprimer
                </Button>
              )}
              content={() => clientRef.current}
            />
            <Link to="/newClient">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                className="button"
              >
                Nouveau cliente
              </Button>
            </Link>
          </div>
        </div>
        {!isFetching ? (
          <div
            className="table"
            style={{ height: "145vh", width: "100%" }}
            ref={clientRef}
          >
            <DataGrid
              rows={clients}
              columns={columns}
              pageSize={14}
              checkboxSelection
              disableSelectionOnClick
              getRowId={(r) => r._id}
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

export default Clients;
