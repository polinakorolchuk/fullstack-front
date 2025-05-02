import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const result = await axios.get("http://localhost:8080/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(result.data);
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadUsers();
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
    }
  };

  // Фильтрация пользователей по роли 'STUDENT'
  const filteredStudents = users.filter(
    (user) =>
      user.role === "STUDENT" &&
      user.name.toLowerCase().includes(filter.toLowerCase())
  );

  const renderTable = (title, data) => (
    <>
      <h4 className="mt-4">{title}</h4>
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Имя</th>
            <th scope="col">Никнейм</th>
            <th scope="col">Почта</th>
            <th scope="col">Действие</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link className="btn btn-primary mx-1" to={`/viewuser/${user.id}`}>
                  Просмотр
                </Link>
                <Link
                  className="btn btn-outline-primary mx-1"
                  to={`/edituser/${user.id}`}
                >
                  Изменение
                </Link>
                <button
                  className="btn btn-danger mx-1"
                  onClick={() => deleteUser(user.id)}
                >
                  Удаление
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div className="container">
      <div className="py-4">
        <h2>Список студентов</h2>
        {/* Кнопка добавления пользователя */}
        <Link className="btn btn-outline-success my-3" to="/adduser">
          Добавить пользователя
        </Link>

        {/* 🔍 Поиск по имени */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск по имени..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {renderTable("", filteredStudents)}
      </div>
    </div>
  );
}
