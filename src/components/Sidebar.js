import React from 'react';
import './Sidebar.css';

const Sidebar = ({ setActiveTab }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <button className="btn btn-link" onClick={() => setActiveTab('profile')}>МОИ ДАННЫЕ</button>
        </li>
        <li>
          <button className="btn btn-link" onClick={() => setActiveTab('users')}>Студенты</button>
        </li>
        <li>
          <button className="btn btn-link" onClick={() => setActiveTab('teachers')}>Преподаватели</button> {/* Новая вкладка */}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;


