import "./sidebar.scss";
import {
  Home,
  Redeem,
  DescriptionOutlined,
  ReceiptOutlined,
  PeopleOutline,
  BuildOutlined,
  Restore,
  MoneyOffOutlined,
  ExitToAppOutlined,
  FormatListNumberedRtl,
} from "@material-ui/icons";

import { Link } from "react-router-dom";
import { useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../context/authContext/authContext";
import { LOGOUT } from "../../context/authContext/authContextActions";

import logo from "../../assets/img/logo.png";

export default function Sidebar() {
  const [active, setActive] = useState("home");
  const { dispatch } = useContext(AuthContext);

  const links = [
    {
      id: 1,
      title: "statistiques",
      icon: <Home className="icon" />,
    },
    {
      id: 2,
      title: "billets",
      icon: <ReceiptOutlined className="icon" />,
    },
    {
      id: 3,
      title: "factures",
      icon: <DescriptionOutlined className="icon" />,
    },
    {
      id: 4,
      title: "produits",
      icon: <Redeem className="icon" />,
    },
    {
      id: 5,
      title: "produits retournés",
      icon: <Restore className="icon" />,
    },
    {
      id: 6,
      title: "clients",
      icon: <PeopleOutline className="icon" />,
    },
    {
      id: 7,
      title: "employees",
      icon: <BuildOutlined className="icon" />,
    },
    {
      id: 8,
      title: "dépenses",
      icon: <MoneyOffOutlined className="icon" />,
    },
    {
      id: 9,
      title: "commande",
      icon: <FormatListNumberedRtl className="icon" />,
    },
  ];

  return (
    <div className="sidebar">
      <div className="wrapper">
        <div className="logoContainer">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <ul className="list">
          {links.map((link) => (
            <Link
              to={
                link.id === 1
                  ? "/"
                  : link.id !== 5
                  ? `/${link.title}`
                  : "/returnedProducts"
              }
              key={link.id}
            >
              <li
                className={link.title === active ? "active" : ""}
                onClick={() => setActive(link.title)}
              >
                {link.icon}

                <span
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {link.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
        <div className="iconContainer">
          <ul className="list">
            <li onClick={() => dispatch(LOGOUT())}>
              <ExitToAppOutlined className="icon" />
              <span>Déconnecter</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
