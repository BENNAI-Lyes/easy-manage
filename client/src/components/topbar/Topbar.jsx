import "./topbar.scss";
import { ExitToAppOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

import { useContext } from "react";
import { AuthContext } from "../../context/authContext/authContext";
import { LOGOUT } from "../../context/authContext/authContextActions";

export default function Topbar() {
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="topbar">
      <Link to="/">
        <div className="left">
          <img src={logo} alt="logo" className="logo" />
        </div>
      </Link>
      <div className="right">
        {/* <div className="iconContainer">
          <Notifications className="icon" />
          <span className="badge">1</span>
        </div> */}

        <div className="iconContainer">
          <ExitToAppOutlined
            className="icon"
            onClick={() => dispatch(LOGOUT())}
          />
        </div>

        {/* <img src={admin} alt="admin" className="profileImg" /> */}
      </div>
    </div>
  );
}
