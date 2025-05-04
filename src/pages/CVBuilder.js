import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './CVBuilder.css';

console.log('CVBuilder mounted'); // Should appear in console

const defaultData = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  experience: [{ company: '', role: '', period: '', details: '' }],
  education: [{ institution: '', degree: '', year: '' }],
  skills: [''],
};

export default function CVBuilder() {
  const [data, setData] = useState(defaultData);
  const cvRef = useRef();

  useEffect(() => {
    // Load saved
    const saved = localStorage.getItem('careerNextCV');
    if (saved) {
      try {
        setData(JSON.parse(saved));
        console.log('Loaded CV data');
      } catch (e) {
        console.error('Error parsing CV data', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('careerNextCV', JSON.stringify(data));
  }, [data]);

  const handleChange = (section, idx, field, value) => {
    setData(prev => {
      const clone = { ...prev };
      if (Array.isArray(clone[section])) {
        clone[section][idx][field] = value;
      } else {
        clone[section] = value;
      }
      return clone;
    });
  };

  const addItem = section => {
    setData(prev => {
      const clone = { ...prev };
      const template = defaultData[section][0];
      clone[section] = [...clone[section], { ...template }];
      return clone;
    });
  };

  const addSkill = () =>
    setData(prev => ({ ...prev, skills: [...prev.skills, ''] }));

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    doc.html(cvRef.current, {
      callback: () => doc.save('CareerNext_CV.pdf'),
      x: 20,
      y: 20,
      html2canvas: { scale: 0.57 },
    });
  };

  return (
    <>
      <Navbar />
      <div className="cv-builder">
        <div className="cv-sidebar">
          <h2>Edit Your CV</h2>
          <label>Full Name</label>
          <input
            value={data.fullName}
            onChange={e => handleChange('fullName', null, null, e.target.value)}
          />
          <label>Title / Position</label>
          <input
            value={data.title}
            onChange={e => handleChange('title', null, null, e.target.value)}
          />
          <label>Email</label>
          <input
            value={data.email}
            onChange={e => handleChange('email', null, null, e.target.value)}
          />
          <label>Phone</label>
          <input
            value={data.phone}
            onChange={e => handleChange('phone', null, null, e.target.value)}
          />

          <h3>Experience</h3>
          {data.experience.map((exp, i) => (
            <div key={i} className="section-group">
              <input
                placeholder="Company"
                value={exp.company}
                onChange={e => handleChange('experience', i, 'company', e.target.value)}
              />
              <input
                placeholder="Role"
                value={exp.role}
                onChange={e => handleChange('experience', i, 'role', e.target.value)}
              />
              <input
                placeholder="Period"
                value={exp.period}
                onChange={e => handleChange('experience', i, 'period', e.target.value)}
              />
              <textarea
                placeholder="Details"
                value={exp.details}
                onChange={e => handleChange('experience', i, 'details', e.target.value)}
              />
            </div>
          ))}
          <button onClick={() => addItem('experience')}>+ Add Experience</button>

          <h3>Education</h3>
          {data.education.map((ed, i) => (
            <div key={i} className="section-group">
              <input
                placeholder="Institution"
                value={ed.institution}
                onChange={e => handleChange('education', i, 'institution', e.target.value)}
              />
              <input
                placeholder="Degree"
                value={ed.degree}
                onChange={e => handleChange('education', i, 'degree', e.target.value)}
              />
              <input
                placeholder="Year"
                value={ed.year}
                onChange={e => handleChange('education', i, 'year', e.target.value)}
              />
            </div>
          ))}
          <button onClick={() => addItem('education')}>+ Add Education</button>

          <h3>Skills</h3>
          {data.skills.map((skill, i) => (
            <input
              key={i}
              placeholder="Skill"
              value={skill}
              onChange={e => {
                const newSkills = [...data.skills];
                newSkills[i] = e.target.value;
                setData(prev => ({ ...prev, skills: newSkills }));
              }}
            />
          ))}
          <button onClick={addSkill}>+ Add Skill</button>

          <button className="download-btn" onClick={downloadPDF}>
            Download as PDF
          </button>
        </div>

        <div className="cv-editor" ref={cvRef}>
          <div className="cv-canvas">
            <h1>{data.fullName || 'Your Name'}</h1>
            <h2>{data.title || 'Professional Title'}</h2>
            <p>
              {data.email && <span>Email: {data.email}</span>}
              {data.phone && <span> | Phone: {data.phone}</span>}
            </p>

            <h3>Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i}>
                <strong>{exp.role || 'Role'}</strong> @{' '}
                <em>{exp.company || 'Company'}</em>
                <span className="faded"> ({exp.period || 'Period'})</span>
                <p>{exp.details || 'Description of responsibilities.'}</p>
              </div>
            ))}

            <h3>Education</h3>
            {data.education.map((ed, i) => (
              <div key={i}>
                <strong>{ed.degree || 'Degree'}</strong>,{' '}
                {ed.institution || 'Institution'}
                <span className="faded"> ({ed.year || 'Year'})</span>
              </div>
            ))}

            <h3>Skills</h3>
            <ul>
              {data.skills
                .filter(s => s)
                .map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
