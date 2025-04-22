import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Full Stack Application
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="d-flex ms-auto align-items-center">
            {localStorage.getItem("token") && (
              <Link className="btn btn-outline-light mx-2" to="/adduser">
                Add User
              </Link>
            )}

            {!localStorage.getItem("token") ? (
              <>
                <Link className="btn btn-outline-light mx-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-light mx-2" to="/register">
                  Register
                </Link>
              </>
            ) : (
              <button
                className="btn btn-outline-light mx-2"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
