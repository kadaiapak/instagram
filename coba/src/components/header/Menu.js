import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";

const Menu = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { auth, theme } = useSelector((state) => state);

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
    { label: "Notify", icon: "favorite", path: "/notify" },
  ];
  return (
    <div className="menu" id="navbarSupportedContent">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, i) => (
          <li className={`nav-item px-1 ${isActive(link.path)}`} key={i}>
            <Link className="nav-link" to={link.path}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}
        <li className="nav-item dropdown">
          <Link
            className="nav-link"
            to="/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size={"small-avatar"} />
          </Link>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link
              className={`dropdown-item ${isActive(
                `/profile/${auth.user._id}`
              )}`}
              to={`/profile/${auth.user._id}`}
            >
              Profile
            </Link>

            <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() =>
                dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
              }
            >
              {theme ? "Light Mode" : "Dark Mode"}
            </label>

            <div className="dropdown-divider"></div>

            <Link
              to="/"
              className="dropdown-item"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
