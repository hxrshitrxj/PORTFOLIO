import React from 'react';
import { Cpu, Code, ShieldCheck, Flame, Compass } from 'lucide-react';
import './PhilosophySection.css';

const STATS = [
  { value: '60 FPS', label: 'COMPOSITOR BUDGET', desc: 'Zero layout thrashing, GPU transform & opacity pipeline.' },
  { value: '300vh', label: 'CAMERA CHOREOGRAPHY', desc: 'Continuous scroll-driven storytelling with velocity physics.' },
  { value: '0.08s', label: 'LATENCY CEILING', desc: 'Immediate tactile feedback for interactive audio-visual components.' },
  { value: '100%', label: 'BESPOKE CRAFT', desc: 'No generic templates. Purely tailored modern web architecture.' },
];

const CAPABILITIES = [
  { title: 'CREATIVE DEVELOPMENT', icon: Flame, items: ['GSAP & ScrollTrigger', 'WebGL & Three.js', 'Procedural Shaders', 'Web Audio DSP'] },
  { title: 'FRONTEND ARCHITECTURE', icon: Code, items: ['React 19 & Next.js', 'Vite & Modern Bundling', 'High-Performance CSS', 'Component Modular Systems'] },
  { title: 'INTERACTION DESIGN', icon: Compass, items: ['Cinematic Storytelling', 'Physics & Micro-Animations', 'Spatial Depth & Parallax', 'Adaptive Responsiveness'] },
  { title: 'ENGINEERING RIGOR', icon: ShieldCheck, items: ['Core Web Vitals (INP/LCP)', 'Accessibility Standards', 'Cross-Browser Hardening', 'Zero-Jitter Smoothing'] },
];

export function PhilosophySection() {
  return (
    <section className="philosophy-section" id="journey">
      <div id="about" style={{ position: 'relative', top: '-100px' }} />
      <div id="philosophy" style={{ position: 'relative', top: '-100px' }} />
      <div className="philosophy-container">

        <div className="section-meta-tag">
          <Cpu size={14} className="meta-icon" />
          <span>MANIFESTO & ARCHITECTURE</span>
        </div>

        <h2 className="philosophy-headline">
          BRIDGING CINEMA, ALGORITHMIC PRECISION, AND SENSORY FEEDBACK.
        </h2>

        <p className="philosophy-manifesto-text">
          Modern web experiences shouldn't merely convey information — they should captivate the senses. 
          By combining camera physics, layered perspective, procedural audio synthesis, and hardware-accelerated rendering, 
          interfaces transform into living, breathing digital instruments.
        </p>

        {/* Stats Row */}
        <div className="stats-grid">
          {STATS.map((s, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
              <span className="stat-desc">{s.desc}</span>
            </div>
          ))}
        </div>

        {/* Capabilities Matrix */}
        <div className="capabilities-grid">
          {CAPABILITIES.map((cap, idx) => {
            const IconComp = cap.icon;
            return (
              <div key={idx} className="cap-card">
                <div className="cap-icon-box">
                  <IconComp size={20} />
                </div>
                <h3 className="cap-title">{cap.title}</h3>
                <ul className="cap-list">
                  {cap.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default PhilosophySection;
