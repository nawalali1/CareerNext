import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Questionnaire.css';

const questions = [
  {
    question: "Which activity energizes you the most?",
    options: [
      "Solving complex problems",
      "Expressing ideas visually or verbally",
      "Helping others achieve their goals",
      "Organizing systems or processes",
    ],
  },
  {
    question: "What environment helps you perform at your best?",
    options: [
      "Fast-paced and competitive",
      "Supportive and collaborative",
      "Structured and goal-oriented",
      "Flexible and creative",
    ],
  },
  {
    question: "When learning something new, what do you care about most?",
    options: [
      "Understanding how it works logically",
      "Applying it to real-life situations",
      "Exploring it creatively",
      "Sharing or teaching it to others",
    ],
  },
  {
    question: "How do people typically describe you?",
    options: [
      "Analytical and precise",
      "Creative and expressive",
      "Empathetic and supportive",
      "Reliable and organized",
    ],
  },
  {
    question: "Which of these motivates you most?",
    options: [
      "Solving high-impact problems",
      "Communicating effectively",
      "Working closely with others",
      "Achieving clear goals",
    ],
  },
  {
    question: "What kind of challenges are you drawn to?",
    options: [
      "Technical challenges",
      "Design & communication challenges",
      "People-centered challenges",
      "Business or strategic challenges",
    ],
  },
];

function Questionnaire() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleNext = () => {
    if (answers[current]) {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
      } else {
        navigate('/loading', { state: { answers } });
      }
    }
  };

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);
  };

  return (
    <div className="questionnaire-container">
      <div className="progress">Question {current + 1} of {questions.length}</div>
      <h2>{questions[current].question}</h2>
      <div className="options">
        {questions[current].options.map((option, index) => (
          <label key={index} className={`option ${answers[current] === option ? 'selected' : ''}`}>
            <input
              type="radio"
              name={`question-${current}`}
              value={option}
              checked={answers[current] === option}
              onChange={() => handleSelect(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={handleBack} disabled={current === 0}>Back</button>
        <button onClick={handleNext}>{current === questions.length - 1 ? 'Submit' : 'Next'}</button>
      </div>
    </div>
  );
}

export default Questionnaire;

  