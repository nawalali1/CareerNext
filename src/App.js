import './firebase';
import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

// Pages
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import Results from './pages/Results';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoadingScreen from './pages/LoadingScreen';
import CVBuilder from './pages/CVBuilder';
import Jobs from './pages/Jobs';
import DegreeToCareer from './pages/DegreeToCareer';
import Students from './pages/Students'; // ✅ NEW IMPORT

// Route protection
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/loading" element={<LoadingScreen />} />

          {/* Private routes */}
          <Route
            path="/cv-builder"
            element={<PrivateRoute user={user} element={<CVBuilder />} />}
          />
          <Route
            path="/questionnaire"
            element={<PrivateRoute user={user} element={<Questionnaire />} />}
          />
          <Route
            path="/results"
            element={<PrivateRoute user={user} element={<Results />} />}
          />

          {/* Public routes */}
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/degree-to-career" element={<DegreeToCareer />} />
          <Route path="/students" element={<Students />} /> {/* ✅ NEW ROUTE */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
