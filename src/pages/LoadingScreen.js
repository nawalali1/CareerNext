import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoadingScreen.css';

function LoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/results', { state: { answers: location.state.answers } });
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [navigate, location]);

  return (
    <div className="loading-screen">
      <div className="loading-box">
        <h2>Analyzing your responses...</h2>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
