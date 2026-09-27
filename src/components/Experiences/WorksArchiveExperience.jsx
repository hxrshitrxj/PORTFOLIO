import React, { useState } from 'react';
import { ArrowUpRight, Heart, Plus, Search, Shield, Cpu, Sparkles, Award, Terminal, Radio, ExternalLink } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { useExperience, EXPERIENCES } from '../../context/ExperienceContext';
import ExpandableCardModal from './ExpandableCardModal';
import './WorksArchiveExperience.css';

// Extensible project component data model for physical expansion & inspection
export const EXPANDABLE_COMPONENTS = {
  hardwareArchitecture: {
    id: 'hardwareArchitecture',
    type: 'component',
    title: 'HARDWARE ARCHITECTURE',
    subtitle: 'TRANSMITTER & CONTROLLER TOPOLOGY',
    badge: 'CIRCUITRY & BUS INTERFACE',
    image: '/projects/lifi-circuit.png',
    imageAlt: 'Arduino UNO and Breadboard Circuitry for Li-Fi',
    imageTag: 'CENTRAL PROCESSING & MODULATION BUS',
    description: 'Hardware architecture comprising an Arduino UNO central processing unit, 16x2 Character LCD with I2C module, and visible light modulation circuitry for real-time ASCII wireless transmission.',
    specifications: [
      { label: 'MICROCONTROLLER', value: 'Arduino UNO (ATmega328P @ 16MHz)' },
      { label: 'DISPLAY INTERFACE', value: '16x2 Character LCD + I2C (0x27)' },
      { label: 'OPTICAL TRANSMITTER', value: 'High-Speed Pulsing Light Source' },
      { label: 'WIRING BUS', value: '4-Wire I2C (VCC, GND, SDA, SCL)' },
      { label: 'POWER CONSUMPTION', value: '5V DC Logic Level (~120mA)' },
      { label: 'MODULATION TYPE', value: 'Simplex OOK (On-Off Keying)' },
    ],
    details: [
      {
        title: 'Arduino UNO (ATmega328P)',
        desc: 'Utilized as the central processing unit. Executes alphanumeric-to-binary ASCII encoding and controls the high-frequency pulsing of the optical light source with precision microsecond timing.',
      },
      {
        title: '16x2 Character LCD with I2C Module',
        desc: 'Equipped with a PCF8574 I2C adapter requiring only 4 wires (VCC, GND, SDA, SCL). Frees up Arduino GPIO pins and provides instant real-time visualization of transmitted text.',
      },
      {
        title: 'LED / Transmitter Components',
        desc: 'High-speed optical pulsing source driven by the microcontroller. Toggles on and off at rates imperceptible to the human eye to represent binary 1s and 0s.',
      },
      {
        title: 'Optical Sensor / Receiver',
        desc: 'High-sensitivity photosensitive element calibrated to detect subtle microscopic variations in visible light intensity and translate them into voltage fluctuations.',
      },
      {
        title: 'Wiring & Circuit Architecture',
        desc: 'Solderless breadboard layout with dedicated power rails, pull-up resistors for I2C SDA/SCL lines, and noise-damping bypass capacitors to ensure clean signals.',
      },
      {
        title: 'Data Processing & Timing',
        desc: 'Serializes 8-bit ASCII characters into synchronized pulse trains, ensuring high-fidelity transmission without frame dropping.',
      },
      {
        title: 'Communication Flow',
        desc: 'Strict simplex (one-way) optical telemetry with direct line-of-sight signal propagation, delivering zero electromagnetic interference.',
      },
    ],
    flowTitle: 'HOW IT WORKS — HARDWARE TRANSMISSION SEQUENCE',
    flowSteps: [
      { step: '01', name: 'INPUT', desc: 'String input captured in memory (e.g. "HELLO WORLD!")' },
      { step: '02', name: 'DATA PROCESSING', desc: 'Arduino ATmega328P translates characters into 8-bit ASCII binary streams' },
      { step: '03', name: 'LED / LIGHT TRANSMISSION', desc: 'High-speed optical modulation pulses light source imperceptibly' },
      { step: '04', name: 'OPTICAL RECEIVER', desc: 'Photosensitive sensor detects fluctuating photon flux' },
      { step: '05', name: 'SIGNAL PROCESSING', desc: 'Demodulation circuit converts light variations to voltage states' },
      { step: '06', name: 'OUTPUT', desc: 'I2C LCD driver displays reconstructed ASCII message on 16x2 screen' },
    ],
    technologies: ['Arduino UNO', 'ATmega328P', 'Embedded C++', 'I2C Bus', 'Breadboard Prototyping', 'Optical Modulation'],
  },
  opticalReceiver: {
    id: 'opticalReceiver',
    type: 'component',
    title: 'OPTICAL RECEIVER',
    subtitle: 'PHOTODETECTION & NOISE-ISOLATED DEMODULATION',
    badge: 'OPTICAL SENSING ENCLOSURE',
    image: '/projects/lifi-receiver-box.png',
    imageAlt: 'Li-Fi Receiver in Light-Shielded Enclosure',
    imageTag: 'WORKING RECEIVER & 16x2 LCD DISPLAY',
    description: 'Photosensitive receiver module housed in a light-shielded cardboard enclosure, engineered to filter ambient light noise and reconstruct transmitted optical pulses into readable alphanumeric data on the LCD display.',
    specifications: [
      { label: 'OPTICAL SENSOR', value: 'High-Sensitivity Photodetector' },
      { label: 'ENCLOSURE', value: 'Custom Light-Shielded Enclosure' },
      { label: 'RECEPTION STATUS', value: 'DATA RECEIVED: "HELLO WORLD!"' },
      { label: 'NOISE REDUCTION', value: 'Physical Ambient Optical Baffling' },
      { label: 'BANDWIDTH', value: 'Visible Light Spectrum (400–700nm)' },
      { label: 'SECURITY', value: 'Zero Wall Penetration (Physical Perimeter)' },
    ],
    details: [
      {
        title: 'Purpose of the Receiver',
        desc: 'Demodulates incoming visible light pulses into clean electrical signals, isolating them from surrounding room ambient light to reconstruct the transmitted data.',
      },
      {
        title: 'Photodetection Mechanism',
        desc: 'Photons striking the photosensitive semiconductor surface induce measurable micro-voltage variations proportional to the light intensity.',
      },
      {
        title: 'Visible-Light Signal Reception',
        desc: 'Custom-built cardboard enclosure painted with internal light-shielding baffles that absorb stray ambient room illumination and direct focused light onto the receiver logic.',
      },
      {
        title: 'Signal Conversion',
        desc: 'Analog voltage fluctuations are sampled and thresholded against a baseline reference to extract sharp square-wave digital binary pulses (0V / 5V).',
      },
      {
        title: 'Communication Process',
        desc: 'Synchronous simplex reception decoding byte streams at calibrated clock intervals, ensuring zero bit slippage during transmission.',
      },
      {
        title: 'Interaction with Arduino & I2C',
        desc: 'The receiving microcontroller processes the analog signal timing, reconstructs the original ASCII text, and routes it via the I2C protocol to be successfully displayed on the 16x2 LCD screen.',
      },
      {
        title: 'Advantages & Limitations',
        desc: 'Advantages: Zero RF emissions, complete immunity to electromagnetic interference (safe for aircraft & hospitals), localized physical security. Limitations: Strict line-of-sight requirement, opaque obstacles interrupt the transmission.',
      },
    ],
    flowTitle: 'DATA FLOW — OPTICAL RECONSTRUCTION PIPELINE',
    flowSteps: [
      { step: '01', name: 'VISIBLE LIGHT', desc: 'High-frequency modulated optical pulses travel across free space' },
      { step: '02', name: 'PHOTODETECTION', desc: 'Photosensitive sensor absorbs photons inside shielded enclosure' },
      { step: '03', name: 'ELECTRICAL SIGNAL', desc: 'Photons converted into analog electrical voltage variations' },
      { step: '04', name: 'PROCESSING', desc: 'Microcontroller decodes voltage timing into binary and ASCII text' },
      { step: '05', name: 'OUTPUT', desc: '16x2 LCD screen prints: "DATA RECEIVED HELLO WORLD!"' },
    ],
    technologies: ['VLC Photodetection', 'Optical Noise Shielding', 'Analog-to-Digital Conversion', '16x2 I2C LCD', 'Simplex Telemetry'],
  },
  certificate: {
    id: 'certificate',
    type: 'certificate',
    title: 'CERTIFICATE OF APPRECIATION',
    subtitle: '2ND POSITION // CLASS 11 SCIENCE EXHIBITION',
    badge: 'OFFICIAL MERIT RECOGNITION',
    image: '/projects/lifi-certificate.jpg',
    imageAlt: 'Certificate of Appreciation presented to Harshit Raj',
    imageTag: 'MODI PUBLIC SCHOOL, SILIGURI • 11.01.2025',
    description: 'Official Certificate of Appreciation awarded to Harshit Raj of Class 11S for participating in the Model Exhibition-cum-Competition (Group C) on 11.01.2025 at Modi Public School, Siliguri, and securing Second Position for the Li-Fi (Light Fidelity) Data Transmission System.',
    specifications: [
      { label: 'HONOR', value: '🏆 2nd Position (Silver Medal)' },
      { label: 'RECIPIENT', value: 'Harshit Raj (Class 11S)' },
      { label: 'EVENT', value: 'Model Exhibition-cum-Competition' },
      { label: 'DATE', value: '11.01.2025' },
      { label: 'INSTITUTION', value: 'Modi Public School, Siliguri' },
      { label: 'CATEGORY', value: 'Group C — Working Hardware Models' },
    ],
    details: [
      {
        title: 'Exhibition Context',
        desc: 'Presented at the inter-house science and technology model competition, evaluating real-world innovation, working prototype viability, and scientific rigor.',
      },
      {
        title: 'Project Evaluated',
        desc: 'Li-Fi Visible Light Communication (VLC) prototype demonstrating simplex alphanumeric data transfer through modulated light waves under live testing.',
      },
      {
        title: 'Recognized Accomplishment',
        desc: 'Awarded Second Position for demonstrating an EMI-immune alternative to standard Wi-Fi, validated live by the Programme Coordinator, Principal, and Academic Director.',
      },
    ],
    technologies: ['Class 11 Science Exhibition', 'Modi Public School', 'Group C Silver Medal', 'Hardware Innovation'],
  },
  harshitProfile: {
    id: 'harshitProfile',
    type: 'profile',
    title: 'HARSHIT RAJ',
    subtitle: 'HARDWARE DEVELOPER & PROGRAMMER',
    badge: 'CREATOR & ARCHITECT',
    image: '/hero-person.png',
    imageAlt: 'Harshit Raj',
    imageTag: 'STUDENT RESEARCHER & DEVELOPER',
    description: 'Hardware developer, embedded programmer, and creative technologist. Designed, built, and programmed the complete Li-Fi Visible Light Communication prototype.',
    specifications: [
      { label: 'ROLE', value: 'Hardware Developer & Programmer' },
      { label: 'GRADE / YEAR', value: 'Class 11 (2024 — 2025)' },
      { label: 'CORE SKILLS', value: 'C++, Arduino, Embedded Systems, Circuit Prototyping' },
      { label: 'FOCUS', value: 'Optical Telemetry, Creative Computing, Machine Learning' },
    ],
    details: [
      {
        title: 'System Design & Architecture',
        desc: 'Formulated the simplex communication protocol, selected optical emitter and receiver components, and designed the noise-isolation enclosure.',
      },
      {
        title: 'Firmware & Logic Programming',
        desc: 'Wrote the embedded C++ codebase for the Arduino UNO to serialize ASCII strings into bit-streams, modulate optical output, and handle I2C LCD commands.',
      },
      {
        title: 'Hardware Fabrication',
        desc: 'Prototyped the breadboard circuitry, soldered necessary connections, calibrated sensor sensitivity, and built the light-shielded cardboard enclosure.',
      },
    ],
    technologies: ['C++', 'Arduino UNO', 'Circuit Prototyping', 'Hardware Architecture', 'I2C Protocol'],
  },
  arduinoProfile: {
    id: 'arduinoProfile',
    type: 'profile',
    title: 'ARDUINO UNO + I2C BUS',
    subtitle: 'SIMPLEX VLC OPTICAL PROTOCOL',
    badge: 'CONTROLLER & PROTOCOL SPECIFICATION',
    image: '/projects/lifi-circuit.png',
    imageAlt: 'Arduino UNO and I2C LCD Hardware',
    imageTag: 'ATMEGA328P • 16 MHZ • 4-WIRE I2C',
    description: 'Technical specification of the controller platform and the simplex optical telemetry protocol powering the Li-Fi data transmission prototype.',
    specifications: [
      { label: 'MCU CLOCK', value: '16 MHz Crystal Oscillator' },
      { label: 'OPERATING VOLTAGE', value: '5V DC Logic' },
      { label: 'I2C SPEED', value: '100 kHz Standard Mode' },
      { label: 'COMMUNICATION', value: 'Simplex (One-Way Telemetry)' },
      { label: 'ENCODING', value: '8-bit ASCII Character Serialization' },
      { label: 'PIN USAGE', value: 'Pins A4 (SDA), A5 (SCL), Digital PWM Pin' },
    ],
    details: [
      {
        title: 'ATmega328P Microcontroller',
        desc: 'High-performance 8-bit AVR RISC architecture executing instructions in a single clock cycle to ensure precise microsecond optical pulse modulation.',
      },
      {
        title: 'Simplex VLC Protocol',
        desc: 'One-way communication pipe where the transmitter pulses optical signals continuously and the receiver decodes incoming byte streams with start/stop framing.',
      },
      {
        title: 'I2C 4-Wire Optimization',
        desc: 'Utilizes PCF8574 expander to drive the 16x2 character LCD using only two data lines (SDA, SCL) and two power lines (VCC, GND), preserving MCU GPIO pins.',
      },
    ],
    technologies: ['ATmega328P', '16 MHz Clock', 'I2C Protocol', 'Simplex Telemetry', 'VLC Modulation'],
  },
};

