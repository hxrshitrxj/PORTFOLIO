import React from 'react';
import { ArrowLeft, X, Sparkles } from 'lucide-react';
import { useExperience, EXPERIENCES } from '../../context/ExperienceContext';
import WorksArchiveExperience from './WorksArchiveExperience';
import LabGlitchExperience from './LabGlitchExperience';
import JourneyTimelineExperience from './JourneyTimelineExperience';
import AboutIdentityExperience from './AboutIdentityExperience';
import './ExperienceManager.css';

export function ExperienceManager() {
  const { 
    activeExperience, 
    transitionPhase, 
    originRect, 
    openExperience, 
    closeExperience 
  } = useExperience();

  // If no experience is active and we're not exiting, don't render
  if (!activeExperience && transitionPhase === 'IDLE') {
    return null;
  }

  const handleNavClick = (mode, e) => {
    e.preventDefault();
    e.stopPropagation();
    openExperience(mode, e);
  };

  return (
    <div 
      className={`experience-system-overlay ${activeExperience ? `mode-${activeExperience.toLowerCase()}` : ''} phase-${transitionPhase.toLowerCase()}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${activeExperience} Mode Experience`}
    >
      {/* Persistent Futuristic Top Navigation Bar */}
      <nav className="exp-master-nav">
        {/* Brand Group */}
        <div className="exp-nav-brand" onClick={closeExperience} role="button" tabIndex={0}>
          <span className="brand-dot-pulse" />
          <span className="brand-name">HARSHIT RAJ</span>
          <span className="brand-sep">/</span>
          <span className="brand-mode-active">
            {activeExperience ? `${activeExperience} MODE` : 'MAIN INTERFACE'}
          </span>
        </div>

        {/* Center Mode Switch Buttons */}
        <div className="exp-nav-modes">
          {Object.values(EXPERIENCES).map((mode) => {
            const isActive = activeExperience === mode;
            return (
              <button
                key={mode}
                type="button"
                className={`exp-nav-btn ${isActive ? 'btn-active' : ''}`}
                onClick={(e) => handleNavClick(mode, e)}
              >
                <span className="exp-btn-text">{mode}</span>
                {isActive && <span className="exp-active-dot" />}
              </button>
            );
          })}
        </div>

        {/* Persistent Return / Exit Control */}
        <div className="exp-nav-actions">
          <button 
            type="button" 
            className="exp-exit-btn"
            onClick={closeExperience}
            aria-label="Exit experience and return to main interface"
          >
            <ArrowLeft size={14} className="exit-arrow-anim" />
            <span className="exit-btn-label">EXIT EXPERIENCE</span>
            <span className="esc-key-badge">ESC</span>
          </button>
        </div>
      </nav>

      {/* Dynamic Full-Screen Experience Content */}
      <div className="exp-content-stage">
        {activeExperience === EXPERIENCES.WORKS && (
          <WorksArchiveExperience 
            transitionPhase={transitionPhase} 
            originRect={originRect} 
          />
        )}

        {activeExperience === EXPERIENCES.LAB && (
          <LabGlitchExperience 
            transitionPhase={transitionPhase} 
            originRect={originRect} 
          />
        )}

        {activeExperience === EXPERIENCES.JOURNEY && (
          <JourneyTimelineExperience 
            transitionPhase={transitionPhase} 
            originRect={originRect} 
          />
        )}

        {activeExperience === EXPERIENCES.ABOUT && (
          <AboutIdentityExperience 
            transitionPhase={transitionPhase} 
            originRect={originRect} 
          />
        )}
      </div>
    </div>
  );
}

export default ExperienceManager;
