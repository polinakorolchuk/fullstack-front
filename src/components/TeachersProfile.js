import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import UserManagement from '../pages/UserManagement';
import AddUser from '../users/AddUser';
import TeacherManagement from '../pages/TeacherManagement';

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(null); // По умолчанию ничего не выбрано

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get('http://localhost:8080/teachers/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setTeacher(res.data);
        setForm(res.data);
      })
      .catch(err => console.error('Ошибка при получении профиля:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleUserChange = (e) => {
    setForm(prev => ({
      ...prev,
      user: {
        ...prev?.user,
        [e.target.name]: e.target.value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios.put('http://localhost:8080/teachers/me', form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => alert('Данные обновлены!'))
      .catch(err => console.error('Ошибка при обновлении данных:', err));
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <Sidebar setActiveTab={setActiveTab} />
        </div>
        <div className="col-md-9">
          {activeTab === null && (
            <div>
              <h2>Добро пожаловать в Меню преподавателя!</h2>
              <p>Выберите действие в меню слева.</p>
            </div>
          )}

          {activeTab === 'profile' && (
            <>
              <h2>Профиль администратора</h2>
              {form.user && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <label htmlFor="name">Имя</label>
                    <input
                      id="name"
                      className="form-control"
                      name="name"
                      value={form.user.name || ''}
                      onChange={handleUserChange}
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="username">Логин</label>
                    <input
                      id="username"
                      className="form-control"
                      name="username"
                      value={form.user.username || ''}
                      onChange={handleUserChange}
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
                      value={form.user.password || ''}
                      onChange={handleUserChange}
                      placeholder="Введите ваш пароль"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="email">Почта</label>
                    <input
                      id="email"
                      className="form-control"
                      name="email"
                      value={form.user.email || ''}
                      onChange={handleUserChange}
                      placeholder="Введите ваш email"
                      type="email"
                    />
                  </div>
                  {/* Убраны поля для специализации и опыта работы */}
                  <button type="submit" className="btn btn-primary mt-2">Сохранить</button>
                </form>
              )}
            </>
          )}

          {activeTab === 'users' && (
            <>
              <h2></h2>
              <UserManagement />
            </>
          )}

          {activeTab === 'addUser' && (
            <>
              <h2></h2>
              <AddUser />
            </>
          )}

          {activeTab === 'teachers' && (
            <>
              <h2></h2>
              <TeacherManagement />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;




