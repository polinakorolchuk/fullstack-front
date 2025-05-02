import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddTeacher() {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    specialization: "",
    experienceYears: ""
  });

  const onInputChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:8080/teachers", teacher, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Ошибка при добавлении преподавателя:", error);
    }
  };

  const { name, username, email, password, specialization, experienceYears } = teacher;

  return (
    <div className="container">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Добавление преподавателя</h2>
        <form onSubmit={onSubmit}>
          {["name", "username", "email", "password", "specialization", "experienceYears"].map(field => (
            <div className="mb-3" key={field}>
              <label className="form-label">{field === "experienceYears" ? "Опыт работы (лет)" : field === "specialization" ? "Специализация" : field === "password" ? "Пароль" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                className="form-control"
                placeholder={`Введите ${field}`}
                name={field}
                value={teacher[field]}
                onChange={onInputChange}
              />
            </div>
          ))}
          <button type="submit" className="btn btn-outline-primary">Подтвердить</button>
          <Link className="btn btn-outline-danger mx-2" to="/">Отмена</Link>
        </form>
      </div>
    </div>
  );
}
