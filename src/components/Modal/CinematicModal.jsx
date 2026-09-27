import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight, Check, Copy, ExternalLink, Cpu, Terminal, Sparkles, Layers, ShieldCheck, Mail, Clock, Award, Shield, Radio, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useModal } from '../../context/ModalContext';
import { GithubIcon, TwitterIcon, LinkedinIcon } from '../Icons';
import './CinematicModal.css';

export function CinematicModal() {
  const { modalState, closeModal } = useModal();
  const { isOpen, type, data, origin } = modalState;

  const [isRendered, setIsRendered] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const isClosingRef = useRef(false);

  // Keep IST Clock current for Dispatch modal
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(`${timeStr} IST`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Entrance & Exit Animations
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      isClosingRef.current = false;

      // Lock background scrolling
      document.body.style.overflow = 'hidden';

      // Next tick: Animate modal emergence from the exact button origin
      requestAnimationFrame(() => {
        if (!panelRef.current || !backdropRef.current) return;

        const modalCenterX = window.innerWidth / 2;
        const modalCenterY = window.innerHeight / 2;
        const deltaX = (origin?.x || modalCenterX) - modalCenterX;
        const deltaY = (origin?.y || modalCenterY) - modalCenterY;

        const staggerItems = contentRef.current 
          ? contentRef.current.querySelectorAll('.modal-stagger-item') 
          : [];

        // Set initial state: origin coordinates, small scale, blurred
        gsap.set(panelRef.current, {
          x: deltaX,
          y: deltaY,
          scale: 0.16,
          opacity: 0,
          filter: 'blur(12px)',
          transformOrigin: 'center center',
        });

        gsap.set(backdropRef.current, {
          opacity: 0,
        });

        if (staggerItems.length > 0) {
          gsap.set(staggerItems, {
            opacity: 0,
            y: 18,
          });
        }

        // Timeline for emergence
        const tl = gsap.timeline({
          defaults: { overwrite: 'auto' },
        });

        // 1. Backdrop smoothly darkens atmosphere
        tl.to(backdropRef.current, {
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
        }, 0);

        // 2. Panel emerges from button position and blooms to full center size
        tl.to(panelRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.44,
          ease: 'power3.out', // Crisp, responsive physical ease
        }, 0.04);

        // 3. Sequential staggered reveal of content
        if (staggerItems.length > 0) {
          tl.to(staggerItems, {
            opacity: 1,
            y: 0,
            duration: 0.28,
            stagger: 0.045,
            ease: 'power2.out',
          }, 0.20);
        }
      });
    } else if (isRendered && !isClosingRef.current) {
      handleClose();
    }
  }, [isOpen]);

  // Smooth Reverse Absorption on Close
  const handleClose = () => {
    if (isClosingRef.current || !panelRef.current || !backdropRef.current) {
      setIsRendered(false);
      closeModal();
      document.body.style.overflow = '';
      return;
    }

    isClosingRef.current = true;
    const modalCenterX = window.innerWidth / 2;
    const modalCenterY = window.innerHeight / 2;
    const deltaX = (origin?.x || modalCenterX) - modalCenterX;
    const deltaY = (origin?.y || modalCenterY) - modalCenterY;

    const staggerItems = contentRef.current 
      ? contentRef.current.querySelectorAll('.modal-stagger-item') 
      : [];

    const closeTl = gsap.timeline({
      onComplete: () => {
        setIsRendered(false);
        isClosingRef.current = false;
        closeModal();
        document.body.style.overflow = '';
      },
    });

    // 1. Content elements fade out first
    if (staggerItems.length > 0) {
      closeTl.to(staggerItems, {
        opacity: 0,
        y: 12,
        duration: 0.14,
        stagger: 0.02,
        ease: 'power2.in',
      }, 0);
    }

    // 2. Panel is sucked back into the original button position
    closeTl.to(panelRef.current, {
      x: deltaX,
      y: deltaY,
      scale: 0.12,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.28,
      ease: 'power3.in',
    }, 0.06);

    // 3. Backdrop dissolves back into website atmosphere
    closeTl.to(backdropRef.current, {
      opacity: 0,
      duration: 0.24,
      ease: 'power2.in',
    }, 0.10);
  };

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isRendered) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRendered]);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('hxrshitofficial7321@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  if (!isRendered) return null;

  return (
    <div 
      className="cinematic-modal-overlay"
      ref={backdropRef}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* 35mm Film Grain Texture */}
      <div className="modal-grain-overlay" />

      {/* Futuristic Floating Glass Panel */}
      <div 
        className="cinematic-modal-panel"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          '--accent-glow': data?.color || '#ff6200',
        }}
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="panel-ambient-glow" />

        {/* Top Header Bar */}
        <div className="modal-top-bar">
          <div className="modal-top-meta">
            <span className="modal-status-dot" />
            <span className="modal-protocol-label">
              {type === 'contact' && 'SYSTEM // DIRECT DISPATCH PROTOCOL'}
              {type === 'archive' && 'SYSTEM // EXPERIMENTAL LAB ARCHIVE'}
              {type === 'project' && `PROJECT SPECIFICATION // ${(data?.id || '01').padStart(2, '0')}`}
            </span>
          </div>

          <button 
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close modal dialog"
          >
            <span className="close-text">CLOSE</span>
            <span className="close-key">[ESC]</span>
            <X size={16} className="close-icon" />
          </button>
        </div>

        {/* Staggered Content Area */}
        <div className="modal-scroll-body" ref={contentRef}>
          
          {/* ============================================================
              1. PROJECT DETAIL VIEW
             ============================================================ */}
          {type === 'project' && data && (
            <div className="modal-project-view">
              
              {/* Item 1: Number & Status & Award */}
              <div className="modal-stagger-item project-header-badge">
                <span className="badge-num">PROJECT {data.id}</span>
                <span className="badge-sep">•</span>
                <span className="badge-year">{data.year || '2024'}</span>
                {data.achievement && (
                  <>
                    <span className="badge-sep">•</span>
                    <span className="badge-status-gold" style={{ color: '#ffd000', fontWeight: 600 }}>
                      {data.achievement}
                    </span>
                  </>
                )}
              </div>

              {/* Item 2: Main Title */}
              <h2 className="modal-stagger-item modal-project-title" id="modal-title">
                {data.title}
              </h2>

              {/* Item 3: Category / Role */}
              <div className="modal-stagger-item modal-category-row">
                <span className="category-pill">{data.category}</span>
                {data.role && (
                  <span className="meta-dim" style={{ color: '#ffb700' }}>
                    ROLE: {data.role.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Item 4: Real Prototype Photo Showcase or Interactive Frame */}
              {data.images && data.images.length > 0 ? (
                <div className="modal-stagger-item modal-photo-gallery-stack" style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {data.images.map((im, i) => (
                      <div key={i} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,140,0,0.3)', background: '#0a0102' }}>
                        <img src={im.url} alt={im.caption} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                        <div style={{ padding: '0.85rem 1rem', background: 'rgba(20,2,5,0.9)' }}>
                          <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#ffaa33' }}>{im.tag}</span>
                          <h5 style={{ margin: '0.2rem 0', color: '#fff', fontSize: '0.95rem' }}>{im.caption}</h5>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,220,200,0.7)', lineHeight: 1.4 }}>{im.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="modal-stagger-item modal-showcase-frame">
                  <div className="showcase-glow-orb" />
                  <div className="showcase-screen-header">
                    <div className="screen-dots">
                      <span className="sd sd-red" />
                      <span className="sd sd-amber" />
                      <span className="sd sd-green" />
                    </div>
                    <span className="screen-title">INTERACTIVE DISPLAY INTERFACE // GPU COMPOSITOR</span>
                    <span className="screen-telemetry">60 FPS • LOW LATENCY</span>
                  </div>

                  <div className="showcase-visual-canvas">
                    <div className="visual-grid-bg" />
                    <div className="showcase-center-badge">
                      <div className="badge-symbol-box">
                        <Cpu size={32} />
                      </div>
                      <span className="badge-hero-name">{data.title}</span>
                      <span className="badge-tech-stack">{(data.tags || []).join(' • ')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Item 5: Objective / Overview */}
              <div className="modal-stagger-item modal-desc-block">
                <h4 className="sub-heading">🎯 OBJECTIVE</h4>
                <p className="desc-text">{data.objective || data.description}</p>
              </div>

              {/* Item 6: Hardware Architecture if available */}
              {data.hardware && (
                <div className="modal-stagger-item modal-desc-block" style={{ marginTop: '1.5rem' }}>
                  <h4 className="sub-heading">⚙️ HARDWARE ARCHITECTURE</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
                    {data.hardware.map((hw, idx) => (
                      <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,140,0,0.2)', borderRadius: '12px' }}>
                        <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: hw.color }}>{hw.role}</span>
                        <h5 style={{ margin: '0.3rem 0', color: '#ffffff', fontSize: '1rem' }}>{hw.title}</h5>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.78rem', color: '#ffaa33', fontFamily: 'monospace' }}>{hw.spec}</p>
                        <p style={{ margin: 0, fontSize: '0.84rem', color: 'rgba(255,225,205,0.75)', lineHeight: 1.5 }}>{hw.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Item 7: 4-Phase Technical Implementation if available */}
              {data.phases && (
                <div className="modal-stagger-item modal-desc-block" style={{ marginTop: '1.5rem' }}>
                  <h4 className="sub-heading">💡 TECHNICAL IMPLEMENTATION (4-PHASE PROTOCOL)</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.75rem' }}>
                    {data.phases.map((p, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '1rem', padding: '0.85rem 1.1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px' }}>
                        <span style={{ fontWeight: 700, color: '#ffaa33', fontFamily: 'monospace' }}>{p.step}</span>
                        <div>
                          <span style={{ fontSize: '0.7rem', color: '#00e5ff', fontFamily: 'monospace', marginRight: '0.5rem' }}>[{p.badge}]</span>
                          <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{p.title}: </strong>
                          <span style={{ color: 'rgba(255,230,215,0.8)', fontSize: '0.88rem', lineHeight: 1.5 }}>{p.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Item 8: Real-World Applications if available */}
              {data.applications && (
                <div className="modal-stagger-item modal-desc-block" style={{ marginTop: '1.5rem' }}>
                  <h4 className="sub-heading">🚀 REAL-WORLD APPLICATIONS EXPLORED</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
                    {data.applications.map((app, idx) => (
                      <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,140,0,0.18)', borderRadius: '12px' }}>
                        <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#ff8800' }}>{app.subtitle}</span>
                        <h5 style={{ margin: '0.2rem 0 0.5rem 0', color: '#fff', fontSize: '1.05rem' }}>{app.title}</h5>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,225,205,0.75)', lineHeight: 1.55 }}>{app.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Item 9: Technologies Badges */}
              <div className="modal-stagger-item modal-tech-block" style={{ marginTop: '1.75rem' }}>
                <h4 className="sub-heading">TECHNOLOGY MATRIX</h4>
                <div className="tech-badge-wrap">
                  {(data.tags || ['Arduino UNO', 'VLC Protocol', 'Embedded C++', 'I2C']).map((t, idx) => (
                    <span key={idx} className="tech-chip">
                      <span className="chip-dot" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Item 10: Action CTA Buttons */}
              <div className="modal-stagger-item modal-actions-row">
                <button 
                  type="button"
                  onClick={handleClose}
                  className="modal-cta-btn primary-cta"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  <span>RETURN TO WORK SECTION</span>
                  <ArrowUpRight size={17} className="cta-arrow" />
                </button>
              </div>

            </div>
          )}

          {/* ============================================================
              2. CONTACT / "LET'S TALK" DIRECT DISPATCH VIEW
             ============================================================ */}
          {type === 'contact' && (
            <div className="modal-contact-view">
              
              <div className="modal-stagger-item project-header-badge">
                <span className="badge-num">DISPATCH // 01</span>
                <span className="badge-sep">•</span>
                <span className="badge-status-green">
                  <span className="live-mini-dot" />
                  ACTIVE FOR FREELANCE & SELECT TEAMS
                </span>
              </div>

              <h2 className="modal-stagger-item modal-project-title" id="modal-title">
                LET'S BUILD SOMETHING EXTRAORDINARY.
              </h2>

              <p className="modal-stagger-item modal-contact-lead">
                Whether you're crafting an immersive flagship website, pushing creative boundaries with 3D shaders, 
                or seeking design engineering excellence — I'm ready to collaborate.
              </p>

              {/* Quick Communication Card */}
              <div className="modal-stagger-item contact-card-dispatch">
                <div className="dispatch-header">
                  <span className="dh-label">PRIMARY INBOX // DIRECT TRANSMISSION</span>
                  <span className="dh-clock">
                    <Clock size={13} />
                    {currentTime}
                  </span>
                </div>

                <div className="dispatch-email-box">
                  <div className="email-addr-group">
                    <Mail size={18} className="email-icon" />
                    <span className="email-addr">hxrshitofficial7321@gmail.com</span>
                  </div>

                  <button 
                    className={`copy-pill-btn ${copiedEmail ? 'copied' : ''}`}
                    onClick={handleCopyEmail}
                  >
                    {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
                  </button>
                </div>

                <div className="dispatch-meta-grid">
                  <div className="dmg-item">
                    <span className="dmg-k">TYPICAL RESPONSE:</span>
                    <span className="dmg-v">&lt; 12 HOURS</span>
                  </div>
                  <div className="dmg-item">
                    <span className="dmg-k">LOCATION:</span>
                    <span className="dmg-v">INDIA (UTC +5:30)</span>
                  </div>
                  <div className="dmg-item">
                    <span className="dmg-k">FOCUS:</span>
                    <span className="dmg-v">CREATIVE DEV / ARCHITECTURE</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="modal-stagger-item modal-socials-row">
                <span className="socials-label">FIND ME ACROSS:</span>
                <div className="socials-list">
                  <a href="https://github.com/hxrshitrxj" target="_blank" rel="noreferrer" className="social-pill">
                    <GithubIcon size={14} />
                    <span>GITHUB</span>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" className="social-pill">
                    <TwitterIcon size={14} />
                    <span>TWITTER / X</span>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-pill">
                    <LinkedinIcon size={14} />
                    <span>LINKEDIN</span>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-stagger-item modal-actions-row">
                <a 
                  href="mailto:hxrshitofficial7321@gmail.com?subject=Project%20Collaboration" 
                  className="modal-cta-btn primary-cta"
                >
                  <Mail size={16} />
                  <span>START A CONVERSATION</span>
                  <ArrowUpRight size={17} className="cta-arrow" />
                </a>

                <button 
                  className="modal-cta-btn secondary-cta"
                  onClick={handleClose}
                >
                  <span>RETURN TO PORTFOLIO</span>
                </button>
              </div>

            </div>
          )}

          {/* ============================================================
              3. ARCHIVE / EXPERIMENTAL LAB VIEW
             ============================================================ */}
          {type === 'archive' && (
            <div className="modal-archive-view">
              
              <div className="modal-stagger-item project-header-badge">
                <span className="badge-num">ARCHIVE // 2024 — 2026</span>
                <span className="badge-sep">•</span>
                <span className="badge-year">LABORATORY EXPERIMENTS</span>
              </div>

              <h2 className="modal-stagger-item modal-project-title" id="modal-title">
                EXPERIMENTAL PROTOTYPES & LAB INDEX.
              </h2>

              <p className="modal-stagger-item modal-contact-lead">
                An index of interactive prototypes, generative DSP sound toys, and procedural canvas graphics 
                crafted in the pursuit of sensorial web interfaces.
              </p>

              {/* Archive Experiments Grid */}
              <div className="modal-stagger-item archive-items-grid">
                {[
                  { id: 'EXP-01', title: 'SUNSET SCATTERING OPTICS', tags: 'CANVAS 2D • MATH', desc: 'Real-time rayleigh scattering approximation generating sunset atmosphere gradients.' },
                  { id: 'EXP-02', title: 'BIQUAD RESONANCE FILTER', tags: 'WEB AUDIO • DSP', desc: 'Interactive low-pass synthesizer with Q resonance modulation and oscilloscope visualizer.' },
                  { id: 'EXP-03', title: '3D KINETIC PERSPECTIVE', tags: 'PHYSICS • RAF', desc: 'Spring-damped dual cursor and multiplane parallax engine achieving 120 FPS.' },
                  { id: 'EXP-04', title: 'PROCEDURAL HARMONIC PADS', tags: 'SYNTH • DETUNE', desc: 'Four-voice polyphonic cinematic ambient chord drone running on the Web Audio API.' },
                ].map((exp, i) => (
                  <div key={i} className="archive-card">
                    <div className="ac-top">
                      <span className="ac-id">{exp.id}</span>
                      <span className="ac-tag">{exp.tags}</span>
                    </div>
                    <h4 className="ac-title">{exp.title}</h4>
                    <p className="ac-desc">{exp.desc}</p>
                  </div>
                ))}
              </div>

              <div className="modal-stagger-item modal-actions-row">
                <button 
                  type="button"
                  className="modal-cta-btn primary-cta"
                  onClick={handleClose}
                >
                  <span>CLOSE ARCHIVE</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CinematicModal;
