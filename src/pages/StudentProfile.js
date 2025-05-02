import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentProfile = () => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get('http://localhost:8080/students/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setForm(res.data);
      })
      .catch(err => console.error('Ошибка при получении профиля:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios.put('http://localhost:8080/students/me', form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => alert('Данные обновлены!'))
      .catch(err => console.error('Ошибка при обновлении данных:', err));
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Профиль студента</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Введите ваше имя"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="username">Логин</label>
          <input
            id="username"
            className="form-control"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Введите ваш логин"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            className="form-control"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Введите ваш пароль"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email">Почта</label>
          <input
            id="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Введите ваш email"
            type="email"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Сохранить</button>
      </form>
    </div>
  );
};

export default StudentProfile;

