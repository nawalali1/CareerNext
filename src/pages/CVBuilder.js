// src/pages/CVBuilder.js
import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './CVBuilder.css';

const FONT_LIST = [
  'Arial','Arial Black','Calibri','Cambria','Candara','Comic Sans MS','Courier New',
  'Georgia','Helvetica','Impact','Lucida Console','Lucida Sans Unicode','Palatino','Segoe UI',
  'Tahoma','Times New Roman','Trebuchet MS','Verdana','Inter'
];

export default function CVBuilder() {
  // 1. Sidebar info
  const [info, setInfo] = useState({
    fullName:'', title:'', email:'', phone:'', location:''
  });

  // 2. Sections and order
  const defaultSections = {
    summary:'<p>Your summary…</p>',
    experience:'<p><strong>Role</strong> at Company</p>',
    education:'<p><strong>Degree</strong>, Institution</p>',
    skills:'<ul><li>Skill 1</li><li>Skill 2</li></ul>'
  };
  const [sections, setSections] = useState(defaultSections);
  const [order, setOrder] = useState(Object.keys(defaultSections));

  // 3. Layout toggle
  const [twoColumn, setTwoColumn] = useState(true);

  // 4. Visibility toggles
  const [showSections, setShowSections] = useState(
    Object.fromEntries(Object.keys(defaultSections).map(k => [k, true]))
  );
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);

  // 5. Theme
  const [theme, setTheme] = useState('modern');

  // 6. Active section
  const [active, setActive] = useState(order[0]);

  // 7. Refs for editable areas and preview
  const refs = {
    summary: useRef(),
    experience: useRef(),
    education: useRef(),
    skills: useRef()
  };
  const cvRef = useRef();

  // Load saved state
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cvPhase2')||'{}');
    if (saved.info) setInfo(saved.info);
    if (saved.sections) setSections(saved.sections);
    if (saved.order) setOrder(saved.order);
    if (saved.twoColumn != null) setTwoColumn(saved.twoColumn);
    if (saved.showSections) setShowSections(saved.showSections);
    if (saved.showHeader != null) setShowHeader(saved.showHeader);
    if (saved.showFooter != null) setShowFooter(saved.showFooter);
    if (saved.theme) setTheme(saved.theme);
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem('cvPhase2', JSON.stringify({
      info, sections, order, twoColumn,
      showSections, showHeader, showFooter, theme
    }));
  }, [info, sections, order, twoColumn, showSections, showHeader, showFooter, theme]);

  // Reorder sections with up/down
  const move = (idx, dir) => {
    const newOrder = [...order];
    const [m] = newOrder.splice(idx, 1);
    newOrder.splice(idx + dir, 0, m);
    setOrder(newOrder);
  };

  // execCommand on active
  const exec = (cmd, val=null) => {
    const r = refs[active];
    if (r.current) r.current.focus();
    document.execCommand(cmd, false, val);
    document.execCommand('styleWithCSS', false, true);
  };

  // Save HTML of section
  const save = key => {
    const html = refs[key].current?.innerHTML;
    if (html) setSections(s => ({ ...s, [key]: html }));
  };

  // Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF({ unit:'pt', format:'a4' });
    doc.html(cvRef.current, {
      callback: () => doc.save('CareerNext_CV.pdf'),
      x:20, y:20, html2canvas:{ scale:0.57 }
    });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = e => {
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'b': e.preventDefault(); exec('bold'); break;
          case 'i': e.preventDefault(); exec('italic'); break;
          case 'u': e.preventDefault(); exec('underline'); break;
          case 'z': e.preventDefault(); exec('undo'); break;
          case 'y': e.preventDefault(); exec('redo'); break;
          default: break;
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active]);

  return (
    <>
      {/* Toolbar */}
      <div className="toolbar" role="toolbar" aria-label="Text formatting toolbar">
        <button
          onClick={() => setTwoColumn(!twoColumn)}
          aria-pressed={twoColumn}
          aria-label="Toggle layout"
        >
          {twoColumn?'Single Column':'Two Column'}
        </button>

        <select
          value={theme}
          onChange={e => setTheme(e.target.value)}
          aria-label="Select theme"
        >
          <option value="modern">Modern</option>
          <option value="classic">Classic</option>
          <option value="creative">Creative</option>
        </select>

        <button
          onClick={() => setShowHeader(!showHeader)}
          aria-pressed={showHeader}
          aria-label="Toggle header"
        >
          Header
        </button>
        <button
          onClick={() => setShowFooter(!showFooter)}
          aria-pressed={showFooter}
          aria-label="Toggle footer"
        >
          Footer
        </button>

        <input
          list="fonts"
          placeholder="Font"
          onMouseDown={e => e.preventDefault()}
          onChange={e => exec('fontName', e.target.value)}
          aria-label="Font family"
        />
        <datalist id="fonts">
          {FONT_LIST.map(f => <option key={f} value={f}/>)}
        </datalist>

        <select
          defaultValue=""
          onMouseDown={e => e.preventDefault()}
          onChange={e => exec('fontSize', e.target.value)}
          aria-label="Font size"
        >
          <option value="" disabled>Size</option>
          {[2,3,4,5,6,7].map(n =>
            <option key={n} value={n}>{n*2+8}px</option>
          )}
        </select>

        <input
          type="color"
          onMouseDown={e => e.preventDefault()}
          onChange={e => exec('foreColor', e.target.value)}
          aria-label="Text color"
        />
        <input
          type="color"
          onMouseDown={e => e.preventDefault()}
          onChange={e => exec('hiliteColor', e.target.value)}
          aria-label="Highlight color"
        />

        <button onMouseDown={e => e.preventDefault()} onClick={() => exec('undo')} aria-label="Undo">
          ↺
        </button>
        <button onMouseDown={e => e.preventDefault()} onClick={() => exec('redo')} aria-label="Redo">
          ↻
        </button>

        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('bold')}
          aria-label="Bold"
        ><b>B</b></button>
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('italic')}
          aria-label="Italic"
        ><i>I</i></button>
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('underline')}
          aria-label="Underline"
        ><u>U</u></button>

        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => {
            const url = prompt('Image URL:');
            if (url) exec('insertImage', url);
          }}
          aria-label="Insert image"
        >
          Img
        </button>

        <button onClick={exportPDF} className="export" aria-label="Export PDF">
          Export PDF
        </button>
      </div>

      {/* Main container */}
      <div className={`cv-container theme-${theme} ${twoColumn?'two':'single'}`}>
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Your Details</h2>
          {['fullName','title','email','phone','location'].map(f => (
            <React.Fragment key={f}>
              <label htmlFor={f}>{f.replace(/([A-Z])/g,' $1')}</label>
              <input
                id={f}
                value={info[f]}
                onChange={e => setInfo(i => ({ ...i, [f]: e.target.value }))}
              />
            </React.Fragment>
          ))}

          {order.map((key, idx) => (
            <div key={key} className="section-control">
              <div className="section-header">
                <h3 onClick={() => setActive(key)}>
                  {key.charAt(0).toUpperCase()+key.slice(1)}
                </h3>
                <div className="buttons">
                  <button onClick={() => move(idx, -1)} disabled={idx===0} aria-label="Move up">↑</button>
                  <button onClick={() => move(idx, 1)} disabled={idx===order.length-1} aria-label="Move down">↓</button>
                  <label>
                    <input
                      type="checkbox"
                      checked={showSections[key]}
                      onChange={e => setShowSections(s => ({ ...s, [key]: e.target.checked }))}
                      aria-label={`Toggle ${key}`}
                    />
                    Visible
                  </label>
                </div>
              </div>
              <div
                className="editable"
                role="textbox"
                aria-multiline="true"
                tabIndex={0}
                contentEditable
                suppressContentEditableWarning
                ref={refs[key]}
                dangerouslySetInnerHTML={{ __html: sections[key] }}
                onFocus={() => setActive(key)}
                onBlur={() => save(key)}
              />
            </div>
          ))}
        </aside>

        {/* Preview */}
        <main className="preview" ref={cvRef}>
          {showHeader && (
            <header className="hdr">
              <h1>{info.fullName||'Your Name'}</h1>
              <h3>{info.title}</h3>
              <p className="contact">
                {info.email}
                {info.phone && ' • ' + info.phone}
                {info.location && ' • ' + info.location}
              </p>
            </header>
          )}

          {order.map(key => (
            showSections[key] && (
              <section key={key}>
                <h2>{key.charAt(0).toUpperCase()+key.slice(1)}</h2>
                <div dangerouslySetInnerHTML={{ __html: sections[key] }} />
              </section>
            )
          ))}

          {showFooter && (
            <footer className="cv-footer">
              <p>Generated by CareerNext</p>
            </footer>
          )}
        </main>
      </div>
    </>
  );
}
