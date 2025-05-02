import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewTeacher() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    const loadTeacher = async () => {
      const token = localStorage.getItem("token");
      try {
        const result = await axios.get(`http://localhost:8080/teachers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeacher(result.data);
      } catch (error) {
        console.error("Ошибка при загрузке преподавателя:", error);
      }
    };
    loadTeacher();
  }, [id]);

  return (
    <div className="container">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Карточка преподавателя</h2>
        <div className="card">
          <div className="card-header">
            Данные преподавателя
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><b>Имя:</b> {teacher.user?.name}</li>
              <li className="list-group-item"><b>Никнейм:</b> {teacher.user?.username}</li>
              <li className="list-group-item"><b>Почта:</b> {teacher.user?.email}</li>
              <li className="list-group-item"><b>Специализация:</b> {teacher.specialization}</li>
              <li className="list-group-item"><b>Опыт работы:</b> {teacher.experienceYears} лет</li>
            </ul>
          </div>
        </div>
        <Link className="btn btn-primary my-2" to="/">Назад</Link>
      </div>
    </div>
  );
}
