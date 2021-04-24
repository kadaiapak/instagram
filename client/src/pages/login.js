import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authAction";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const initialState = { email: "", password: "" };
  const [typePass, setTypePass] = useState(false);
  const [loginData, setLoginData] = useState(initialState);
  const { email, password } = loginData;

  const alert = useSelector((state) => state.alert);

  // ini adalah tambahan
  const history = useHistory();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.token) {
      history.push("/");
    }
  }, [auth, history]);
  const changeData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // akhir dari tambahan
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={loginHandler}>
        <div className="borderSatu">
          <div className="auth_logo">
            <img src="/images/instagram.png" alt="instagram-logo" />
          </div>
          <div className="form-group">
            <input
              type="email"
              value={email}
              name="email"
              placeholder="Email"
              onChange={changeData}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            ></input>
          </div>
          <div className="form-group">
            <div className="pass">
              <input
                placeholder="password"
                type={typePass ? "text" : "password"}
                value={password}
                onChange={changeData}
                name="password"
                className="form-control"
                id="exampleInputPassword1"
              ></input>
              <small className="show" onClick={() => setTypePass(!typePass)}>
                {typePass ? "Hide" : "Show"}
              </small>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={email && password ? false : true}
          >
            Login
          </button>
          <small className="form-text text-danger">
            {alert.error ? alert.error : ""}
          </small>
        </div>
        <div className="borderDua">
          <p>
            Dont have an account ?<Link to="/register"> Register now!</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
