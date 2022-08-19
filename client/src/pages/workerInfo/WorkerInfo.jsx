import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Add } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";

import "./workerInfo.scss";
import { PayrollsContext } from "../../context/payrollContext/payrollContext";
import {
  deletePayroll,
  getPayrolls,
} from "../../context/payrollContext/payrollContextApiCalls";
import {
  ADD_PAYROLL_FAILURE,
  ADD_PAYROLL_START,
  ADD_PAYROLL_SUCCESS,
} from "../../context/payrollContext/payrollContextActions";
import { axiosI } from "../../config";
import ReactToPrint from "react-to-print";

//modal
// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  // const top = 50 + rand();
  // const left = 50 + rand();
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    border: "none",
    borderRadius: "5px",
  },
}));

const WorkerInfo = () => {
  const worker = useLocation().worker;
  const { dispatch, payrolls, isFetching } = useContext(PayrollsContext);

  const workerRef = useRef();

  const [desc, setDesc] = useState("");
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(0);

  //calc state
  let calcTotal = 0;
  let calcPayment = 0;
  let calcCredit = 0;
  payrolls.forEach((p) => {
    calcTotal = calcTotal + p.total;
    calcPayment = calcPayment + p.payment;
    calcCredit = calcCredit + p.credit;
  });

  //fetch payrolls
  useEffect(() => {
    getPayrolls(dispatch, worker._id);
  }, [dispatch, worker._id]);

  const columns = [
    { field: "date", headerName: "Date", width: 190 },
    {
      field: "desc",
      headerName: "La description",
      width: 300,
    },
    {
      field: "total",
      headerName: "Total",
      width: 160,
      renderCell: (params) => {
        return params.row.total + ",00 DA";
      },
    },
    {
      field: "payment",
      headerName: "Versement",
      width: 160,
      renderCell: (params) => {
        return params.row.payment + ",00 DA";
      },
    },
    {
      field: "credit",
      headerName: "Le crédit",
      width: 160,
      renderCell: (params) => {
        return params.row.credit + ",00 DA";
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 50,
      renderCell: (params) => {
        return (
          <div className="actionCell">
            <DeleteOutline
              className="deleteIcon"
              onClick={() => {
                deletePayroll(dispatch, params.row._id);
              }}
            />
          </div>
        );
      },
    },
  ];

  //modal
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [copen, setCopen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopen = () => {
    setCopen(true);
  };

  const handleCclose = () => {
    setCopen(false);
  };

  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = today.toLocaleDateString("fr-FR", options);

  const handelSubmit = async (e) => {
    e.preventDefault();

    dispatch(ADD_PAYROLL_START());
    try {
      const res = await axiosI.post(
        "payroll",
        {
          workerId: worker._id,
          date,
          workerName: worker.name,
          desc,
          total,
          payment,
          credit: total - payment,
        },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      dispatch(ADD_PAYROLL_SUCCESS(res.data));
      toast.success("Work Added successfully.");

      //clean modal
      setDesc("");
      setTotal(0);
      setPayment(0);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(ADD_PAYROLL_FAILURE(error));
    }
  };

  return (
    <div className="workerInfo">
      <div className="wrapper">
        <div className="header workerInfoHeader">
          <h3 className="title" style={{ textTransform: "capitalize" }}>
            {worker?.name} travail
          </h3>
          <div className="headerButton">
            <ReactToPrint
              trigger={() => (
                <Button variant="outlined" color="secondary">
                  Imprimer
                </Button>
              )}
              content={() => workerRef.current}
            />
            <Button
              variant="outlined"
              color="primary"
              className="button"
              onClick={() => {
                // handleCalc();
                handleCopen();
              }}
            >
              calcul
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              className="button"
              onClick={handleOpen}
            >
              Nouveau travail
            </Button>
          </div>
        </div>

        {!isFetching ? (
          <div
            className="table"
            style={{ height: "145vh", width: "100%" }}
            ref={workerRef}
          >
            <DataGrid
              rows={payrolls}
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

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {/* body */}
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title" style={{ marginBottom: "10px" }}>
              Nouveau travail:
            </h2>
            <div id="simple-modal-description">
              <form className="newTransactionForm" onSubmit={handelSubmit}>
                <div className="formGroup">
                  <label htmlFor="desc">La description</label>
                  <input
                    type="string"
                    name="desc"
                    id="desc"
                    placeholder="Entrez la description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="total">Total</label>
                  <input
                    type="number"
                    name="total"
                    id="total"
                    placeholder="Enterz Total"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="payment"> Versement</label>
                  <input
                    type="number"
                    name="payment"
                    id="payment"
                    placeholder="Entrez le paiement"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                </div>

                <div className="formGroup">
                  <Button type="submit" color="primary" variant="outlined">
                    envoyer
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>

        <Modal
          open={copen}
          onClose={handleCclose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {/* body */}
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title" style={{ marginBottom: "20px" }}>
              Calcul:
            </h2>
            <div className="head">
              <p>Le crédit: {calcCredit},00 DA </p>
              <p>Versement: {calcPayment},00 DA </p>
              <p>Total: {calcTotal},00 DA</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default WorkerInfo;
