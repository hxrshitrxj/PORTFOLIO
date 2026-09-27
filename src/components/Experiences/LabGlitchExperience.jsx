import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';
import { useExperience, EXPERIENCES } from '../../context/ExperienceContext';
import './LabGlitchExperience.css';

export function LabGlitchExperience({ transitionPhase, originRect }) {
  const { openExperience, closeExperience } = useExperience();
  const [dots, setDots] = useState('');
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setMouseTilt({ x, y });
  };

  return (
    <div 
      className={`lab-glitch-container phase-${transitionPhase.toLowerCase()}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Ambient Visual Layers */}
      <div className="lab-scanlines" aria-hidden="true" />
      <div className="lab-noise-layer" aria-hidden="true" />
      <div className="lab-glow-orb top-left" aria-hidden="true" />
      <div className="lab-glow-orb bottom-right" aria-hidden="true" />

      {/* Centered Hero Loading Stage */}
      <div className="lab-loading-stage">
        <div 
          className="lab-loading-card"
          style={{
            transform: `perspective(1000px) rotateX(${mouseTilt.y * 0.3}deg) rotateY(${mouseTilt.x * 0.3}deg)`,
          }}
        >
          {/* Cyber Chamber Badge */}
          <div className="lab-chamber-badge">
            <Terminal size={14} className="chamber-icon" />
            <span>CHAMBER // UNDER_CONSTRUCTION</span>
          </div>

          {/* Primary User-Requested Headline */}
          <h1 className="lab-headline">
            THE LAB IS STILL LOADING<span className="animated-dots">{dots}</span>
          </h1>

          {/* Primary User-Requested Subtitle & Description */}
          <p className="lab-statement">
            Experiments, prototypes, wild ideas, and things that probably shouldn't work — coming soon.
          </p>

          {/* Sci-Fi Holographic Progress Bar */}
          <div className="lab-progress-container">
            <div className="lab-progress-header">
              <span className="progress-label">SYNTHESIZING EXPERIMENTAL PIPELINE</span>
              <span className="progress-pct">COMPILING IDEAS...</span>
            </div>
            <div className="lab-progress-track">
              <div className="lab-progress-fill" />
              <div className="lab-progress-glow" />
            </div>
            <div className="lab-hash-grid">
              {[...Array(16)].map((_, i) => (
                <span key={i} className="hash-block" style={{ animationDelay: `${i * 0.12}s` }} />
              ))}
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="lab-actions">
            <button
              type="button"
              className="lab-cta-btn primary"
              onClick={() => openExperience(EXPERIENCES.WORKS)}
            >
              <span>EXPLORE VERIFIED PROJECT // LI-FI</span>
              <ArrowRight size={14} />
            </button>
            <button
              type="button"
              className="lab-cta-btn secondary"
              onClick={closeExperience}
            >
              <span>RETURN TO MAIN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LabGlitchExperience;
