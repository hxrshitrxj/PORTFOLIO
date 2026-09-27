import React, { useRef, useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sparkle from '../Sparkle/Sparkle';
import { useModal } from '../../context/ModalContext';
import { useExperience, EXPERIENCES } from '../../context/ExperienceContext';
import './HeroScroll.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Ultra-Smooth, GPU-Accelerated Interactive Hero Scrollytelling
 * 
 * Performance & Architecture:
 * - 0 React re-renders during scrolling or mouse movement (Ref & GPU compositor driven).
 * - Separated 3D mouse tilt wrapper and GSAP camera zoom viewport to prevent transform collisions.
 * - Hardware-accelerated transforms & opacity only (Zero layout thrashing).
 * - 4 distinct cinematic typography phases ("BUILD.", "CREATE.", "EXPERIMENT.", "REPEAT."):
 *   Each word has a dedicated, centered plateau with clear visibility behind the subject.
 */
export function HeroScroll() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const tiltWrapRef = useRef(null);
  const cameraWrapRef = useRef(null);
  const personWrapRef = useRef(null);
  const bgImgRef = useRef(null);
  const primarySparkleRef = useRef(null);

  // Typography Word Refs
  const wordBuildRef = useRef(null);
  const wordCreateRef = useRef(null);
  const wordExperimentRef = useRef(null);
  const wordRepeatRef = useRef(null);
  const manifestoSubRef = useRef(null);

  const promptWrapRef = useRef(null);

  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false));
  const [reducedMotion, setReducedMotion] = useState(() => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false));
  const { openModal } = useModal();
  const { activeExperience, openExperience } = useExperience();

  // Device & Motion Detection
  useEffect(() => {
    const checkReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionListener = (e) => setReducedMotion(e.matches);
    checkReducedMotion.addEventListener('change', motionListener);

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkMobile);

    return () => {
      checkReducedMotion.removeEventListener('change', motionListener);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Subtle 3D perspective mouse tilt (Direct DOM manipulation - Zero React re-renders)
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    let animId;
    let targetX = 0.5;
    let targetY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;

    const handleMouseMove = (e) => {
      targetX = e.clientX / window.innerWidth;
      targetY = e.clientY / window.innerHeight;
    };

    const smoothMouse = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (tiltWrapRef.current) {
        const tiltX = (currentX - 0.5) * 4; // degrees
        const tiltY = -(currentY - 0.5) * 3; // degrees
        tiltWrapRef.current.style.transform = `perspective(1000px) rotateY(${tiltX.toFixed(2)}deg) rotateX(${tiltY.toFixed(2)}deg)`;
      }
      animId = requestAnimationFrame(smoothMouse);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(smoothMouse);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [reducedMotion, isMobile]);

  // Master GSAP ScrollTrigger Orchestration
  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      // Initialize GSAP Timeline with responsive scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=240%',
          pin: stickyRef.current,
          scrub: 0.9, // Silky smooth, snappy bidirectional scrub
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const rawV = self.getVelocity(); // px / sec
            const normV = Math.min(Math.max(rawV / 100, -30), 30);
            if (promptWrapRef.current) {
              promptWrapRef.current.style.opacity = Math.max(0, 1 - p * 4.5).toString();
              promptWrapRef.current.style.transform = `translate(-50%, ${p * 40}px)`;
            }

            // Reactive Sparkle spin with velocity
            if (primarySparkleRef.current) {
              const baseRot = p * 360;
              const extraRot = normV * 1.5;
              primarySparkleRef.current.style.transform = `translate(-50%, -50%) rotate(${(baseRot + extraRot).toFixed(1)}deg) scale(${(1.0 + p * 0.32 + Math.abs(normV) * 0.012).toFixed(3)})`;
            }
          },
        },
      });

      // Reduced motion fallback
      if (reducedMotion) {
        tl.to(wordBuildRef.current, { opacity: 1, duration: 0.25 })
          .to(wordBuildRef.current, { opacity: 0, duration: 0.15 })
          .to(wordCreateRef.current, { opacity: 1, duration: 0.25 })
          .to(wordCreateRef.current, { opacity: 0, duration: 0.15 })
          .to(wordExperimentRef.current, { opacity: 1, duration: 0.25 })
          .to(wordExperimentRef.current, { opacity: 0, duration: 0.15 })
          .to(wordRepeatRef.current, { opacity: 1, duration: 0.25 });
        return;
      }

      /* -------------------------------------------------------------
         1. CAMERA SCALE & ZOOM (Dedicated to cameraWrapRef)
         ------------------------------------------------------------- */
      // 0% -> 25%: Push in smoothly
      tl.to(cameraWrapRef.current, {
        scale: 1.12,
        duration: 0.25,
        ease: 'power1.out',
      }, 0);

      // 25% -> 55%: Strong cinematic focus
      tl.to(cameraWrapRef.current, {
        scale: 1.25,
        duration: 0.30,
        ease: 'power1.inOut',
      }, 0.25);

      // 55% -> 78%: Hold zoom
      tl.to(cameraWrapRef.current, {
        scale: 1.30,
        duration: 0.23,
        ease: 'none',
      }, 0.55);

      // 78% -> 100%: Pull back into portfolio stream
      tl.to(cameraWrapRef.current, {
        scale: 1.10,
        duration: 0.22,
        ease: 'power2.out',
      }, 0.78);

      /* -------------------------------------------------------------
         2. PERSON CENTERING & 3D PARALLAX (Layer 3)
         ------------------------------------------------------------- */
      tl.to(personWrapRef.current, {
        xPercent: -3.0,
        y: -14,
        duration: 0.55,
        ease: 'power1.inOut',
      }, 0);

      tl.to(personWrapRef.current, {
        xPercent: -1.0,
        y: 20,
        duration: 0.25,
        ease: 'power2.in',
      }, 0.75);

      /* -------------------------------------------------------------
         3. BACKGROUND SUBTLE SCALE & COLOR ENHANCEMENT (Layer 1)
         ------------------------------------------------------------- */
      tl.to(bgImgRef.current, {
        scale: 1.08,
        duration: 0.75,
        ease: 'power1.inOut',
      }, 0);

      tl.to(bgImgRef.current, {
        scale: 1.03,
        duration: 0.25,
        ease: 'power1.out',
      }, 0.75);

      /* -------------------------------------------------------------
         4. THE 4 ICONIC WORDS: BUILD. CREATE. EXPERIMENT. REPEAT.
            (Layer 2 - Guaranteed 100% on-screen centering & visibility)
         ------------------------------------------------------------- */

      // Word 1: "BUILD." (0.02 -> 0.26, peak plateau 0.08 -> 0.20)
      tl.fromTo(wordBuildRef.current, 
        { opacity: 0, y: 45, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1.0, duration: 0.07, ease: 'power2.out' },
        0.02
      );
      tl.to(wordBuildRef.current, {
        scale: 1.04,
        duration: 0.12,
        ease: 'none',
      }, 0.09);
      tl.to(wordBuildRef.current, {
        opacity: 0,
        y: -35,
        scale: 1.08,
        duration: 0.06,
        ease: 'power2.in',
      }, 0.21);

      // Word 2: "CREATE." (0.24 -> 0.52, peak plateau 0.32 -> 0.46)
      // Fully visible, bold, impossible to miss!
      tl.fromTo(wordCreateRef.current,
        { opacity: 0, y: 45, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1.0, duration: 0.08, ease: 'power2.out' },
        0.24
      );
      tl.to(wordCreateRef.current, {
        scale: 1.05,
        duration: 0.14,
        ease: 'none',
      }, 0.32);
      tl.to(wordCreateRef.current, {
        opacity: 0,
        y: -35,
        scale: 1.09,
        duration: 0.06,
        ease: 'power2.in',
      }, 0.46);

      // Word 3: "EXPERIMENT." (0.48 -> 0.76, peak plateau 0.56 -> 0.70)
      // Grand cinematic widescreen hold!
      tl.fromTo(wordExperimentRef.current,
        { opacity: 0, y: 45, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1.02, duration: 0.08, ease: 'power2.out' },
        0.48
      );
      tl.to(wordExperimentRef.current, {
        scale: 1.07,
        duration: 0.14,
        ease: 'none',
      }, 0.56);
      tl.to(wordExperimentRef.current, {
        opacity: 0,
        y: -35,
        scale: 1.10,
        duration: 0.06,
        ease: 'power2.in',
      }, 0.70);

      // Subtitle Manifesto (during EXPERIMENT plateau)
      tl.fromTo(manifestoSubRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.95, y: 0, duration: 0.07, ease: 'power2.out' },
        0.53
      );
      tl.to(manifestoSubRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.06,
        ease: 'power2.in',
      }, 0.69);

      // Word 4: "REPEAT." (0.72 -> 0.98, peak plateau 0.80 -> 0.92)
      // Triumphant climax & resolution!
      tl.fromTo(wordRepeatRef.current,
        { opacity: 0, y: 45, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1.03, duration: 0.08, ease: 'power2.out' },
        0.72
      );
      tl.to(wordRepeatRef.current, {
        scale: 1.07,
        duration: 0.12,
        ease: 'none',
      }, 0.80);
      tl.to(wordRepeatRef.current, {
        opacity: 0,
        y: -30,
        scale: 1.10,
        duration: 0.06,
        ease: 'power2.in',
      }, 0.92);

    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="hero-scroll-track" ref={containerRef} id="hero-track">
      {/* Pinned Sticky Stage */}
      <div className="hero-sticky-stage" ref={stickyRef}>
        
        {/* Outer 3D Tilt Wrapper: Isolates Mouse Perspective */}
        <div className="hero-tilt-wrapper" ref={tiltWrapRef}>
          
          {/* Inner 3D Camera Viewport: Dedicated to GSAP Zoom & Scale */}
          <div className="hero-camera-viewport" ref={cameraWrapRef}>

            {/* LAYER 1: 99.85% Exact In-painted Background Plate */}
            <div className="hero-layer hero-bg-layer">
              <img 
                ref={bgImgRef}
                src="/hero-bg-perfect.png" 
                alt="Cinematic background gradient" 
                className="hero-media-canvas hero-bg-canvas"
                loading="eager"
                fetchPriority="high"
              />

              {/* Glowing Ambient Light Orbs */}
              <div className="ambient-radial-glow glow-top" />
              <div className="ambient-radial-glow glow-bottom" />
              
              {/* Subtle Tech Coordinates Grid */}
              <div className="hero-coordinates-grid" />
            </div>

            {/* LAYER 2: Bold 3D Typography BEHIND Person */}
            <div className="hero-layer hero-typography-layer">
              {/* Word 1: BUILD. */}
              <div ref={wordBuildRef} className="hero-display-word word-build">
                BUILD.
              </div>

              {/* Word 2: CREATE. */}
              <div ref={wordCreateRef} className="hero-display-word word-create">
                CREATE.
              </div>

              {/* Word 3: EXPERIMENT. */}
              <div ref={wordExperimentRef} className="hero-display-word word-experiment">
                EXPERIMENT.
              </div>

              {/* Word 4: REPEAT. */}
              <div ref={wordRepeatRef} className="hero-display-word word-repeat">
                REPEAT.
              </div>

              {/* Subtitle during cinematic hold */}
              <div ref={manifestoSubRef} className="hero-cinematic-sub">
                <span>DESIGN ENGINEER // AUDIO-VISUAL LAB</span>
              </div>
            </div>

            {/* LAYER 3: The Person Cutout (PASSES IN FRONT OF TYPOGRAPHY) */}
            <div className="hero-layer hero-person-layer" ref={personWrapRef}>
              <img 
                src="/hero-person.png" 
                alt="Harshit Raj - Creative Developer" 
                className="hero-media-canvas hero-person-canvas"
                loading="eager"
                fetchPriority="high"
              />
              {/* Rim-light accent between subject and typography */}
              <div className="person-silhouette-glow" />
            </div>

            {/* LAYER 4: Exactly Anchored Sparkle Star (91.21%, 86.36%) */}
            <div 
              className="hero-sparkle-anchor"
              ref={primarySparkleRef}
              style={{
                left: '91.21%',
                top: '86.36%',
              }}
            >
              <Sparkle 
                size={isMobile ? 36 : 52}
                velocity={0}
              />
            </div>

          </div>
        </div>

        {/* LAYER 5: Foreground HUD, Vignette, Audio Toggle & Telemetry */}
        <div className="hero-foreground-hud-layer">
          
          {/* 35mm Film Grain & Optical Vignette */}
          <div className="cinematic-vignette-overlay" />
          <div className="cinematic-grain-overlay" />

          {/* Top Navigation Bar */}
          <header className="hero-top-nav">
            <div className="nav-brand-group">
              <span className="brand-status-light" />
              <span className="brand-name">HARSHIT RAJ</span>
              <span className="brand-role">CREATIVE DEV</span>
            </div>

            <nav className="nav-menu" aria-label="Interactive mode navigation">
              <button
                type="button"
                className={`nav-link ${activeExperience === EXPERIENCES.WORKS ? 'nav-link-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  openExperience(EXPERIENCES.WORKS, e);
                }}
              >
                <span>WORKS</span>
                {activeExperience === EXPERIENCES.WORKS && <span className="nav-active-dot" />}
              </button>

              <button
                type="button"
                className={`nav-link ${activeExperience === EXPERIENCES.LAB ? 'nav-link-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  openExperience(EXPERIENCES.LAB, e);
                }}
              >
                <span>LAB</span>
                {activeExperience === EXPERIENCES.LAB && <span className="nav-active-dot" />}
              </button>

              <button
                type="button"
                className={`nav-link ${activeExperience === EXPERIENCES.JOURNEY ? 'nav-link-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  openExperience(EXPERIENCES.JOURNEY, e);
                }}
              >
                <span>JOURNEY</span>
                {activeExperience === EXPERIENCES.JOURNEY && <span className="nav-active-dot" />}
              </button>

              <button
                type="button"
                className={`nav-link ${activeExperience === EXPERIENCES.ABOUT ? 'nav-link-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  openExperience(EXPERIENCES.ABOUT, e);
                }}
              >
                <span>ABOUT</span>
                {activeExperience === EXPERIENCES.ABOUT && <span className="nav-active-dot" />}
              </button>
            </nav>

            <div className="nav-right-actions">

              <button 
                type="button"
                className="nav-cta-pill"
                onClick={(e) => openModal('contact', null, e)}
              >
                <span>LET'S TALK</span>
                <ArrowUpRight size={14} className="cta-arrow" />
              </button>
            </div>
          </header>

          {/* Initial Prompt Arrow */}
          <div 
            className="initial-scroll-prompt"
            ref={promptWrapRef}
            style={{ 
              opacity: 1,
              transform: 'translate(-50%, 0px)'
            }}
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={14} className="prompt-arrow-anim" />
          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroScroll;
