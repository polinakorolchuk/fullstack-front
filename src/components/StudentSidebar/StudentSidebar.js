// src/components/StudentSidebar.js
import React from 'react';

const StudentSidebar = ({ setActiveTab }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <button className="btn btn-link" onClick={() => setActiveTab('profile')}>
            Мои данные
          </button>
        </li>
        {/* Добавьте другие пункты меню по необходимости */}
      </ul>
    </div>
  );
};

export default StudentSidebar;

