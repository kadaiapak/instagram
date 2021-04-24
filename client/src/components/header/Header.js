import React from "react";

import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";

const Header = () => {
  return (
    <div className="navbar_container">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light justify-content-between align-middle">
          <Link className="navbar-brand navbar-logo" to="/">
            <img src="/images/instagram.png" alt="instagram-logo" />
          </Link>

          <Search />
          <Menu />
        </nav>
      </div>
    </div>
  );
};

export default Header;
