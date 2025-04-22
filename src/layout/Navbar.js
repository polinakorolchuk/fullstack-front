import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Language School
        </Link>

        <div className="d-flex ms-auto align-items-center">
          {!token && (
            <>
              <Link className="btn btn-outline-light mx-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-light mx-2" to="/register">
                Register
              </Link>
            </>
          )}

          {token && role === "TEACHER" && (
            <>
              <Link className="btn btn-outline-light mx-2" to="/adduser">
                Add User
              </Link>
              <button
                className="btn btn-outline-light mx-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          {token && role === "STUDENT" && (
            <button
              className="btn btn-outline-light mx-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
