import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Получаем токен из localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token");  // Замените на то место, где ты хранишь токен
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/user/${id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,  // Добавляем токен в заголовки запроса
          },
        }
      );
      navigate("/"); // Переход на главную страницу после успешного обновления
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error);
      // Тут можно добавить обработку ошибок, если нужно
    }
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,  // Добавляем токен в заголовки запроса
          },
        }
      );
      setUser(result.data);
    } catch (error) {
      console.error("Ошибка при загрузке данных пользователя:", error);
      // Тут можно добавить обработку ошибок, если нужно
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Имя
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Никнейм
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Почта
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Подтвердить
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Отменить 
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
