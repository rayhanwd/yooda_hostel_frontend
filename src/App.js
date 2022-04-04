import React from 'react';
import { BrowserRouter,Navigate, Route, Routes  } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Private from './auth/Private';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard/*" element={<Private><Dashboard /></Private>} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;