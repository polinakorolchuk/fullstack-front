import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
        <Home />
      </ProtectedRoute>
    }
  />

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

  <Route path="/viewuser/:id" element={<ViewUser />} />
</Routes>

      </Router>
    </div>
  );
}

export default App;
