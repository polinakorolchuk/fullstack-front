import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.get(`http://localhost:8080/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Добавляем токен в заголовки запроса
        },
      });
      setUser(result.data);
    } catch (error) {
      console.error("Ошибка при загрузке пользователя:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Карточка пользователя</h2>

          <div className="card">
            <div className="card-header">
              Данные под порядковым номером: {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Имя:</b>
                  {user.name}
                </li>
                <li className="list-group-item">
                  <b>Никнейм:</b>
                  {user.username}
                </li>
                <li className="list-group-item">
                  <b>Почта:</b>
                  {user.email}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Назад
          </Link>
        </div>
      </div>
    </div>
  );
}
