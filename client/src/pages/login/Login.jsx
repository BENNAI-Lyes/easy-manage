import "./login.scss";
import logo from "../../assets/img/logo.png";
import { Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext/authContext";
import { login } from "../../context/authContext/authContextApiCalls";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch, isFetching } = useContext(AuthContext);

  const handelSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="header">
          <img src={logo} alt="logo" className="logo" />
          <h2 className="title">Login</h2>
        </div>
        <form className="form" onSubmit={handelSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={isFetching}
            >
              login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
