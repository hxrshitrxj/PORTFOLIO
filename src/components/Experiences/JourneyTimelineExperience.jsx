import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, Award, Compass, Sparkles, Milestone, ArrowRight } from 'lucide-react';
import './JourneyTimelineExperience.css';

const TIMELINE_EVENTS = [
  {
    year: '2021',
    phase: 'Exploration',
    title: 'Where Curiosity Began',
    subtitle: 'The first spark of technology',
    period: '2019 — Class 7',
    description: "The lockdown brought an unexpected change to everyday life. With school moving online, I found myself spending more time at home with a lot of curiosity and free time. I started exploring technology—understanding how computers, websites, apps, and the digital world worked. I wasn't deeply into coding yet; instead, I was discovering what technology could actually do.\n\nAt the same time, academics remained my primary focus. Those early experiments weren't about becoming a programmer—they were about being curious, trying things, and discovering a world I hadn't explored before.",
    achievements: [
      'Experienced the transition to online learning.',
      'Started exploring computers and technology independently.',
      'Developed curiosity toward the digital world.',
      'Built the foundation for a future interest in technology and coding.',
      'Balanced exploration with academics during Class 7.',
    ],
    tech: ['Computers', 'Internet', 'Online Learning', 'Basic Digital Tools', 'Technology Exploration'],
  },
  {
    year: '2022',
    phase: 'Experimentation',
    title: 'From Curiosity to Creation',
    subtitle: 'Exploring beyond the classroom',
    period: '2020 — Class 8',
    description: 'With remote learning becoming part of daily life, I started spending more time exploring technology. I experimented with digital tools, followed online tutorials, and began trying small projects. This was when my curiosity started turning into practical skills.',
    achievements: [
      'Adapted to online learning',
      'Started self-learning through the internet',
      'Explored basic coding and digital tools',
      'Tried small personal projects',
      'Developed problem-solving skills',
    ],
    tech: ['HTML', 'Online Learning'],
  },
  {
    year: '2023',
    phase: 'Exploration Beyond Tech',
    title: 'Beyond the Screen',
    subtitle: 'Discovering competition, confidence & versatility',
    period: 'Class 9',
    description: "Returning to school after lockdown, my focus shifted from technology toward academics, sports, and co-curricular activities. I actively participated in swimming, badminton, cricket, athletics, debates, elocution, cooking, photography, and more—consistently competing and securing winning positions.\n\nAlthough my journey in tech slowed down during this phase, I developed discipline, teamwork, communication, confidence, and a competitive mindset that later became valuable in every area of my journey.",
    achievements: [
      '🏆 Winners in Swimming, Badminton & Cricket',
      '🥇 Multiple medals across 200m, 400m & 600m races',
      '🏅 Participated and won across various co-curricular competitions',
      '🎤 Competed in Debates & Elocution',
      '📸 Explored Photography',
      '👨‍🍳 Participated in Cooking competitions',
      '📚 Maintained focus on Academics',
    ],
    tech: ['Teamwork', 'Leadership', 'Communication', 'Discipline', 'Competitive Spirit', 'Time Management'],
  },
  {
    year: '2024–2025',
    phase: 'Hardware & Innovation',
    title: 'Balancing Academics & Creating Li-Fi',
    subtitle: 'From Class 10 board excellence to 2nd position in the Science Exhibition.',
    period: 'Class 10 – 11',
    description: "Academically, Class 10 was a major milestone where I achieved 90.8% in my board examinations while maintaining active participation in sports.\n\nMoving into Class 11, my passion for hardware and technology leaped into reality. I designed and engineered a working **Li-Fi (Light Fidelity) Data Transmission System** prototype using Visible Light Communication (VLC) to transmit wireless alphanumeric data via modulated light waves instead of RF. Utilizing an **Arduino UNO**, optical sensor receiver, and 16x2 I2C LCD, I presented the system at the **Science Exhibition (11.01.25)** at Modi Public School and secured **🏆 2nd Position**.\n\nAlongside hardware prototyping, I actively explored AI tools, chatbots, and hands-on coding in C, C++, and Python.",
    achievements: [
      '🏆 **2nd Position** in Class 11 Science Exhibition with **Li-Fi System** (11.01.25)',
      '💡 Built a working **Li-Fi (Light Fidelity)** data transmission prototype using light waves',
      '⚡ Integrated **Arduino UNO**, optical sensors (LDR/Photodiode), and 16x2 I2C LCD',
      '📚 **90.8%** in Class 10 Board Examinations',
      '🤖 Explored AI tools, chatbots, and hardware-software integration',
      '🏅 Won medals in Annual Sports events',
    ],
    tech: ['Li-Fi (VLC)', 'Arduino UNO', 'C++', 'Electronics', 'Optical Sensors', 'Python', 'AI Tools'],
    keyMoment: 'Securing 2nd place with Li-Fi proved that curiosity turns into real-world impact when you build things with your own hands.',
    quote: '“Academics gave me discipline. Li-Fi and building hardware gave me conviction.”',
  },
  {
    year: '2026',
    phase: 'Full-Stack & Systems',
    title: 'From Hardware to Software Mastery',
    subtitle: 'Learning by building, experimenting, and mastering modern software engineering.',
    period: 'Class 11 – Present',
    description: "Building on practical hardware foundations, my focus expanded deeply into modern software engineering, web architectures, and systems programming. I started building more complex, interactive applications, learning through hands-on implementation.\n\nMastering **HTML, CSS, JavaScript, React, and Python**, while deepening understanding of **C and C++**. Every project elevates my engineering standards—crafting high-performance digital experiences, clean code, and resilient architectures.",
    achievements: [
      '💻 Architecting modern, interactive web applications & cinematic experiences',
      '🌐 Deepening expertise in **JavaScript, React & Modern CSS**',
      '🔧 Advancing low-level and systems concepts in **C & C++**',
      '🐍 Writing automation scripts, algorithms, and logic in **Python**',
      '🧩 Mastering debugging, state management, and creative interface design',
    ],
    tech: ['React', 'JavaScript', 'Python', 'C', 'C++', 'GSAP', 'Modern Web'],
    quote: '“I learn by building, and I build to learn.”',
  },
];

