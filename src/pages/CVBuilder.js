import React, { useState } from 'react';
import './CVBuilder.css';

function CVBuilder() {
  const [cvContent, setCvContent] = useState(`
    <h2>Your Name</h2>
    <p class="faded">Professional Summary...</p>
  `);

  const insertSection = (section) => {
    let block = '';
    switch (section) {
      case 'summary':
        block = `<h3>Professional Summary</h3><p>A motivated and adaptable professional seeking...</p>`;
        break;
      case 'education':
        block = `<h3>Education</h3><p><strong>University Name</strong> — Degree (Year)</p>`;
        break;
      case 'experience':
        block = `<h3>Experience</h3><p><strong>Role Title</strong> at Company<br>Key responsibilities and achievements...</p>`;
        break;
      case 'skills':
        block = `<h3>Skills</h3><ul><li>Problem Solving</li><li>JavaScript</li><li>Communication</li></ul>`;
        break;
      default:
        return;
    }
    setCvContent((prev) => prev + block);
  };

  return (
    <div className="cv-builder">
      <div className="cv-sidebar">
        <h2>CV Assistant</h2>
        <p>Let AI help build your CV:</p>
        <button onClick={() => insertSection('summary')}>+ Summary</button>
        <button onClick={() => insertSection('education')}>+ Education</button>
        <button onClick={() => insertSection('experience')}>+ Experience</button>
        <button onClick={() => insertSection('skills')}>+ Skills</button>
      </div>
  
      <div className="cv-editor">
        <div className="cv-canvas-wrapper">
          <div
            className="cv-canvas"
            contentEditable
            onInput={(e) => setCvContent(e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: cvContent }}
          ></div>
          <img
            src="/ai-hand.png"
            alt="AI Assistant Hand"
            className="assistant-hand-static"
          />
        </div>
      </div>
    </div>
  );
  
}

export default CVBuilder;
