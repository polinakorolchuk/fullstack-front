import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditTeacher() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [teacher, setTeacher] = useState({
    name: "",
    username: "",
    email: "",
    specialization: "",
    experienceYears: ""
  });

  const onInputChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const getAuthToken = () => localStorage.getItem("token");

  useEffect(() => {
    loadTeacher();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/teachers/${id}`, teacher, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      navigate("/"); // Navigate to the teachers list or another page after successful update
    } catch (error) {
      console.error("Ошибка при обновлении преподавателя:", error);
    }
  };

  const loadTeacher = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/teachers/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      // Set the teacher state including user info
      setTeacher({
        name: result.data.user?.name || "",
        username: result.data.user?.username || "",
        email: result.data.user?.email || "",
        specialization: result.data.specialization || "",
        experienceYears: result.data.experienceYears || ""
      });
    } catch (error) {
      console.error("Ошибка при загрузке преподавателя:", error);
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Редактирование преподавателя</h2>
        <form onSubmit={onSubmit}>
          {["name", "username", "email", "specialization", "experienceYears"].map(field => (
            <div className="mb-3" key={field}>
              <label className="form-label">
                {field === "experienceYears" ? "Опыт работы (лет)" :
                 field === "specialization" ? "Специализация" : 
                 field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                className="form-control"
                name={field}
                value={teacher[field]}
                onChange={onInputChange}
              />
            </div>
          ))}
          <button type="submit" className="btn btn-outline-primary">Сохранить</button>
          <Link className="btn btn-outline-danger mx-2" to="/">Отмена</Link>
        </form>
      </div>
    </div>
  );
}