const formatBoldText = (text) => {
  if (!text || typeof text !== 'string') return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="journey-bold-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export function JourneyTimelineExperience({ transitionPhase, originRect }) {
  const [warpYear, setWarpYear] = useState(2026);
  const [isWarping, setIsWarping] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineTrackRef = useRef(null);

  // Time-travel countdown sequence: 2026 -> 2025 -> 2024 -> 2023 -> 2021 -> 2019
  useEffect(() => {
    const warpSequence = [2026, 2025, 2024, 2023, 2021, 2019];
    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      if (step < warpSequence.length) {
        setWarpYear(warpSequence[step]);
      } else {
        clearInterval(interval);
        setIsWarping(false);
      }
    }, 110);

    return () => clearInterval(interval);
  }, []);

  const activeEvent = TIMELINE_EVENTS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : TIMELINE_EVENTS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < TIMELINE_EVENTS.length - 1 ? prev + 1 : 0));
  };

  // Horizontal wheel scroll handler
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 20) {
      if (e.deltaX > 20 || e.deltaY > 20) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div
      className={`journey-timeline-container phase-${transitionPhase.toLowerCase()}`}
      onWheel={handleWheel}
    >
      {/* Time Warp Film Grain & Light Trails */}
      <div className="journey-film-grain" aria-hidden="true" />
      <div className="journey-light-streaks" aria-hidden="true" />

      {/* Initial Time Travel Warp Countdown Overlay */}
      {isWarping && (
        <div className="journey-warp-overlay">
          <div className="warp-hud-tag">TEMPORAL DISPLACEMENT ACTIVE</div>
          <div className="warp-year-odometer">
            <span className="warp-year-val">{warpYear}</span>
            <div className="warp-speed-blur" />
          </div>
          <div className="warp-sub-status">
            REWINDING TIMELINE // DECELERATING AT ORIGIN...
          </div>
        </div>
      )}

      {/* Top HUD Header */}
      <div className="journey-top-hud">
        <div className="hud-temporal-brand">
          <Clock size={16} className="temporal-icon pulse-gold" />
          <span className="hud-journey-title">JOURNEY // TIME TRAVEL TIMELINE</span>
          <span className="epoch-badge">EPOCH {activeEvent.year}</span>
        </div>

        <div className="journey-nav-arrows">
          <button
            type="button"
            className="arrow-btn"
            onClick={handlePrev}
            aria-label="Previous timeline event"
          >
            <ChevronLeft size={16} />
            <span>PREV</span>
          </button>

          <span className="timeline-counter">
            0{activeIndex + 1} / 0{TIMELINE_EVENTS.length}
          </span>

          <button
            type="button"
            className="arrow-btn"
            onClick={handleNext}
            aria-label="Next timeline event"
          >
            <span>NEXT</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Interactive Horizontal Year Ribbon */}
      <div className="timeline-year-ribbon" ref={timelineTrackRef}>
        <div className="ribbon-connector-line" />

        {TIMELINE_EVENTS.map((item, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={item.year + idx}
              type="button"
              className={`ribbon-node ${isSelected ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <span className="node-marker" />
              <span className="node-year">{item.year}</span>
              <span className="node-phase">{item.phase}</span>
            </button>
          );
        })}
      </div>

      {/* Main Milestone Stage Display */}
      <div className="journey-event-stage">
        <div className="event-content-card" key={activeEvent.year + activeIndex}>

          <div className="event-left-details">
            <div className="event-meta-badge">
              <Milestone size={13} />
              <span>{activeEvent.period ? `${activeEvent.period} // ` : ''}{activeEvent.year}</span>
            </div>

            <h2 className="event-main-title">{activeEvent.title}</h2>
            <h3 className="event-subtitle">{activeEvent.subtitle}</h3>

            <p className="event-description-text">
              {formatBoldText(activeEvent.description)}
            </p>

            {activeEvent.keyMoment && (
              <div className="event-key-moment">
                <span className="key-moment-label">KEY MOMENT //</span>
                <span className="key-moment-text">“{activeEvent.keyMoment}”</span>
              </div>
            )}

            {activeEvent.quote && (
              <div className="event-quote-box">
                <span className="quote-mark">“</span>
                <p className="quote-body">{activeEvent.quote}</p>
              </div>
            )}

            <div className="event-tech-tags">
              {activeEvent.tech.map((t) => (
                <span key={t} className="journey-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="event-right-achievements">
            <div className="achievements-header">
              <Award size={16} className="award-icon" />
              <span>KEY MILESTONES & DISCOVERIES</span>
            </div>

            <div className="achievements-list">
              {activeEvent.achievements.map((ach, i) => (
                <div key={i} className="achievement-item">
                  <div className="ach-bullet">
                    <span className="ach-dot" />
                  </div>
                  <span className="ach-text">{formatBoldText(ach)}</span>
                </div>
              ))}
            </div>

            <div className="event-navigation-cues">
              <span className="cue-hint">USE ARROW KEYS OR SWIPE HORIZONTALLY</span>
              <div className="cue-keys">
                <span className="key-cap">← PREV</span>
                <span className="key-cap">NEXT →</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default JourneyTimelineExperience;
