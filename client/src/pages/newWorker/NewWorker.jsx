import "./newWorker.scss";
import { useContext, useState } from "react";
import { WorkersContext } from "../../context/workerContext/workerContext";
import { addWorker } from "../../context/workerContext/workerApiCalls";

export default function NewWorker() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { dispatch } = useContext(WorkersContext);

  const handelSubmit = (e) => {
    e.preventDefault();
    addWorker(dispatch, { name, email, address, phone });

    setName("");
    setEmail("");
    setAddress("");
    setPhone("");
  };

  return (
    <div className="newWorker">
      <h2>Nouveau Employée</h2>
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
            type="string"
            id="phone"
            className="input"
            placeholder="Entrez le numéro de téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
