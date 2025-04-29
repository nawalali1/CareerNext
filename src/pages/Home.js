import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="container">
      <div className="hero-text">
        <h1>Your Career, Your Way</h1>
        <p>
          CareerNext helps you discover the best path forward—whether you're starting out, graduating soon, or
          looking to reinvent your professional journey.
        </p>
      </div>

      <div className="cta-buttons">
        <div className="cta-group">
          <Link to="/questionnaire">
            <button>Current Students</button>
          </Link>
          <Link to="/degree-to-career">
            <button className="secondary-button">Explore Careers by Degree</button>
          </Link>
        </div>

        <div className="cta-group">
          <Link to="/questionnaire">
            <button>Recent Graduates</button>
          </Link>
          <Link to="/degree-to-career">
            <button className="secondary-button">Map My Degree to Jobs</button>
          </Link>
        </div>

        <div className="cta-group">
          <Link to="/questionnaire">
            <button>Career Switchers</button>
          </Link>
        </div>
      </div>

      <div className="audience-section employers">
        <h2>For Employers & Recruiters</h2>
        <p>
          Discover top talent by posting your open positions. Our intelligent match-making system connects your
          company with the right candidates, faster.
        </p>
        <Link to="/login">
          <button>Post a Job</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
