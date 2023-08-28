import React from "react";
import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";
import LoginScreen from "src/pages/Login/LoginScreen";
import "./App.css";
import { useUserContext } from "./stores/UserContext";
import DashboardScreen from "./pages/Dashboard/DashboardScreen";

function App() {
  const { user } = useUserContext();
  const isLoggedIn = !!user;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={isLoggedIn ? DashboardScreen : () => <Navigate to="/login" />} />
        <Route path="/login" Component={!isLoggedIn ? LoginScreen : () => <Navigate to="/" />} />
        <Route path="*" Component={() => <h1>Not found</h1>} />
      </Routes>
      ;
    </BrowserRouter>
  );
}

export default App;
