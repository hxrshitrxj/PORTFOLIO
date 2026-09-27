import React from 'react';
import { Terminal, ArrowRight } from 'lucide-react';
import { useExperience, EXPERIENCES } from '../../context/ExperienceContext';
import './InteractiveLab.css';

export function InteractiveLab() {
  const { openExperience } = useExperience();

  return (
    <section className="lab-section" id="lab">
      <div className="lab-container">
        <div className="lab-chamber-badge">
          <Terminal size={14} className="chamber-icon" />
          <span>CHAMBER // UNDER_CONSTRUCTION</span>
        </div>

        <h2 className="lab-headline">THE LAB IS STILL LOADING.</h2>

        <p className="lab-statement">
          Experiments, prototypes, wild ideas, and things that probably shouldn't work — coming soon.
        </p>

        <div className="lab-actions">
          <button
            type="button"
            className="lab-cta-btn primary"
            onClick={() => openExperience(EXPERIENCES.WORKS)}
          >
            <span>VIEW VERIFIED PROJECT // LI-FI</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default InteractiveLab;
