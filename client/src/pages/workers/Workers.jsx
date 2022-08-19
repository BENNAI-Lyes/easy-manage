import "./workers.scss";
import { DataGrid } from "@material-ui/data-grid";
import { Edit, DeleteOutline, Add, InfoOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { WorkersContext } from "../../context/workerContext/workerContext";
import {
  deleteWorker,
  getWorkers,
} from "../../context/workerContext/workerApiCalls";
import ReactToPrint from "react-to-print";

const Workers = () => {
  const { dispatch, workers, isFetching } = useContext(WorkersContext);

  const workerRef = useRef();

  useEffect(() => {
    getWorkers(dispatch);
  }, [dispatch]);

  const columns = [
    {
      field: "détails",
      headerName: "Détails",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="actionCell">
            <Link
              to={{
                pathname: `/workerInfo/${params.row._id}`,
                worker: params.row,
              }}
            >
              <p style={{ textDecoration: "underline" }}>les détails</p>
            </Link>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Nome",
      width: 240,
    },
    {
      field: "address",
      headerName: "Adresse",
      width: 270,
    },
    {
      field: "phone",
      headerName: "N° de téléphone",
      width: 250,
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
                pathname: `/worker/${params.row._id}`,
                worker: params.row,
              }}
            >
              <Edit className="editIcon" />
            </Link>
            <DeleteOutline
              className="deleteIcon"
              onClick={() => {
                deleteWorker(dispatch, params.row._id);
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="workers">
      <div className="wrapper">
        <div className="header">
          <h3 className="title">Les Employées</h3>
          <div className="headerButton">
            <ReactToPrint
              trigger={() => (
                <Button variant="outlined" color="secondary">
                  Imprimer
                </Button>
              )}
              content={() => workerRef.current}
            />
            <Link to="/newWorker">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                className="button"
              >
                Nouveau Employée
              </Button>
            </Link>
          </div>
        </div>
        {!isFetching ? (
          <div
            className="table"
            style={{ height: "145vh", width: "100%" }}
            ref={workerRef}
          >
            <DataGrid
              rows={workers}
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

export default Workers;
