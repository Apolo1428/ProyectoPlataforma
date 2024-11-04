import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';

import './App.css';

const App = () => {
    return (
        <Router>
          <div> 
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Register" element={<Register/>} />
                        <Route path="/Dashboard" element={<Dashboard />} />
                    </Routes>
                </div>
          </div>
        </Router>
    );
};

export default App;