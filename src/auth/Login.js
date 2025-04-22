import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { username, password } = credentials;

  const onInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // ✅ Перенаправление по роли
      if (role === "STUDENT") {
        navigate("/student-menu");
      } else if (role === "TEACHER") {
        navigate("/home");
      } else {
        navigate("/login"); // На всякий случай
      }

      // Очистка формы
      setCredentials({
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Authentication failed", error);
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Вход</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="username"
            value={username}
            onChange={onInputChange}
            placeholder="Имя пользователя"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            placeholder="Пароль"
            className="form-control"
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">
          Войти
        </button>
      </form>
    </div>
  );
}
