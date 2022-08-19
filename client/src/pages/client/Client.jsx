import "./client.scss";

import { useLocation } from "react-router-dom";

import { useContext, useState } from "react";
import { ClientsContext } from "../../context/clientContext/clientContext";
import { updateClient } from "../../context/clientContext/clientApiCalls";

export default function Client() {
  const client = useLocation().client;
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [address, setAddress] = useState(client.address);
  const [phone, setPhone] = useState(client.phone);

  const [driver, setDriver] = useState(client.driver);
  const [nif, setNif] = useState(client.nif);
  const [rc, setRc] = useState(client.rc);
  const [activity, setActivity] = useState(client.activity);
  const [credit, setCredit] = useState(client.credit);
  const [remise, setRemise] = useState(client.remise);

  const { dispatch } = useContext(ClientsContext);

  const handelSubmit = (e) => {
    e.preventDefault();
    updateClient(dispatch, {
      name,
      email,
      address,
      phone,
      activity,
      driver,
      nif,
      rc,
      credit,
      remise,
      _id: client._id,
    });
  };

  return (
    <div className="client">
      <div className="titleContainer">
        <h3 className="title"> Modifier le client</h3>
      </div>
      <div className="productContainer">
        <form className="form" onSubmit={handelSubmit}>
          <div className="group">
            <label htmlFor="name">Nom du client</label>
            <input
              type="text"
              placeholder="Entrez le nom du client"
              className="input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="Entrez l'e-mail"
              className="input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="group">
            <label htmlFor="address">Adresse</label>
            <input
              type="text"
              id="address"
              className="input"
              placeholder="Entrer l'adresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="group">
            <label htmlFor="phone">Numéro de téléphone</label>
            <input
              type="string"
              id="phone"
              className="input"
              placeholder="Entrez le numéro de téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="group">
            <label htmlFor="driver">Chauffeur</label>
            <input
              type="string"
              id="driver"
              className="input"
              placeholder="Entrez le nom du conducteur"
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
            />
          </div>
          <div className="group">
            <label htmlFor="nif">NIF de Client</label>
            <input
              type="string"
              id="nif"
              className="input"
              placeholder="Entrez le NIF de client"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
            />
          </div>
          <div className="group">
            <label htmlFor="rc">RC de client</label>
            <input
              type="string"
              id="rc"
              className="input"
              placeholder="Entrez le RC de client"
              value={rc}
              onChange={(e) => setRc(e.target.value)}
            />
          </div>

          <div className="group">
            <label htmlFor="rc">Activité</label>
            <input
              type="string"
              id="activity"
              className="input"
              placeholder="Entrer l'activité de client"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
          </div>

          <div className="group">
            <label htmlFor="rc">Crédit total</label>
            <input
              type="string"
              id="credit"
              className="input"
              placeholder="Entrer le crédit total de client"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
            />
          </div>

          <div className="group">
            <label htmlFor="remise">Remise</label>
            <input
              type="number"
              id="remise"
              className="input"
              placeholder="Entrer la remise de client"
              value={remise}
              onChange={(e) => setRemise(e.target.value)}
            />
          </div>

          <div className="group">
            <button className="add" type="submit">
              Mise à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
