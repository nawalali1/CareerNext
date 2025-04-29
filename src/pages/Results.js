import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Results.css';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers;

  if (!answers || answers.length === 0) {
    return (
      <div className="results-container fade-in">
        <div className="no-results-card">
          <h2> No Results Yet</h2>
          <p>
            You haven’t completed the questionnaire yet. Answer a few quick questions
            to discover your ideal career path — powered by AI.
          </p>
          <button className="primary-button" onClick={() => navigate('/questionnaire')}>
            Take the Career Quiz
          </button>
        </div>
      </div>
    );
  }

  const categoryScores = {
    tech: 0,
    design: 0,
    people: 0,
    business: 0,
  };

  const keywordMap = {
    tech: ["problem", "logic", "technical", "analytical"],
    design: ["visual", "creative", "design", "expressive", "communication"],
    people: ["helping", "supportive", "empathetic", "people"],
    business: ["organizing", "structure", "goal", "strategy"],
  };

  answers.forEach((answer) => {
    const lower = answer.toLowerCase();
    Object.entries(keywordMap).forEach(([category, keywords]) => {
      if (keywords.some((word) => lower.includes(word))) {
        categoryScores[category]++;
      }
    });
  });

  const topCategory = Object.entries(categoryScores).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  const careerMap = {
    tech: {
      title: "Software Engineer",
      description: "You’re logical, analytical, and thrive on solving technical problems. A Software Engineering career could be your perfect match.",
    },
    design: {
      title: "UX/UI Designer",
      description: "Your creativity and eye for detail make you ideal for crafting intuitive and visually appealing digital experiences.",
    },
    people: {
      title: "Human Resources Specialist",
      description: "You're empathetic, supportive, and people-driven. A role in Human Resources will let you make a meaningful difference.",
    },
    business: {
      title: "Business Analyst",
      description: "You’re structured, strategic, and goal-oriented. A career in Business Analysis fits your problem-solving mindset.",
    },
  };

  const career = careerMap[topCategory];

  return (
    <div className="results-container fade-in">
      <h2 className="results-title">🎯 Your Recommended Career</h2>
      <div className="career-highlight-card">
        <h3>{career.title}</h3>
        <p>{career.description}</p>
        <div className="results-buttons">
          <Link to={`/jobs?role=${encodeURIComponent(career.title)}`}>
            <button className="primary-button">View Live Job Postings</button>
          </Link>
          <button className="secondary-button" onClick={() => navigate('/questionnaire')}>
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
