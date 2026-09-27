import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, CheckCircle2, ChevronRight, Award, Cpu, Shield, Radio, Sparkles, Terminal } from 'lucide-react';
import gsap from 'gsap';
import './ExpandableCardModal.css';

export function ExpandableCardModal({ cardData, originRect, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (!cardData || !panelRef.current || !overlayRef.current) return;

    // Lock body scroll while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const overlay = overlayRef.current;

    // Calculate initial geometry from the originating card's bounding rect
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    let initX = 0;
    let initY = 0;
    let initScaleX = 0.8;
    let initScaleY = 0.8;

    if (originRect) {
      const modalTargetW = Math.min(viewportW * 0.9, 1020);
      const modalTargetH = Math.min(viewportH * 0.88, 820);
      const targetCenterX = viewportW / 2;
      const targetCenterY = viewportH / 2;
      const originCenterX = originRect.left + originRect.width / 2;
      const originCenterY = originRect.top + originRect.height / 2;

      initX = originCenterX - targetCenterX;
      initY = originCenterY - targetCenterY;
      initScaleX = Math.max(originRect.width / modalTargetW, 0.25);
      initScaleY = Math.max(originRect.height / modalTargetH, 0.25);
    }

    // Set initial transform matching card origin
    gsap.set(overlay, { opacity: 0 });
    gsap.set(panel, {
      x: initX,
      y: initY,
      scaleX: initScaleX,
      scaleY: initScaleY,
      opacity: 0.6,
      borderRadius: '24px',
      transformOrigin: 'center center',
    });

    const staggerEls = contentRef.current ? contentRef.current.querySelectorAll('.card-stagger-item') : [];
    if (staggerEls.length > 0) {
      gsap.set(staggerEls, { opacity: 0, y: 14 });
    }

    // Smooth physical expansion timeline (500ms)
    const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });

    tl.to(overlay, {
      opacity: 1,
      duration: 0.38,
      ease: 'power2.out',
    }, 0);

    tl.to(panel, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      borderRadius: '20px',
      duration: 0.52,
      ease: 'power3.out',
    }, 0.02);

    if (staggerEls.length > 0) {
      tl.to(staggerEls, {
        opacity: 1,
        y: 0,
        duration: 0.32,
        stagger: 0.04,
        ease: 'power2.out',
      }, 0.22);
    }

    // Handle ESC key to close
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = originalOverflow;
    };
  }, [cardData, originRect]);

  const handleClose = () => {
    if (isClosingRef.current || !panelRef.current || !overlayRef.current) {
      onClose();
      return;
    }
    isClosingRef.current = true;

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    let targetX = 0;
    let targetY = 0;
    let targetScaleX = 0.5;
    let targetScaleY = 0.5;

    if (originRect) {
      const modalTargetW = Math.min(viewportW * 0.9, 1020);
      const modalTargetH = Math.min(viewportH * 0.88, 820);
      const targetCenterX = viewportW / 2;
      const targetCenterY = viewportH / 2;
      const originCenterX = originRect.left + originRect.width / 2;
      const originCenterY = originRect.top + originRect.height / 2;

      targetX = originCenterX - targetCenterX;
      targetY = originCenterY - targetCenterY;
      targetScaleX = Math.max(originRect.width / modalTargetW, 0.25);
      targetScaleY = Math.max(originRect.height / modalTargetH, 0.25);
    }

    // Reverse cinematic contraction directly back to card position (420ms)
    const closeTl = gsap.timeline({
      onComplete: () => {
        onClose();
      },
    });

    closeTl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.inOut',
    }, 0.05);

    closeTl.to(panelRef.current, {
      x: targetX,
      y: targetY,
      scaleX: targetScaleX,
      scaleY: targetScaleY,
      opacity: 0,
      duration: 0.42,
      ease: 'power3.inOut',
    }, 0);
  };

  if (!cardData) return null;

  const isCertificate = cardData.type === 'certificate';

  return (
    <div 
      className="expandable-overlay-backdrop"
      ref={overlayRef}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="expanded-card-title"
    >
      <div 
        className={`expandable-panel-card ${isCertificate ? 'is-certificate-view' : ''}`}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="panel-glow-bloom" aria-hidden="true" />

        {/* Top Header Control Bar */}
        <div className="expandable-header-bar">
          <div className="header-meta-group">
            <span className="live-status-dot" />
            <span className="header-badge-tag">{cardData.badge || 'PROJECT SPECIFICATION'}</span>
            <span className="header-sep">•</span>
            <span className="header-sub">{cardData.subtitle}</span>
          </div>

          <button 
            type="button" 
            className="expandable-close-btn"
            onClick={handleClose}
            aria-label="Close detail panel"
          >
            <span className="close-label">CLOSE</span>
            <span className="close-key-tag">ESC</span>
            <X size={15} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="expandable-scroll-content" ref={contentRef}>
          
          {/* Main Title & Subtitle */}
          <div className="card-stagger-item header-title-section">
            <h2 className="expanded-main-title" id="expanded-card-title">
              {cardData.title}
            </h2>
            <p className="expanded-desc-lead">
              {cardData.description}
            </p>
          </div>

          {/* Certificate View: Large Uncropped Inspection */}
          {isCertificate ? (
            <div className="card-stagger-item certificate-inspect-wrapper">
              <div className="certificate-media-frame">
                <img 
                  src={cardData.image} 
                  alt={cardData.imageAlt || cardData.title} 
                  className="certificate-full-img"
                />
                <div className="certificate-frame-shine" />
              </div>

              {/* Achievement Highlights Box */}
              <div className="certificate-meta-box">
                <div className="cert-meta-header">
                  <Award size={24} className="cert-gold-trophy" />
                  <div>
                    <h3 className="cert-honor-heading">🏆 2ND POSITION // SILVER MEDAL</h3>
                    <p className="cert-honor-sub">CLASS 11 SCIENCE EXHIBITION • MODI PUBLIC SCHOOL, SILIGURI</p>
                  </div>
                </div>

                <div className="cert-specs-grid">
                  {(cardData.specifications || []).map((s, i) => (
                    <div key={i} className="cert-spec-item">
                      <span className="cs-label">{s.label}</span>
                      <span className="cs-value">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Hardware / Receiver View: Large Showcase Image + Deep Specs */
            <div className="card-stagger-item hardware-media-wrapper">
              <div className="hardware-image-frame">
                <img 
                  src={cardData.image} 
                  alt={cardData.imageAlt || cardData.title} 
                  className="hardware-expanded-img"
                />
                <div className="hardware-image-badge">
                  <span className="img-badge-dot" />
                  <span>{cardData.imageTag || 'PROTOTYPE TELEMETRY'}</span>
                </div>
              </div>

              {/* Quick Specs Matrix */}
              {cardData.specifications && (
                <div className="specs-matrix-row">
                  {cardData.specifications.map((s, i) => (
                    <div key={i} className="spec-metric-card">
                      <span className="metric-label">{s.label}</span>
                      <span className="metric-value">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Section: "HOW IT WORKS" or "DATA FLOW" Sequence */}
          {cardData.flowSteps && cardData.flowSteps.length > 0 && (
            <div className="card-stagger-item flow-architecture-section">
              <div className="flow-section-header">
                <Terminal size={17} className="flow-icon" />
                <h3 className="flow-section-title">{cardData.flowTitle || 'SYSTEM ARCHITECTURE & DATA FLOW'}</h3>
              </div>

              <div className="flow-steps-track">
                {cardData.flowSteps.map((fs, idx) => (
                  <div key={idx} className="flow-step-node">
                    <div className="node-marker-wrap">
                      <span className="node-num">{fs.step}</span>
                      {idx < cardData.flowSteps.length - 1 && <span className="node-connector-line" />}
                    </div>
                    <div className="node-card">
                      <h4 className="node-name">{fs.name}</h4>
                      <p className="node-desc">{fs.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Detailed Component Breakdown */}
          {cardData.details && cardData.details.length > 0 && (
            <div className="card-stagger-item technical-breakdown-section">
              <h3 className="breakdown-title">TECHNICAL ARCHITECTURE & SPECIFICATIONS</h3>
              <div className="breakdown-grid">
                {cardData.details.map((d, idx) => (
                  <div key={idx} className="breakdown-item-card">
                    <div className="bic-header">
                      <ChevronRight size={14} className="bic-icon" />
                      <h4 className="bic-title">{d.title}</h4>
                    </div>
                    <p className="bic-desc">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Badges */}
          {cardData.technologies && (
            <div className="card-stagger-item modal-tags-row">
              <span className="tags-label">SYSTEM STACK:</span>
              <div className="tags-wrap">
                {cardData.technologies.map((t, idx) => (
                  <span key={idx} className="tech-badge-chip">
                    <span className="badge-dot" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer Button */}
          <div className="card-stagger-item modal-bottom-actions">
            <button 
              type="button" 
              className="modal-return-btn"
              onClick={handleClose}
            >
              <span>RETURN TO WORK OVERVIEW</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ExpandableCardModal;
