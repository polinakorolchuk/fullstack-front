import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import AddTeacher from "./components/Teacher/AddTeacher";
import EditTeacher from "./components/Teacher/EditTeacher";
import ViewTeacher from "./components/Teacher/ViewTeacher";

import ProtectedRoute from "./components/ProtectedRoute";
import TeacherProfile from "./components/TeachersProfile";
import Sidebar from "./components/Sidebar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import StudentMenu from "./pages/StudentMenu";
import UserManagement from "./pages/UserManagement";
import TeacherManagement from "./pages/TeacherManagement"; // Импортируем компонент преподавателей

function App() {
  return (
    <div className="App">
   <Router>
  <Navbar />
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="/student-menu"
      element={
        <ProtectedRoute allowedRoles={["STUDENT"]}>
          <StudentMenu />
        </ProtectedRoute>
      }
    />
    <Route
      path="/home"
      element={
        <ProtectedRoute allowedRoles={["TEACHER"]}>
          <UserManagement />
        </ProtectedRoute>
      }
    />
    <Route
      path="/adduser"
      element={
        <ProtectedRoute allowedRoles={["TEACHER"]}>
          <AddUser />
        </ProtectedRoute>
      }
    />
    <Route
      path="/edituser/:id"
      element={
        <ProtectedRoute allowedRoles={["TEACHER"]}>
          <EditUser />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher"
      element={
        <ProtectedRoute allowedRoles={["TEACHER"]}>
          <TeacherProfile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teachers"
      element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
          <TeacherManagement />
        </ProtectedRoute>
      }
    />
    <Route
      path="/addteacher"
      element={
        <ProtectedRoute allowedRoles={["TEACHER"]}>
          <AddTeacher />
        </ProtectedRoute>
      }
    />
    <Route
      path="/editteacher/:id"
      element={
        <ProtectedRoute allowedRoles={["TEACHER"]}>
          <EditTeacher />
        </ProtectedRoute>
      }
    />
    <Route
      path="/viewteacher/:id"
      element={
        <ProtectedRoute allowedRoles={["TEACHER"]}>
          <ViewTeacher />
        </ProtectedRoute>
      }
    />
    <Route path="/viewuser/:id" element={<ViewUser />} />
  </Routes>
</Router>

    </div>
  );
}

export default App;

