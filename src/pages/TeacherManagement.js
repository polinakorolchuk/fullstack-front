import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadTeachers();
  }, []);

  useEffect(() => {
    const filtered = teachers.filter((teacher) =>
      teacher.user?.username?.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [filter, teachers]);

  const loadTeachers = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get("http://localhost:8080/teachers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeachers(result.data);
      setFilteredTeachers(result.data);
    } catch (error) {
      console.error("Ошибка при загрузке преподавателей:", error);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadTeachers();
    } catch (error) {
      console.error("Ошибка при удалении преподавателя:", error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2>Список преподавателей</h2>

        <Link className="btn btn-success mb-3" to="/addteacher">
          Добавить преподавателя
        </Link>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск по никнейму..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <table className="table border shadow table-wide">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Имя</th>
              <th scope="col">Никнейм</th>
              <th scope="col">Почта</th>
              <th scope="col">Специализация</th>
              <th scope="col" style={{ width: '150px' }}>Опыт работы</th>
              <th scope="col" style={{ width: '300px' }}>Действие</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher, index) => (
              <tr key={teacher.id}>
                <th scope="row">{index + 1}</th>
                <td>{teacher.user?.name || "—"}</td>
                <td>{teacher.user?.username || "—"}</td>
                <td>{teacher.user?.email || "—"}</td>
                <td>{teacher.specialization || "Не указано"}</td>
                <td>{teacher.experienceYears || "Не указан"}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-1"
                    to={`/viewteacher/${teacher.id}`}
                  >
                    Просмотр
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-1"
                    to={`/editteacher/${teacher.id}`}
                  >
                    Изменение
                  </Link>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() =>
                      teacher.user && deleteTeacher(teacher.user.id)
                    }
                  >
                    Удаление
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

