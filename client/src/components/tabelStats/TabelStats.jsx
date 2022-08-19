import "./tabelStats.scss";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "@material-ui/core";

const TabelStats = ({
  s,
  products,
  sellsStats,
  returnStats,
  sellsStatsM,
  expenseStatsM,
}) => {
  const ref = useRef();

  const getTotalSells = (name, data) => {
    return data?.reduce((acc, obj) => {
      if (name === obj.name) return acc + obj.quantity;
      return acc;
    }, 0);
  };

  const getTotalReturns = (productName, month) => {
    let res = 0;
    returnStats.forEach((monthState) => {
      if (monthState._id === month) {
        res = monthState.data?.reduce((acc, obj) => {
          if (obj.name === productName) {
            return acc + obj.quantity;
          }

          return acc;
        }, 0);
        return res;
      }
    });
    return res;
  };

  const getNetProfit = (p, data) => {
    return getTotalSells(p.name, data) * p.netProfit;
  };

  const getTotalNet = (month) => {
    let total = 0;
    let data_month = [];

    sellsStats.forEach((s) => {
      if (s._id === month) data_month = s.data;
    });

    products.forEach((p) => {
      total = total + parseInt(getNetProfit(p, data_month));
    });

    return total;
  };

  const getTotalVent = (month) => {
    return sellsStatsM.find((s) => s.name === month);
  };

  const getTotalTransport = (month) => {
    return sellsStatsM.find((s) => s.name === month);
  };

  const getTotalDepence = (month) => {
    return expenseStatsM.find((s) => s.name === month);
  };

  return (
    <div className="tabelStat" ref={ref}>
      <h4 className="date">Statistiques de: {s._id} </h4>
      <ReactToPrint
        trigger={() => (
          <Button variant="contained" color="primary" className="buttonPrint">
            Imprimer
          </Button>
        )}
        content={() => ref?.current}
      />
      <div className="table">
        <div className="table-head">
          <p className="first">Produit</p>
          <p>Nombre de ventes</p>
          <p>Nombre retourné</p>
          <p>Bénéfice net</p>
        </div>
        {products.map((p, index) => (
          <div className="item" key={index}>
            <p className="first"> {p.name} </p>
            <p> {getTotalSells(p.name, s.data, s._id)} </p>
            <p> {getTotalReturns(p.name, s._id)} </p>
            <p> {getNetProfit(p, s.data)},00 DA </p>
          </div>
        ))}
      </div>

      {/* // Totals */}
      <div className="totals">
        <div className="total">
          <span className="key"> Ventes totales: </span>
          <span className="value" style={{ color: "#333" }}>
            {" "}
            {parseInt(getTotalVent(s._id)?.total)},00 DA{" "}
          </span>
        </div>
        <div className="total">
          <span className="key"> Bénéfice: </span>
          <span className="value"> {parseInt(getTotalNet(s._id))},00 DA </span>
        </div>
        <div className="total">
          <span className="key"> Dépenses totales: </span>
          <span className="value">
            {" "}
            {parseInt(getTotalDepence(s._id)?.total)},00 DA{" "}
          </span>
        </div>
        <div className="total">
          <span className="key"> Transport totales: </span>
          <span className="value" style={{ color: "#333" }}>
            {" "}
            {parseInt(getTotalTransport(s._id)?.transport)},00 DA{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TabelStats;
