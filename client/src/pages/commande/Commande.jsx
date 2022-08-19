import "./commande.scss";
import logo from "../../assets/img/logo.png";
import { Button, TextField } from "@material-ui/core";
import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";

const Commande = () => {
  const bottom = useRef();
  const [deleg, setDeleg] = useState("0662 08 92 26/ 0555 8912 18");
  const [clientName, setClientName] = useState("");
  const [newDate, setNewDate] = useState("");

  //date
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = today.toLocaleDateString("fr-FR", options);

  return (
    <div className="commande">
      <div className="commandewrapper">
        <div className="commandetop">
          <div className="commandeitems">
            <div className="commandeitem">
              <TextField
                id="clientName"
                label="Nome de client"
                type="string"
                variant="outlined"
                sx={{ width: 150 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div className="commandeitem">
              <TextField
                id="deleg"
                label="N° Téléphone de Delegue"
                type="string"
                variant="outlined"
                sx={{ width: 150 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={deleg}
                onChange={(e) => setDeleg(e.target.value)}
              />
            </div>

            <div className="commandeitem">
              <TextField
                id="newDate"
                label="changer la date"
                type="string"
                variant="outlined"
                sx={{ width: 150 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>

            <div className="commandeitem">
              <ReactToPrint
                trigger={() => (
                  <Button variant="outlined" color="secondary">
                    imprimer
                  </Button>
                )}
                content={() => bottom.current}
              />
            </div>
          </div>
        </div>
        <div className="commandebottom" ref={bottom}>
          <div className="commandelogo">
            <img src={logo} alt="logo" className="commandelogoImg" />
            <p className="commandelogoTextL">EL MALSSA MOULDING</p>
            <p className="commandelogoTextS">Réservoir Alimentaire</p>
          </div>
          <div className="commandeinfo">
            <h3 className="commandetitle"> BON DE COMMANDE</h3>
            <div className="commandeinfoFlex">
              <div className="commandeleft">AIN MALSSA AIN ARNET SETIF</div>
              <div className="commanderight">
                <p className="commandeclientName"> {clientName} </p>
                <p className="commandedate"> {newDate ? newDate : date} </p>
              </div>
            </div>
            <div className="commandedeleg">
              DELEGUE COMMERCIALE TEL: {deleg}
            </div>
          </div>
          <div className="commandetable">
            {/* vertical */}
            <table>
              <caption>VERTICALE</caption>
              <thead>
                <tr>
                  <th>GAMME</th>
                  <th>DOUBLE COUCHE</th>
                  <th>TRIPLE COUCHE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>200 V</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>300 V</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>500 VS</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>500 VM</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>800 V</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>1000 VS</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>1000 VM</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* horizonrtal */}
            <table>
              <caption>HORIZONTALE</caption>
              <thead>
                <tr>
                  <th>GAMME</th>
                  <th>DOUBLE COUCHE</th>
                  <th>TRIPLE COUCHE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>200 H</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>300 H</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>500 H</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>1000 H</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>1500 H</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>2000 H</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>3000 H</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* large */}
            <table>
              <caption>LARGE</caption>
              <thead>
                <tr>
                  <th>GAMME</th>
                  <th>DOUBLE COUCHE</th>
                  <th>TRIPLE COUCHE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>500 VB</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>1000 VB</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>1500 VB</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
                <tr>
                  <td>2000 VB</td>
                  <td>
                    {" "}
                    <input type="number" />{" "}
                  </td>
                  <td>
                    <input type="number" />{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commande;
