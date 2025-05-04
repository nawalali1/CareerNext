// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import LoadingScreen from './pages/LoadingScreen';
import Results from './pages/Results';
import Jobs from './pages/Jobs';
import CVBuilder from './pages/CVBuilder';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Quiz flow */}
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/results" element={<Results />} />

        {/* Live Jobs */}
        <Route path="/jobs" element={<Jobs />} />

        {/* CV Builder */}
        <Route path="/cvbuilder" element={<CVBuilder />} />

        {/* SETTINGS – no auth guard */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
