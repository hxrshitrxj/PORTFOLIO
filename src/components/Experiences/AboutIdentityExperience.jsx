import React, { useState, useEffect, useRef } from 'react';
import { User, Terminal, Cpu, Sparkles, ArrowUpRight, Globe, Layers, HeartHandshake } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import './AboutIdentityExperience.css';

export function AboutIdentityExperience({ transitionPhase, originRect }) {
  const [revealedStep, setRevealedStep] = useState(0);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { openModal } = useModal();

  // Progressive information reveal sequence
  useEffect(() => {
    const s1 = setTimeout(() => setRevealedStep(1), 100);
    const s2 = setTimeout(() => setRevealedStep(2), 250);
    const s3 = setTimeout(() => setRevealedStep(3), 420);
    const s4 = setTimeout(() => setRevealedStep(4), 600);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(s4);
    };
  }, []);

  // Subtle 3D camera mouse parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMouseParallax({ x, y });
  };

  const handleOpenContact = (e) => {
    openModal('contact', null, e);
  };

  return (
    <div 
      className={`about-identity-container phase-${transitionPhase.toLowerCase()}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Dark Ambient Backdrop & Concentric Biometric Rings */}
      <div className="about-dark-backdrop" aria-hidden="true" />
      <div className="about-radial-halo" aria-hidden="true" />

      {/* Identity Reveal Stage */}

      {/* Identity Reveal Stage */}
      <div className="about-stage-wrapper">
        
        {/* Left Telemetry Column */}
        <div className={`about-info-col left-col ${revealedStep >= 2 ? 'visible' : ''}`}>
          <div className="info-block brand-block">
            <span className="sub-kicker">PERSONAL IDENTITY</span>
            <h1 className="identity-name">HARSHIT RAJ</h1>
            <h2 className="identity-title">CREATIVE DEV & SYSTEMS ARCHITECT</h2>
          </div>

          <div className="identity-spec-table">
            <div className="spec-row">
              <span className="spec-k">BASED IN</span>
              <span className="spec-v">INDIA</span>
            </div>
            <div className="spec-row">
              <span className="spec-k">FOCUS</span>
              <span className="spec-v">CSE / SOFTWARE / AI</span>
            </div>
            <div className="spec-row">
              <span className="spec-k">CURRENT STATUS</span>
              <span className="spec-v spec-highlight">BUILDING ●</span>
            </div>
          </div>

          <div className="interests-card">
            <span className="interests-title">AREAS OF FOCUS & CURIOSITY</span>
            <div className="interests-pills">
              <span className="pill">AI</span>
              <span className="pill">WEB</span>
              <span className="pill">SYSTEMS</span>
              <span className="pill">STARTUPS</span>
              <span className="pill">SPATIAL UI</span>
              <span className="pill">CREATIVE TECH</span>
            </div>
          </div>
        </div>

        {/* Center Hero Portrait Viewport with Rotating HUD Telemetry */}
        <div 
          className={`about-center-portrait-stage ${revealedStep >= 1 ? 'visible' : ''}`}
          style={{
            transform: `perspective(1000px) rotateY(${mouseParallax.x * 0.5}deg) rotateX(${-mouseParallax.y * 0.5}deg)`,
          }}
        >
          {/* Biometric Target Rings */}
          <div className="reticle-ring ring-outer" />
          <div className="reticle-ring ring-inner" />
          <div className="reticle-axis-x" />
          <div className="reticle-axis-y" />

          {/* Central Portrait Cutout */}
          <div className="portrait-image-wrapper">
            <img 
              src="/hero-person.png" 
              alt="Harshit Raj" 
              className="about-portrait-cutout"
            />
            <div className="portrait-amber-backlight" />
            <div className="portrait-rim-glow" />
          </div>
        </div>

        {/* Right Personal Statement Column */}
        <div className={`about-info-col right-col ${revealedStep >= 3 ? 'visible' : ''}`}>
          
          <div className="philosophy-statement-card">
            <span className="statement-kicker">PERSONAL ETHOS</span>
            <blockquote className="personal-quote-statement">
              “I like building things,<br />
              breaking things,<br />
              and figuring out<br />
              how they work.”
            </blockquote>
            <p className="statement-subtext">
              Not content with surface-level abstractions. Driven to dissect every layer of the stack—from hardware sensor telemetry and low-level algorithms to high-framerate shader math and spatial UI operating systems.
            </p>
          </div>

          <div className="about-action-card">
            <div className="action-card-header">
              <HeartHandshake size={14} className="action-icon" />
              <span>CONNECT & COLLABORATE</span>
            </div>
            <p className="action-card-desc">
              Interested in building high-impact software, exploring AI architectures, or collaborating on ambitious products?
            </p>
            <div className="action-card-buttons">
              <button 
                type="button" 
                className="about-cta-primary"
                onClick={handleOpenContact}
              >
                <span>LET'S TALK</span>
                <ArrowUpRight size={14} />
              </button>
              <a 
                href="https://github.com/hxrshitrxj" 
                target="_blank" 
                rel="noreferrer" 
                className="about-cta-secondary"
              >
                <span>GITHUB ↗</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AboutIdentityExperience;
