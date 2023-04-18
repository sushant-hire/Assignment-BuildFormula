import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const navBarStyle = {
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
    fontFamily: "Poppins, sans-serif",
    fontSize: "large",
    paddingLeft: '1rem',
  };
  const logoStyle = {
    height: "40px",
    marginRight: "10px",
  };
  return (
    <nav className="navbar navbar-expand-lg" style={navBarStyle}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/TM_logo.png" alt="TM Logo" style={logoStyle} />
          <span>TaskMaster</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
            <Link className="nav-link" to="/task">
              Task
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
