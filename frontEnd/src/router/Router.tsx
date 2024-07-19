import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import App from "../App";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Todo from "../pages/todo/Todo";
import NotFound from "../pages/notFound/NotFound";

// A utility function to get the authentication status
const isAuthenticated = () => {
  // Implement your token verification logic here
  return !!localStorage.getItem("token");
};

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/todo" 
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
