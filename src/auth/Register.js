import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Для отображения ошибок
  const [success, setSuccess] = useState(""); // Для отображения успешной регистрации
  let navigate = useNavigate();

  const { username, name, email, password } = userData;

  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        ...userData,
        role: "STUDENT",
      });
  
      setSuccess("Registration successful! You can now log in.");
      setUserData({
        username: "",
        name: "",
        email: "",
        password: "",
      });
  
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed. Please try again.");
    }
  };
  

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="username"
            value={username}
            onChange={onInputChange}
            placeholder="Username"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={name}
            onChange={onInputChange}
            placeholder="Full Name"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onInputChange}
            placeholder="Email"
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
            placeholder="Password"
            className="form-control"
            required
          />
        </div>

        {/* Сообщение об ошибке */}
        {error && <div className="alert alert-danger">{error}</div>}
        
        {/* Сообщение об успехе */}
        {success && <div className="alert alert-success">{success}</div>}

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
