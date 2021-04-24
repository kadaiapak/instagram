import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../redux/actions/authAction";

const Register = () => {
  const dispatch = useDispatch();
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const history = useHistory();
  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cfPass: "",
    gender: "male",
  };

  const [registerData, setRegisterData] = useState(initialState);

  const { fullname, username, email, password, cfPass } = registerData;
  const registerHandler = (e) => {
    e.preventDefault();

    dispatch(register(registerData));
  };

  const changeData = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const { auth, alert } = useSelector((state) => state);
  useEffect(() => {
    if (auth.token) {
      history.push("/");
    }
  }, [auth, history]);
  return (
    <div className="auth_page">
      <form onSubmit={registerHandler}>
        <div className="borderSatu">
          <div className="auth_logo">
            <img src="/images/instagram.png" alt="instagram-logo" />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={fullname}
              name="fullname"
              placeholder="Fullname"
              onChange={changeData}
              className="form-control"
              id="fullname"
              style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
            ></input>
            <small className="form-text text-danger">
              {alert.fullname ? alert.fullname : ""}
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              value={username.toLocaleLowerCase().replace(/ /g, "")}
              name="username"
              placeholder="Username"
              onChange={changeData}
              className="form-control"
              style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
              id="username"
            ></input>
            <small className="form-text text-danger">
              {alert.username ? alert.username : ""}
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              value={email}
              name="email"
              placeholder="Email"
              onChange={changeData}
              className="form-control"
              id="exampleInputEmail1"
              style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
              aria-describedby="emailHelp"
            ></input>
            <small className="form-text text-danger">
              {alert.email ? alert.email : ""}
            </small>
          </div>
          <div className="form-group">
            <div className="pass">
              <input
                placeholder="Password"
                type={typePass ? "text" : "password"}
                value={password}
                onChange={changeData}
                name="password"
                className="form-control"
                style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
                id="exampleInputPassword1"
              ></input>
              {password.length > 0 ? (
                <small className="show" onClick={() => setTypePass(!typePass)}>
                  {typePass ? "Hide" : "Show"}
                </small>
              ) : (
                ""
              )}
            </div>
            <small className="form-text text-danger">
              {alert.password ? alert.password : ""}
            </small>
          </div>
          <div className="form-group">
            <div className="pass">
              <input
                placeholder="Confirm Password"
                type={typeCfPass ? "text" : "password"}
                value={cfPass}
                onChange={changeData}
                name="cfPass"
                className="form-control"
                style={{ background: `${alert.cfPass ? "#fd2d6a14" : ""}` }}
                id="cfPass"
              ></input>
              {cfPass.length > 0 ? (
                <small
                  className="show"
                  onClick={() => setTypeCfPass(!typeCfPass)}
                >
                  {typeCfPass ? "Hide" : "Show"}
                </small>
              ) : (
                ""
              )}
            </div>
            <small className="form-text text-danger">
              {alert.cfPass ? alert.cfPass : ""}
            </small>
          </div>

          <div className="row justify-content-between mx-0 mb-1">
            <label htmlFor="male">
              Male :{" "}
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                defaultChecked
                onChange={changeData}
              />
            </label>
            <label htmlFor="female">
              Female :{" "}
              <input
                id="female"
                type="radio"
                name="gender"
                value="female"
                onChange={changeData}
              />
            </label>
            <label htmlFor="other">
              Other :{" "}
              <input
                id="other"
                type="radio"
                name="gender"
                value="other"
                onChange={changeData}
              />
            </label>
          </div>
          <button type="submit" className="btn btn-dark w-100">
            {alert.loading ? "Loading" : "Sign up"}
          </button>

          <small className="form-text text-danger">
            {alert.error ? alert.error : ""}
          </small>
        </div>
        <div className="borderDua">
          <p>
            Already have an account ?<Link to="/"> Login now!</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