const LIFI_WORKS_PROJECT = {
  id: '01',
  num: '01',
  slug: 'lifi-vlc',
  nameTop: 'LI-FI',
  nameBottom: 'VLC SYSTEM',
  title: 'Li-Fi (Light Fidelity) Data Transmission System',
  subtitle: '🏆 2nd Position // Class 11 Science Exhibition Silver Award',
  achievement: '🏆 2nd Position, Class 11 Science Exhibition',
  role: 'Hardware Developer & Programmer',
  category: 'HARDWARE & OPTICAL NETWORKING',
  colors: ['#ffe5b4', '#ffaa00', '#d00000'],
  img: '/projects/lifi-receiver-box.png',
  imgSecondary: '/projects/lifi-circuit.png',
  projectUrl: '', // Add external production or GitHub URL here when available
  capsules: [
    {
      id: 'harshitProfile',
      avatar: '/hero-person.png',
      title: 'HARSHIT RAJ',
      subtitle: 'Hardware Developer & Programmer',
    },
    {
      id: 'arduinoProfile',
      avatar: '/projects/lifi-circuit.png',
      title: 'ARDUINO UNO + I2C',
      subtitle: 'Simplex VLC Optical Protocol',
    },
  ],
  cards: [
    {
      id: 'hardwareArchitecture',
      title: 'HARDWARE ARCHITECTURE',
      desc: 'Arduino UNO central processing unit, 16x2 Character LCD with I2C module (4-wire configuration), solderless breadboard and light-shielded enclosure.',
      img: '/projects/lifi-circuit.png',
    },
    {
      id: 'opticalReceiver',
      title: 'OPTICAL RECEIVER',
      desc: 'High-speed optical modulation and photodetection pipeline receiving ASCII binary code pulses and displaying "HELLO WORLD!" without RF interference.',
      img: '/projects/lifi-receiver-box.png',
    },
  ],
  bioLead: 'Li-Fi Data Transmission System',
  bioRole: 'Visible Light Communication Prototype',
  bioDesc: 'is an award-winning optical wireless telemetry system engineered by Harshit Raj. Earning 2nd Position at the Class 11 Science Exhibition, it replaces congested RF signals with high-speed visible light pulses, delivering zero-interference and wall-contained secure communications.',
  tags: ['Arduino UNO', 'Visible Light Comm (VLC)', 'Embedded C++', 'I2C LCD', 'Optical Sensors', 'Hardware'],
  github: 'https://github.com',
};

