import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import LandingPage from "./components/LandingPage";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './theme.css';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
      <SpeedInsights />
    </>
  );
};

export default App;
