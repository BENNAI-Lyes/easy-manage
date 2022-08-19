import "./newClient.scss";
import { useContext, useState } from "react";
import { ClientsContext } from "../../context/clientContext/clientContext";

import {
  ADD_CLIENT_FAILURE,
  ADD_CLIENT_START,
  ADD_CLIENT_SUCCESS,
} from "../../context/clientContext/clientContextActions";

import { toast } from "react-toastify";
import { axiosI } from "../../config";

export default function NewClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [driver, setDriver] = useState("");
  const [nif, setNif] = useState("");
  const [rc, setRc] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("");
  const [credit, setCredit] = useState(0);
  const [remise, setRemise] = useState(0);

  const { dispatch } = useContext(ClientsContext);

  const handelSubmit = async (e) => {
    e.preventDefault();

    dispatch(ADD_CLIENT_START());
    try {
      const res = await axiosI.post(
        "client",
        {
          name,
          email,
          address,
          phone,
          driver,
          nif,
          rc,
          activity,
          credit,
          remise,
        },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      dispatch(ADD_CLIENT_SUCCESS(res.data));
      toast.success("Client Added successfully.");
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setDriver("");
      setNif("");
      setRc("");
      setActivity("");
      setCredit(0);
      setRemise(0);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(ADD_CLIENT_FAILURE(error));
    }
  };

  return (
    <div className="newClient">
      <h2>Nouveau cliente</h2>
      <form className="form" onSubmit={handelSubmit}>
        <div className="group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            placeholder="Entrez le nom"
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
            type="text"
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
          <label htmlFor="nif">NIF</label>
          <input
            type="string"
            id="nif"
            className="input"
            placeholder="Entrez le NIF du client"
            value={nif}
            onChange={(e) => setNif(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="rc">RC</label>
          <input
            type="string"
            id="rc"
            className="input"
            placeholder="Entrer le client RC"
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
          <label htmlFor="credit">Ancien crédit</label>
          <input
            type="number"
            id="credit"
            className="input"
            placeholder="Entrer l'ancien crédit de client"
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
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}