export function WorksArchiveExperience({ transitionPhase, originRect }) {
  const [favorites, setFavorites] = useState({});
  const [expandedCardKey, setExpandedCardKey] = useState(null);
  const [expandedCardOriginRect, setExpandedCardOriginRect] = useState(null);
  
  const { switchExperience } = useExperience();
  const { openModal } = useModal();

  const activeProject = LIFI_WORKS_PROJECT;

  const handleToggleFavorite = (cardId, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handleCardClick = (componentKey, e) => {
    if (e && e.currentTarget && typeof e.currentTarget.getBoundingClientRect === 'function') {
      const rect = e.currentTarget.getBoundingClientRect();
      setExpandedCardOriginRect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setExpandedCardOriginRect(null);
    }
    setExpandedCardKey(componentKey);
  };

  const handleViewProject = (e) => {
    e.stopPropagation();
    if (activeProject.projectUrl) {
      window.open(activeProject.projectUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Launch detailed hardware architecture case study expansion
      handleCardClick('hardwareArchitecture', e);
    }
  };

  return (
    <div 
      className={`anime-work-container phase-${transitionPhase.toLowerCase()}`}
    >
      {/* Cinematic Red/Crimson Ambient Glow & Background Speed Streaks */}
      <div className="anime-bg-gradient" aria-hidden="true" />
      <div className="anime-bg-glow" aria-hidden="true" />
      <div className="anime-speed-streaks" aria-hidden="true" />

      {/* Main Editorial Canvas Stage */}
      <main className="anime-canvas-stage">

        {/* LEFT COLUMN: Giant Stacked Typography, Color Code & Certificate Proof Card */}
        <section className="anime-left-hero">
          <div className="anime-title-block">
            <h1 className="anime-giant-text-top">{activeProject.nameTop}</h1>
            <h1 className="anime-giant-text-bottom">{activeProject.nameBottom}</h1>
            <p className="anime-subtitle-text">{activeProject.subtitle}</p>
          </div>

          {/* Verified Achievement / Certificate Proof Area */}
          <div 
            className="anime-certificate-proof-card"
            onClick={(e) => handleCardClick('certificate', e)}
            role="button"
            tabIndex={0}
            title="Inspect Official Award Certificate"
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick('certificate', e)}
          >
            <div className="cert-proof-ribbon">
              <Award size={13} className="cert-trophy-gold" />
              <span>ACHIEVEMENT // VERIFIED PROOF</span>
            </div>

            <div className="cert-proof-body">
              <div className="cert-thumbnail-frame">
                <img 
                  src="/projects/lifi-certificate.jpg" 
                  alt="Class 11 Science Exhibition Certificate - Modi Public School" 
                  className="cert-thumbnail-img"
                />
                <div className="cert-thumb-expand-icon">
                  <ArrowUpRight size={12} />
                </div>
              </div>

              <div className="cert-text-col">
                <h4 className="cert-pos-heading">🏆 2ND POSITION</h4>
                <p className="cert-event-line">CLASS 11 SCIENCE EXHIBITION</p>
                <p className="cert-school-line">MODI PUBLIC SCHOOL, SILIGURI</p>
                <span className="cert-date-tag">11.01.25</span>
              </div>
            </div>

            <div className="cert-proof-footer">
              <span>Click to inspect certificate</span>
              <ArrowUpRight size={13} />
            </div>
          </div>
        </section>

        {/* CENTER STAGE: Harshit Raj Character Portrait */}
        <section className="anime-center-portrait-zone">
          <div className="anime-portrait-wrapper">
            <img 
              src="/hero-person.png" 
              alt="Harshit Raj" 
              className="anime-character-photo"
            />
            {/* Dramatic Backlight Aura */}
            <div 
              className="anime-portrait-glow"
              style={{
                background: `radial-gradient(circle, ${activeProject.colors[1]}55 0%, ${activeProject.colors[2]}33 50%, transparent 75%)`,
              }}
            />
            <div className="anime-silhouette-rim" />
          </div>
        </section>

        {/* RIGHT COLUMN: Floating Capsule Pills, Feature Cards & Bio Panel */}
        <section className="anime-right-dashboard">
          
          {/* Top Floating Capsule Pills */}
          <div className="anime-capsules-row">
            {activeProject.capsules.map((capsule) => (
              <div 
                key={capsule.id} 
                className="anime-capsule-card"
                onClick={(e) => handleCardClick(capsule.id, e)}
                role="button"
                tabIndex={0}
                title={`Inspect details for ${capsule.title}`}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(capsule.id, e)}
              >
                <img src={capsule.avatar} alt={capsule.title} className="capsule-avatar" />
                <div className="capsule-info">
                  <span className="capsule-title">{capsule.title}</span>
                  <span className="capsule-sub">{capsule.subtitle}</span>
                </div>
                <button type="button" className="capsule-plus-btn" aria-label="Expand capsule details">
                  <Plus size={13} />
                </button>
              </div>
            ))}
          </div>

          {/* Middle Two Floating Spec Cards (Interactive Expandable Components) */}
          <div className="anime-spec-cards-row">
            {activeProject.cards.map((card) => {
              const isFav = favorites[card.id];
              return (
                <div 
                  key={card.id} 
                  className="anime-spec-card interactive-project-card"
                  onClick={(e) => handleCardClick(card.id, e)}
                  role="button"
                  tabIndex={0}
                  title={`Click to expand ${card.title} specification`}
                  onKeyDown={(e) => e.key === 'Enter' && handleCardClick(card.id, e)}
                >
                  <div className="spec-card-thumb-wrap">
                    <img src={card.img} alt={card.title} className="spec-card-thumb" />
                    <button 
                      type="button" 
                      className={`spec-card-heart-btn ${isFav ? 'favorited' : ''}`}
                      onClick={(e) => handleToggleFavorite(card.id, e)}
                      aria-label="Favorite specification"
                    >
                      <Heart size={12} fill={isFav ? '#ff3b30' : 'none'} color={isFav ? '#ff3b30' : '#ffffff'} />
                    </button>
                    <div className="spec-card-expand-indicator">
                      <ArrowUpRight size={13} />
                    </div>
                  </div>
                  <div className="spec-card-text">
                    <h3 className="spec-card-title">{card.title}</h3>
                    <p className="spec-card-desc">{card.desc}</p>
                    <span className="spec-click-hint">Click to inspect architecture ↗</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Large Frosted Glass Bio Overview Panel */}
          <div className="anime-bio-glass-panel">
            <p className="anime-bio-text">
              <strong className="bio-lead">{activeProject.bioLead}</strong>, commonly known as <strong className="bio-role">"{activeProject.bioRole}"</strong>, {activeProject.bioDesc}
            </p>
            
            <div className="anime-bio-footer">
              <div className="anime-tags-cluster">
                {activeProject.tags.map((t) => (
                  <span key={t} className="anime-tag-pill">{t}</span>
                ))}
              </div>
              <button 
                type="button" 
                className="anime-action-btn"
                onClick={handleViewProject}
                title="View Detailed Project Specification"
              >
                <span>VIEW PROJECT ↗</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

        </section>

        {/* BOTTOM-LEFT: Project Badge & Watermark */}
        <aside className="anime-bottom-selector">
          <div className="selector-badges-column">
            <div className="selector-badge-card active" title={activeProject.nameTop}>
              <img src={activeProject.img} alt={activeProject.nameTop} className="badge-thumb-img" />
              <span className="badge-num">{activeProject.num}</span>
            </div>
          </div>
          <span className="anime-designer-watermark">By Harshit Raj</span>
        </aside>

      </main>

      {/* Reusable Cinematic Expanding Component Modal */}
      {expandedCardKey && EXPANDABLE_COMPONENTS[expandedCardKey] && (
        <ExpandableCardModal
          cardData={EXPANDABLE_COMPONENTS[expandedCardKey]}
          originRect={expandedCardOriginRect}
          onClose={() => {
            setExpandedCardKey(null);
            setExpandedCardOriginRect(null);
          }}
        />
      )}
    </div>
  );
}

export default WorksArchiveExperience;
