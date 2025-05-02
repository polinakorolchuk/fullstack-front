// src/pages/StudentMenu.js
import React, { useState } from "react";
import StudentSidebar from '../components/StudentSidebar/StudentSidebar';
import StudentProfile from "./StudentProfile";

export default function StudentMenu() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <StudentSidebar setActiveTab={setActiveTab} />
        </div>
        <div className="col-md-9">
          {activeTab === null && (
            <div>
              <h2>Добро пожаловать в Меню студента!</h2>
              <p>Выберите действие в меню слева.</p>
            </div>
          )}

          {activeTab === 'profile' && (
            <StudentProfile />
          )}

          {/* Добавьте другие вкладки по необходимости */}
        </div>
      </div>
    </div>
  );
}
