import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./auth/Login";
import Register from "./auth/Register";
import StudentMenu from "./pages/StudentMenu";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* 🔐 Аутентификация */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 👨‍🎓 Студентское меню (только для STUDENT) */}
          <Route
            path="/student-menu"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentMenu />
              </ProtectedRoute>
            }
          />

          {/* 👨‍🏫 Преподавательские маршруты (по умолчанию только авторизованные) */}
          <Route
            path="/adduser"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edituser/:id"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />

          {/* 👁️ Общедоступная страница */}
          <Route path="/viewuser/:id" element={<ViewUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


