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
          Школа иностранных языков
        </Link>

        <div className="d-flex ms-auto align-items-center">
          {!token && (
            <>
              <Link className="btn btn-outline-light mx-2" to="/login">
                Вход
              </Link>
              <Link className="btn btn-outline-light mx-2" to="/register">
                Регистрация
              </Link>
            </>
          )}

          {token && role === "TEACHER" && (
            <button
              className="btn btn-outline-light mx-2"
              onClick={handleLogout}
            >
              Выход
            </button>
          )}

          {token && role === "STUDENT" && (
            <button
              className="btn btn-outline-light mx-2"
              onClick={handleLogout}
            >
              Выход
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

